/**
 * URL del portafolio (virtual-cv) para el botón "Volver al Portafolio".
 *
 * Igual que en `api.js`, la URL se deduce del host con el que se abrió la
 * página, así funciona tanto desde el PC como desde el celular en la
 * misma red WiFi, sin editar nada:
 *
 *   http://localhost:3000        -> http://localhost:5173
 *   http://192.168.1.103:3000    -> http://192.168.1.103:5173
 *
 * En producción se usa el dominio real.
 *
 * Se puede forzar con REACT_APP_PORTFOLIO_URL en el .env.
 */

// Puerto por defecto de Vite, que es lo que usa virtual-cv en desarrollo.
const PORTFOLIO_DEV_PORT = process.env.REACT_APP_PORTFOLIO_PORT || 5173;

const PRODUCTION_URL = 'https://dfpalacios.cloud';

function resolvePortfolioUrl() {
  if (process.env.REACT_APP_PORTFOLIO_URL) {
    return process.env.REACT_APP_PORTFOLIO_URL;
  }

  if (typeof window !== 'undefined' && window.location) {
    const { protocol, hostname } = window.location;

    // En desarrollo (localhost o IP de red local) apuntamos al Vite local.
    const isLocal =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      /^\d+\.\d+\.\d+\.\d+$/.test(hostname);

    if (isLocal) {
      return `${protocol}//${hostname}:${PORTFOLIO_DEV_PORT}`;
    }
  }

  return PRODUCTION_URL;
}

export const PORTFOLIO_URL = resolvePortfolioUrl();
