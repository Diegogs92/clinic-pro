# 🚀 Guía Rápida: Activar Firebase Real

## ⏱️ Tiempo estimado: 5 minutos

---

## Paso 1️⃣: Aplicar Reglas de Seguridad en Firebase Console

### 📍 Ve a Firebase Console

1. Abre: **https://console.firebase.google.com**
2. Selecciona tu proyecto: **clinical** (o el nombre que le hayas dado)

### 📝 Copia las Reglas

1. Abre el archivo [`firestore.rules`](./firestore.rules) de este proyecto
2. Selecciona TODO el contenido (Ctrl+A)
3. Copia (Ctrl+C)

### 🔒 Pega las Reglas en Firebase

1. En Firebase Console, menú lateral → **Firestore Database**
2. Haz clic en la pestaña **Reglas** (o **Rules**)
3. Borra todo el contenido actual
4. Pega las nuevas reglas (Ctrl+V)
5. Haz clic en **Publicar** (o **Publish**)
6. ✅ Espera el mensaje de confirmación

---

## Paso 2️⃣: Activar Modo Firebase en el Código

### 📂 Edita `src/lib/firebase.ts`

Busca esta línea (línea 9):

```typescript
const FORCE_MOCK_MODE = true;
```

Cámbiala a:

```typescript
const FORCE_MOCK_MODE = false;
```

### 💾 Guarda el archivo (Ctrl+S)

---

## Paso 3️⃣: Probar Localmente

### 🧪 En tu navegador local

1. Abre http://localhost:3001 (o el puerto que estés usando)
2. Abre la consola del navegador (F12)
3. Intenta registrar un pago
4. Deberías ver en la consola:
   ```
   [createPayment] Modo Firestore
   [createPayment] Pago guardado en Firestore: {id}
   ```
5. ✅ Si no hay errores, ¡funciona!

### 🔍 Verifica en Firebase Console

1. Ve a Firebase Console → **Firestore Database** → **Datos**
2. Busca la colección **`payments`**
3. Deberías ver tu nuevo pago guardado

---

## Paso 4️⃣: Deploy a Producción

### 🚀 Comandos

```bash
git add .
git commit -m "Enable Firebase real mode with security rules"
git push
vercel --prod
```

### ✅ Verifica el Deploy

1. Abre tu URL de producción
2. Prueba registrar un pago
3. Verifica en Firebase Console que se guardó

---

## 🎉 ¡Listo!

Tu aplicación ahora usa Firebase real con:
- ✅ Reglas de seguridad configuradas
- ✅ Solo usuarios autenticados pueden acceder
- ✅ Cada usuario solo ve sus propios datos
- ✅ Validación de campos obligatorios
- ✅ Protección contra accesos no autorizados

---

## ⚠️ Si algo falla

### Error: "Missing or insufficient permissions"

**Posible causa:** Las reglas no se publicaron correctamente

**Solución:**
1. Vuelve a Firebase Console → Firestore Database → Reglas
2. Verifica que las reglas estén publicadas
3. Asegúrate de estar autenticado en la app

### Los datos no aparecen

**Posible causa:** Los índices de Firestore no están creados

**Solución:**
1. Ve a Firebase Console → Firestore Database
2. Haz clic en la pestaña **Índices**
3. Crea un índice compuesto:
   - Colección: `payments`
   - Campo 1: `userId` (Ascending)
   - Campo 2: `date` (Descending)

### Ver documentación completa

Lee [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md) para información detallada.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de la consola del navegador
2. Revisa los logs de Firebase Console
3. Verifica las variables de entorno en Vercel
