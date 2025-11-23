# Configuración de Firebase para Clinical App

## 📋 Reglas de Seguridad de Firestore

### Opción 1: Aplicar Reglas desde Firebase Console (Recomendado)

1. **Ve a Firebase Console:**
   - Abre https://console.firebase.google.com
   - Selecciona tu proyecto

2. **Navega a Firestore Database:**
   - En el menú lateral, haz clic en **Firestore Database**
   - Ve a la pestaña **Reglas** (Rules)

3. **Copia y pega las reglas:**
   - Abre el archivo `firestore.rules` de este proyecto
   - Copia TODO el contenido
   - Pégalo en el editor de reglas de Firebase Console

4. **Publica las reglas:**
   - Haz clic en **Publicar** (Publish)
   - Espera la confirmación

### Opción 2: Aplicar Reglas con Firebase CLI

Si tienes Firebase CLI instalado:

```bash
# Instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# Login a Firebase
firebase login

# Inicializar Firebase en el proyecto (solo la primera vez)
firebase init firestore

# Desplegar solo las reglas
firebase deploy --only firestore:rules
```

---

## 🔐 Explicación de las Reglas

Las reglas creadas garantizan que:

### ✅ Principios de Seguridad

1. **Autenticación requerida:** Solo usuarios autenticados pueden acceder
2. **Aislamiento por usuario:** Cada usuario solo ve sus propios datos
3. **Validación de datos:** Los documentos deben tener campos obligatorios
4. **Protección total:** Todas las colecciones no listadas están bloqueadas

### 📚 Colecciones Protegidas

| Colección | Permisos | Validación |
|-----------|----------|------------|
| `patients` | Solo dueño (userId) | Campo userId requerido |
| `appointments` | Solo dueño (userId) | Campo userId requerido |
| `payments` | Solo dueño (userId) | Todos los campos obligatorios |
| `insurances` | Solo dueño (userId) | Campo userId requerido |
| `authorizations` | Solo dueño (userId) | Campo userId requerido |
| `userProfiles` | Solo el usuario mismo | ID debe coincidir con auth.uid |
| `medicalHistory` | Solo dueño (userId) | Campo userId requerido |

### 🔒 Reglas Específicas para Payments

Para la colección `payments`, además de verificar autenticación y userId, se validan estos campos obligatorios:

- `patientId`
- `patientName`
- `amount`
- `method`
- `status`
- `date`
- `consultationType`
- `userId`
- `createdAt`
- `updatedAt`

---

## 🚀 Activar Firebase Real en la Aplicación

Una vez aplicadas las reglas de seguridad:

### 1. Edita `src/lib/firebase.ts`

Cambia esta línea:

```typescript
const FORCE_MOCK_MODE = true;  // ← Cambia a false
```

A:

```typescript
const FORCE_MOCK_MODE = false;
```

### 2. Verifica las Variables de Entorno

Asegúrate de que tu proyecto tiene configuradas las variables en Vercel:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3. Deploy

```bash
git add .
git commit -m "Enable Firebase real mode"
git push
vercel --prod
```

---

## 🧪 Probar las Reglas

### Desde Firebase Console:

1. Ve a **Firestore Database** → **Reglas**
2. Haz clic en **Simulador de Reglas** (Rules Playground)
3. Prueba operaciones de lectura/escritura

### Desde la Aplicación:

1. Inicia sesión en la app
2. Intenta crear un pago
3. Verifica en Firebase Console → Firestore Database que se creó el documento
4. Los logs de consola deben mostrar:
   ```
   [createPayment] Modo Firestore
   [createPayment] Pago guardado en Firestore: {id}
   ```

---

## ⚠️ Troubleshooting

### Error: "Missing or insufficient permissions"

**Causa:** Las reglas no están aplicadas o el usuario no está autenticado.

**Solución:**
1. Verifica que publicaste las reglas en Firebase Console
2. Asegúrate de estar autenticado en la app
3. Revisa que `request.auth.uid` coincida con `userId` en los documentos

### Error: "Document does not exist"

**Causa:** Intentando actualizar un documento que no existe.

**Solución:**
1. Primero crea el documento con `create`
2. Luego actualiza con `update`

### Los datos no aparecen

**Causa:** Posible problema de índices o filtros.

**Solución:**
1. Ve a Firebase Console → Firestore Database
2. Revisa la pestaña **Índices** (Indexes)
3. Crea índices compuestos si se requieren

---

## 📊 Índices Recomendados

Para mejorar el rendimiento, crea estos índices compuestos en Firestore:

### Payments
- Campos: `userId` (Ascending), `date` (Descending)
- Campos: `userId` (Ascending), `status` (Ascending), `date` (Descending)

### Appointments
- Campos: `userId` (Ascending), `date` (Ascending), `startTime` (Ascending)
- Campos: `userId` (Ascending), `status` (Ascending), `date` (Ascending)

### Authorizations
- Campos: `userId` (Ascending), `status` (Ascending)
- Campos: `userId` (Ascending), `patientId` (Ascending)

**Cómo crear índices:**
1. Firebase Console → Firestore Database → Índices
2. Haz clic en **Crear índice**
3. Selecciona la colección y campos
4. Establece el orden (Ascending/Descending)
5. Haz clic en **Crear**

---

## 🔄 Migración de Datos Mock a Firebase

Si tienes datos en localStorage (modo mock) y quieres migrarlos a Firebase:

1. Exporta los datos desde localStorage:
   ```javascript
   // En la consola del navegador
   const payments = JSON.parse(localStorage.getItem('clinic-pro-mock-payments'));
   console.log(JSON.stringify(payments, null, 2));
   ```

2. Importa a Firestore usando Firebase Console o un script

3. Limpia localStorage:
   ```javascript
   localStorage.removeItem('clinic-pro-mock-payments');
   ```

---

## 📝 Notas Importantes

- **Backup:** Firebase Firestore tiene backup automático, pero configura exports periódicos
- **Costos:** Revisa los límites del plan gratuito de Firebase
- **Seguridad:** NUNCA expongas las reglas que permitan acceso sin autenticación en producción
- **Auditoría:** Usa Firebase Console para monitorear el uso y detectar accesos anómalos
