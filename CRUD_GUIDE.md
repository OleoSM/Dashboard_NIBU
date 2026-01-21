# 🎯 Dashboard NIBU - Guía Completa CRUD de Usuarios

## 📋 Sistema de Gestión Completo

El sistema ahora incluye un **CRUD completo** para la gestión de usuarios con permisos diferenciados por vista.

---

## 🌟 Características Principales

### ✅ **CRUD Completo**
- ➕ **Crear** nuevos usuarios
- ✏️ **Editar** usuarios existentes (nombre, usuario, contraseña, permisos)
- 🗑️ **Eliminar** usuarios
- 📊 **Listar** todos los usuarios con sus permisos

### ✅ **Permisos por Vista**
- 🌎 **Vista 1** (Full Year Report): 19 mercados
- 🌎 **Vista 2** (Year To Date): 15 mercados
- Cada usuario puede tener permisos diferentes en cada vista

### ✅ **Sistema de IDs**
- Usuarios identificados por ID interno: `usuario1`, `usuario2`, etc.
- El ID se genera automáticamente
- Puedes personalizar nombre de usuario, contraseña y nombre completo

---

## 👤 Estructura de Usuario

```javascript
{
  id: 'usuario1',              // ID interno (automático)
  username: 'jperez',          // Usuario para login (editable)
  password: 'mipassword',      // Contraseña (editable)
  name: 'Juan Pérez',          // Nombre completo (editable)
  role: 'user',                // Rol (siempre 'user', excepto admin)
  allowedMarkets: {
    vista1: ['COL', 'PLT'],    // Mercados en Vista 1
    vista2: ['COL', 'DOM']     // Mercados en Vista 2
  }
}
```

---

## 🚀 Guía de Uso - Admin

### 1️⃣ Acceder al Panel de Administración

```
1. Login con: admin / admin123
2. Serás redirigido automáticamente al panel
3. O accede desde el dashboard con el botón "Admin Panel"
```

### 2️⃣ Ver Todos los Usuarios

En la tabla principal verás:
- **ID**: Identificador interno (usuario1, usuario2, etc.)
- **Usuario**: Nombre de usuario para login
- **Nombre**: Nombre completo
- **Vista 1 (Mercados)**: Mercados permitidos en Full Year
- **Vista 2 (Mercados)**: Mercados permitidos en Year To Date
- **Acciones**: Botones para editar o eliminar

### 3️⃣ Crear Nuevo Usuario

```
1. Click en "➕ Crear Nuevo Usuario"
2. Llenar el formulario:
   - Nombre Completo (obligatorio)
   - Nombre de Usuario (obligatorio, será para login)
   - Contraseña (obligatoria, mínimo 6 caracteres)
3. Seleccionar mercados para Vista 1
   - Usa "✅ Todos / ❌ Ninguno" para selección rápida
   - O marca individualmente los mercados
4. Seleccionar mercados para Vista 2
5. Click en "💾 Guardar Usuario"
```

**Ejemplo:**
```
Nombre Completo: María González
Usuario: mgonzalez
Contraseña: maria2024
Vista 1: COL, PLT, ECA, DOM
Vista 2: COL, DOM
```

El sistema asignará automáticamente el ID `usuario6` (siguiente disponible).

### 4️⃣ Editar Usuario Existente

```
1. Click en "✏️ Editar" en la fila del usuario
2. Modificar cualquier campo:
   - Cambiar nombre completo
   - Cambiar nombre de usuario
   - Cambiar contraseña (dejar en blanco para mantener actual)
   - Modificar mercados en Vista 1
   - Modificar mercados en Vista 2
3. Click en "💾 Guardar Usuario"
```

**Notas:**
- El ID interno NO se puede cambiar
- Si cambias el username, el usuario deberá usar el nuevo para login
- Si dejas la contraseña en blanco, se mantiene la actual

### 5️⃣ Eliminar Usuario

```
1. Click en "🗑️ Eliminar" en la fila del usuario
2. Confirmar la eliminación
3. El usuario se elimina permanentemente
```

**⚠️ Advertencia:** Esta acción no se puede deshacer.

---

## 🌎 Mercados por Vista

### Vista 1: Full Year Report (19 mercados)
```
COL, PLT, CST, ECA, PNM, URU, ELS, HND, NIC,
DOM, GUT, PRG, BOL, MASSY, GEL, HIT, ALB, BLZ, CUR
```

### Vista 2: Year To Date (15 mercados)
```
BOL, COL, CST, DOM, ECA, ELS, GEL, GUT, HND,
MASSY, NIC, PLT, PNM, PRG, URU
```

**Nota:** Algunos mercados solo están en Vista 1 (Ej: ALB, BLZ, CUR, HIT).

---

## 💡 Casos de Uso Comunes

### Caso 1: Usuario que solo ve Vista 1
```
Usuario: analista1
Vista 1: Todos los mercados ✅
Vista 2: Ninguno ❌
Resultado: Solo puede trabajar con Full Year Report
```

### Caso 2: Usuario con acceso diferente por vista
```
Usuario: gerente1
Vista 1: COL, PLT, ECA (3 mercados)
Vista 2: COL, PLT, ECA, DOM, GUT (5 mercados)
Resultado: Más mercados en Vista 2 que en Vista 1
```

### Caso 3: Usuario temporal con acceso limitado
```
Usuario: temp1
Vista 1: DOM (1 mercado)
Vista 2: DOM (1 mercado)
Resultado: Solo puede ver República Dominicana
```

### Caso 4: Usuario de región específica
```
Usuario: sudamerica1
Vista 1: COL, ECA, URU, BOL, PRG
Vista 2: COL, ECA, URU, BOL, PRG
Resultado: Solo ve países de Sudamérica
```

---

## 🔒 Reglas del Sistema

### ✅ Permitido
- Crear usuarios ilimitados
- Editar cualquier campo de usuario
- Eliminar cualquier usuario (excepto admin)
- Asignar 0 mercados (usuario sin acceso)
- Asignar todos los mercados
- Permisos diferentes por vista

### ❌ No Permitido
- Modificar usuario `admin`
- Eliminar usuario `admin`
- Crear usuarios con username duplicado
- Cambiar el ID interno de un usuario
- Acceso al CRUD sin ser administrador

---

## 🎨 Interfaz del Panel de Administración

### Estadísticas (Cards Superiores)
```
┌─────────────────┬──────────────────┬──────────────────┬─────────────────┐
│ Total Usuarios  │ Vista 1 Mercados │ Vista 2 Mercados │  Último Acceso  │
│       5         │        19        │        15        │  20/01 10:30AM  │
└─────────────────┴──────────────────┴──────────────────┴─────────────────┘
```

### Tabla de Usuarios
```
┌─────────┬──────────┬──────────────┬─────────────────┬─────────────────┬──────────┐
│   ID    │ Usuario  │    Nombre    │ Vista 1 (Merc.) │ Vista 2 (Merc.) │ Acciones │
├─────────┼──────────┼──────────────┼─────────────────┼─────────────────┼──────────┤
│usuario1 │ usuario1 │ Usuario Uno  │ COL PLT CST +1  │ COL PLT CST +1  │ ✏️ 🗑️   │
│usuario2 │ jperez   │ Juan Pérez   │ PNM URU ELS +1  │ PNM URU ELS +1  │ ✏️ 🗑️   │
└─────────┴──────────┴──────────────┴─────────────────┴─────────────────┴──────────┘
```

### Modal Crear/Editar
```
┌─────────────────────────────────────────────────┐
│  ➕ Crear Nuevo Usuario                    ✖    │
├─────────────────────────────────────────────────┤
│  Nombre Completo: [________________]            │
│  Usuario:         [________________]            │
│  Contraseña:      [________________]            │
│                                                 │
│  🌎 Vista 1 - Full Year Report                 │
│  ✅ Todos / ❌ Ninguno                          │
│  ┌───────────────────────────────────────────┐ │
│  │ ☑ COL  ☑ PLT  ☑ CST  ☐ ECA  ☐ PNM  ...  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  🌎 Vista 2 - Year To Date                     │
│  ✅ Todos / ❌ Ninguno                          │
│  ┌───────────────────────────────────────────┐ │
│  │ ☑ COL  ☑ PLT  ☐ CST  ☐ DOM  ...          │ │
│  └───────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│                   [Cancelar] [💾 Guardar]      │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

### Creación de Usuario
```
1. Admin llena formulario
2. Sistema valida datos
3. Genera ID automático (usuario6, usuario7...)
4. Guarda en localStorage (dashboardUsers)
5. Actualiza tabla
6. Usuario puede hacer login inmediatamente
```

### Edición de Usuario
```
1. Admin abre modal de edición
2. Sistema carga datos actuales
3. Admin modifica campos necesarios
4. Sistema valida cambios
5. Actualiza localStorage
6. Usuario ve cambios en su próximo login
```

### Eliminación de Usuario
```
1. Admin confirma eliminación
2. Sistema elimina de localStorage
3. Actualiza tabla
4. Si el usuario estaba logueado, pierde acceso
```

---

## 🛠️ Almacenamiento

### localStorage
```javascript
{
  "dashboardUsers": {
    "usuario1": {
      "id": "usuario1",
      "username": "usuario1",
      "password": "pass123",
      "name": "Usuario Uno",
      "role": "user",
      "allowedMarkets": {
        "vista1": ["COL", "PLT"],
        "vista2": ["COL"]
      }
    },
    "usuario2": { ... },
    // ... más usuarios
  }
}
```

### sessionStorage
```javascript
{
  "currentUser": {
    "id": "usuario1",
    "username": "usuario1",
    "name": "Usuario Uno",
    "role": "user",
    "allowedMarkets": {
      "vista1": ["COL", "PLT"],
      "vista2": ["COL"]
    },
    "loginTime": "2026-01-20T10:30:00.000Z"
  }
}
```

---

## 🐛 Solución de Problemas

### Problema: No puedo crear usuario
**Posibles causas:**
- Username ya existe
- Campos obligatorios vacíos
- Contraseña muy corta

**Solución:** Verificar que el username sea único y todos los campos estén completos.

### Problema: Usuario no ve cambios de permisos
**Causa:** Tiene sesión activa con permisos antiguos

**Solución:** Usuario debe hacer logout y login nuevamente.

### Problema: No aparecen los usuarios creados
**Causa:** localStorage corrupto

**Solución:** Usar `reset-storage.html` para limpiar y reiniciar.

### Problema: Error al editar usuario
**Causa:** Intentando cambiar username a uno que ya existe

**Solución:** Elegir un username diferente.

---

## 📊 Estadísticas y Reportes

El admin puede ver en tiempo real:
- Total de usuarios registrados
- Mercados disponibles por vista
- Último acceso al sistema
- Distribución de permisos por usuario

---

## 🔐 Seguridad

### Validaciones Implementadas
- ✅ Username único por usuario
- ✅ Contraseña obligatoria en creación
- ✅ Solo admin puede acceder al CRUD
- ✅ Confirmación antes de eliminar
- ✅ Admin no puede ser modificado/eliminado

### Recomendaciones
- Usar contraseñas seguras en producción
- Revisar permisos periódicamente
- Eliminar usuarios inactivos
- Documentar cambios importantes

---

## 📝 Registro de Cambios

### Versión 2.0 (2026-01-20)
- ✅ CRUD completo implementado
- ✅ Permisos diferenciados por Vista 1 y Vista 2
- ✅ Sistema de IDs automáticos
- ✅ Interfaz de administración renovada
- ✅ Modales para crear/editar usuarios
- ✅ Botones "Todos/Ninguno" para selección rápida
- ✅ Validaciones mejoradas
- ✅ Almacenamiento en localStorage

---

**Dashboard NIBU © 2026**  
*Sistema CRUD de Usuarios con Permisos por Vista*

Última actualización: 2026-01-20
