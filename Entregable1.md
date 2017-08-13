# Definición del equipo, proyecto y aplicación

## a. Miembros del equipo y asignación de QA a miembros del equipo 

| Miembro | Atributo de calidad |
| --- | --- |
| Daniel Rendón Montaño | Disponibilidad |
| Laura Mejia Vasquez | Disponibilidad |
| Dillan Alexis Muñeton Avendaño | Rendimiento |
| Juan Fernando Ossa Vasquez | Seguridad |

## b. Selección de la aplicación basada en Proyecto1

Elegimos la aplicación de 2Tvideos, en primera instancia por democracia.
Otra de las razones por la que se eligió fue porque esta está desarrollada en NodeJS, y la mayoría los miembros del grupo (3 de 4) tienen conocimiento sobre dicha tecnología. Además, esta aplicación que se enfoca en el manejo y reproducción de videos, presenta un valor agregado, ya que se abre la posibilidad de innovar y mostrar nuevas formas de hacer esto en la actualidad.

### GitHub: https://github.com/lauramv21/2Tvideos
 
## c. Descripción de la aplicación 

La aplicación será una plataforma de ventas tipo red social. Donde cada usuario tendrá el rol de comprador y vendedor. 
Los usuarios podrán crear una cuenta o entrar por medio de una cuenta de Facebook o Google, a través de la cual podrá mostrar sus productos a través de videos (duración entre 30 segundos y 60 segundos), una descripción y las especificaciones técnicas del producto. 
Nuestra aplicación funcionará como un intermediario entre compradores y vendedores. Si un interesado desea comunicarse con el vendedor, podrá obtener la información sobre el contacto. Sin embargo, a través de la plataforma se manejará un sistema de “regateo”, es decir, un cliente podrá ofrecer una cantidad de dinero diferente a la que se ofrece por un determinado artículo, o incluso podrá ofrecer productos como medio de pago. En caso del vendedor aceptar la oferta, tendrá los datos de contacto del interesado para su negociación.
Las ventas NO se realizarán por medio de la aplicación. Ésta sólo conecta compradores y vendedores.
Las fuentes de ingreso de la página no estarán basadas en la venta o la publicación de los productos, sino que será opcional para los vendedores, pagar por el privilegio de ser los primeros resultados cuando los usuarios busquen ciertos productos. 
Igualmente, se podrá pagar por publicidad de promociones especiales.

## d. Requisitos Funcionales

* **RF1:** Debe permitir la creación, actualización y eliminación de las cuentas de usuarios.

* **RF2:** Debe permitir subir y eliminar productos(archivos de video)

* **RF3:** Debe permitir elegir el estado del contenido entre público y privado

* **RF4:** Debe permitir cambiar el estado del contenido (público a privado, y viceversa)

* **RF5:** Debe permitir la filtración de contenido (búsqueda por categoría)

* **RF6:** Debe permitir la navegación por todos los contenidos públicos subidos por todos los usuarios registrados.

* **RF7:** Debe permitir la visualización del contenido privado por parte del autor del mismo.

* **RF8:** Debe permitir la creación de usuarios mediante el uso de Facebook o Google.

* **RF9:** Debe permitir la interacción entre usuarios, permitiendo “regatear” o sea ofrecer dinero u otros productos como medio de pago por diferentes tipos de artículos.


## Detalles técnicos del proceso para la incorporación de la Gestión de Contenidos en el proyecto 2.

La aplicación correrá sobre un DCA de 2gb de RAM, 20gb de Disco duro y dos procesadores virtuales, además esta máquina virtual tendrá el sistema operativo CentOS 7.1
	
| SISTEMA OPERATIVO | LINUX CENTOS 7.1 |
| --- | --- |
| DIRECCIÓN IP SERVIDOR | 10.131.137.244 |
| LENGUAJE DE PROGRAMACIÓN | JavaScript / NodeJS |
| FRAMEWORK WEB - BACKEND | Express |
| FRAMEWORK WEB - FRONTEND (si aplica) | Templates de HTML |
| WEB APP SERVER | Embebido (Node) |
| WEB SERVER  | NGINX |
| BASE DE DATOS | MongoDB |
| GIT (CLI Y GUI) | GitHub | 
| PRUEBAS | Postman |
| OTROS QUE CONSIDERE | Ninguno |

Aplicación completa desplegada en el Data Center Académico. PARA  PROYECTO 2, no es requerido desplegarla en Nube PaaS.
	Esperando por servidor asignado por Edwin

