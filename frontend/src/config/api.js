// Si REACT_APP_API_URL viene definida (por ejemplo en .env.production, donde
// se usa una ruta relativa detrás de un reverse proxy) se respeta tal cual.
//
// Si NO viene definida (caso típico de desarrollo local), se arma
// automáticamente a partir del hostname con el que se abrió la página:
// - Si abres http://localhost:3000        -> backend en http://localhost:8000
// - Si abres http://127.0.0.1:3000        -> backend en http://127.0.0.1:8000
// - Si abres http://192.168.1.103:3000    -> backend en http://192.168.1.103:8000
//
// Así, la misma build funciona tanto desde el PC como desde el celular en la
// misma red, sin tener que editar el .env manualmente cada vez.
//
// Requisito: el backend debe iniciarse escuchando en todas las interfaces:
//   php artisan serve --host=0.0.0.0 --port=8000
const BACKEND_PORT = process.env.REACT_APP_API_PORT || 8000;

const resolveApiBaseUrl = () => {
    if (process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    }

    if (typeof window !== 'undefined' && window.location) {
        const { protocol, hostname } = window.location;
        return `${protocol}//${hostname}:${BACKEND_PORT}`;
    }

    return `http://127.0.0.1:${BACKEND_PORT}`;
};

export const API_BASE_URL = resolveApiBaseUrl();

// Genera un mensaje de error más útil para depurar problemas de red/CORS,
// mostrando la URL exacta que se intentó contactar. Muy útil en celular,
// donde no siempre es cómodo abrir la consola del navegador.
export const describeApiError = (error, fallbackMessage) => {
    const attemptedUrl = error?.config?.url || API_BASE_URL;

    if (error?.response) {
        // El servidor respondió, pero con un error (4xx/5xx)
        return `${fallbackMessage} (el servidor respondió con error ${error.response.status}).`;
    }

    if (error?.request) {
        // La petición se envió pero nunca hubo respuesta: típico de
        // firewall bloqueando el puerto, backend caído, o IP incorrecta.
        return `${fallbackMessage} No se pudo conectar con ${attemptedUrl}. Verifica que el backend esté corriendo con "php artisan serve --host=0.0.0.0 --port=8000", que el celular esté en la misma red WiFi que el PC, y que el Firewall de Windows permita conexiones entrantes al puerto 8000.`;
    }

    return `${fallbackMessage} (${error?.message || 'error desconocido'}).`;
};
