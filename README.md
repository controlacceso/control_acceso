# ContolFid

######Control de acceso/asistencia 

## Descripción

Proyecto de fin de curso 2014-2016 del ciclo formativo de desarrollo de aplicaciones web

En éste proyecto, hemos creado una empresa temporal, la cual se dedica mediante tecnologías de hoy en día al control de asistencia/acceso en cualquier entorno mediante un dispositivo electrónico y una aplicación web.

En el siguente apartado se detallan los pasos a seguir para la implementación de nuestra aplicación.

* * *

[Web ControlFid](http://controlfid.zubirimanteoweb.com)  

* * *

## Documentación

Primeramente descargar el código desde éste repositorio, acceder a él desde la línea de comandos y ejecutar 'npm install' para instalar los módulos necésarios para el funcionamiento. [Guía de instalación de NodeJS y npm](https://github.com/ionatibia/nodejs)  
Para poner en marcha la aplicación ejecutar "node ./bin/www.js".

### Dispositivo

El dispositivo utilizado en éste proyecto ha sido diseñado por alumnos de Don Bosco, pero en éste documento se detalla como hacerlo con un dispositivo Arduino o sin ningún dispositivo.

*	Sin dispositivo: Podemos utilizar cualquier REST client como [PostMan para Chrome](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) o [REST Client para Android](https://play.google.com/store/apps/details?id=com.sourcestream.android.restclient&hl=es). La dirección GET en ambos casos, para el cambio de presencia es 'http://'donde este alojada la aplicación'/presencia?num_tarjeta='número de tarjeta'&room='numero dispositivo''.
Es posible añadir '&time='00:00:00'' si no se añade, utilizará la hora del sistema.

*  Arduino

	*	Materiales: 
		*	[Placa arduino UNO](https://www.google.es/search?sourceid=chrome-psyapi2&ion=1&espv=2&ie=UTF-8&q=arduino%20UNO&oq=arduino%20UNO&aqs=chrome..69i57j0l5.2722j0j7)
		*	[Ethernet shield](https://www.google.es/search?sourceid=chrome-psyapi2&ion=1&espv=2&ie=UTF-8&q=ethernet%20shield%20arduino&oq=ethernet%20shield%20&aqs=chrome.1.69i57j0l5.4435j0j9)
		*	[RFID rc522](https://www.google.es/search?espv=2&q=arduino+rfid+rc522&oq=arduino+rfi&gs_l=serp.1.1.0l10.26130.28270.0.30137.11.11.0.0.0.0.116.913.7j3.10.0....0...1c.1.64.serp..1.10.910.z9XDkjYuEvo)

	*	Conexiones:
		*	RFID:
			*	SDA -> pin7
			*	SCK -> pin13
			*	MOSI -> pin11
			*	MISO -> pin12
			*	GND -> GND
			*	RST -> pin9
			*	3.3V -> 3.3V
		*	LEDs:
			*	Verde -> pin2
			*	Amarillo -> pin3
			*	Rojo -> pin4
			*	Resistencias de 220 Ohm

	*	Código:
		*	Descargar el código desde el [repositorio](https://github.com/ionatibia/Arduino_Proyects/tree/master/proyecto27_Controlfid_V1).
		*	Sustituir el nombre del servidor de la línea 29 por el vuestro o la IP
		*	Comprobar con el monitor serie de Arduino el número de las tarjetas y añadirlas a la base de datos de la aplicación

	![Sin titulo](public/images/arduino.jpg)


### Base de datos

*   **MySQL:** Importar base de datos mediante phpMyAdmin o línea de comandos a MySQL local o en la nube. Hay 2 opciones:
    1.  Cotrolfid.sql: Contiene datos de alumnos, clases, profesores, etc... preinsertados para una utilización rápida de la aplicación. **Las contraseñas** de los profesores son como usuario profesor(1-5)@zubirimanteo.com y como contraseña para todos su correspondiente profesor(1-5).
    2.  ControlfidVacio.sql: Contiene 1 único usuario con permisos de administrador para tener el esquema vacio e ir configurándolo a gusto del consumidor (seguir pasos del apartado Uso). Ususario: admin pasword: admin.

*   **Conexión en local:** Modificar los parámetros que están entre comillas simples en el archivo 'models/connection.js' host,puerto,usuario,contraseña, el nombre de la base de datos no es necesario modificar.
*   **Openshift:** No hay que modificar nada.
*   **Cloud 9:** Comentar el código existente y descomentar el segundo código en el archivo 'models/connection.js'.

*   **Mongo:** Crear una cuenta en MongoLabs o utilizar servidor Mongo local. Crear una Collection llamada 'faltas' y modificar la dirección del servidor mongo (@ds059215.mongolab.com:59215/faltas) en el archivo 'models/mongo.js'. Para el usuario y la contraseña guardarlos en variables de entorno con los nombres, MONGO_USER y MONGO_PASSWORD. [Guía Openshift](https://developers.openshift.com/en/managing-environment-variables.html). En local utilizar en la llamada a la aplicación "MONGO_USER='el usuario' MONGO_PASSWORD='el password' node ./bin/www.js"

### Correo

*   **Maigun:** Crear cuenta en Mailgun, guardar el dominio y la ApiKey como variables de entorno con los nombres MAILGUN_DOMAIN y MAILGUN_API_KEY. Para la configuración del correo con el dominio [acceder aquí](https://github.com/ionatibia/php/tree/master/tests/3-mailgun)


###Uso

####Login

Iniciamos la aplicación y en el login insertamos el usuario y la contraseña. Si el usuario y la contraseña son correctos accederemos a la aplicación. Hay dos tipos de acceso: Profesor y administrador. Para acceder como profesor solamente tenemos que introducir el usuario y la contraseña del profesor. Para acceder como administrador en cambio tenemos que introducir un usuario que sea administrador y hacer click en el botón "Entrar como administrador". Depende del tipo de acceso que hagamos accederemos a diferente paginas. Si accedemos como profesor nos dirigiremos a la pagina vista profesor, en cambio si accedemos como administrador nos dirigiremos a la página de configuración de la aplicación.

####Vista Profesor

En esta página el profesor podrá ver los alumnos que tiene en la clase actual con su foto y datos correspondientes. Los alumnos aparecerán en colores diferentes dependiendo si están en clase o no. Si están en clase el alumno aparecerá en verde, si no esta aparecerá en rojo y al final de la clase ese alumno tendrá una falta. En esta página el profesor también podrá consultar su horario haciendo click en el botón Horario. Como en toda la aplicación el profesor tiene un buscador de personas para saber donde se encuentra el alumno o profesor y en el mismo se puede buscar de diferentes modos: DNI, nombre apellidos y correo electrónico. Si el profesor tiene alguna duda o necesita contactar con el administrador tiene un botón en la parte inferior de la página para mandar un mensaje. También en la parte inferior derecha de la página tiene un botón para salir de la aplicación. Si el profesor tiene permisos de administrador podrá acceder desde vista profesor a la configuración.


####Configuracion

En esta página el usuario podrá administrar la aplicación. Cuando accedemos a la página vemos todas las aulas que hay en el colegio. Al hacer click en una aula, si hay clase nos redirigirá a la clase y veremos la vista del profesor. Si no hay clase nos aparecerá un mensaje advirtiéndonos que en esa aula no hay ninguna clase.
En la parte superior de la página vemos que hay un menú. Desde ese menú podemos acceder a diferentes páginas para administrar nuestra aplicación. Este menú está en todas las páginas que componen la configuración. Las páginas a las que podemos acceder son:


	- Modifiar Falta
	- Dispositivos
	- Global
		- Asignaturas
			-	Agregar Asignatura
			-   Modificar Asignatura
		- Grupos
			-	Agregar Grupos
			-   Modificar Grupos		
		- Aulas
			-	Agregar Aulas
			-   Modificar Aulas		
		- Horario Grupo
			-	Agregar Horario Grupo
			-   Modificar Horario Grupo		
		- Horario Profesor
			-	Agregar Horario Profesor
			-   Modificar Horario Profesor
	- Personas
		- Alumno
			-	Agregar Alumno
			-   Modificar Alumno	
		- Profesor
			-	Agregar Profesor
			-   Modificar Profesor				

#####Modificar Falta

En esta página podemos modificar la falta. 
Cuadro abrimos la pagina aparece un buscador de faltas, escribimos el nombre del alumno y hacemos click en la falta. Al hacer click se abre otro formulario con los datos de la falta para modificar. Los campos que se pueden modificar son el alumno y la observación de la falta. Esta comprobado que no se pueda modificar la falta igual que una ya existente. Al finalizar la modificación hacemos click en modificar si queremos modificar la falta, si queremos borrar la falta hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "falta modificada correctamente" y si borramos la falta aparece el recuerdo con el texto "falta borrada correctamente" en los dos casos nos redirigirá a la página de configuración.


#####Dispositivos

En esta página aparecen los dispositivos que tenemos. Se pueden añadir haciendo click en el botón añadir y seleccionando el aula donde está el dispositivo y el número que tiene el dispositivo. También podemos borrar el dispositivo haciendo click en el botón borrar que está debajo del dispositivo.

#####Global

######Asignaturas

Agregar Asignatura

En esta página añadimos una asignatura a la base de datos. Rellenamos los campos del formulario y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "asignatura añadida correctamente" y nos redirigirá a la página de configuración. Este comprobado que no se pueda añadir una clave de una asignatura ya existente y que el campo nombre tiene que ser solo letras.

Modificar Asignatura

En esta página podemos modificar la asignatura. 
Cuando abrimos la página aparece un buscador de asignaturas, escribimos el nombre de la asignatura y hacemos click en la asignatura. Al hacer click se abre otro formulario con los datos de la asignatura para modificar. Se pueden modificar todos los campos excepto el campo id asignatura. Esta comprobado que no se pueda modificar la clave de la asignatura con una ya existente. Al finalizar la modificación hacemos click en modificar si queremos modificar la asignatura, si queremos borrar la falta hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "asignatura modificada correctamente" y si borramos la falta aparece el recuerdo con el texto "asignatura borrada correctamente" en los dos casos nos redirigirá a la página de configuración.


######Grupos

Agregar Grupo

En esta página añadimos un grupo a la base de datos. Rellenamos los campos del formulario y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "grupo añadida correctamente" y nos redirigirá a la página de configuración. Esta comprobado que no se pueda añadir un nombre de grupo ya existente.

Modificar Grupo

En esta página podemos modificar el grupo. 
Cuando abrimos la página aparece un buscador de grupos, escribimos el nombre del grupo y hacemos click en el grupo. Al hacer click se abre otro formulario con los datos del Grupo para modificar. Se pueden modificar todos los campos excepto el campo id Grupo. Esta comprobado que no se pueda modificar el nombre del grupo con uno ya existente. Al finalizar la modificación hacemos click en modificar si queremos modificar el grupo, si queremos borrar el grupo hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "Grupo modificado correctamente" y si borramos el grupo aparece el recuerdo con el texto "Grupo borrado correctamente" en los dos casos nos redirigirá a la página de configuración.


######Aulas

Agregar Aula

En esta página añadimos un aula a la base de datos. Rellenamos los campos del formulario y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "aula añadida correctamente" y nos redirigirá a la página de configuración. Este comprobado que no se pueda añadir un número de aula ya existente, que el campo número no puede ser mayor a 250, que el campo piso no puede ser mayor a 3 y que el campo capacidad no puede ser mayor a 30.

Modificar Aula

En esta página podemos modificar el aula. 
Cuando abrimos la página aparece un buscador de aulas, escribimos el número del aula y hacemos click en el aula. Al hacer click se abre otro formulario con los datos del aula para modificar. Se pueden modificar todos los campos excepto el campo id aula. Esta comprobado que no se pueda modificar la clave de la aula con una ya existente, que el campo numero no puede ser mayor a 250, que el campo piso no puede ser mayor a 3 y que el campo capacidad no puede ser mayor a 30.al finalizar la modificación hacemos click en modificar si queremos modificar el aula, si queremos borrar el aula hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "aula modificada correctamente" y si borramos el aula aparece el recuerdo con el texto "aula borrada correctamente" en los dos casos nos redirigirá a la página de configuración.


######Horario Grupo

Agregar Horario Grupo

En esta página añadimos un horario de un grupo a la base de datos. Rellenamos los campos del formulario y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "horario grupo añadido correctamente" y nos redirigirá a la página de configuración. Esta comprobado que no se pueda añadir un horario grupo ya existente y que el campo hora inicio no puede ser mayor a el campo hora final.

Modificar Horario Grupo

En esta página podemos modificar el horario de un grupo. 
Cuando abrimos la página aparece un buscador de horario grupos, escribimos el nombre del grupo y hacemos click en el horario del grupo. Al hacer click se abre otro formulario con los datos del horario del grupo para modificar. Se pueden modificar todos los campos excepto el campo id horario grupo. Esta comprobado que no se puedan modificar los campos como un horario grupo ya existente y que el campo hora inicio no puede ser mayor a el campo hora final. Al finalizar la modificación hacemos click en modificar si queremos modificar el horario del grupo, si queremos borrar el horario del grupo hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "horario grupo modificado correctamente" y si borramos el horario del grupo aparece el recuerdo con el texto "horario grupo borrado correctamente" en los dos casos nos redirigirá a la página de configuración.


######Horario Profesor

Agregar Horario Profesor

En esta página añadimos un horario de un profesor a la base de datos. Seleccionamos el id horario grupo y el profesor y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "horario Profesor añadido correctamente" y nos redirigirá a la página de configuración. Esta comprobado que no se pueda añadir un horario profesor ya existente.

Modificar Horario Profesor

En esta página podemos modificar el horario de un profesor. 
Cuando abrimos la página aparece un buscador de horarios de profesores, escribimos el nombre del profesor y hacemos click en el horario profesor. Al hacer click se abre otro formulario con los datos del horario profesor para modificar. Solo se puede modificar el campo del profesor. Esta comprobado que no se pueda modificar los campos como un horario profesor ya existente. Al finalizar la modificación hacemos click en modificar si queremos modificar el horario profesor, si queremos borrar el horario profesor hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "horario profesor modificado correctamente" y si borramos el horario profesor aparece el recuerdo con el texto "horario profesor borrado correctamente" en los dos casos nos redirigirá a la página de configuración.


#####Personas

######Alumno

Agregar Alumno

En esta página añadimos un Alumno a la base de datos. Rellenamos todos los campos y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "alumno añadido correctamente" y nos redirigirá a la página de configuración. Este comprobado que no se pueda añadir un DNI, correo, número tarjeta que ya exista, el tamaño de la foto tiene que ser inferior a 100kb, el nombre y apellidos no puede ser numérico, que el DNI sea un DNI y que el correo sea un correo.

Modificar Alumno

En esta página podemos modificar el alumno. 
Cuando abrimos la pagina aparece un buscador de alumnos, escribimos el nombre del alumno y hacemos click en el alumno que queremos modificar o borrar. Al hacer click se abre otro formulario con los datos del alumno para modificar. En este formulario aparecen campos que no estaban al agregar el alumno. Podemos modificar los campos que rellenamos al agregar el alumno pero también podemos modificar si la tarjeta esta activada o no, el grupo o los grupos en los que está el alumno y las asignaturas que tiene convalidadas y las otras que tiene el alumno. Los grupos del alumno y la asignatura convalidados aparecen seleccionados. También tenemos un botón para mostrar todos los grupos que tenemos en la base de datos. Esta comprobado que no se pueda modificar el id alumno, que no se pueda tener DNI, correo, numero tarjeta ya existente, que la foto no puede ser mayor de 100kb, que el nombre y apellidos del alumno no puedan ser números, que el DNI sea un DNI, que el correo sea un correo verdadero y mínimo el alumno tiene que tener un grupo asignado. Al finalizar la modificación hacemos click en modificar si queremos modificar el alumno, si queremos borrar el alumno hacemos click en el botón borrar. Al hacer click en modificar aparecerá un recuadro en verde con el texto "alumno modificado correctamente" y si borramos el alumno aparece el recuerdo con el texto "alumno borrado correctamente" en los dos casos nos redirigirá a la página de configuración.


######Profesor

Agregar Profesor

En esta página añadimos un Profesor a la base de datos. Rellenamos todos los campos y hacemos click en añadir. En cuanto hagamos click aparecerá un recuadro con el texto "Profesor añadido correctamente" y nos redirigirá a la página de configuración. Este comprobado que no se pueda añadir un DNI, correo, número tarjeta que ya exista, el tamaño de la foto tiene que ser inferior a 100kb, el nombre y apellidos no puede ser numérico, que el DNI sea un DNI y que el correo sea un correo. Cuando mandamos el password del profesor a la base de datos lo encriptamos.

Modificar Profesor

En esta página podemos modificar el Profesor. 
Cuando abrimos la pagina aparece un buscador de profesores, escribimos el nombre del Profesor y hacemos click en el Profesor que queremos modificar o borrar. Al hacer click se abre otro formulario con los datos del Profesor para modificar. En este formulario aparecen campos que no estaban al agregar el Profesor. Podemos modificar los campos que rellenamos al agregar el Profesor pero también podemos modificar si la tarjeta esta activada o no, si es administrador o no, podemos modificar el password introduciendo el password viejo y dos veces el passsword nuevo, las asignaturas que imparte el profesor aparecen seleccionadas. Esta comprobado que no se pueda modificar el id Profesor, que no se pueda tener DNI, correo, numero tarjeta ya existente, que la foto no puede ser mayor de 100kb, que el nombre y apellidos del Profesor no puedan ser números, que el DNI sea un DNI, que el correo sea un correo verdadero, que el password viejo sea el verdadero y que el profesor tiene que tener como mínimo una asignatura. Al finalizar la modificación hacemos click en modificar si queremos modificar el Profesor, si queremos borrar el Profesor hacemos click en el botón borrar. Al hacer click en modificar aparecerá una recuadro en verde con el texto "Profesor modificado correctamente" y si borramos el Profesor aparece el recuerdo con el texto "Profesor borrado correctamente" en los dos casos nos redirigirá a la página de configuración.

###API

####ALUMNOS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAlumno</td>
<td align="left">dni,nombre,apellidos,correo,num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/modificarAlumno</td>
<td align="left">id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada</td>
</tr>
<tr class="odd">
<td align="left">/presencia</td>
<td align="left">num_tarjeta,room(num_dispositivo)</td>
</tr>
<tr class="even">
<td align="left">/borrarAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorId</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoPorDni</td>
<td align="left">dni</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorTarjeta</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoPorNombre</td>
<td align="left">nombre</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorNombreYApellidos</td>
<td align="left">nombre, apellidos</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoPorCorreo</td>
<td align="left">correo</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoPorCorreo</td>
<td align="left">correo</td>
</tr>
<tr class="even">
<td align="left">/buscarAulaEnLaQueTieneQueEstarPorTarjeta</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="odd">
<td align="left">/buscarAulaEnLaQueTieneQueEstarPorId</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarPresenciaAlumno</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdAlumno</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosIdNombreApellidosAlumno</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarAsignaturasConvalidadasDelAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAsignaturasNoConvalidadasDelAlumno</td>
<td align="left">id_alumno</td>
</tr>
</tbody>
</table>

####ALUMNO GRUPOS

<table>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAlumnoGrupo</td>
<td align="left">id_grupo,id_alumno</td>
</tr>
<tr class="even">
<td align="left">/modificarAlumnoGrupo</td>
<td align="left">id_alumno_grupos,id_alumno,id_grupo</td>
</tr>
<tr class="odd">
<td align="left">/borrarAlumnoGrupos</td>
<td align="left">id_alumno_grupos</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoGrupoPorIdAlumnoGrupo</td>
<td align="left">id_alumno_grupos</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoGrupoPorIdAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAlumnoGrupoPorIdGrupo</td>
<td align="left">id_grupo</td>
</tr>
<tr class="odd">
<td align="left">/buscarAlumnoGrupoPorIdAlumnoYIdGrupo</td>
<td align="left">id_alumno,id_grupo</td>
</tr>
</tbody>
</table>

####ASIGNATURA

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAsignatura</td>
<td align="left">nombre,clave,obligatoria,tipo</td>
</tr>
<tr class="even">
<td align="left">/modificarAsignatura</td>
<td align="left">id_asignatura,nombre,clave,obligatoria,tipo</td>
</tr>
<tr class="odd">
<td align="left">/borrarAsignatura</td>
<td align="left">id_asignatura</td>
</tr>
<tr class="even">
<td align="left">/buscarTodasLasAsignaturas</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdAsignatura</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarAsignaturaPorId</td>
<td align="left">id_asignatura</td>
</tr>
<tr class="odd">
<td align="left">/buscarAsignaturaPorNombre</td>
<td align="left">nombre</td>
</tr>
<tr class="even">
<td align="left">/buscarAsignaturaPorClave</td>
<td align="left">clave</td>
</tr>
</tbody>
</table>

####AULA

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAula</td>
<td align="left">numero,piso,capacidad</td>
</tr>
<tr class="even">
<td align="left">/modificarAula</td>
<td align="left">id_aula,numero,piso,capacidad</td>
</tr>
<tr class="odd">
<td align="left">/borrarAula</td>
<td align="left">id_aula</td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosIdAula</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdYNumero</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarAulaPorId</td>
<td align="left">id_aula</td>
</tr>
<tr class="odd">
<td align="left">/buscarAulaPorNumero</td>
<td align="left">numero</td>
</tr>
</tbody>
</table>

####CONVALIDADAS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarAsignaturaConvalidada</td>
<td align="left">id_asignatura,id_alumno</td>
</tr>
<tr class="even">
<td align="left">/modificarConvalidadas</td>
<td align="left">id_convalidada,id_alumno,id_asignatura</td>
</tr>
<tr class="odd">
<td align="left">/borrarAsignaturaConvalidada</td>
<td align="left">id_convalidada</td>
</tr>
<tr class="even">
<td align="left">/buscarTodasLasConvalidadas</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarConvalidadasPorIdConvalidada</td>
<td align="left">id_convalidada</td>
</tr>
<tr class="even">
<td align="left">/buscarNoConvalidadasPorIdAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="odd">
<td align="left">/buscarConvalidadasPorIdAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarConvalidadasPorIdAsignatura</td>
<td align="left">id_asignatura</td>
</tr>
</tbody>
</table>

####DISPOSITIVOS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarDispositivo</td>
<td align="left">id_aula,numero_dispositivo</td>
</tr>
<tr class="even">
<td align="left">/modificarDispositivo</td>
<td align="left">id_aula,numero_dispositivo</td>
</tr>
<tr class="odd">
<td align="left">/borrarDispositivo</td>
<td align="left">numero_dispositivo</td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosDispositivos</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarAulasSinDispositivos</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarDispositivoPorNumeroDispositivo</td>
<td align="left">numero_dispositivo</td>
</tr>
<tr class="odd">
<td align="left">/buscarDispositivoPorIdAula</td>
<td align="left">id_aula</td>
</tr>
</tbody>
</table>

####FALTAS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarFalta</td>
<td align="left">fecha,id_alumno,id_horario_grupo,observaciones</td>
</tr>
<tr class="even">
<td align="left">/modificarFalta</td>
<td align="left">id_faltas,fecha,id_alumno,id_horario_grupo,observaciones</td>
</tr>
<tr class="odd">
<td align="left">/modificarPresencia0ATodos</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/borrarFalta</td>
<td align="left">id_faltas</td>
</tr>
<tr class="odd">
<td align="left">/borrarTablaFaltas</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarDatosDeLasFaltasDelDia</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdFalta</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarFaltasDeAlumnosNoConvalidados</td>
<td align="left">dia_semana,hora</td>
</tr>
<tr class="odd">
<td align="left">/buscarDatosFaltaAlumno</td>
<td align="left">id_alumno,id_horario_grupo</td>
</tr>
<tr class="even">
<td align="left">/buscarFaltaPorNombreAlumno</td>
<td align="left">nombre</td>
</tr>
<tr class="odd">
<td align="left">/buscarFaltaPorId</td>
<td align="left">id_faltas</td>
</tr>
</tbody>
</table>

####GRUPOS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarGrupo</td>
<td align="left">nombre_grupo, tipo</td>
</tr>
<tr class="even">
<td align="left">/modificarGrupo</td>
<td align="left">id_grupo,nombre_grupo,tipo</td>
</tr>
<tr class="odd">
<td align="left">/borrarGrupo</td>
<td align="left">id_grupo</td>
</tr>
<tr class="even">
<td align="left">/buscarGrupoPorId</td>
<td align="left">id_grupo</td>
</tr>
<tr class="odd">
<td align="left">/buscarGrupoPorNombre</td>
<td align="left">nombre_grupo</td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosIdGrupo</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosGrupos</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarGruposQueNoPerteneceUnAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="odd">
<td align="left">/buscarGruposQuePerteneceUnAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAsignaturasDeUnGrupo</td>
<td align="left">id_grupo</td>
</tr>
</tbody>
</table>

####HORARIO GRUPOS

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarHorarioGrupo</td>
<td align="left">dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula</td>
</tr>
<tr class="even">
<td align="left">/modificarGrupo</td>
<td align="left">id_horario_grupo,dia_semana,hora_inicio,hora_final,id_grupo,id_asignatura,id_aula</td>
</tr>
<tr class="odd">
<td align="left">/borrarHorarioGrupo</td>
<td align="left">id_horario_grupo</td>
</tr>
<tr class="even">
<td align="left">/buscarHorarioGrupoPorId</td>
<td align="left">id_horario_grupo</td>
</tr>
<tr class="odd">
<td align="left">/buscarHorarioGrupoPorNombreGrupo</td>
<td align="left">nombre_grupo</td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosHorarioGrupo</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdHorarioGrupo</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarGruposQueNoPerteneceUnAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="odd">
<td align="left">/buscarGruposQuePerteneceUnAlumno</td>
<td align="left">id_alumno</td>
</tr>
<tr class="even">
<td align="left">/buscarAsignaturasDeUnGrupo</td>
<td align="left">id_grupo</td>
</tr>
</tbody>
</table>

####HORARIO PROFESOR

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarHorarioProfesor</td>
<td align="left">dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo</td>
</tr>
<tr class="even">
<td align="left">/modificarHorarioProfesor</td>
<td align="left">id_horario_profesor,dia_semana,hora_inicio,hora_final,id_profesor,id_horario_grupo</td>
</tr>
<tr class="odd">
<td align="left">/borrarHorarioProfesor</td>
<td align="left">id_horario_profesor</td>
</tr>
<tr class="even">
<td align="left">/buscarHorarioProfesorPorId</td>
<td align="left">id_horario_profesor</td>
</tr>
<tr class="odd">
<td align="left">/buscarHorarioProfesorPorNombre</td>
<td align="left">nombre</td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosHorarioProfesor</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarTodosLosIdHorarioProfesor</td>
<td align="left"></td>
</tr>
</tbody>
</table>

####PROFESOR

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">RUTA</th>
<th align="left">PARAMETROS</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left">/agregarProfesor</td>
<td align="left">dni,nombre,apellidos,correo,password,num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/modificarProfesor</td>
<td align="left">id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin</td>
</tr>
<tr class="odd">
<td align="left">/modificarPresenciaProfesor</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/borrarProfesor</td>
<td align="left">id_profesor</td>
</tr>
<tr class="odd">
<td align="left">/mostrarTodosLosIdNombreApellidosProfesor</td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left">/buscarTodosLosIdProfesor</td>
<td align="left"></td>
</tr>
<tr class="odd">
<td align="left">/buscarProfesorPorId</td>
<td align="left">id_profesor</td>
</tr>
<tr class="even">
<td align="left">/buscarProfesorPorDni</td>
<td align="left">dni</td>
</tr>
<tr class="odd">
<td align="left">/buscarProfesorPorNombreYApellido</td>
<td align="left">nombre,apellidos</td>
</tr>
<tr class="even">
<td align="left">/buscarProfesorPorCorreo</td>
<td align="left">correo</td>
</tr>
<tr class="odd">
<td align="left">/buscarProfesorPorTarjeta</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/buscarPresenciaProfesor</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="odd">
<td align="left">/buscarProfesorAulaEnLaQueTieneQueEstarPorTarjeta</td>
<td align="left">num_tarjeta</td>
</tr>
<tr class="even">
<td align="left">/buscarProfesorAulaEnLaQueTieneQueEstarPorId</td>
<td align="left">id_profesor</td>
</tr>
<tr class="odd">
<td align="left">/buscarLosAlumnosDeSuClaseActual</td>
<td align="left">id_profesor</td>
</tr>
<tr class="even">
<td align="left">/buscarHorarioProfesorPorCorreo</td>
<td align="left">correo</td>
</tr>
<tr class="odd">
<td align="left">/buscarProfesorPorIdAulaEnUnaHora</td>
<td align="left">id_aula</td>
</tr>
</tbody>
</table>
