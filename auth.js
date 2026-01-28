/**
 * Sistema de Autenticación y Gestión de Permisos - MODO ESTÁTICO (Código manda)
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
  password: 'admin',
  role: 'admin',
  name: 'Administrador',
  allowedMarkets: {
    vista1: [...MARKETS_CONFIG.vista1],
    vista2: [...MARKETS_CONFIG.vista2]
  }
};

// ============= ZONA DE EDICIÓN DE USUARIOS =============
// ✏️ EDITA TUS USUARIOS AQUÍ DIRECTAMENTE
// Al guardar y recargar la página, estos serán los usuarios activos.
const DEFAULT_USERS = {
  Diego_Suarez: {
    id: 'Diego_Suarez', // Quité el espacio extra que tenías aquí
    username: 'Diego_Suarez@nissan.com.mx',
    password: 'p$9R&w2N',
    role: 'user',
    name: 'Diego Suárez',
    allowedMarkets: {
      vista1: ['DOM', 'PLT', 'PRG', 'URU', 'BOL'], //SURINAME EN QUE GRUPO ESTÁ??
      vista2: ['DOM', 'PLT', 'PRG', 'URU', 'BOL'] //SURINAME EN QUE GRUPO ESTÁ??
    }
  },
  
  Gustavo_Careaga: {
    id: 'Gustavo_Careaga', // Quité el espacio extra que tenías aquí
    username: 'Gustavo_Careaga@nissan.com.mx',
    password: '7#kL9@qV',
    role: 'user',
    name: 'Gustavo Careaga',
    allowedMarkets: {
      vista1: ['DOM', 'PLT', 'PRG', 'URU'], //SURINAME EN QUE GRUPO ESTÁ??
      vista2: ['DOM', 'PLT', 'PRG', 'URU'] //SURINAME EN QUE GRUPO ESTÁ??
    }
  },

  Tomas_Arias: {
    id: 'Tomas_Arias',
    username: 'Tomas_Arias@nissan.com.mx',
    password: '3@bWq6&Z',
    role: 'user',
    name: 'Tomas Arias',
    allowedMarkets: {
      vista1: ['ALB', 'BLZ', 'CUR', 'ECA', 'GUT', 'HIT', 'PNM'],
      vista2: ['ALB', 'BLZ', 'CUR', 'ECA', 'GUT', 'HIT', 'PNM']
    }
  },
  Fernando_Andres_Diaz: {
    id: 'Fernando_Andres_Diaz',
    username: 'Fernando_Andres_Diaz@nissan.com.mx',
    password: 'y$2M9#rB',
    role: 'user',
    name: 'Fernando Andres Diaz',
    allowedMarkets: {
      vista1: ['ALB', 'BLZ', 'CUR', 'ECA', 'GUT', 'HIT', 'PNM'],
      vista2: ['ALB', 'BLZ', 'CUR', 'ECA', 'GUT', 'HIT', 'PNM']
    }
  },

  Begona_Madruga: {
    id: 'Begona_Madruga',
    username: 'Begona_Madruga@nissan.com.mx',
    password: 'L1$wP5#z',
    role: 'user',
    name: 'Begoña Madruga',
    allowedMarkets: {
      vista1: ['BOL'],
      vista2: ['BOL']
    }
  },

  Pablo_Brito: {
    id: 'Pablo_Brito',
    username: 'Pablo_Brito@nissan.com.mx',
    password: 'G7*fX1?p',
    role: 'user',
    name: 'Pablo Brito',
    allowedMarkets: {
      vista1: ['JAM', 'ELS', 'HND', 'NIC'],
      vista2: ['JAM', 'ELS', 'HND', 'NIC'],
    }
  },

  Mariana_Rios: {
    id: 'Mariana_Rios',
    username: 'Mariana_Rios@nissan.com.mx',
    password: 'H5&tS4!k',
    role: 'user',
    name: 'Mariana Rios',
    allowedMarkets: {
      vista1: ['JAM', 'ELS', 'HND', 'NIC'],
      vista2: ['JAM', 'ELS', 'HND', 'NIC'],
    }
  },

  Wilson_Rincon: {
    id: 'Wilson_Rincon',
    username: 'Wilson_Rincon@nissan.com.mx',
    password: 'B4*gK7?q',
    role: 'user',
    name: 'Wilson Rincon',
    allowedMarkets: {
      vista1: ['COL', 'CST'],
      vista2: ['COL', 'CST']
    }
  },

  Nubia_Medina: {
    id: 'Nubia_Medina',
    username: 'Nubia_Medina@nissan.com.mx',
    password: 'x8!D6&mR',
    role: 'user',
    name: 'Nubia Medina',
    allowedMarkets: {
      vista1: ['COL', 'CST'],
      vista2: ['COL', 'CST']
    }
  },
  
};

// ============= FUNCIONES DE INICIALIZACIÓN =============

/**
 * Inicializar sistema de usuarios
 * MODIFICADO: Ahora fuerza la actualización desde el código siempre.
 */
function initializeUsers() {
  // Eliminamos el "if (!savedUsers)" para que SIEMPRE tome los datos de este archivo
  localStorage.setItem('dashboardUsers', JSON.stringify(DEFAULT_USERS));
  console.log('✅ Usuarios actualizados desde el código auth.js');
}

/**
 * Obtener todos los usuarios del sistema
 */
function getStoredUsers() {
  const users = localStorage.getItem('dashboardUsers');
  return users ? JSON.parse(users) : DEFAULT_USERS;
}

/**
 * Guardar usuarios en localStorage y notificar cambios
 */
function saveUsers(users) {
  localStorage.setItem('dashboardUsers', JSON.stringify(users));
  
  // Notificar cambio con timestamp para forzar actualización en otras pestañas
  localStorage.setItem('dashboardUsersLastUpdate', Date.now().toString());
  
  // Emitir evento también en la pestaña actual
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
// Nota: Aunque estas funciones siguen existiendo, si usas "createUser" desde la web,
// el nuevo usuario desaparecerá si recargas la página porque el código volverá a
// imponer los usuarios de DEFAULT_USERS.

/**
 * Crear nuevo usuario
 */
function createUser(userData) {
  const currentUser = getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return { success: false, message: 'No tienes permisos para crear usuarios' };
  }

  if (!userData.username || !userData.password || !userData.name) {
    return { success: false, message: 'Todos los campos son obligatorios' };
  }

  const users = getStoredUsers();
  
  const usernameExists = Object.values(users).some(u => u.username === userData.username);
  if (usernameExists) {
    return { success: false, message: 'El nombre de usuario ya existe' };
  }

  // Generar ID simple basado en timestamp para evitar conflictos al editar código
  const newId = `user_${Date.now()}`;

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

  console.log('⚠️ Usuario creado temporalmente (se borrará al recargar si no lo agregas al código):', newId);
  return { success: true, message: 'Usuario creado (Nota: Agrégalo a auth.js para que sea permanente)', user: newUser };
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

  if (userData.username && userData.username !== users[userId].username) {
    const usernameExists = Object.values(users).some(
      u => u.username === userData.username && u.id !== userId
    );
    if (usernameExists) {
      return { success: false, message: 'El nombre de usuario ya existe' };
    }
  }

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
  return { success: true, message: 'Usuario actualizado temporalmente', user: users[userId] };
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

  return { success: true, message: `Usuario ${username} eliminado temporalmente` };
}

/**
 * Obtener todos los usuarios
 */
function getAllUsers() {
  const currentUser = getCurrentUser();
  // Permitimos ver usuarios si es admin
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

function login(username, password) {
  // RE-INICIALIZAMOS AQUÍ PARA ASEGURARNOS QUE LOS DATOS DEL CÓDIGO ESTÉN CARGADOS
  initializeUsers(); 

  const user = getUserById(username);

  if (!user) {
    return { success: false, message: 'Usuario no encontrado.' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Contraseña incorrecta.' };
  }

  const sessionData = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    allowedMarkets: user.allowedMarkets,
    loginTime: new Date().toISOString()
  };

  sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
  
  return { success: true, user: sessionData, message: 'Login exitoso' };
}

function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'login.html';
}

function getCurrentUser() {
  const userData = sessionStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

function isAuthenticated() {
  return getCurrentUser() !== null;
}

function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

function getAllowedMarketsByView(view = 'vista1') {
  const user = getCurrentUser();
  if (!user) return [];
  if (user.role === 'admin') return [...MARKETS_CONFIG[view]];
  return user.allowedMarkets[view] || [];
}

function hasMarketAccess(market, view = 'vista1') {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.allowedMarkets[view]?.includes(market) || false;
}

function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

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

function resetToDefaults() {
  localStorage.setItem('dashboardUsers', JSON.stringify(DEFAULT_USERS));
  console.log('🔄 Sistema reseteado a valores del código');
  return { success: true, message: 'Sistema reseteado correctamente' };
}

// ============= EJECUCIÓN INICIAL =============
// Esto asegura que apenas cargue el script, los usuarios del código se guarden
initializeUsers();

// ============= SINCRONIZACIÓN =============
window.addEventListener('storage', function(e) {
  if (e.key === 'dashboardUsersLastUpdate' || e.key === 'dashboardUsers') {
    window.dispatchEvent(new CustomEvent('usersUpdated', {
      detail: { source: 'storage', timestamp: Date.now() }
    }));
  }
  if (e.key === 'currentUser' && e.newValue === null) {
    window.location.href = 'login.html';
  }
});

// ============= EXPORTAR API =============
window.auth = {
  createUser, updateUser, deleteUser, getAllUsers, getUserById,
  login, logout, getCurrentUser, isAuthenticated, isAdmin,
  getAllowedMarketsByView, hasMarketAccess, protectPage, protectAdminPage,
  resetToDefaults, saveUsers, getStoredUsers, MARKETS_CONFIG,
  get AVAILABLE_MARKETS_V1() { return [...MARKETS_CONFIG.vista1]; },
  get AVAILABLE_MARKETS_V2() { return [...MARKETS_CONFIG.vista2]; }
};