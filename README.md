# Rifa Navideña

## ⚠️ Problema típico: "Error al verificar los premios" solo en el celular

Si en el **PC funciona bien** pero desde el **celular** aparece "Error al
verificar los premios disponibles" o "Error al reiniciar la base de datos",
casi siempre es una de estas dos causas (en Windows):

1. **El backend no está escuchando en la red, solo en el propio PC.**
   Debe iniciarse así (no solo `php artisan serve`):

   ```
   php artisan serve --host=0.0.0.0 --port=8000
   ```

2. **El Firewall de Windows está bloqueando el puerto 8000** para
   conexiones entrantes desde otros dispositivos (el celular). Aunque el
   backend ya escuche en `0.0.0.0`, Windows puede seguir bloqueando el
   tráfico entrante de otros equipos de la red hasta que se lo permitas
   explícitamente. Para permitirlo, abre PowerShell **como administrador**
   y ejecuta:

   ```powershell
   New-NetFirewallRule -DisplayName "Laravel 8000" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
   ```

   (Si prefieres la interfaz gráfica: Panel de Control → Firewall de
   Windows Defender → Configuración avanzada → Reglas de entrada → Nueva
   regla → Puerto → TCP → 8000 → Permitir la conexión.)

3. **Verifica que el celular esté en la misma red WiFi que el PC** (no en
   datos móviles/4G). Si el celular usa datos móviles, nunca podrá alcanzar
   la IP local del PC (ej. `192.168.1.103`), sin importar lo anterior.

**Cómo comprobar rápido cuál es el problema:** abre directamente
`http://TU_IP_LOCAL:8000/api/premios` en el navegador del celular (sin pasar
por el frontend). Si esa URL tampoco carga, el problema es de red/firewall,
no de la aplicación.

---

## Requisitos

- PHP 8.3
- Composer
- Node.js 22 LTS
- MySQL

---

## Configuración de PHP

Verifique que las siguientes extensiones estén habilitadas en php.ini:

extension=curl
extension=fileinfo
extension=mbstring
extension=mysqli
extension=openssl
extension=pdo_mysql
extension=zip


---

## Base de datos

1. Crear una base de datos llamada:

rifa


2. Importar el archivo:

database/rifa.sql

---

## Configuración del Backend (Laravel)

Ir al directorio:

cd backend

Instalar dependencias:

composer install

Crear el archivo .env:

copy .env.example .env

Generar la clave de la aplicación:

php artisan key:generate

Verificar que el archivo .env tenga la siguiente configuración:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rifa
DB_USERNAME=root
DB_PASSWORD=


Limpiar la caché de configuración:

php artisan optimize:clear

Iniciar el servidor **escuchando en todas las interfaces de red** (necesario
para poder probar tanto desde el mismo computador como desde el celular en la
misma red WiFi):

php artisan serve --host=0.0.0.0 --port=8000

El backend quedará disponible en:

http://127.0.0.1:8000 (desde el propio computador)
http://TU_IP_LOCAL:8000 (desde otros dispositivos en la misma red, ej. `http://192.168.1.103:8000`)

> Puedes ver tu IP local con `ipconfig` (Windows) o `ifconfig` / `ip addr`
> (Mac/Linux). Windows puede pedir permitir el puerto 8000 en el Firewall la
> primera vez.
>
> Si en cambio inicias el backend solo con `php artisan serve` (sin
> `--host=0.0.0.0`), Laravel escuchará **únicamente** en `127.0.0.1`, y
> cualquier otro dispositivo (incluido tu propio celular, o el navegador
> apuntando a tu IP de red) no podrá conectarse — vas a ver errores como
> "Error al verificar los premios disponibles" o "Error al reiniciar la base
> de datos".

---

## Configuración del Frontend (React)

Abrir otra terminal.

Ir al directorio:

cd frontend


Instalar dependencias:

npm install

El frontend detecta automáticamente la URL del backend según el host desde
el que lo abras (no hace falta editar `frontend/.env`):

- Si abres `http://localhost:3000` → llama al backend en `http://localhost:8000`.
- Si abres `http://127.0.0.1:3000` → llama al backend en `http://127.0.0.1:8000`.
- Si abres `http://192.168.1.103:3000` (desde el celular) → llama al backend
  en `http://192.168.1.103:8000`.

Esto solo funciona si el backend se inició con `--host=0.0.0.0` como se indicó
arriba. Si necesitas forzar una URL de backend distinta, puedes definir
`REACT_APP_API_URL` en `frontend/.env` (ver el archivo, trae la instrucción
comentada) y reiniciar `npm start`.

Iniciar la aplicación:

npm start

El frontend quedará disponible en:

http://localhost:3000


---

## Usuarios de prueba

Para realizar pruebas utilice identificaciones impares entre **1 y 99**.

Ejemplos:

1
3
5
7
...
99


Las identificaciones pares están deshabilitadas intencionalmente para facilitar las pruebas.

---

## Tecnologías

- React (Create React App)
- Laravel
- MySQL
- Axios