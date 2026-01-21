# 📊 Dashboard NIBU - Sistema de Autenticación
## Configuración Actualizada con Mercados Reales

---

## 🌎 Mercados por Vista

### Vista 1 (Full Year Report) - 19 Mercados
```
COL, PLT, CST, ECA, PNM, URU, ELS, HND, NIC, 
DOM, GUT, PRG, BOL, MASSY, GEL, HIT, ALB, BLZ, CUR
```

### Vista 2 (Year To Date Report) - 15 Mercados
```
BOL, COL, CST, DOM, ECA, ELS, GEL, GUT, HND, 
MASSY, NIC, PLT, PNM, PRG, URU
```

**Nota:** El sistema muestra automáticamente solo los mercados disponibles en cada vista.

---

## 👥 Usuarios y Permisos por Defecto

### 🔐 Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Acceso:** **TODOS los mercados** (se actualiza automáticamente según el Excel)
- **Privilegios:** 
  - Panel de administración
  - Gestionar permisos de usuarios
  - Ver y modificar accesos a mercados

### 👤 Usuarios Normales
**Contraseña para todos:** `pass123`

| Usuario | Mercados Asignados |
|---------|-------------------|
| **usuario1** | COL, PLT, CST, ECA |
| **usuario2** | PNM, URU, ELS, HND |
| **usuario3** | NIC, DOM, GUT, PRG |
| **usuario4** | BOL, MASSY, GEL, HIT |
| **usuario5** | ALB, BLZ, CUR |

---

## 🚀 Inicio Rápido

### 1️⃣ Primer Uso
1. Abre `reset-storage.html` para limpiar datos anteriores
2. Ve a `login.html`
3. Ingresa con cualquier usuario
4. Verás solo los mercados asignados a tu usuario

### 2️⃣ Como Administrador
1. Login: `admin` / `admin123`
2. Accedes automáticamente al panel de administración
3. Puedes ir al dashboard con el botón "📊 Dashboard"
4. En el panel de admin:
   - ✅ Usa "Permitir Todos" para dar acceso completo a un usuario
   - ☑️ Marca/desmarca mercados individuales
   - 💾 Guarda cambios para aplicar
   - 🔄 Restablece para volver a permisos originales

### 3️⃣ Como Usuario Normal
1. Login: `usuario1` / `pass123` (o cualquier otro usuario)
2. Accedes directamente al dashboard
3. Solo verás los mercados permitidos en el dropdown
4. Si el admin te asigna más mercados, aparecerán automáticamente

---

## 🔧 Herramientas de Diagnóstico

### `reset-storage.html`
**Función:** Limpiar todos los datos almacenados
**Cuándo usar:**
- Primera vez que usas el sistema
- Permisos corruptos o errores de autenticación
- Quieres restaurar permisos por defecto

**Efecto:**
- Cierra todas las sesiones
- Elimina permisos modificados
- Restaura configuración original

### `test-permissions.html`
**Función:** Verificar estado del sistema
**Muestra:**
- Todos los usuarios y sus permisos
- Sesión actual activa
- Mercados disponibles en el sistema
- Estado del localStorage
- Resultado de tests de login

**Cuándo usar:**
- Para verificar que todo funciona correctamente
- Para ver qué permisos tiene cada usuario
- Para debug de problemas

---

## ⚙️ Funcionamiento Técnico

### Flujo de Autenticación
```
1. Usuario ingresa credenciales en login.html
2. auth.js valida usuario y contraseña
3. Se obtienen permisos:
   - Admin → TODOS los mercados del sistema
   - Usuario → Mercados asignados (guardados en localStorage)
4. Se crea sesión en sessionStorage
5. Redirección según rol:
   - Admin → admin.html
   - Usuario → index.html
```

### Filtrado de Mercados
```
1. Excel se carga en index.html
2. Se extraen países únicos del archivo
3. auth.updateAvailableMarkets() actualiza la lista global
4. populateCountrySelector() filtra según usuario:
   - Admin → Muestra TODOS del Excel
   - Usuario → Muestra solo los permitidos que existen en el Excel
```

### Gestión de Permisos (Admin)
```
1. Admin abre admin.html
2. auth.getAllUsers() obtiene lista de usuarios
3. Para cada usuario muestra checkboxes con TODOS los mercados
4. Admin marca/desmarca mercados
5. Al guardar:
   - Se actualiza localStorage con nuevos permisos
   - Se recarga vista para reflejar cambios
6. Usuario verá cambios en su próximo login
```

---

## 🎯 Casos de Uso Comunes

### Dar acceso completo a un usuario
1. Login como admin
2. Ve al panel de administración
3. Busca el usuario
4. Click en "✅ Permitir Todos / ❌ Quitar Todos"
5. Click en "💾 Guardar Cambios"
6. El usuario ahora verá todos los mercados

### Restringir acceso a mercados específicos
1. Login como admin
2. Panel de administración
3. Desmarca los mercados que quieres restringir
4. Guardar cambios
5. El usuario solo verá los mercados marcados

### Agregar nuevo usuario
Editar `auth.js`:
```javascript
usuario6: {
  username: 'usuario6',
  password: 'pass123',
  role: 'user',
  name: 'Usuario Seis',
  allowedMarkets: ['COL', 'DOM', 'GUT']
}
```

### Cambiar permisos por defecto
Editar `auth.js` en la sección de usuarios:
```javascript
usuario1: {
  ...
  allowedMarkets: ['COL', 'PLT', 'ECA', 'BOL'] // Nueva lista
}
```

---

## 📱 Compatibilidad

✅ **Navegadores compatibles:**
- Chrome/Edge (Recomendado)
- Firefox
- Safari
- Opera

⚠️ **Requisitos:**
- JavaScript habilitado
- localStorage habilitado
- sessionStorage habilitado

---

## 🐛 Solución de Problemas

### Problema: "No markets available for your user"
**Causa:** Usuario sin permisos o permisos vacíos
**Solución:**
1. Ve a `reset-storage.html` y limpia el storage
2. O pide al admin que te asigne mercados

### Problema: Admin no ve todos los mercados
**Causa:** Lista de mercados no actualizada desde el Excel
**Solución:**
1. Recarga la página del dashboard
2. La lista se actualiza automáticamente al cargar el Excel

### Problema: Cambios de permisos no se reflejan
**Causa:** Usuario tiene sesión activa con permisos antiguos
**Solución:**
1. Usuario debe hacer logout y login nuevamente
2. Los nuevos permisos se cargan al iniciar sesión

### Problema: No puedo acceder al panel de admin
**Causa:** No tienes rol de administrador
**Solución:**
- Solo el usuario `admin` puede acceder
- Usuarios normales no pueden ser administradores

---

## 📞 Información Adicional

### Archivos del Sistema
```
login.html              → Página de inicio de sesión
admin.html              → Panel de administración
index.html              → Dashboard principal
auth.js                 → Lógica de autenticación
reset-storage.html      → Herramienta de limpieza
test-permissions.html   → Herramienta de diagnóstico
AUTHENTICATION_GUIDE.md → Guía completa
MERCADOS_RESUMEN.md     → Este documento
```

### Storage Utilizado
```
sessionStorage:
  - currentUser: Sesión activa del usuario

localStorage:
  - userPermissions: Permisos asignados por el admin
  - lastLogin: Último acceso registrado
  - darkMode: Preferencia de modo oscuro
```

---

**Dashboard NIBU © 2026**  
*Sistema de autenticación con gestión de permisos por mercado*

Última actualización: 2026-01-20
