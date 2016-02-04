$(document).ready(function() {

    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},"Please enter only letters");
	
    jQuery.validator.addMethod("dni", function(value, element) {
        return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
    });

    //regla correo
    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

	//reglas
	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
        num_tarjeta:{required:true},
	};
	//mensajes
	var mensajes = {
		dni:{required:" Requerido",dni:"introduce un DNI correcto"},
        nombre:{required:" Requerido",lettersonly:"Solo letras"},
		apellidos:{required:" Requerido",lettersonly:"Solo letras"},
		correo:{required:" Requerido",correo:"introduce un Correo correcto"},
        num_tarjeta:{required:" Requerido"},
	};

	
	//Buscar alumnos al escribir
	$('#nombre').keyup(function(event) {
		buscarAlumnos();
	});

	//Buscar alumnos al clicar Buscar
	$('#form').submit(function(event) {
		event.preventDefault();
		buscarAlumnos();
	});
	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAlumnoPorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/modificarAlumno' id='formUpdate' name='formUpdate'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_alumno' class='input-group-addon'>ID ALUMNO</label>";     		
    		formulario += "<input type='text' id='id_alumno' name='id_alumno' class='form-control' value='"+result.id_alumno+"'readonly>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='dni' class='input-group-addon'>DNI</label>"; 
    		formulario += "<input type='text' id='dni' name='dni' class='form-control' value='"+result.dni+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";    		
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span> Dni ya existente</span></div>";	    		
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre' class='input-group-addon'>NOMBRE</label>"
    		formulario += "<input type='text' id='nombre' name='nombre' class='form-control' value='"+result.nombre+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>"; 
  			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='apellidos' class='input-group-addon'>APELLIDOS</label>"
    		formulario += "<input type='text' id='apellidos' name='apellidos' class='form-control' value='"+result.apellidos+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='correo' class='input-group-addon'>CORREO</label>" 
    		formulario += "<input type='text' id='correo' name='correo' class='form-control' value='"+result.correo+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<img id='fotoProfesor' alt='fotoProfesor' src='data:img/png;base64,"+result.foto+"'/></br>";
    		formulario += "<br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelfoto' for='foto' class='input-group-addon'>FOTO</label>";
    		formulario += "<input type='file' id='foto' name='foto' class='form-control'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label>"
    		formulario += "<input type='text' id='tarjeta_activada' name='tarjeta_activada' class='form-control' value='"+result.tarjeta_activada+"'>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='num_tarjeta' class='input-group-addon'>NUMERO TARJETA</label>"
    		formulario += "<input type='text' id='num_tarjeta' name='num_tarjeta' class='form-control' value='"+result.num_tarjeta+"'>";
			formulario += "</div>";
  			formulario += "</div><br/>";
			buscarGruposDelAlumno(result.id_alumno);
    		formulario += "<div id='gruposdelAlumno'>";
    		formulario += "</div>";
    		buscarTodosLosGrupos(result.id_alumno);
    		formulario += "<div id='gruposTodos'>";
    		formulario += "</div>";
    		formulario += "Asignaturas,selecciona la que quieres convalidar: <div id='AsignaturaGrupo'>";
    		formulario += "</div>";
			formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace' href='/config/configPersonas' class='btn btn-primary'>Volver</a>";
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
			errorPlacement: function(error,element){
				element.before(error);
			},
	        submitHandler: function (form) {
	        	if ($('#resultado #foto').val() == ''){
	        		event.preventDefault();
	            	var data = $("#formUpdate").serializeArray();
			            $.ajax({
			                url: '/configAlumno/modificarAlumnoSinFoto',
			                type: 'post',
			                dataType: 'json',
			                data: data,
			                success: function (data) {
			                }
			            })
			            .done(function(data) {
			                console.log(data)
				                if (data.err=="existeDNI"){
				                showAlert($('#resultado #dni'),"error","dni ya existente");
				                } else if (data.err=="existeCorreo"){
				                showAlert($('#resultado #correo'),"error","Correo ya existente");
				                } else if (data.err=="existeTarjeta"){
				                showAlert($('#resultado #num_tarjeta'),"error","Tarjeta ya existente");
				                }else if (data.dato=="ok"){
				                showAlert($('#resultado #enlace'),"ok","Alumno modificada correctamente");
				                window.location.replace('/config/configPersonas');
				                }
				                console.log("success");
					            })
					            .fail(function() {
			                console.log("error");
			            })
	        	} else {
	            	event.preventDefault();
	            	var formData = new FormData($('#resultado #formUpdate')[0]);
	            $.ajax({
	                url: '/configAlumno/modificarAlumno',
	                type: 'post',
	                data: formData,
	                async: false,
	                cache: false,
	                contentType: false,
	                processData: false,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
		                if (data.err=="existeDNI"){
		                showAlert($('#resultado #dni'),"error","dni ya existente");
		                } else if (data.err=="existeCorreo"){
		                showAlert($('#resultado #correo'),"error","Correo ya existente");
		                } else if (data.err=="existeTarjeta"){
		                showAlert($('#resultado #num_tarjeta'),"error","Tarjeta ya existente");
		                }else if (data.dato=="ok"){
		                showAlert($('#resultado #enlace'),"ok","Alumno modificada correctamente");
		                window.location.replace('/config/configPersonas');
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	            })
	            /*
	            *   Form Submit Fin
	            */
	        	}//.else	        
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarAlumnos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configAlumno/buscarAlumnoPorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr><td class='celda'>";
					resp += "<h3 id='"+data[i].id_alumno+"'>"+data[i].id_alumno+" "+data[i].nombre+"</h3>";
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
	}//function buscarAlumnos

	//funcion para buscar alumnos por id
	function buscarAlumnoPorId (id) { 
		return	$.ajax({
					url: '/configAlumno/buscarAlumnoPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarAlumnoPorId

			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar al alumno?")) {
			$.ajax({
				url: '/configAlumno/borrarAlumno',
				type: 'post',
				dataType: 'html',
				data: {'id_alumno':$('#resultado #id_alumno').val()},
				success:function(data){
					if (data == "ok") {
						alert("Alumno borrado correctamente");
						buscarAlumnos();
					}else{
						alert("Algo no ha ido bien");
					}//if else
				}//success
			})//ajax
			.done(function() {
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//click borrar formulario alumno

	//funcion para buscar las asignaturas de un grupo
	$('#resultado').on("change","#gruposdelAlumno" || "#gruposTodos",function () {
		$(":checkbox").click(function(){
	        var id = $(this).attr('id'); 
			console.log(id);
			console.log($(this).prop("checked"));
		if ($(this).prop("checked")) {
					$.ajax({
					url: '/configGrupo/buscarAsignaturasDelGrupo',
					type: 'post',
					dataType: 'json',
					data:{ id_grupo: id},
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='asignaturas' class='input-group-addon'>ASIGNATURAS</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'>";
							resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#AsignaturaGrupo').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
		} else {
			console.log("no estaba checked");
			$('#AsignaturaGrupo').html("");
		}
				/**/

			});//$(":checkbox").click(function()
	});

	//funcion para buscar todos los grupos
	function buscarGruposDelAlumno (id) {
		return	$.ajax({
					url: '/configGrupo/buscarGruposdelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='gruposdelAlumno' class='input-group-addon'>GRUPOS DEL ALUMNO</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='gruposdelAlumno'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"' checked>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#gruposdelAlumno').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

		//funcion para buscar todos los grupos
	function buscarTodosLosGrupos (id) {
		return	$.ajax({
					url: '/configGrupo/buscarTodosLosGrupos',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='gruposTodos' class='input-group-addon'>GRUPOS RESTANTES</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='gruposTodos'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"'>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#gruposTodos').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarTodosLosGrupos

});//ready

function showAlert(lugar,tipo,texto) {

    if (tipo=="error"){
        $('#mensaje').attr('class','alert alert-danger fade in');
    }else {
        $('#mensaje').attr('class','alert alert-success fade in');
    }
    $('#mensaje span').html(texto);
    $('#mensaje').insertAfter(lugar);
    $('#mensaje').fadeTo(2000, 500).slideUp(500, function(){
                });
    }

