$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');
    $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
    }, "Value must not equal arg.");

	var reglas = {
		fecha:{required:true},
        id_alumno:{required:true},
		id_horario_grupo:{required:true},
		observaciones:{required:true},
	};

	var mensajes = {
		fecha:{required:""},
        id_alumno:{required:""},
		id_horario_grupo:{required:""},
		observaciones:{required:""},
	};

	
	$('#nombrebusquedaFalta').keyup(function(event) {
		buscarFaltas();
	});

	$('#form').submit(function(event) {
		event.preventDefault();
		buscarFaltas();

	});


	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		console.log(datos);
		buscarFaltaId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/updateFalta' id='formUpdate' name='formUpdate' method='post'>";
    			formulario += "<div class='form-inline has-success'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='id_faltas' id='labelIdFaltas' class='input-group-addon'>ID FALTA</label>";   		
	    		formulario += "<input type='text' id='id_faltasFalta' name='id_faltas' class='form-control has-feedback' value='"+result[0].id_faltas+"'readonly>";
	    		formulario += "<span id='id_faltasFalta1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
				formulario += "<div class='form-inline'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label id='labelFechaFalta' for='fecha' class='input-group-addon'>FECHA</label>"; 
				var fecha = result[0].fecha;
				var fechaCortada = fecha.split('T')[0];
	            formulario += "<input id='fechaFalta' type='text' name='fecha' class='form-control has-feedback' value='"+fechaCortada+"' readonly/></br>";
	       		formulario += "<span id='fechaFalta1' class='glyphicon form-control-feedback'></span>";
	            formulario += "</div>";
	  			formulario += "</div><br/>";            
	  			buscarTodosLosIdNombreApellidosAlumno(result[0].id_alumno);
				formulario += "<div id='alumnos'>";
	    		formulario += "</div>";	
	    		formulario += "<div class='form-inline'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='id_horario_grupo' id='labelId_horario_grupoFalta' class='input-group-addon'>ID HORARIO GRUPO</label>";   		
	    		formulario += "<input type='text' id='id_horario_grupoFalta' name='id_horario_grupo' class='form-control' value='"+result[0].id_horario_grupo+"' readonly>";
	    		formulario += "<span id='id_horario_grupoFalta1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	  			mostrarHorarioGrupo(result[0].id_horario_grupo);
				formulario += "<div id='horarioGrupo'>";
	    		formulario += "</div>";
	    		formulario += "<div class='form-inline'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='observaciones' id='labelObservacionesFalta' class='input-group-addon'>OBSERVACIONES</label>";   		
	    		formulario += "<textarea id='observacionesFalta' name='observaciones' class='form-control'>"+result[0].observaciones+"</textarea>";
	    		formulario += "<span id='observacionesFalta1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";			
				formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
	    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
	    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
	    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Nombre ya existente</span></div>";	
	    		formulario += "<div id='mensaje2' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp2'> Clave ya existente</span></div>";
	    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//Formulario modificar y borrar

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
	            console.log(data);
			        $.ajax({
			            url: '/configFalta/updateFalta',
			            type: 'post',
			            dataType: 'json',
			            data: data,
			            success: function (data) {
			            }
			        })
			        .done(function(data) {
				        if (data.err=="existe"){
                			$('#id_faltasFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#id_faltasFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                			$('#fechaFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#fechaFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                			$('#selectAlumnoFaltasM').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#selectAlumnoFaltasM1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                			$('#id_horario_grupoFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#id_horario_grupoFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                			$('#diaFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#diaFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                			$('#hora_inicioFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#hora_inicioFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');				                
                			$('#hora_finalFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#hora_finalFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');					                
                			$('#observacionesFalta').closest('.form-inline').removeClass('has-success').addClass('has-error');
                			$('#observacionesFalta1').removeClass('glyphicon-ok').addClass('glyphicon-remove');	
				            showAlert($('#resultado #enlace2'),"error"," Falta ya existente ");
				        }else if (data.dato=="ok"){
                			$('#id_faltasFalta').closest('.form-inline').removeClass('has-error').addClass('has-success');
                			$('#id_faltasFalta1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				                
                			$('#diaFalta').closest('.form-inline').removeClass('has-error').addClass('has-success');
                			$('#diaFalta1').removeClass('glyphicon-remove').addClass('glyphicon-ok');	
                			$('#hora_inicioFalta').closest('.form-inline').removeClass('has-error').addClass('has-success');
                			$('#hora_inicioFalta1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
                			$('#hora_finalFalta').closest('.form-inline').removeClass('has-error').addClass('has-success');
                			$('#hora_finalFalta1').removeClass('glyphicon-remove').addClass('glyphicon-ok');	
				            $('#resultado #mensaje').hide();
				            showAlertRedirect($('#resultado #enlace2'),"ok"," Falta modificada correctamente",'/config');
				        }
				        console.log("success");
					    })
					    .fail(function() {
			              console.log("error");
			            })        
	        }//submitHandler
	    });//Validate
	});//$('#resultado').on("click","#btnModificar",function () {

	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarFaltas () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configFalta/buscarFaltaPorNombreAlumno',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				console.log(data);
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					console.log(data);
					var fecha = data[i].fecha;
					var fechaCortada = fecha.split('T')[0];
					resp += "<h3 class='busquedaH3Falta' id='"+data[i].id_faltas+"'>Aula: "+data[i].numero+" Grupo: "+data[i].nombre_grupo+" Asignatura: "+data[i].nombreAsignatura+" Hora: "+data[i].hora_inicio+"-"+data[i].hora_final+" Nombre: "+data[i].nombreAlumno+" Apellidos: "+data[i].apellidos+"</h3>";
					resp += "<img class='busquedaFoto id='fotoAlumno' alt='fotoAlumno' src='data:img/png;base64,"+data[i].foto+"'/>";					
					resp += "</td></tr></table>";
				};
				$('#resultado').html(resp);
					if($("#resultado").children('table').length<=1){
						$("#footer").css("bottom",0);
					} else {
						$("#footer").css("bottom","auto");
					}
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarFaltas

	//funcion para buscar alumnos por id
	function buscarFaltaId (id) { 
		return	$.ajax({
					url: '/configFalta/buscarFaltaPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_faltas:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarFaltaPorId

			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar la falta?")) {
			$.ajax({
				url: '/configFalta/borrarFalta',
				type: 'post',
				dataType: 'html',
				data: {'id_faltas':$('#resultado #id_faltasFalta').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				if (data[9]=="o"){
					$('#resultado #mensaje').hide();
				showAlertRedirect("#enlace2","ok"," Falta borrada correctamente",'/config');
				}
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//$('#resultado').on("click","#btnBorrar",function(event) {


		function buscarTodosLosIdNombreApellidosAlumno (id_alumno) {
			var result = id_alumno;
		$.ajax({
			url: '/configAlumno/buscarTodosLosIdNombreApellidosAlumno',
			type: 'post',
			dataType: 'json',
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
                resp += "<div class='input-group'>";
                resp += "<label id='labelAlumnoFaltas' for='id_alumno' class='input-group-addon'>ALUMNO</label>";
                resp += "<select id='selectAlumnoFaltasM' name='id_alumno' class='form-control has-feedback'>";
    			resp += "<option value='default'>Elige el alumno</option>";
				for (var i = 0; i < data.length; i++) {
					if (data[i].id_alumno == result){
						resp += "<option value="+data[i].id_alumno+" selected>"+data[i].nombre+"</option>";
					} else {
						resp += "<option value="+data[i].id_alumno+">"+data[i].nombre+"</option>";
					}
				};
				resp += "</select><span id='selectAlumnoFaltasM1' class='glyphicon form-control-feedback'></span>";
				resp += "</div>";
                resp += "</div><br/>";
				$('#alumnos').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarTodosLosIdNombreApellidosAlumno


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
						resp += "<label id='labelDiaHorarioProfesorFalta' for='dia' class='input-group-addon'>DIA</label>"; 
						resp += "<input type='text' id='diaFalta' name='dia' class='form-control has-feedback' value='"+data[i].dia_semana+"'readonly></br>";
						resp += "<span id='diaFalta1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
						resp += "</div>";
	  					resp += "</div><br/>";
	  					resp += "<div class='form-inline has-success'>";
	    				resp += "<div class='input-group'>";
						resp += "<label id='labelHoraInicioHorarioProfesorFalta' for='hora_inicio' class='input-group-addon'>HORA INICIO</label>"; 
						resp += "<input type='time' id='hora_inicioFalta' name='hora_inicio' class='form-control has-feedback' value='"+data[i].hora_inicio+"'readonly></br>";
						resp += "<span id='hora_inicioFalta1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
						resp += "</div>";
	  					resp += "</div><br/>";
	  					resp += "<div class='form-inline has-success'>";
	    				resp += "<div class='input-group'>";
						resp += "<label id='labelHoraFinalHorarioProfesorFalta' for='hora_final' class='input-group-addon'>HORA INICIO</label>"; 					
						resp += "<input type='time' id='hora_finalFalta' name='hora_final' class='form-control has-feedback' value='"+data[i].hora_final+"'readonly></br>";					
						resp += "<span id='hora_finalFalta1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
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
	}//function mostrarHorarioGrupo
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
    }//showAlertValidate

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
    }//showAlert

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
    }//showAlertRedirect