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
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.agregarAlumno

/*
* INSERTAR alumno sin foto
*/
alumno.agregarAlumnoSinFoto = function (dni,nombre,apellidos,correo,num_tarjeta,callback) {
	if(connection){							
		var alumno = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , tarjeta_activada: '0' , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlagregarAlumno = 'INSERT INTO alumnos SET ?';
		connection.query(sqlagregarAlumno,alumno, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.agregarAlumnoSinFoto

/****************************************************************************************************************************/

/***********************************************************UPDATE***********************************************************/

/*
* UPDATE alumno
*/
alumno.modificarAlumno = function (id,dni,nombre,apellidos,correo,foto,num_tarjeta,tarjeta_activada,callback) {
	if(connection){							
		var campos = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo , foto: foto, tarjeta_activada: tarjeta_activada , num_tarjeta: num_tarjeta, presencia: '0' };
		var sqlmodificarAlumno = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id+'"';
		connection.query(sqlmodificarAlumno,campos, function(error){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.modificarAlumno

/*
*	UPDATE alumno sin foto
*/
alumno.modificarAlumnoSinFoto = function (id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada,callback) {
	if(connection){							
		var campos = { dni: dni, nombre: nombre , apellidos: apellidos, correo: correo, num_tarjeta: num_tarjeta, tarjeta_activada: tarjeta_activada, presencia: '0' };
		var sqlmodificarAlumno = 'UPDATE alumnos SET ? WHERE id_alumno ="'+id_alumno+'"';
		connection.query(sqlmodificarAlumno,campos, function(error){
		  	if (error) {
				throw error;
				console.log(error);
			}else{				
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.modificarAlumnoSinFoto

/*
*	UPDATE la presencia del alumno a 0 o a 1 por num_tarjeta
*/
alumno.modificarPresenciaDelAlumno = function (num_tarjeta,callback) {
	if(connection){
		this.buscarPresenciaAlumno(num_tarjeta,function (error,data) {
			if (data[0].presencia == 0) {
				var sqlUpdate = 'UPDATE alumnos SET presencia = 1 WHERE num_tarjeta ="'+num_tarjeta+'"';
				connection.query(sqlUpdate,function (error) {
					if (error) {
						throw error;
						console.log(error);
					}else{
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
						callback(null);
					}//else
				});//connection.query
			}//else
		});//this.buscarPresenciaAlumno
	}//if
}//alumno.modificarPresenciaDelAlumno

/****************************************************************************************************************************/

/***********************************************************DELETE***********************************************************/

/*
* DELETE alumno por id_alumno
*/
alumno.borrarAlumno = function (id_alumno,callback) {
	if(connection){							
		connection.query('DELETE FROM alumnos WHERE id_alumno= "'+id_alumno+'"', function(error,row){
		  if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,{dato:"ok"});
			}//else
		});//connection.query
	}//if
}//alumno.borrarAlumno

/****************************************************************************************************************************/

/***********************************************************SELECT***********************************************************/

/*
*	BUSCAR alumno por id_alumno
*/
alumno.buscarAlumnoPorId = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,foto,tarjeta_activada FROM alumnos WHERE id_alumno ='+connection.escape(id_alumno);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				for (i=0;i<row.length;i++){
					row[i].foto = row[i].foto.toString('base64');
				}
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorId

/*
*	BUSCAR alumno por id_alumno sin foto
*/
alumno.buscarAlumnoPorIdSinFoto = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,tarjeta_activada FROM alumnos WHERE id_alumno ='+connection.escape(id_alumno);
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorIdSinFoto

/*
*	BUSCAR alumno por dni
*/
alumno.buscarAlumnoPorDni = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto,num_tarjeta,presencia FROM alumnos WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//buscarAlumnoPorDni

/*
*	BUSCAR alumno por dni sin foto
*/
alumno.buscarAlumnoPorDniSinFoto = function(dni,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,presencia FROM alumnos WHERE dni LIKE ' + connection.escape(dni+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//buscarAlumnoPorDniSinFoto

/*
* BUSCAR alumno por num_tarjeta
*/
alumno.buscarAlumnoPorTarjeta = function(num_tarjeta,callback){
	if (connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,presencia FROM alumnos WHERE num_tarjeta = ' + connection.escape(num_tarjeta);
		connection.query(sql, function (error, row){
			if(error){
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//.else
		});//.connection.query
	}//.if (connection)
}//.alumno.buscarAlumnoPorTarjeta

/*
*	BUSCAR alumno por nombre
*/
alumno.buscarAlumnoPorNombre = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto,num_tarjeta,presencia FROM alumnos WHERE nombre LIKE ' + connection.escape(nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				for (i=0;i<row.length;i++){
					row[i].foto = row[i].foto.toString('base64');
				}
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorNombre

/*
*	BUSCAR alumno por nombre sin foto
*/
alumno.buscarAlumnoPorNombreSinFoto = function(nombre,callback){
	if(connection){
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,presencia FROM alumnos WHERE nombre LIKE ' + connection.escape('%'+nombre+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorNombreSinFoto

/*
*	BUSCA alumnos por nombre y apellidos
*/
alumno.buscarAlumnoPorNombreYApellido = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto,num_tarjeta,presencia FROM alumnos WHERE nombre LIKE ' + connection.escape(nombre+'%')+' and apellidos LIKE '+ connection.escape(apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//alumno.buscarAlumnoPorNombreYApellido

/*
*	BUSCA alumnos por nombre y apellidos sin foto
*/
alumno.buscarAlumnoPorNombreYApellidoSinFoto = function(nombre,apellidos,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,presencia FROM alumnos WHERE nombre LIKE ' + connection.escape('%'+nombre+'%')+' and apellidos LIKE '+ connection.escape('%'+apellidos+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//alumno.buscarAlumnoPorNombreYApellidoSinFoto

/*
*	BUSCAR alumno por correo
*/
alumno.buscarAlumnoPorCorreo = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto,num_tarjeta,presencia FROM alumnos WHERE correo LIKE ' + connection.escape(correo+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorCorreo

/*
*	BUSCAR alumno por correo sin foto
*/
alumno.buscarAlumnoPorCorreoSinFoto = function(correo,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,num_tarjeta,presencia FROM alumnos WHERE correo LIKE ' + connection.escape('%'+correo+'%');
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;				
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAlumnoPorCorreoSinFoto

/*
*	BUSCAR el aula en la que tiene que estar por num_tarjeta
*/
alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta = function (num_tarjeta,curr_time,callback) {
	var day;
	
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			day = data;
		}
	});
	if (connection) {
		var sqlAula = 'SELECT numero_dispositivo FROM dispositivos WHERE id_aula = (SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE num_tarjeta ="'+num_tarjeta+'") and id_alumno NOT IN (SELECT id_alumno FROM convalidadas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final)))))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAulaEnLaQueTieneQueEstarPorTarjeta

/*
*	BUSCA el aula en la que tiene que estar por id_persona, hora y dia de la semana
*/
alumno.buscarAulaEnLaQueTieneQueEstarPorId = function (id_alumno,curr_time,callback) {
	var day;
	time.diaDeLaSemana(function (error,data) {
		if (error) {
			console.log(error);
			throw error;
		}else{
			day = data;
		}
	});
	if (connection) {
		var sqlAula = 'SELECT id_aula FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM alumno_grupos WHERE dia_semana = "'+day+'" and ("'+curr_time+'" BETWEEN hora_inicio and hora_final) and id_alumno IN (SELECT id_alumno FROM alumnos WHERE id_alumno ="'+id_alumno+'") and id_alumno NOT IN (SELECT id_alumno FROM convalidadas WHERE id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_horario_grupo and (dia_semana="'+day+'") and ("'+curr_time+'" between hora_inicio and hora_final))))';
		connection.query(sqlAula, function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAulaEnLaQueTieneQueEstarPorId

/*
*	BUSCAR la presencia del alumno por num_tarjeta
*/
alumno.buscarPresenciaAlumno = function (num_tarjeta,callback) {
	if(connection){
		var sqlAlumnoPresencia = 'SELECT presencia FROM alumnos WHERE num_tarjeta ="'+num_tarjeta+'"';
		connection.query(sqlAlumnoPresencia, function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarPresenciaAlumno

/*
*	BUSCA todos los id_alumno
*/
alumno.buscarTodosLosIdAlumno = function (callback) {
	if(connection){						
		connection.query('SELECT id_alumno FROM alumnos', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				var id_alumnoArray = [];
				for (var i= 0;i<row.length;i++){
					var id = row[i].id_alumno;
					id_alumnoArray.push(id);
				}//for
				function compareNumbers(a, b) {
				  	return a - b;
				}//compareNumbers
				id_alumnoArray.sort(compareNumbers);
				callback(null,id_alumnoArray);
			}//else
		});//connection.query
	}//if
}//alumno.buscarTodosLosIdAlumno

/*
* BUSCAR todos los nombre y apellido de todos los alumnos
*/
alumno.buscarTodosLosIdNombreApellidosAlumno = function (callback) {
	if(connection){						
		connection.query('SELECT id_alumno,nombre,apellidos FROM alumnos', function(error,row){
		  	if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
				console.log('buscarTodosLosIdNombreApellidosAlumno OK');
			}//else
		});//connection.query
	}//if
}//alumno.buscarTodosLosIdNombreApellidosAlumno

/*
*	BUSCAR asignaturas que tiene convalidadas el alumno
*/
alumno.buscarAsignaturasConvalidadasDelAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura in (SELECT id_asignatura from convalidadas where id_alumno = ' + connection.escape(id_alumno)+') AND id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo  IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")))';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAsignaturasConvalidadasDelAlumno

/*
*	BUSCAR asignaturas que tiene el alumno para convalidar
*/
alumno.buscarAsignaturasNoConvalidadasDelAlumno = function(id_alumno,callback){
	if(connection){
		var sql = 'SELECT id_asignatura,nombre FROM asignaturas WHERE id_asignatura NOT IN (SELECT id_asignatura from convalidadas where id_alumno = ' + connection.escape(id_alumno)+') AND id_asignatura IN (SELECT id_asignatura FROM horario_grupos WHERE id_grupo IN (SELECT id_grupo FROM grupos WHERE id_grupo  IN (SELECT id_grupo FROM alumno_grupos WHERE id_alumno ="'+id_alumno+'")))';
		connection.query(sql,function (error,row) {
			if (error) {
				console.log(error);
				throw error;
			}else{
				callback(null,row);
			}//else
		});//connection.query
	}//if
}//alumno.buscarAsignaturasNoConvalidadasDelAlumno

alumno.buscarAlumnoPorIdDniCorreoNum_tarj = function(id_alumno,dni,correo,num_tarjeta,callback) {
	if (connection) {
		var sql = 'SELECT id_alumno,dni,nombre,apellidos,correo,foto,presencia FROM alumnos WHERE id_alumno = ' + connection.escape(id_alumno)+' and dni = '+ connection.escape(dni)+' and correo = '+ connection.escape(correo)+' and num_tarjeta = '+ connection.escape(num_tarjeta);
		connection.query(sql,function (error,row) {
			if (error) {
				throw error;
				console.log(error);
			}else{
				callback(null,row);
			}//else
		})//connection.query
	};//if
}//alumno.buscarAlumnoPorIdDniCorreoNum_tarj

/****************************************************************************************************************************/

module.exports = alumno;