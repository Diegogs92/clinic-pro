// Script de diagnóstico para Firebase Auth
// Solo para debugging, eliminar en producción

export function debugFirebaseAuth() {
  if (typeof window === 'undefined') return;

  console.group('🔍 Firebase Auth Debug Info');

  // Información del entorno
  console.log('Environment:', {
    hostname: window.location.hostname,
    origin: window.location.origin,
    protocol: window.location.protocol,
    port: window.location.port
  });

  // Configuración de Firebase
  console.log('Firebase Config:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10) + '...',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  });

  // URLs esperadas
  console.log('Expected OAuth Redirect URI:',
    `https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/__/auth/handler`
  );

  // Dominios que deberían estar autorizados
  console.log('Domains that should be authorized in Firebase:', [
    'localhost',
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    window.location.hostname
  ]);

  console.groupEnd();
}
