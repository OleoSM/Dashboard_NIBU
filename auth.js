/**
 * Sistema de Autenticación y Gestión de Permisos - CRUD Completo
 * Dashboard NIBU - 2026
 */

// ============= CONFIGURACIÓN DE MERCADOS POR VISTA =============
const MARKETS_CONFIG = {
  vista1: ['COL', 'PLT', 'CST', 'ECA', 'PNM', 'URU', 'ELS', 'HND', 'NIC', 
           'DOM', 'GUT', 'PRG', 'BOL', 'MASSY', 'GEL', 'HIT', 'ALB', 'BLZ', 'CUR'],
  vista2: ['BOL', 'COL', 'CST', 'DOM', 'ECA', 'ELS', 'GEL', 'GUT', 'HND', 
           'MASSY', 'NIC', 'PLT', 'PNM', 'PRG', 'URU']
};

// ============= USUARIO ADMIN (NO SE PUEDE MODIFICAR) =============
const ADMIN_USER = {
  id: 'admin',
  username: 'admin',
  password: 'admin123',
  role: 'admin',
  name: 'Administrador',
  allowedMarkets: {
    vista1: [...MARKETS_CONFIG.vista1],
    vista2: [...MARKETS_CONFIG.vista2]
  }
};

// ============= USUARIOS POR DEFECTO =============
const DEFAULT_USERS = {
  usuario1: {
    id: 'usuario1',
    username: 'usuario1',
    password: 'pass123',
    role: 'user',
    name: 'Usuario Uno',
    allowedMarkets: {
      vista1: ['COL', 'PLT', 'CST', 'ECA'],
      vista2: ['COL', 'PLT', 'CST', 'ECA']
    }
  },
  usuario2: {
    id: 'usuario2',
    username: 'usuario2',
    password: 'pass123',
    role: 'user',
    name: 'Usuario Dos',
    allowedMarkets: {
      vista1: ['PNM', 'URU', 'ELS', 'HND'],
      vista2: ['PNM', 'URU', 'ELS', 'HND']
    }
  },
  usuario3: {
    id: 'usuario3',
    username: 'usuario3',
    password: 'pass123',
    role: 'user',
    name: 'Usuario Tres',
    allowedMarkets: {
      vista1: ['NIC', 'DOM', 'GUT', 'PRG'],
      vista2: ['NIC', 'DOM', 'GUT', 'PRG']
    }
  },
  usuario4: {
    id: 'usuario4',
    username: 'usuario4',
    password: 'pass123',
    role: 'user',
    name: 'Usuario Cuatro',
    allowedMarkets: {
      vista1: ['BOL', 'MASSY', 'GEL', 'HIT'],
      vista2: ['BOL', 'MASSY', 'GEL']
    }
  },
  usuario5: {
    id: 'usuario5',
    username: 'usuario5',
    password: 'pass123',
    role: 'user',
    name: 'Usuario Cinco',
    allowedMarkets: {
      vista1: ['ALB', 'BLZ', 'CUR'],
      vista2: []
    }
  }
};

// ============= FUNCIONES DE INICIALIZACIÓN =============

/**
 * Inicializar sistema de usuarios
 */
function initializeUsers() {
  const savedUsers = localStorage.getItem('dashboardUsers');
  if (!savedUsers) {
    // Primera vez: guardar usuarios por defecto
    localStorage.setItem('dashboardUsers', JSON.stringify(DEFAULT_USERS));
    console.log('✅ Usuarios inicializados con valores por defecto');
  }
}

/**
 * Obtener todos los usuarios del sistema
 */
function getStoredUsers() {
  const users = localStorage.getItem('dashboardUsers');
  return users ? JSON.parse(users) : {};
}

/**
 * Guardar usuarios en localStorage y notificar cambios
 */
function saveUsers(users) {
  localStorage.setItem('dashboardUsers', JSON.stringify(users));
  
  // Notificar cambio con timestamp para forzar actualización en otras pestañas
  localStorage.setItem('dashboardUsersLastUpdate', Date.now().toString());
  
  // Emitir evento también en la pestaña actual (el evento 'storage' solo se dispara en otras pestañas)
  window.dispatchEvent(new CustomEvent('usersUpdated', {
    detail: {
      source: 'local',
      timestamp: Date.now()
    }
  }));
}

/**
 * Obtener usuario por ID o username
 */
function getUserById(identifier) {
  // Si es admin
  if (identifier === 'admin') {
    return ADMIN_USER;
  }
  
  const users = getStoredUsers();
  
  // Buscar por ID
  if (users[identifier]) {
    return users[identifier];
  }
  
  // Buscar por username
  const userByUsername = Object.values(users).find(u => u.username === identifier);
  return userByUsername || null;
}

// ============= FUNCIONES CRUD =============

/**
 * Crear nuevo usuario
 */
function createUser(userData) {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return { success: false, message: 'No tienes permisos para crear usuarios' };
  }

  // Validaciones
  if (!userData.username || !userData.password || !userData.name) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  const users = getStoredUsers();
  
  // Verificar si el username ya existe
  const usernameExists = Object.values(users).some(u => u.username === userData.username);
  if (usernameExists) {
    return { success: false, message: 'El nombre de usuario ya existe' };
  }

  // Generar nuevo ID (usuario6, usuario7, etc.)
  const existingIds = Object.keys(users).map(id => {
    const match = id.match(/^usuario(\d+)$/);
    return match ? parseInt(match[1]) : 0;
  });
  const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
  const newId = `usuario${maxId + 1}`;

  // Crear nuevo usuario
  const newUser = {
    id: newId,
    username: userData.username,
    password: userData.password,
    role: 'user',
    name: userData.name,
    allowedMarkets: {
      vista1: userData.allowedMarkets?.vista1 || [],
      vista2: userData.allowedMarkets?.vista2 || []
    }
  };

  users[newId] = newUser;
  saveUsers(users);

  console.log('✅ Usuario creado:', newId);
  return { success: true, message: 'Usuario creado exitosamente', user: newUser };
}

/**
 * Actualizar usuario existente
 */
function updateUser(userId, userData) {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return { success: false, message: 'No tienes permisos para actualizar usuarios' };
  }

  if (userId === 'admin') {
    return { success: false, message: 'No puedes modificar el usuario administrador' };
  }

  const users = getStoredUsers();
  
  if (!users[userId]) {
    return { success: false, message: 'Usuario no encontrado' };
  }

  // Verificar si el nuevo username ya existe (excepto el mismo usuario)
  if (userData.username && userData.username !== users[userId].username) {
    const usernameExists = Object.values(users).some(
      u => u.username === userData.username && u.id !== userId
    );
    if (usernameExists) {
      return { success: false, message: 'El nombre de usuario ya existe' };
    }
  }

  // Actualizar campos
  if (userData.username) users[userId].username = userData.username;
  if (userData.password) users[userId].password = userData.password;
  if (userData.name) users[userId].name = userData.name;
  if (userData.allowedMarkets) {
    users[userId].allowedMarkets = {
      vista1: userData.allowedMarkets.vista1 || [],
      vista2: userData.allowedMarkets.vista2 || []
    };
  }

  saveUsers(users);

  console.log('✅ Usuario actualizado:', userId);
  return { success: true, message: 'Usuario actualizado exitosamente', user: users[userId] };
}

/**
 * Eliminar usuario
 */
function deleteUser(userId) {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return { success: false, message: 'No tienes permisos para eliminar usuarios' };
  }

  if (userId === 'admin') {
    return { success: false, message: 'No puedes eliminar el usuario administrador' };
  }

  const users = getStoredUsers();
  
  if (!users[userId]) {
    return { success: false, message: 'Usuario no encontrado' };
  }

  const username = users[userId].username;
  delete users[userId];
  saveUsers(users);

  console.log('🗑️ Usuario eliminado:', userId);
  return { success: true, message: `Usuario ${username} eliminado exitosamente` };
}

/**
 * Obtener todos los usuarios (para listar en admin)
 */
function getAllUsers() {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return { success: false, message: 'Acceso denegado' };
  }

  const users = getStoredUsers();
  const userList = Object.values(users).map(user => ({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    allowedMarkets: user.allowedMarkets
  }));

  return { success: true, users: userList };
}

// ============= FUNCIONES DE AUTENTICACIÓN =============

/**
 * Login
 */
function login(username, password) {
  initializeUsers();

  const user = getUserById(username);

  if (!user) {
    return { 
      success: false, 
      message: 'Usuario no encontrado. Verifica tu nombre de usuario.' 
    };
  }

  if (user.password !== password) {
    return { 
      success: false, 
      message: 'Contraseña incorrecta. Intenta nuevamente.' 
    };
  }

  // Crear sesión
  const sessionData = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    allowedMarkets: user.allowedMarkets,
    loginTime: new Date().toISOString()
  };

  sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
  localStorage.setItem('lastLogin', JSON.stringify({
    username: user.username,
    time: new Date().toISOString()
  }));

  console.log('✅ Login exitoso:', user.username);
  return { success: true, user: sessionData, message: 'Login exitoso' };
}

/**
 * Logout
 */
function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

/**
 * Obtener usuario actual
 */
function getCurrentUser() {
  const userData = sessionStorage.getItem('currentUser');
  if (!userData) return null;
  return JSON.parse(userData);
}

/**
 * Verificar autenticación
 */
function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Verificar si es admin
 */
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

/**
 * Obtener mercados permitidos según vista
 */
function getAllowedMarketsByView(view = 'vista1') {
  const user = getCurrentUser();
  if (!user) return [];
  
  if (user.role === 'admin') {
    return [...MARKETS_CONFIG[view]];
  }
  
  return user.allowedMarkets[view] || [];
}

/**
 * Verificar acceso a mercado en vista específica
 */
function hasMarketAccess(market, view = 'vista1') {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.allowedMarkets[view]?.includes(market) || false;
}

/**
 * Proteger página
 */
function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/**
 * Proteger página admin
 */
function protectAdminPage() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  if (!isAdmin()) {
    alert('No tienes permisos para acceder a esta página');
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

/**
 * Resetear sistema (volver a usuarios por defecto)
 */
function resetToDefaults() {
  localStorage.setItem('dashboardUsers', JSON.stringify(DEFAULT_USERS));
  console.log('🔄 Sistema reseteado a valores por defecto');
  return { success: true, message: 'Sistema reseteado correctamente' };
}

// ============= INICIALIZACIÓN =============
initializeUsers();

// ============= SINCRONIZACIÓN ENTRE PESTAÑAS =============

/**
 * Escuchar cambios en localStorage desde otras pestañas
 * Este evento se dispara cuando otra pestaña modifica el localStorage
 */
window.addEventListener('storage', function(e) {
  // Detectar si cambió la base de datos de usuarios
  if (e.key === 'dashboardUsersLastUpdate' || e.key === 'dashboardUsers') {
    console.log('🔄 Detectado cambio en usuarios desde otra pestaña');
    
    // Emitir evento personalizado para que las páginas se actualicen
    window.dispatchEvent(new CustomEvent('usersUpdated', {
      detail: {
        source: 'storage',
        timestamp: Date.now()
      }
    }));
  }
  
  // Detectar si cambió la sesión actual (logout desde otra pestaña)
  if (e.key === 'currentUser' && e.newValue === null) {
    console.log('🚪 Sesión cerrada desde otra pestaña');
    window.location.href = 'login.html';
  }
});

// ============= EXPORTAR API =============
window.auth = {
  // CRUD
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  
  // Auth
  login,
  logout,
  getCurrentUser,
  isAuthenticated,
  isAdmin,
  
  // Permisos
  getAllowedMarketsByView,
  hasMarketAccess,
  
  // Protección
  protectPage,
  protectAdminPage,
  
  // Utilidades
  resetToDefaults,
  saveUsers,        // Exponer para importación de JSON
  getStoredUsers,   // Exponer para importación de JSON
  
  // Constantes
  MARKETS_CONFIG,
  get AVAILABLE_MARKETS_V1() {
    return [...MARKETS_CONFIG.vista1];
  },
  get AVAILABLE_MARKETS_V2() {
    return [...MARKETS_CONFIG.vista2];
  }
};
