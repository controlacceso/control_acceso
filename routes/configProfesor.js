var express = require('express');
var router = express.Router();
var profesor = require('../models/profesor');
var multer = require('multer');

/* POST agregar profesor page. */
router.post('/agregarProfesor', multer({}).single('foto'), function(req,res){
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var password = req.body.password;
    var num_tarjeta = req.body.num_tarjeta;
    if (req.file == undefined){
        //agregarProfesorSinFoto
        profesor.buscarProfesorPorDni(dni, function (error,row) {
            if (error) {
                res.send({err:'bd'});
                throw error;
            }else{
                if(row.length>0){
                    res.send({err:'existeDNI'});
                }else{
                    profesor.buscarProfesorPorCorreo(correo, function (error,row) {
                        if (error) {
                            res.send({err:'bd'});
                            throw error;
                        }else{
                            if(row.length>0){
                                res.send({err:'existeCorreo'});
                            }else{
                                profesor.buscarProfesorPorTarjeta(num_tarjeta, function (error,row) {
                                    if (error) {
                                        res.send({err:'bd'});
                                        throw error;
                                    }else{
                                        if(row.length>0){
                                            res.send({err:'existeTarjeta'});
                                        }else{
                                            profesor.agregarProfesorSinFoto(dni,nombre,apellidos,correo,password,num_tarjeta, function (error,row) {
                                                if (error) {
                                                    res.send({err:'bd'});
                                                    throw error;
                                                }else{
                                                    res.send(row);
                                                }//else  profesor.agregarProfesorSinFoto
                                            });//.profesor.agregarProfesorSinFoto
                                        }//.else if(row.length>0) profesor.buscarProfesorPorTarjeta
                                    }//.else if (error)
                                });//.profesor.buscarProfesorPorTarjeta
                            }//.else if(row.length>0)profesor.buscarProfesorPorCorreo
                        }//.else if (error)
                    });//.profesor.buscarProfesorPorCorreo
                }//.else if(row.length>0) buscarProfesorPorDni
            }//.else if (error)
        });//.buscarProfesorPorDni
    } else {
        profesor.buscarProfesorPorDni(dni, function (error,row) {
            if (error) {
                res.send({err:'bd'});
                throw error;
            }else{
                if(row.length>0){
                    res.send({err:'existeDNI'});
                }else{
                    profesor.buscarProfesorPorCorreo(correo, function (error,row) {
                        if (error) {
                            res.send({err:'bd'});
                            throw error;
                        }else{
                            if(row.length>0){
                                res.send({err:'existeCorreo'});
                            }else{
                                profesor.buscarProfesorPorTarjeta(num_tarjeta, function (error,row) {
                                    if (error) {
                                        res.send({err:'bd'});
                                        throw error;
                                    }else{
                                        if(row.length>0){
                                            res.send({err:'existeTarjeta'});
                                        }else{
                                            var foto = req.file.buffer;
                                            profesor.agregarProfesor(dni,nombre,apellidos,correo,password,foto,num_tarjeta, function (error,row) {
                                                if (error) {
                                                    res.send({err:'bd'});
                                                    throw error;
                                                }else{
                                                    res.send(row);
                                                }//else  profesor.agregarProfesor
                                            });//.profesor.agregarProfesor
                                        }//.else if(row.length>0) profesor.buscarProfesorPorTarjeta
                                    }//.else if (error)
                                });//.profesor.buscarProfesorPorTarjeta
                            }//.else if(row.length>0)profesor.buscarProfesorPorCorreo
                        }//.else if (error)
                    });//.profesor.buscarProfesorPorCorreo
                }//.else if(row.length>0) profesor.buscarAlumnoPorDni
            }//.else if (error)
        });//.profesor.buscarProfesorPorDni
    }//.else if (req.file == undefined)
});//router.post('/agregarProfesor')

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
      //console.log("file: "+req.file.buffer);
    var id_profesor = req.body.id_profesor;
    var dni = req.body.dni;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var correo = req.body.correo;
    var password = req.body.password;
    var tarjeta_activada = req.body.tarjeta_activada;
    var num_tarjeta = req.body.num_tarjeta;
    var admin = req.body.admin;
    var foto = req.file.buffer;
    if(req.file == undefined){
        profesor.buscarProfesorPorIdDniCorreoNum_tarj(id_profesor,dni,correo,num_tarjeta, function(error,row) {
            if (error) {
                throw error;
            }else{
                if(row.length>0){
                    profesor.modificarProfesorSinFoto(id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin, function(error,row) {
                        if (error) {
                            throw error;          
                        }else {
                            res.send(row);    
                        }        
                    })//.profesor.modificarAlumno
                } else {
                    profesor.buscarProfesorPorDni(dni, function(error,row) {
                        if (error) {
                            throw error;
                        } else {
                            if(row.length>0){
                                res.send({err:'existeDNI'});
                            } else {
                                profesor.buscarProfesorPorCorreo(correo, function(error,row){
                                    if (error) {
                                        throw error;
                                    } else {
                                        if(row.length>0){
                                            res.send({err:'existeCorreo'});
                                        } else {
                                            profesor.buscarProfesorPorTarjeta(num_tarjeta, function(error,row){
                                                if (error) {
                                                   throw error; 
                                               } else {
                                                if(row.length>0){
                                                    res.send({err:'existeTarjeta'});
                                                } else {
                                                    profesor.modificarProfesorSinFoto(id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin, function(error,row){
                                                        if (error) {
                                                            throw error;
                                                        } else {
                                                            res.send(row); 
                                                        }//.else if (error) 
                                                    })//.profesor.modificarAlumnoSinFoto
                                                }//else if(row.length>0){
                                               }//.else if (error)
                                            })//.profesor.buscarProfesorPorTarjeta
                                        }//.else if(row.length>0)
                                    }//.else if (error)
                                })//.profesor.buscarProfesorPorCorreo       
                            }//.else if(row.length>0)
                        }//.else if (error)
                    })//.profesor.buscarProfesorPorDni
                }//.else if(row.length<0)
            }//.else if (error)
        })//.profesor.buscarProfesorPorIdDniCorreoNum_tarj
    } else{
        profesor.buscarProfesorPorIdDniCorreoNum_tarj(id_profesor,dni,correo,num_tarjeta, function(error,row) {
            if (error) {
                throw error;
            }else{
                if(row.length>0){
                    profesor.modificarProfesorSinFoto(id_profesor,dni,nombre,apellidos,correo,password,tarjeta_activada,num_tarjeta,admin, function(error,row) {
                        if (error) {
                            throw error;          
                        }else {
                            res.send(row);    
                        }        
                    })//.profesor.modificarAlumno
                } else {
                    profesor.buscarProfesorPorDni(dni, function(error,row) {
                        if (error) {
                            throw error;
                        } else {
                            if(row.length>0){
                                res.send({err:'existeDNI'});
                            } else {
                                profesor.buscarProfesorPorCorreo(correo, function(error,row){
                                    if (error) {
                                        throw error;
                                    } else {
                                        if(row.length>0){
                                            res.send({err:'existeCorreo'});
                                        } else {
                                            profesor.buscarProfesorPorTarjeta(num_tarjeta, function(error,row){
                                                if (error) {
                                                   throw error; 
                                               } else {
                                                if(row.length>0){
                                                    res.send({err:'existeTarjeta'});
                                                } else {
                                                    profesor.modificarProfesor(id_profesor,dni,nombre,apellidos,correo,password,foto,tarjeta_activada,num_tarjeta,admin, function(error,row){
                                                        if (error) {
                                                            throw error;
                                                        } else {
                                                            res.send(row); 
                                                        }//.else if (error) 
                                                    })//.profesor.modificarAlumno
                                                }//else if(row.length>0){
                                               }//.else if (error)
                                            })//.profesor.buscarProfesorPorTarjeta
                                        }//.else if(row.length>0)
                                    }//.else if (error)
                                })//.profesor.buscarProfesorPorCorreo       
                            }//.else if(row.length>0)
                        }//.else if (error)
                    })//.profesor.buscarProfesorPorDni
                }//.else if(row.length<0)
            }//.else if (error)
        })//.profesor.buscarProfesorPorIdDniCorreoNum_tarj
    }//.else if(req.file == undefined)
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
  //res.render('configPersonas', { title: 'configPersonas' });  RUTA MAL
});//get /configPersonas/modificarProfesor/buscarProfesorNombre

module.exports = router;