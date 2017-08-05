# 2Tvideos
By: Laura Mejía Vásquez - lmejiav6@eafit.edu.co

# 1. Descripción de aplicación

* Sistema que permite la gestión de videos.
* El acceso para la visualización del contenido será necesario tener una cuenta por parte de los usuarios.
* Estos usuarios están en la capacidad de crear, actualizar y eliminar su cuenta.
* Una vez ingresen a la plataforma pueden subir archivos de video decidiendo si el contenido será público (disponible
para todos), o privado (unicamente disponbile para el autor del contenido). Existe la opción de cambiar el estado
del video de público a privado y viceversa. Cuando se agrega un nuevo video se pondrán obtener los metadatos del mismo.
* Existen 2 tipos de navegación: la primera es una general en la cual se observará el contenido público subido por todos
los usuarios registrados, y la segunda una búsqueda mediante la cual se filtrá el contenido por usuario.
* Cuando el usuario haya finalizado su navegación, podrá finalizar su sesión.

# 2. Análisis

## 2.1 Requisitos funcionales:

1. Debe permitir la creación, actualización y eliminación de las cuentas de usuarios.
2. Debe permitir iniciar y finalizar la sesión de los usuarios en la plataforma.
3. Debe permitir subir y eliminar contenido (archivos de video).
4. Debe permitir diferenciar el estado del contenido entre público y privado.
5. Debe  permitir la filtración de contenido (búsqueda por usuarios).
6. Debe permitir la navegación general por todos los contenidos públicos subidos por todos los usuarios registrados.
7. Debe permitir la visualización del contenido privado por parte del autor del mismo.


## 2.2 Definición de tecnología de desarrollo y ejecución para la aplicación:

* Lenguaje de Programación: Javascript
* Framework web backend: NodeJS - Express
* Framework web frontend: No aplica, se utilizarán Templates HTML
* Base de datos: MongoDB
* Web App Server: NodeJS
* Web Server: NGINX



## Ambiente de Desarrollo, Pruebas y Producción:

## Desarrollo:

## Pruebas

en el DCA:

1. se instala nvm local para el usuario

source: https://www.liquidweb.com/kb/how-to-install-nvm-node-version-manager-for-node-js-on-centos-7/

2. se instala la version de node:

    $ nvm install v7.7.4

3. se instala el servidor mongodb

como root:

    # yum install mongodb-server -y

ponerlo a correr:

    # systemctl enable mongod
    # systemctl start mongod


lo instala de los repositorios propios de Centos.

tambien lo puede instalar de un repo de mongodb:

ver pág: https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/

# 3. Diseño:

## 3.1 Modelo de datos:

    File:

    {
        username: String,
        title: String,
        description: String,
        video: String,
        privateFile: String
    }

    User:

    {
        name: String,
        lastname: String,
        username: String,
        password: String
    }

## 3.2 Servicios Web


     /* Servicio Web: Entrada al formato de Registro de usuarios.
          Método: GET
          URI: /registro
     */

     /* Servicio Web: Entrada al formato de Inicio de sesión.
          Método: GET
          URI: /ingresar
     */

     /* Servicio Web: Finaliza la sesión actual y redirige al formato de Inicio de sesión.
          Método: GET
          URI: /salir
     */

     /* Servicio Web: Busca y muestra los datos del usuario en la Base de datos.
          Método: GET
          URI: /cuenta
     */

     /* Servicio Web: Entrada al formato de subir un archivo.
          Método: GET
          URI: /publicar
     */

     /* Servicio Web: Busca y muestra todos los videos en estado publico subidos por los usuarios
                      en la Base de datos.
          Método: GET
          URI: /videos
     */

     /* Servicio Web: Despliega la lista de archivos subidos por el usuario en la sesión actual.
          Método: GET
          URI: /misvideos
     */

     /* Servicio Web: Entrada al formato de actualización de los datos de la publicación.
          Método: GET
          URI: /editar/:id
     */

    /* Servicio Web: Inserta un Nuevo Usuario en la Base de datos
      Método: POST
      URI: /registrando
    */

    /* Servicio Web: Realiza la autenticación del usuario para ingresar.
      Método: POST
      URI: /ingresando
    */

     /* Servicio Web: Almacena en la base de datos la referencia al video junto con sus atributos.
          Método: POST
          URI: /publicando
     */

    /* Servicio Web: Modifica la contraseña en la Base de datos.
      Método: POST
      URI: /cambiarClave
    */

    /* Servicio Web: Modifica los datos del usuario en la Base de datos.
      Método: POST
      URI: /actualizarDatos
    */

    /* Servicio Web: Elimina el usuario y sus archivos de la Base de datos.
      Método: POST
      URI: /eliminarCuenta
    */

     /* Servicio Web: Filtra los videos públicos por usuario y los muestra.
          Método: POST
          URI: /buscar
     */


# 4. Desarrollo:

# 5. Implementación o Despliegue (DCA y PaaS):

5.1 despliegue en el data center academico (DCA):

se instala un manejador de procesos de nodejs, se instala: PM2 (http://pm2.keymetrics.io/)

    emontoya$ npm install -g pm2
    emontoya$ cd articulosEM
    emontoya$ pm2 start app.ps
    emontoya$ pm2 list

ponerlo como un servicio, para cuando baje y suba el sistema:

    emontoya$ pm2 startup systemd

abrir los puertos en el firewall que utilizara la app:

    # firewall-cmd --zone=public --add-port=3000/tcp --permanent
    # firewall-cmd --reload
    # firewall-cmd --list-all

como medida desesperada, puede parar y desactivar el firewalld, cosa que no es recomendable:

    # systemctl stop firewalld
    # systemctl disable firewalld
    # systemctl start firewalld


Instalar NGINX:

    # yum install -y nginx

    # systemctl enable nginx
    # systemctl start nginx

Abrir el puerto 80

    # firewall-cmd --zone=public --add-port=80/tcp --permanent
    # firewall-cmd --reload

MUY MUY IMPORTANTE: Deshabilitar SELINUX

    # vim /etc/sysconfig/selinux

          SELINUX=disabled

    # reboot


