$(document).ready(function() {
	    controlFooter();
	    $('img').attr("src",'/images/sshot-1.png');
     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
     }, "Value must not equal arg.");

	//reglas
	var reglas = {
		id_horario_profesor:{required:true},
        id_horario_grupo:{required:true},
		dia:{required:true},
		hora_inicio:{required:true},
        hora_final:{required:true},
        profesor:{required:true,valueNotEquals: "default" },
	};
	//mensajes
	var mensajes = {
		id_horario_profesor:{required:""},
        id_horario_grupo:{required:""},
		dia:{required:""},
		hora_inicio:{required:""},
        hora_final:{required:""},
        profesor:{required:"",valueNotEquals: "" },
	};

	//Buscar alumnos al escribir
	$('#nombrebusquedaHorarioProfesor').keyup(function(event) {
		$("#footer").css("bottom","auto");
		buscarHorarioProfesores();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		$("#footer").css("bottom","auto");
		buscarHorarioProfesores();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarHorarioProfesorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateHorarioGrupo' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "<div class='form-inline has-success'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_horario_profesor' id='labelId_horario_profesor' class='input-group-addon'>ID HORARIO PROFESOR</label>";      		
    		formulario += "<input type='text' id='Id_horario_profesor' name='id_horario_profesor' class='form-control has-feedback' value='"+result[0].id_horario_profesor+"'readonly>";    		
    		formulario += "<span id='Id_horario_profesor1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>"; 
   			formulario += "<div class='form-inline has-success'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_horario_grupo'  id='labelHorarioGrupoHorarioProfesor' class='input-group-addon'>HORARIO GRUPO</label>";   		
    		formulario += "<input type='text' id='id_horario_grupo' name='id_horario_grupo' class='form-control has-feedback' value='"+result[0].id_horario_grupo+"'readonly>";
    		formulario += "<span id='id_horario_grupo1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>"; 			
			mostrarHorarioGrupo(result[0].id_horario_grupo);
			formulario += "<div id='horarioGrupo'>";
    		formulario += "</div>";
			mostrarTodosLosProfesoresIdNombreApellidos(result[0].id_profesor);
			formulario += "<div id='profesores'>";
    		formulario += "</div>";			
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Nombre ya existente</span></div>";	
    		formulario += "<div id='mensaje2' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp2'> Nombre ya existente</span></div>";	    		
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar

		function mostrarHorarioGrupo (id_horario_grupo) {
			var id = id_horario_grupo;
		$.ajax({
			url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
			type: 'post',
			dataType: 'json',
			data:{ id_horario_grupo:id },
				success:function (data) {
					var resp = "";
					resp += "<table id='horario'>";
				for (var i = 0; i < data.length; i++) {
					resp += "<tr>";
					resp += "<td>";
					resp += "<div class='form-inline has-success'>";
    				resp += "<div class='input-group'>";
					resp += "<label id='labelDiaHorarioProfesor' for='dia' class='input-group-addon'>DIA</label>"; 
					resp += "<input type='text' id='diaHorarioProfesor' name='dia' class='form-control has-feedback' value='"+data[i].dia_semana+"'readonly></br>";
					resp += "<span id='diaHorarioProfesor1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
					resp += "</div>";
  					resp += "</div><br/>";
  					resp += "<div class='form-inline has-success'>";
    				resp += "<div class='input-group'>";
					resp += "<label id='labelHoraInicioHorarioProfesor' for='hora_inicio' class='input-group-addon'>HORA INICIO</label>"; 
					resp += "<input type='time' id='hora_inicioHorarioProfesor' name='hora_inicio' class='form-control has-feedback' value='"+data[i].hora_inicio+"'readonly></br>";
					resp += "<span id='hora_inicioHorarioProfesor1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
					resp += "</div>";
  					resp += "</div><br/>";
  					resp += "<div class='form-inline has-success'>";
    				resp += "<div class='input-group'>";
					resp += "<label id='labelHoraFinalHorarioProfesor' for='hora_final' class='input-group-addon'>HORA INICIO</label>"; 					
					resp += "<input type='time' id='hora_finalHorarioProfesor' name='hora_final' class='form-control has-feedback' value='"+data[i].hora_final+"'readonly></br>";					
					resp += "<span id='hora_finalHorarioProfesor1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
					resp += "</div>";
  					resp += "</div><br/>";	
					resp += "</td>";
					resp += "</tr>"
					};
					resp += "</table>";
					$('#horarioGrupo').html(resp);
				}
		})//ajax
		.done(function() {
		console.log("success");
		})//done
		.fail(function() {
		console.log("error");
		})//fail
	}//function buscarTodosLosGrupos

		//profesor.mostrarTodosLosIdNombreApellidosProfesor
		function mostrarTodosLosProfesoresIdNombreApellidos (id_profesor) {
			var result = id_profesor;
		$.ajax({
			url: '/configProfesor/mostrarTodosLosProfesoresIdNombreApellidos',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
                resp += "<div class='input-group'>";
                resp += "<label id='labelProfesorHorarioProfesor' for='profesor' class='input-group-addon'>PROFESOR</label>";
                resp += "<select id='selectProfesorHorarioProfesorM' name='profesor' class='form-control has-feedback'>";
    			resp += "<option value='default'>Elige el profesor</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_profesor == result){
						resp += "<option value="+data[i].id_profesor+" selected>"+data[i].nombre+"</option>";
					} else {
						resp += "<option value="+data[i].id_profesor+">"+data[i].nombre+"</option>";
					}
				};
				resp += "</select><span id='selectProfesorHorarioProfesorM1' class='glyphicon form-control-feedback'></span>";
				resp += "</div>";
                resp += "</div><br/>";
				$('#profesores').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturas
	
	
	$('#resultado').on("click","#btnModificar",function () {
		$("#formUpdate").validate({
	        rules:reglas,
			messages:mensajes,
	        highlight: function(element) {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');   
	        },
	        unhighlight: function(element) {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');        
	        },
			errorPlacement: function(error,element){
			},
	        submitHandler: function (form) {
	            event.preventDefault();
	            var data = $("#formUpdate").serializeArray();
	            $.ajax({
	                url: '/configHorarioProfesor/updateHorarioProfesor',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
		            if (data.err=="existe"){
                		$('#Id_horario_profesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                		$('#Id_horario_profesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                		$('#id_horario_grupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                		$('#id_horario_grupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                		$('#diaHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                		$('#diaHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                		$('#hora_inicioHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                		$('#hora_inicioHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                		$('#hora_finalHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                		$('#hora_finalHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
                		$('#selectProfesorHorarioProfesorM').closest('.form-inline').removeClass('has-success').addClass('has-error');
                		$('#selectProfesorHorarioProfesorM1').removeClass('glyphicon-ok').addClass('glyphicon-remove');			                
		                showAlert($('#resultado #enlace2'),"error"," Horario Profesor ya existente ");
		            }else if (data.dato=="ok"){
		            	$('#resultado #mensaje').hide();
		                showAlertRedirect($('#resultado #enlace2'),"ok"," Horario Profesor modificado correctamente",'/config');
		            }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	            })
	            /*
	            *   Form Submit Fin
	            */
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarHorarioProfesores () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configHorarioProfesor/buscarHorarioProfesorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					resp += "<h3 class='busquedaH3HorarioProfesor' id='"+data[i].id_horario_profesor+"'>Dia: "+data[i].dia_semana+" Hora: "+data[i].hora_inicio+"-"+data[i].hora_final+" Profesor: "+data[i].nombreProfesor+" "+data[i].apellidos+" Grupo: "+data[i].nombre_grupo+" Asignatura: "+data[i].nombreAsignatura+" Aula: "+data[i].numero+"</h3>";
					resp += "<img  class='busquedaFoto' id='fotoBusquedaProfesor' alt='fotoBusquedaProfesor' src='data:img/png;base64,"+data[i].foto+"'/>";										
					resp += "</td></tr></table>";
				};
				$('#resultado').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarHorarioProfesores

	//funcion para buscar alumnos por id
	function buscarHorarioProfesorId (id) { 
		return	$.ajax({
					url: '/configHorarioProfesor/buscarHorarioProfesorPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_horario_profesor:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarProfesores
	
			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar el horario del profesor?")) {
			$.ajax({
				url: '/configHorarioProfesor/borrarHorarioProfesor',
				type: 'post',
				dataType: 'html',
				data: {'id_horario_profesor':$('#resultado #Id_horario_profesor').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					$('#resultado #mensaje').hide();
					showAlertRedirect("#enlace2","ok"," Horario Profesor borrado correctamente",'/config');
				}
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario asiganura
	
});//ready

    function controlFooter(){ 
        /*el alto que tiene el navegador*/
        $alto_navegador= $(window).height();
        /*el alto que tiene el contenido de la pagina*/
        $alto_documento= $(document).height(); 
        /*  aqui condicionamos si el alto del contenido 
          *  es mayor que
          *  el alto del navegador*/
        if ($alto_documento>$alto_navegador){
             $("#footer").css({"bottom":"auto"})
        }else if($alto_documento>=$alto_navegador){
             $("#footer").css({"bottom":"0px"})
        } 
     }//controlFooter

    function showAlertValidate(lugar,texto) {
        $('#mensaje').attr('class','alert alert-warning fade in');
        $('#mensaje span').html(texto);
        $('#mensaje').insertAfter(lugar);
        $('#mensaje').show(1000, function(){        
        });
    }

    function showAlert(lugar,tipo,texto) {
       if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
       } else {
        $('#mensaje').attr('class','alert alert-success fade in');
       }
       $('#mensaje span').html(texto);
       $('#mensaje').insertAfter(lugar);
       $('#mensaje').show(1000, function(){

       });
    }

    function showAlertRedirect(lugar,tipo,texto,url) {
       if (tipo=="error"){
         $('#mensaje2').attr('class','alert alert-danger fade in');
       } else {
        $('#mensaje2 strong').html(' ');
        $('#mensaje2').attr('class','alert alert-success fade in');
       }
       $('#mensaje2 span').html(texto);
       $('#mensaje2').insertAfter(lugar);
       $('#mensaje2').slideToggle("slow", function(){
        window.setTimeout(function() {
         window.location.replace(url);   
        }, 4000);
       });
    }