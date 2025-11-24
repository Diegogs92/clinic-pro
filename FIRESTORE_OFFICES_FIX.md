# 🔧 Solución: Error de Permisos en Firestore para Offices

## Problema

Al cargar la aplicación, aparece el siguiente error:

```
Error loading offices: FirebaseError: Missing or insufficient permissions.
```

Este error ocurre porque la colección `offices` no tiene reglas de seguridad configuradas en Firestore.

## Solución Rápida

### Paso 1: Actualizar Reglas de Firestore

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. En el menú lateral, haz clic en **Firestore Database**
4. Haz clic en la pestaña **Rules** (Reglas)
5. **Busca esta sección** en las reglas existentes:

```javascript
match /medicalHistory/{id} {
  allow create: if signedIn();
  allow read, update, delete: if signedIn();
}
```

6. **Agrega DESPUÉS de esa sección** (antes del último `}`):

```javascript
match /offices/{id} {
  allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
  allow read, update, delete: if isOwner(resource.data.userId);
}
```

7. El resultado final debería verse así:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() { return request.auth != null; }
    function isOwner(userId) { return signedIn() && request.auth.uid == userId; }

    match /userProfiles/{userId} {
      allow read, write: if isOwner(userId);
    }
    match /patients/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
    match /appointments/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
    match /insurances/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
    match /authorizations/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
    match /insurance-fees/{id} {
      allow read: if signedIn();
      allow write: if signedIn() && request.resource.data.userId == request.auth.uid;
    }
    match /payments/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
    match /medicalHistory/{id} {
      allow create: if signedIn();
      allow read, update, delete: if signedIn();
    }
    match /offices/{id} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read, update, delete: if isOwner(resource.data.userId);
    }
  }
}
```

8. Haz clic en **"Publish"** (Publicar) para guardar los cambios

### Paso 2: Verificar que Funcionó

1. Recarga la página en tu navegador (F5)
2. El error **"Missing or insufficient permissions"** debería desaparecer
3. Deberías poder abrir el modal de Consultorios sin errores

## ¿Por qué pasó esto?

La colección `offices` es nueva en el sistema. Cuando agregamos nuevas colecciones a Firestore, también necesitamos agregar las reglas de seguridad correspondientes para permitir que los usuarios autenticados puedan leer y escribir datos.

Las reglas que agregamos:
- **create**: Solo usuarios autenticados pueden crear consultorios, y el `userId` debe coincidir con el usuario autenticado
- **read/update/delete**: Solo el dueño del consultorio (userId coincide) puede leerlo, actualizarlo o eliminarlo

## Próximo Paso: Probar Google Maps Autocomplete

Una vez que hayas actualizado las reglas y el error desaparezca:

1. Ve a la página de **Consultorios**
2. Haz clic en **"Agregar Consultorio"**
3. Abre la consola del navegador (F12)
4. Busca el mensaje: `✅ Autocomplete nativo inicializado correctamente`
5. Escribe en el campo de dirección (ej: "av corrientes")
6. Deberían aparecer **sugerencias de Google Places**

Si las sugerencias no aparecen, revisa [DIAGNOSTICO_GOOGLE_MAPS.md](DIAGNOSTICO_GOOGLE_MAPS.md) para más instrucciones.
