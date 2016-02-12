var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var multer = require('multer');
var time = require("../models/time");

/* POST agregar profesor page. */
router.post('/agregarProfesor', multer({}).single('foto'), function(req,res){
var dni = req.body.dni;
var nombre = req.body.nombre;
var apellidos = req.body.apellidos;
var correo = req.body.correo;
var foto = req.file.buffer;
var password = req.body.pass;
var num_tarjeta = req.body.num_tarjeta;
    alumno.buscarAlumnoPorDni(req.body.dni, function(error,row) {
        if (error) {
            res.send('error conectando con la base de datos');
            throw error;
        } else {
            if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                console.log({err:'ese DNI lo tiene un alumno'});
                res.send({err:'existeDNI'});
            } else {
                alumno.buscarAlumnoPorCorreo(req.body.correo, function(error,row){
                    if (error) {
                       res.send('error conectando con la base de datos');
                       throw error;
                    } else {
                        if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                            console.log({err:'ese correo lo tiene un alumno'});
                            res.send({err:'existeCorreo'});
                        } else {
                            alumno.buscarAlumnoPorTarjeta(req.body.num_tarjeta, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error; 
                                } else {
                                    if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                        console.log({err:'ese numero de tarjeta lo tiene un alumno'});
                                        res.send({err:'existeTarjeta'});
                                    } else {
                                        profesor.buscarProfesorPorDni(req.body.dni, function(error,row) {
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error;
                                            } else {
                                                if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                                                    console.log({err:'ese DNI lo tiene un profesor'});
                                                    res.send({err:'existeDNI'});
                                                } else {
                                                    profesor.buscarProfesorPorCorreo(req.body.correo, function(error,row){
                                                        if (error) {
                                                           res.send('error conectando con la base de datos');
                                                           throw error; 
                                                        } else {
                                                            if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                                                console.log({err:'ese correo lo tiene un profesor'});
                                                                res.send({err:'existeCorreo'});
                                                            } else {
                                                                profesor.buscarProfesorPorTarjeta(req.body.num_tarjeta, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error;
                                                                    } else {
                                                                        if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                                            console.log({err:'ese numero de tarjeta lo tiene un profesor'});
                                                                            res.send({err:'existeTarjeta'});
                                                                        } else {
                                                                            profesor.agregarProfesor(dni,nombre,apellidos,correo,password,foto,num_tarjeta, function (error,row) {
                                                                                if (error) {
                                                                                 throw error;
                                                                                } else {
                                                                                res.send(row);
                                                                                }//.else
                                                                            })//profesor.agregarProfesor
                                                                        }//.else
                                                                    }//.else
                                                                })//profesor.buscarProfesorPorTarjeta
                                                            }//.else
                                                        }//.else
                                                    })//profesor.buscarProfesorPorCorreo
                                                }//.else
                                            }//.else
                                        })//.alumno.buscarProfesorPorDni
                                    }//.else
                                }//.else
                            })//alumno.buscarAlumnoPorTarjeta
                        }//.else
                    }//.else
                })//alumno.buscarAlumnoPorCorreo
            }//.else
        }//.else
    })//alumno.buscarAlumnoPorDni
});//router.post('/agregarProfesor
/*
* devuelve el nombre del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarProfesorNombre', function(req,res,next) {
  var nombre = req.body.nombre;
  profesor.buscarProfesorPorNombre(nombre, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* devuelve el id del profesor(modificarProfesor) FUNCIONA
*/
router.post('/buscarProfesorId', function(req,res,next) {
  var id_profesor = req.body.id_profesor;
 // console.log("id: "+ id_profesor);
  profesor.buscarProfesorPorId(id_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

/*
* UPDATE PROFESOR COMPROBAR
*/
router.post('/modificarProfesor',multer({}).single('foto'),  function(req,res,next){
  profesor.borrarAsignaturasProfesor(req.body.id_profesor, function(error,row) {
      if (error) {
        throw error;
      }else{
         res.send(row);
      }
  })//buscarProfesorPorNombre
  var data= req.body.checkbox;
    for (var i = 0; i < data.length; i++) {
      profesor.insertarAsignaturasProfesor(data[i],req.body.id_profesor, function(error,row) {
          if (error) {
          throw error;
          }else{
          //console.log(row);
          res.send(row);
          }
      })//buscarProfesorPorNombre
    }
    var id_profesor = req.body.id_profesor;
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var password = req.body.pass;
    var tarjeta_activada = req.body.tarjeta_activada;
    var num_tarjeta = req.body.num_tarjeta;
    var admin = req.body.admin;
    var foto = req.file.buffer;
    profesor.buscarProfesorPorIdSinFoto(req.body.id_profesor, function(error,row) {
            if (error) {
                res.send('error conectando con la base de datos');
                throw error;
            } else {
                dni_antiguo = row[0].dni;
                correo_antiguo = row[0].correo;
                num_tarjeta_antiguo = row[0].num_tarjeta;
                alumno.buscarAlumnoPorDni(req.body.dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    } else {
                        if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                            console.log({err:'ese DNI lo tiene un alumno'});
                            res.send({err:'existeDNI'});
                        } else {
                            alumno.buscarAlumnoPorCorreo(req.body.correo, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                } else {
                                   if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                       console.log({err:'ese correo lo tiene un alumno'});
                                       res.send({err:'existeCorreo'});
                                   } else {
                                        alumno.buscarAlumnoPorTarjeta(req.body.num_tarjeta, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error; 
                                            } else {
                                                if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                    console.log({err:'ese numero de tarjeta lo tiene un alumno'});
                                                    res.send({err:'existeTarjeta'});
                                                } else {
                                                    profesor.buscarProfesorPorDni(req.body.dni, function(error,row) {
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        } else {
                                                            if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                                                                console.log({err:'ese DNI lo tiene un profesor'});
                                                                res.send({err:'existeDNI'});
                                                            } else {
                                                                profesor.buscarProfesorPorCorreo(req.body.correo, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error;
                                                                    } else {
                                                                        if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                                                            console.log({err:'ese correo lo tiene un profesor'});
                                                                            res.send({err:'existeCorreo'});
                                                                        } else {
                                                                            profesor.buscarProfesorPorTarjeta(req.body.num_tarjeta, function(error,row){
                                                                                if (error) {
                                                                                    res.send('error conectando con la base de datos');
                                                                                    throw error; 
                                                                                } else {
                                                                                    if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                                                        console.log({err:'ese numero de tarjeta lo tiene un profesor'});
                                                                                        res.send({err:'existeTarjeta'});
                                                                                    } else {
                                                                                        profesor.modificarProfesor(id_profesor,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin, function(error,row){
                                                                                            if (error) {
                                                                                                throw error;
                                                                                            } else {
                                                                                                res.send(row);
                                                                                            }//.else
                                                                                        })//profesor.modificarAlumno
                                                                                    }//.else
                                                                                }//.else
                                                                            })//profesor.buscarProfesorPorTarjeta
                                                                        }//.else
                                                                    }//.else
                                                                })//profesor.buscarProfesorPorCorreo
                                                            }//.else
                                                        }//.else
                                                    })//profesor.buscarProfesorPorDni
                                                }//.else
                                            }//.else
                                        })//alumno.buscarAlumnoPorTarjeta
                                   }//.else
                                }//.else
                            })//alumno.buscarAlumnoPorCorreo
                        }//.else
                    }//.else
                })//alumno.buscarAlumnoPorDni
            }//.else
        })//profesor.buscarProfesorPorIdSinFoto
});//router.post('/modificarProfesor

router.post('/modificarProfesorSinFoto',multer({}).single('foto'),  function(req,res,next){
  profesor.borrarAsignaturasProfesor(req.body.id_profesor, function(error,row) {
      if (error) {
        throw error;
      }else{
         res.send(row);
      }
  })//buscarProfesorPorNombre
  var data= req.body.checkbox;
    for (var i = 0; i < data.length; i++) {
      profesor.insertarAsignaturasProfesor(data[i],req.body.id_profesor, function(error,row) {
          if (error) {
          throw error;
          }else{
          //console.log(row);
          res.send(row);
          }
      })//buscarProfesorPorNombre
    }
    var id_profesor = req.body.id_profesor;
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var password = req.body.pass;
    var tarjeta_activada = req.body.tarjeta_activada;
    var num_tarjeta = req.body.num_tarjeta;
    var admin = req.body.admin;
    profesor.buscarProfesorPorIdSinFoto(req.body.id_profesor, function(error,row) {
            if (error) {
                res.send('error conectando con la base de datos');
                throw error;
            } else {
                dni_antiguo = row[0].dni;
                correo_antiguo = row[0].correo;
                num_tarjeta_antiguo = row[0].num_tarjeta;
                alumno.buscarAlumnoPorDni(req.body.dni, function(error,row) {
                    if (error) {
                        res.send('error conectando con la base de datos');
                        throw error;
                    } else {
                        if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                            console.log({err:'ese DNI lo tiene un alumno'});
                            res.send({err:'existeDNI'});
                        } else {
                            alumno.buscarAlumnoPorCorreo(req.body.correo, function(error,row){
                                if (error) {
                                    res.send('error conectando con la base de datos');
                                    throw error;
                                } else {
                                   if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                       console.log({err:'ese correo lo tiene un alumno'});
                                       res.send({err:'existeCorreo'});
                                   } else {
                                        alumno.buscarAlumnoPorTarjeta(req.body.num_tarjeta, function(error,row){
                                            if (error) {
                                                res.send('error conectando con la base de datos');
                                                throw error; 
                                            } else {
                                                if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                    console.log({err:'ese numero de tarjeta lo tiene un alumno'});
                                                    res.send({err:'existeTarjeta'});
                                                } else {
                                                    profesor.buscarProfesorPorDni(req.body.dni, function(error,row) {
                                                        if (error) {
                                                            res.send('error conectando con la base de datos');
                                                            throw error;
                                                        } else {
                                                            if((row.length>0)&&(req.body.dni!=dni_antiguo)){
                                                                console.log({err:'ese DNI lo tiene un profesor'});
                                                                res.send({err:'existeDNI'});
                                                            } else {
                                                                profesor.buscarProfesorPorCorreo(req.body.correo, function(error,row){
                                                                    if (error) {
                                                                        res.send('error conectando con la base de datos');
                                                                        throw error;
                                                                    } else {
                                                                        if((row.length>0)&&(req.body.correo!=correo_antiguo)){
                                                                            console.log({err:'ese correo lo tiene un profesor'});
                                                                            res.send({err:'existeCorreo'});
                                                                        } else {
                                                                            profesor.buscarProfesorPorTarjeta(req.body.num_tarjeta, function(error,row){
                                                                                if (error) {
                                                                                    res.send('error conectando con la base de datos');
                                                                                    throw error; 
                                                                                } else {
                                                                                    if((row.length>0)&&(req.body.num_tarjeta!=num_tarjeta_antiguo)){
                                                                                        console.log({err:'ese numero de tarjeta lo tiene un profesor'});
                                                                                        res.send({err:'existeTarjeta'});
                                                                                    } else {
                                                                                        profesor.modificarProfesorSinFoto(id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin, function(error,row){
                                                                                            if (error) {
                                                                                                throw error;
                                                                                            } else {
                                                                                                res.send(row);
                                                                                            }//.else
                                                                                        })//profesor.modificarAlumno
                                                                                    }//.else
                                                                                }//.else
                                                                            })//profesor.buscarProfesorPorTarjeta
                                                                        }//.else
                                                                    }//.else
                                                                })//profesor.buscarProfesorPorCorreo
                                                            }//.else
                                                        }//.else
                                                    })//profesor.buscarProfesorPorDni
                                                }//.else
                                            }//.else
                                        })//alumno.buscarAlumnoPorTarjeta
                                   }//.else
                                }//.else
                            })//alumno.buscarAlumnoPorCorreo
                        }//.else
                    }//.else
                })//alumno.buscarAlumnoPorDni
            }//.else
        })//profesor.buscarProfesorPorIdSinFoto
});//router.post('/modificarProfesor

router.post('/borrarProfesor', function(req,res,next){
  var id_profesor = req.body.id_profesor;
  profesor.borrarProfesor(id_profesor, function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

router.post('/buscarProfesorPorIdAulaEnUnaHora', function(req,res,next){
    console.log(req.body);
    var curr_time;
    if (req.query.time == undefined) {
        time.horaActual(function (error,data) {
            if (error) {
                throw error;
            }else{
                curr_time = data;
                console.log(curr_time);
            }//.else
        });//.time.horaActual
    }else{
        curr_time = req.query.time;
    }//.else
          console.log(req.body);
          var id_aula = req.body.id_aula;
          profesor.buscarProfesorPorIdAulaEnUnaHora(id_aula,curr_time, function(error,row) {
            if (error) {
              throw error;
            }else{
              console.log(row);
                if(row.length>0){
                    res.send(row);
                } else{
                   console.log("no hay profesor en esta aula a esta hora " + curr_time);
                   console.log(row);
                   res.send(row);

                }
              
            }
          })//buscarProfesorPorIdAulaEnUnaHora
});//router.post('/buscarProfesorPorIdAulaEnUnaHora', function(req,res,next){

router.post('/mostrarTodosLosProfesoresIdNombreApellidos', function(req,res,next){
  profesor.mostrarTodosLosIdNombreApellidosProfesor(function(error,row) {
    if (error) {
      throw error;
    }else{
      res.send(row);
    }
  })//buscarProfesorPorNombre
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

module.exports = router;