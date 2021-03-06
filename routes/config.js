var express = require('express');
var router = express.Router();
var aula = require('../models/aula');
var horario_profesor = require('../models/horario_profesor');
var horario_grupo = require('../models/horario_grupo');
var profesor = require('../models/profesor');
var asignatura = require('../models/asignatura');
var grupo = require('../models/grupo');
var dispositivo = require('../models/dispositivo');

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('config', { title: 'Configuracion' });
});*/

router.get('/', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
        aula.buscarTodosLosIdYNumero(function (error,data){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);
                      //console.log(data.length);                
                      //res.send(data);
                      res.render('config',{ 
                      title: 'Configuración ',
                      aula:data,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreGrupo
});//.router.get('/agregarHorarioGr', function(req, res, next) {

router.get('/configFaltas/modificarFalta', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarFalta', { title: 'Modificar Falta' });
});

router.get('/configPersonas/agregarAlumno', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('agregarAlumno', { title: 'Agregar Alumno' });
});

router.get('/configPersonas/agregarProfesor', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('agregarProfesor', { title: 'Agregar Profesor' });
});

router.get('/configPersonas/modificarAlumno', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarAlumno', { title: 'Modificar Alumno' });
});

router.get('/configPersonas/modificarProfesor', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarProfesor', { title: 'Modificar Profesor' });
});
/*
* Configuración dispositivos
*/
router.get('/configDispositivos', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  dispositivo.buscarTodosLosDispositivos(function (error,dispositivosArray,ultima_conexionArray,aulasArray) {
    if (error) {
      console.log(error);
      throw error;
    }else{
      res.render('configDispositivos', {
        title:'Dispositivos',
        dispositivos:dispositivosArray,
        conexiones:ultima_conexionArray,
        aulas:aulasArray,
      });//render
    }//else error
  })//buscarTodosLosDispositivos
});//router.get('/configDispositivos'

router.post('/configDispositivos/dispositivosSinConfigurar',function(req,res,next) {
  dispositivo.buscarDispositivosSinConfigurar(function (error,data) {
    if (error) {
      console.log(error);
      throw error;
    }else{
      res.send(data);
    }//else error
  })//buscarDispositivosSinConfigurar
});//

router.post('/configDispositivos/agregarDispositivo',function(req,res,next) {
  dispositivo.agregarDispositivo(req.body.aula, req.body.numeroDispositivo, function (error,data) {
    if (error) {
      console.log(error);
      throw error;
    }else{
      res.send({resp:'ok'});
    }
  })//agregarDispositivo
})//post('/configDispositivos/agregarDispositivos'

router.post('/configDispositivos/comprobarIdDispositivo', function(req,res,next) {
  dispositivo.buscarIdsDispositivos(req.body.id, function (error,data) {
    if (error) {
      console.log(error);
      throw error;
    }else{
      if (data.resultado == 'ok') {
        res.send({result:'ok'});
      }else{
        res.send({result:'noOk'});
      }//else if data == ok
    }//else if connection
  })//buscarIdsDispositivos
})//post('/configDispositivos/comprobarIdDispositivo'

router.post('/configDispositivos/borrarDispositivo', function(req,res,next) {
  dispositivo.borrarDispositivo(req.body.id,function (error) {
    if (error) {
      console.log(error);
      throw error;
    }else{
      res.send({result:'ok'});
    }
  })//borrarDispositivo
})//post('/configDispositivos/borrarDispositivo'
/*
* FIN configuración dispositivos
*/

router.get('/configGlobal/configAulas/agregarAula', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('agregarAula', { title: 'Agregar Aula' });
});

router.get('/configGlobal/configAulas/modificarAula', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarAula', { title: 'Modificar Aula' });
});

router.get('/configGlobal/configGrupos/agregarGrupo', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('agregarGrupo', { title: 'Agregar Grupo' });
});

router.get('/configGlobal/configGrupos/modificarGrupo', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarGrupo', { title: 'Modificar Grupo' });
});

router.get('/configGlobal/configAsignaturas/agregarAsignatura', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('agregarAsignatura', { title: 'Agregar Asignatura' });
});

router.get('/configGlobal/configAsignaturas/modificarAsignatura', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarAsignatura', { title: 'Modificar Asignatura' });
});

router.get('/configGlobal/configHorario/agregarHorarioGrupo', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  aula.buscarTodosLosIdYNumero(function (error,aul) {
    if (error) {
      console.log("Fallo buscarTodosLosIdYNumero");
      throw error;
    }else{  
    asignatura.buscarTodasLasAsignaturas(function (error,asign) {
      if (error) {
        console.log("Fallo buscarTodasLasAsignaturas");
        throw error;
      }else{
        grupo.buscarTodosLosIdYNombreGrupo(function (error,gru){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioGrupo',{ 
                      title:"Agregar Horario Grupo",
                      grupo:gru,
                      asignatura:asign,
                      aula:aul,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreGrupo
      }//.else
    });//profesor.buscarProfesorPorId
  }//.else
  });//.buscarTodosLosIdYNumero
});

router.get('/configGlobal/configHorario/modificarHorarioGrupo', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarHorarioGrupo', { title: 'Modificar Horario Grupo' });
});

router.get('/configGlobal/configHorario/agregarHorarioProfesor', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
    horario_grupo.buscarTodosLosHorarioGrupo(function (error,gru) {
    if (error) {
      console.log("Fallo buscarTodosLosHorarioGrupo");
      throw error;
    }else{  
        profesor.mostrarTodosLosIdNombreApellidosProfesor(function (error,pro){
                    if (error) {
                      console.log("Fallo");
                      throw error;
                    }else{
                      //console.log(data);                
                      //res.send(data);
                      res.render('agregarHorarioProfesor',{
                      title: "Agregar Horario Profesor", 
                      grupo:gru,
                      profesor:pro,
                      })//.res.render
                    }//else error
        });////. grupo.mostrarTodosLosIdNombreApellidosProfesor
  }//.else
  });//.buscarTodosLosHorarioGrupo
});

router.get('/configGlobal/configHorario/modificarHorarioProfesor', function(req, res, next) {
  if (!req.session.name) {
    res.render('index', { title: 'ControlFid', info: 'Debe iniciar sesión'}); 
  };
  res.render('modificarHorarioProfesor', { title: 'Modificar Horario Profesor' });
});

module.exports = router;
