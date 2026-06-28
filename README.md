Instrucciones:

requerido:
php 8.3
composer (manejador de paquetes de php)
nodejs 22 LTS 

-en el php.ini verificar que esten habilitadas las extensiones (copiar y pegar este bloque si es necesario):

extension=zip
extension=curl
;extension=ffi
;extension=ftp
extension=fileinfo
;extension=gd
;extension=gettext
;extension=gmp
extension=intl
;extension=imap
extension=mbstring
;extension=exif      ; Must be after mbstring as it depends on it
extension=mysqli
;extension=oci8_12c  ; Use with Oracle Database 12c Instant Client
;extension=oci8_19  ; Use with Oracle Database 19 Instant Client
;extension=odbc
extension=openssl
;extension=pdo_firebird
extension=pdo_mysql
;extension=pdo_oci
;extension=pdo_odbc
;extension=pdo_pgsql
;extension=pdo_sqlite
;extension=pgsql
;extension=shmop

ir al directorio rifaNavidad\rifa y ejecutar composer install 
ejecutar copy .env.example .env (para crear el .env)
ejecutar php artisan key:generate

verificar que las configuraciones de la BD sean: 

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rifa
DB_USERNAME=root
DB_PASSWORD=

verificar que la BD rifa esté creada, importar el archivo sql de la carpeta modelo 

php artisan config:clear
php artisan cache:clear

correr el servidor con php artisan serve

ir al directorio rifaNavidad/vista y ejecutar npm install para instalar dependencias 
correr el front end con npm start
