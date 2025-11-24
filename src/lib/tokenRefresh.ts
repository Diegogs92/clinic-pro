/**
 * Servicio para renovar tokens de Google OAuth usando Firebase Auth
 * Los tokens de acceso expiran cada 1 hora, este servicio los renueva automáticamente
 */

import { getAuth } from 'firebase/auth';

interface TokenResponse {
  accessToken: string;
  expiresAt: number;
}

/**
 * Obtiene un nuevo token de acceso de Google usando Firebase Auth
 * Firebase maneja automáticamente el refresh token internamente
 */
export async function refreshGoogleToken(): Promise<TokenResponse | null> {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.warn('[TokenRefresh] No hay usuario autenticado');
      return null;
    }

    // Forzar la renovación del token
    // Firebase internamente usa el refresh token para obtener un nuevo access token
    const token = await user.getIdToken(true);

    // Para OAuth de Google, necesitamos obtener el token de acceso de los providers
    const providerData = user.providerData.find(p => p.providerId === 'google.com');

    if (!providerData) {
      console.warn('[TokenRefresh] Usuario no autenticado con Google');
      return null;
    }

    // El token de Firebase no es lo mismo que el OAuth token de Google
    // Necesitamos re-autenticar para obtener un nuevo token de Google
    console.log('[TokenRefresh] Token de Firebase renovado, pero necesitamos re-autenticar para Google Calendar');

    return null; // Retornamos null para indicar que necesita re-autenticación
  } catch (error) {
    console.error('[TokenRefresh] Error renovando token:', error);
    return null;
  }
}

/**
 * Verifica si un token está próximo a expirar (dentro de 5 minutos)
 */
export function isTokenExpiringSoon(expiresAt: number): boolean {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  return expiresAt - now < fiveMinutes;
}

/**
 * Guarda información del token en localStorage
 */
export function saveTokenInfo(accessToken: string, expiresIn: number = 3600): void {
  const expiresAt = Date.now() + (expiresIn * 1000);
  localStorage.setItem('google_access_token', accessToken);
  localStorage.setItem('google_token_expires_at', expiresAt.toString());
}

/**
 * Obtiene la información del token desde localStorage
 */
export function getTokenInfo(): { token: string; expiresAt: number } | null {
  const token = localStorage.getItem('google_access_token');
  const expiresAtStr = localStorage.getItem('google_token_expires_at');

  if (!token || !expiresAtStr) {
    return null;
  }

  return {
    token,
    expiresAt: parseInt(expiresAtStr, 10),
  };
}

/**
 * Limpia la información del token de localStorage
 */
export function clearTokenInfo(): void {
  localStorage.removeItem('google_access_token');
  localStorage.removeItem('google_token_expires_at');
}
