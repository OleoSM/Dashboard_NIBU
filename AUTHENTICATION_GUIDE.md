# Sistema de Autenticación - Dashboard NIBU

## 📋 Descripción

Sistema de login con gestión de usuarios y permisos por mercados para el Dashboard NIBU.

## 👥 Usuarios Predefinidos

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Permisos:** Acceso completo a todos los mercados y panel de administración

### Usuarios Normales
Todos los usuarios normales tienen la contraseña: `pass123`

1. **usuario1** - Acceso a: COL, PLT, CST, ECA
2. **usuario2** - Acceso a: PNM, URU, ELS, HND
3. **usuario3** - Acceso a: NIC, DOM, GUT, PRG
4. **usuario4** - Acceso a: BOL, MASSY, GEL, HIT
5. **usuario5** - Acceso a: ALB, BLZ, CUR

**Nota:** El administrador puede modificar estos permisos desde el panel de administración.

## 🚀 Cómo Usar

### 1. Inicio de Sesión
- Abre `login.html` en tu navegador
- Ingresa tu usuario y contraseña
- Serás redirigido automáticamente según tu rol:
  - **Admin** → Panel de Administración
  - **Usuario Normal** → Dashboard Principal

### 2. Dashboard Principal (index.html)
- Solo verás los mercados a los que tienes acceso
- Tu nombre aparece en la esquina superior derecha
- Puedes cerrar sesión con el botón "Logout"

### 3. Panel de Administración (admin.html)
**Solo accesible para el administrador**

El administrador puede:
- Ver estadísticas de usuarios y mercados
- Gestionar permisos de cada usuario
- Asignar o quitar acceso a mercados específicos
- Ver último acceso al sistema

#### Gestión de Permisos:
1. Cada usuario tiene checkboxes para cada mercado disponible
2. Marca/desmarca los mercados según corresponda
3. Haz clic en "Guardar Cambios" para aplicar
4. Usa "Restablecer" para volver a los permisos originales

## 📁 Archivos del Sistema

```
Dashboard_NIBU/
├── login.html          # Página de inicio de sesión
├── admin.html          # Panel de administración (solo admin)
├── index.html          # Dashboard principal (protegido)
├── auth.js             # Sistema de autenticación
└── AUTHENTICATION_GUIDE.md  # Esta guía
```

## 🔒 Características de Seguridad

1. **Protección de Páginas**
   - `index.html` requiere autenticación
   - `admin.html` requiere rol de administrador
   - Redirección automática si no hay sesión activa

2. **Filtrado por Permisos**
   - Los selectores de país solo muestran mercados permitidos
   - Cada usuario ve únicamente sus mercados asignados
   - El admin puede ver todos los mercados

3. **Gestión de Sesión**
   - Sesión almacenada en `sessionStorage` (se borra al cerrar el navegador)
   - Permisos guardados en `localStorage` (persisten entre sesiones)
   - Última sesión registrada para auditoría

## 🎯 Flujo de Trabajo Típico

### Para el Administrador:
1. Login con credenciales de admin
2. Revisar estadísticas en el panel de administración
3. Gestionar permisos de usuarios según necesidad
4. Acceder al dashboard desde el botón "Dashboard"
5. Cerrar sesión

### Para Usuarios Normales:
1. Login con credenciales asignadas
2. Acceso directo al dashboard
3. Ver solo los mercados permitidos
4. Trabajar con los datos disponibles
5. Cerrar sesión

## 🛠️ Modificaciones Futuras

### Agregar Nuevos Usuarios:
Edita el archivo `auth.js`, sección `USERS`:

```javascript
usuarioN: {
  username: 'usuarioN',
  password: 'pass123',
  role: 'user',
  name: 'Usuario N',
  allowedMarkets: ['Brasil', 'Chile']
}
```

### Agregar Nuevos Mercados:
Los mercados se extraen automáticamente del Excel, pero si necesitas actualizar la lista de referencia, edita el archivo `auth.js`, constante `AVAILABLE_MARKETS`:

```javascript
let AVAILABLE_MARKETS = [
  'COL', 'PLT', 'CST', 'ECA', 'PNM', 'URU', 'ELS', 'HND', 'NIC', 
  'DOM', 'GUT', 'PRG', 'BOL', 'MASSY', 'GEL', 'HIT', 'ALB', 'BLZ', 'CUR'
];
```

**Nota:** Esta lista es de referencia. El sistema extraerá los mercados reales del Excel automáticamente.

## ⚠️ Notas Importantes

1. Este sistema usa almacenamiento local del navegador (no hay backend)
2. Los permisos pueden ser modificados solo por el administrador
3. Las contraseñas están en texto plano (para desarrollo/pruebas)
4. Para producción, se recomienda implementar un backend real
5. Al cerrar el navegador, la sesión se cierra automáticamente

## 🔧 Solución de Problemas

### No puedo acceder al dashboard
- Verifica que hayas iniciado sesión en `login.html`
- Confirma que tu usuario tenga mercados asignados

### No veo ningún país en el selector
- Contacta al administrador para que te asigne permisos
- Verifica que tengas mercados permitidos en tu perfil

### Acceso denegado al panel de admin
- Solo el usuario `admin` puede acceder
- Verifica que hayas iniciado sesión con las credenciales correctas

## 📝 Registro de Cambios

### Versión 1.0 (2026-01-20)
- Sistema de login implementado
- 5 usuarios predefinidos + 1 administrador
- Panel de administración completo
- Filtrado de mercados por permisos
- Gestión de sesión y permisos

---

**Dashboard NIBU © 2026**
Sistema desarrollado para gestión de indicadores por mercado
