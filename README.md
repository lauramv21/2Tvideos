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
