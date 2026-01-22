# 🔄 Sistema de Sincronización de Usuarios

## ¿Qué se implementó?

Se agregó un sistema de **sincronización automática entre pestañas/ventanas** del navegador para que cuando actualices un usuario en una pestaña, el cambio se refleje inmediatamente en todas las demás pestañas abiertas.

## 📝 Cambios Realizados

### 1. **auth.js** (Línea 110)
Se modificó la función `saveUsers()` para que:
- Guarde los usuarios en localStorage
- Registre un timestamp de última actualización
- Esto permite que otras pestañas detecten el cambio

```javascript
function saveUsers(users) {
  localStorage.setItem('dashboardUsers', JSON.stringify(users));
  localStorage.setItem('dashboardUsersLastUpdate', Date.now().toString());
}
```

### 2. **auth.js** (Línea 419)
Se agregó un **listener del evento `storage`** que:
- Detecta cuando otra pestaña modifica los usuarios
- Emite un evento personalizado `usersUpdated`
- Detecta si se cerró sesión en otra pestaña

```javascript
window.addEventListener('storage', function(e) {
  if (e.key === 'dashboardUsersLastUpdate' || e.key === 'dashboardUsers') {
    window.dispatchEvent(new CustomEvent('usersUpdated', {...}));
  }
  if (e.key === 'currentUser' && e.newValue === null) {
    window.location.href = 'login.html';
  }
});
```

### 3. **admin.html** (Línea 1048)
Se agregó un **listener del evento `usersUpdated`** que:
- Recarga la tabla de usuarios automáticamente
- Actualiza las estadísticas
- Muestra una notificación al usuario

```javascript
window.addEventListener('usersUpdated', function(e) {
  loadUsers();
  loadStats();
  showAlert('info', '✨ Datos actualizados desde otra pestaña');
});
```

## ✅ Cómo Probar

1. **Abre dos pestañas** del navegador con `admin.html`
2. En la **Pestaña 1**, edita un usuario (cambia el nombre o los permisos)
3. En la **Pestaña 2**, verás automáticamente:
   - ✨ La tabla se actualiza con los nuevos datos
   - 💬 Aparece un mensaje: "Datos actualizados desde otra pestaña"
   - 📊 Las estadísticas se actualizan

## 🎯 Beneficios

✅ **Sincronización en tiempo real** entre pestañas  
✅ **No se pierden cambios** al tener múltiples pestañas abiertas  
✅ **Detección de logout** - si cierras sesión en una pestaña, todas se cierran  
✅ **Sin necesidad de recargar** manualmente la página  
✅ **Notificaciones visuales** cuando se actualizan los datos  

## 🔧 Funciones Afectadas

Todas estas operaciones ahora sincronizan entre pestañas:
- ➕ Crear usuario
- ✏️ Editar usuario
- 🗑️ Eliminar usuario
- 📥 Importar usuarios desde JSON
- 🔄 Resetear usuarios a valores por defecto

## 📱 Compatibilidad

✅ Chrome / Edge / Opera  
✅ Firefox  
✅ Safari  
⚠️ **Nota**: La sincronización funciona entre pestañas del **mismo navegador**. No sincroniza entre navegadores diferentes (Chrome → Firefox, etc.)

## 🐛 Troubleshooting

**¿Los cambios no se reflejan?**
1. Verifica que ambas pestañas estén en el **mismo dominio** (file:// o http://localhost)
2. Abre la consola del navegador (F12) y busca el mensaje: `🔄 Detectado cambio en usuarios desde otra pestaña`
3. Si no aparece, puede ser que el navegador esté bloqueando el evento `storage`

**¿Aparecen múltiples alertas?**
- Esto es normal si tienes muchas pestañas abiertas. Cada una mostrará su propia alerta.

---

**Creado**: Enero 2026  
**Sistema**: Dashboard NIBU - Nissan  
**Tecnología**: localStorage + Event Storage API
