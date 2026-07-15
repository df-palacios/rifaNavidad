# Rifa Navideña

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

Iniciar el servidor:

php artisan serve

El backend quedará disponible en:

http://127.0.0.1:8000

---

## Configuración del Frontend (React)

Abrir otra terminal.

Ir al directorio:

cd frontend


Instalar dependencias:

npm install

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