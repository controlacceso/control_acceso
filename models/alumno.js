var connection = require('../models/connection');
var time = require('../models/time');
var alumno = {};

/***********************************************************INSERT*********************************************************/

/*
* INSERTAR alumno
*/
alumno.agregarAlumno = function (dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {
	if(connection){							
		var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlagregarAlumno = 'INSERT INTO alumnos SET ?';
		connection.query(sqlagregarAlumno,alumno, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('agregarAlumno OK');
			}//else
		});//connection.query
	}//if
}//alumno.agregarAlumno

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno
*/
alumno.modificarAlumno = function (id,dni,nombre,apellidos,correo,foto,num_tarjeta,callback) {
	if(connection){							
		var campos = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sql = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
		connection.query(sql,campos, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarAlumno OK');
			}//else
		});//connection.query
	}//if
}//alumno.modificarAlumno

/*
*	UPDATE alumno sin foto
*/
alumno.modificarAlumnoSinFoto = function (id,dni,nombre,apellidos,correo,num_tarjeta,callback) {
	if(connection){							
		var campos = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo, tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sql = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
		connection.query(sql,campos, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('modificarAlumno OK');
			}//else
		});//connection.query
	}//if
}//alumno.modificarAlumnoSinFoto

/*
*	UPDATE la presencia del alumno a 0 o a 1 por num_tarjeta
*/
alumno.modificarPresenciaDelAlumno = function (num_tarjeta,callback) {
	if(connection){
		this.presenciaAlumno(num_tarjeta,function (error,data) {
			if (data[0].presencia == 0) {
				var sqlUpdate = 'UPDATE alumnos SET presencia = 1 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						console.log('modificarPresenciaDelAlumno a 1 OK');
						callback(null);
					}//else
				});//connection.query
			}else{
				var sqlUpdate = 'UPDATE alumnos SET presencia = 0 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
						console.log('modificarPresenciaDelAlumno a 0 OK');
						callback(null);
					}//else
				});//connection.query
			}//else
		});//this.presenciaAlumno
	}//if
}//alumno.modificarPresenciaDelAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno
*/
alumno.borrarAlumno = function (id,callback) {
	if(connection){							
		connection.query('DELETE FROM alumnos WHERE id_alumno= "'+id+'"', function(error){
		  if (error) {
				throw error;
				console.log(error);
			}else{
				console.log('borrarAlumno OK');
			}//else
		});//connection.query
	}//if
}//alumno.borrarAlumno

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
* BUSCAR alumno por nombre
*/
alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_alumno,tarjeta_activada,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				throw error;
				console.log(error);
			}else{
				console.log('buscarAlumnoPorTarjeta OK');
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.buscarAlumnoPorTarjeta

/*
*	BUSCA el aula en la que tiene que estar por num_tarjeta
*/
alumno.aulaEnLaQueTieneQueEstar = function (num_tarjeta,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}
	});

	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE num_tarjeta ="'+num_tarjeta+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.aulaEnLaQueTieneQueEstar

/*
*	BUSCA el aula en la que tiene que estar por id_persona, hora y dia de la semana
*/
alumno.aulaEnLaQueTieneQueEstarPorId = function (id_alumno,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			throw error;
		}else{
			day = data;
		}
	});
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_alumno ="'+id_alumno+'"))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.aulaEnLaQueTieneQueEstarPorId

/*
*	BUSCA la presencia del alumno por num_tarjeta
*/
alumno.presenciaAlumno = function (num_tarjeta,callback) {
	if(connection){
		var sqlAlumnoPresencia = 'SELECT presencia FROM alumnos WHERE num_tarjeta ="'+num_tarjeta+'"';
		connection.query(sqlAlumnoPresencia, function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.presenciaAlumno

/*
*	BUSCA todos los id_alumno de la tabla alumnos
*/
alumno.mostrarTodosLosIdAlumno = function (callback) {
	if(connection){						
		connection.query('SELECT id_alumno FROM alumnos', function(error,row){
		  	if (error) {
				throw error;
				console.log(error);
			}else{
				var id_alumnoArray = [];
				for (var i= 0;i<row.length;i++){
					var id = row[i].id_alumno;
					id_alumnoArray.push(id);
				}//.for (var i= 0;i<row.length;i++)
				function compareNumbers(a, b) {
				  return a - b;
				}//compareNumbers
				id_alumnoArray.sort(compareNumbers);
				callback(null,id_alumnoArray);
			}//else
		});//connection.query
	}//if
}//alumno.mostrarTodosLosIdAlumno

/****************************************************************************************************************************/








/*
*	devuelve nombre y foto del alumno COMPROBAR
*/
alumno.buscarAlumnoPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto FROM alumnos WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.alumno.buscarAlumnoPorNombre

/*
*	devuelve datos de alumno por nombre y apellido
*/
alumno.buscarAlumnoPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE nombre = ' + connection.escape(nombre)+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})
	};
}//buscarAlumnoPorNombreYApellido

/*
*	devuelve datos de alumno por correo
*/
alumno.buscarAlumnoPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE correo LIKE ' + connection.escape(correo+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})
	};
}//buscarAlumnoPorCorreo

/*
*	devuelve datos de alumno por dni
*/
alumno.buscarAlumnoPorDni = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT num_tarjeta,id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
				callback(null,row);
			}
		})
	};
}//buscarAlumnoPorDni

/*
*	devuelve los datos del alumno por id
*/
alumno.buscarAlumnoPorId = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,foto,tarjeta_activada FROM alumnos WHERE id_alumno ='+connection.escape(id_alumno);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
			}else{
					var foto = row[0].foto.toString('base64');//foto del alumno
				    var row2 = {id_alumno : row[0].id_alumno,dni : row[0].dni,nombre : row[0].nombre,apellidos : row[0].apellidos,correo : row[0].correo,num_tarjeta : row[0].num_tarjeta,foto : foto,tarjeta_activada : row[0].tarjeta_activada};
				callback(null,row2);
			}//.else
		});//.connection.query
	}//.if(connection)
}//.alumno.buscarAlumnoPorId

alumno.agregarAlumnoGrupo =  function(id_grupo,id_alumno,callback) {
	if(connection){
		var alumno_grupos = { id_grupo: id_grupo, id_alumno: id_alumno};						
		var sqlagregarAlumnoGrupo = 'INSERT INTO alumno_grupos SET ?';
		connection.query(sqlagregarAlumnoGrupo,alumno_grupos, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('agregarAlumnoGrupo correctamente');
			}//.else
		});//.connection.query
	}
}//.alumno.insertarAsignaturasProfesor

alumno.borrarAlumnoGrupos =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAlumnoGrupos = 'DELETE FROM alumno_grupos WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAlumnoGrupos, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('borrarAlumnoGrupos correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.borrarAlumnoGrupos

alumno.agregarAsignaturaConvalidada =  function(id_asignatura,id_alumno,callback) {
	if(connection){
		var convalidadas = { id_asignatura: id_asignatura, id_alumno: id_alumno};						
		var sqlagregarAsignaturaConvalidada = 'INSERT INTO convalidadas SET ?';
		connection.query(sqlagregarAsignaturaConvalidada,convalidadas, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('agregarAsignaturaConvalidada correctamente');
			}//.else
		});//.connection.query
	}
}//.alumno.insertarAsignaturasProfesor

alumno.borrarAsignaturaConvalidada =  function(id_alumno,callback) {
	if(connection){					
		var sqlborrarAsignaturaConvalidada = 'DELETE FROM convalidadas WHERE id_alumno= "'+id_alumno+'"';
		connection.query(sqlborrarAsignaturaConvalidada, function(error){
		  if (error) {
				throw error;
			}else{
				//console.log('borrarAsignaturaConvalidada correctamente');
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.borrarAsignaturaConvalidada

module.exports = alumno;