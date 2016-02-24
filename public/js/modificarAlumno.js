$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');
    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    	return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},"Please enter only letters");
	
    jQuery.validator.addMethod("dni", function(value, element) {
        if ($('#dniAlumno').val().length == 10){
            return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
        }
    });

    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
        num_tarjeta:{required:true},
	};

	var mensajes = {
		dni:{required:"",dni:""},
        nombre:{required:"",lettersonly:""},
		apellidos:{required:"",lettersonly:""},
		correo:{required:"",correo:""},
        num_tarjeta:{required:""},
	};

	$('#nombrebusquedaAlumno').keyup(function(event) {
		$("#footer").css("bottom","auto");
		buscarAlumnos();
	});

	$('#form').submit(function(event) {
		event.preventDefault();
		$("#footer").css("bottom","auto");
		buscarAlumnos();
	});

	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAlumnoPorId(datos[0].id)
		.done(function(result) {	
    		var formulario = "<form class='form-group' action='/modificarAlumno' id='formUpdate' name='formUpdate'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_alumno' id='labelIdAlumno' class='input-group-addon'>ID ALUMNO</label>";     		
    		formulario += "<input type='text' id='Id_alumno' name='id_alumno' class='form-control has-feedback' value='"+result[0].id_alumno+"'readonly>";
    		formulario += "<span id='Id_alumno1' class='glyphicon form-control-feedback'></span>";    		    		
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			formulario += "<div class='form-inline' id='alertDni'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='dni' id='labelDniAlumno' class='input-group-addon'>DNI</label>"; 
    		formulario += "<input type='text' id='dniAlumno' name='dni' class='form-control has-feedback' value='"+result[0].dni+"'>";
    		formulario += "<span id='dniAlumno1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";    		
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Dni ya existente</span></div>";	    		
    		formulario += "<div class='form-inline'  id='alertNombre'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre' id='labelNombreAlumno' class='input-group-addon'>NOMBRE</label>"
    		formulario += "<input type='text' id='nombreAlumno' name='nombre' class='form-control has-feedback' value='"+result[0].nombre+"'>";
    		formulario += "<span id='nombreAlumno1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>"; 
  			formulario += "<div class='form-inline'  id='alertApellidos'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='apellidos'  id='labelApellidosAlumno' class='input-group-addon'>APELLIDOS</label>"
    		formulario += "<input type='text' id='apellidosAlumno' name='apellidos' class='form-control has-feedback' value='"+result[0].apellidos+"'>";
    		formulario += "<span id='apellidosAlumno1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			formulario += "<div class='form-inline'  id='alertCorreo'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='correo' id='labelCorreoAlumno' class='input-group-addon'>CORREO</label>" 
    		formulario += "<input type='text' id='correoAlumno' name='correo' class='form-control has-feedback' value='"+result[0].correo+"'>";
    		formulario += "<span id='correoAlumno1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
    		formulario += "<img id='fotoAlumnoPre' alt='fotoAlumno' src='data:img/png;base64,"+result[0].foto+"'/></br>";
    		formulario += "<br/>";
    		formulario += "<div class='form-inline'  id='alertFoto'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label id='labelFotoAlumno' for='foto' class='input-group-addon'>FOTO</label>";
    		formulario += "<input type='file' id='fotoAlumno' name='foto' class='form-control has-feedback'>";
    		formulario += "<span id='fotoAlumno1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";
  			   if(result[0].tarjeta_activada == 1){
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTarjeta_activadaAlumno' for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label><br/>";
					formulario += "<label id='labeltarjeta1Alumno' for='tarjeta1'>SI</label>";
				    formulario += "<input id='tarjeta1Alumno' type='radio' name='tarjeta_activada' value='1' class='radio form-control' checked='checked'/>";
				    formulario += "<label id='labeltarjetaAlumno' for='tarjeta'>NO  </label>";
				    formulario += "<input id='tarjetaAlumno' type='radio' name='tarjeta_activada' value='0' class='radio form-control'/><span id='tarjetaAlumno11' class='glyphicon form-control-feedback'></span>";
					formulario += "</br>";
					formulario += "</div>";
  					formulario += "</div><br/>";
				} else {
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTarjeta_activadaAlumno' for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label><br/>";
					formulario += "<label id='labeltarjeta1Alumno' for='tarjeta1'>SI</label>";
				    formulario += "<input id='tarjeta1Alumno' type='radio' name='tarjeta_activada' value='1' class='radio form-control' />";
				    formulario += "<label id='labeltarjetaAlumno' for='tarjeta'>NO  </label>";
				    formulario += "<input id='tarjetaAlumno' type='radio' name='tarjeta_activada' value='0' class='radio form-control'checked='checked'/><span id='tarjetaAlumno11' class='glyphicon form-control-feedback'></span>";
					formulario += "</br>";
					formulario += "</div>";
  					formulario += "</div><br/>";					
				}
    		formulario += "<div class='form-inline'  id='alertNum_tarj'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='num_tarjeta' id='labelNum_tarjAlumno' class='input-group-addon'>NUMERO TARJETA</label>"
    		formulario += "<input type='text' id='num_tarjetaAlumno' name='num_tarjeta' class='form-control has-feedback' value='"+result[0].num_tarjeta+"'>";
			formulario += "<span id='num_tarjetaAlumno1' class='glyphicon form-control-feedback'></span>";
			formulario += "</div>";
  			formulario += "</div><br/>";
			buscarGruposDelAlumno(result[0].id_alumno);
    		formulario += "<div id='gruposdelAlumno'>";
    		formulario += "</div>";
    		buscarTodosLosGrupos(result[0].id_alumno);
    		formulario += "<div id='gruposTodos' hidden>";
    		formulario += "</div>";
    		buscarAsignaturasConvalidadasDelAlumno(result[0].id_alumno);
    		formulario += "Asignaturas,selecciona la que quieres convalidar: </br><div id='AsignaturaGrupo'>";
    		formulario += "</div>";
			buscarAsignaturasNoConvalidadasDelAlumno(result[0].id_alumno);
			formulario += "<div id='AsignaturaGrupoRestante'>";
    		formulario += "</div>";
			formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
    		formulario += "<div id='mensaje2' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp2'> Clave ya existente</span></div>";
    		formulario += "</form>";
    		$('#resultado').html(formulario);
		}).fail(function() {
    		console.log("error crear formulario");
		});
	});//$('#resultado').on("click",".celda",function () {

	$('#resultado').on("click","#btnModificar",function () {
		$("#formUpdate").validate({
			rules:reglas,
		    messages:mensajes,
		    highlight: function(element) {
		        if (element.type == "radio"){
		            if ($("input[name=tarjeta_activada]:checked").val() == 1){
		                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
		                $("#tarjetaAlumno11").removeClass('glyphicon-ok').addClass('glyphicon-remove');
		            } else {
		                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
		                $("#tarjetaAlumno11").removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
		            }
		        } else {
		            var id_attr = "#" + $( element ).attr("id") + "1";
		            $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
		            $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
		        }
		        },
		        unhighlight: function(element) {
		            if (element.type == "radio"){
		                if ($("input[name=tarjeta_activada]:checked").val() == 1){
		                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
		                    $("#tarjetaAlumno11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
		                } else {
		                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
		                    $("#tarjetaAlumno11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
		                }
		            } else {
		                var id_attr = "#" + $( element ).attr("id") + "1";
		                $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
		                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');  
		            }         
		        },
		        errorPlacement: function(error,element){
		        	console.log(error.attr("id"));
		            if (error.attr("id") == "dniAlumno-error"){
		                showAlertValidate("#alertDni"," Introduce un dni correcto");
		            } else if (error.attr("id") == "nombreAlumno-error"){
		                showAlertValidate("#alertNombre"," Solo Letras por favor");
		            }else if (error.attr("id") == "apellidosAlumno-error"){
		                showAlertValidate("#alertApellidos"," Solo Letras por favor");
		            } else if (error.attr("id") == "correoAlumno-error"){
		                showAlertValidate("#alertCorreo"," Introduce un correo correcto");
		            } else if (error.attr("id") == "fotoAlumno-error"){
		                showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
		            }      
		        },
		        submitHandler: function (form) {
		        	console.log($('#resultado #gruposdelAlumno :checkbox').length);
		        	if ($('#resultado #fotoAlumno').val() == ''){
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
				                	$('#dniAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
				                    $('#dniAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove'); 				                
					                showAlert($('#resultado #alertDni'),"error"," DNI ya existente");
					            } else if (data.err=="existeCorreo"){
				                    $('#correoAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
				                    $('#correoAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove');				                
					                showAlert($('#resultado #alertCorreo'),"error"," Correo ya existente");
					            } else if (data.err=="existeTarjeta"){
				                    $('#num_tarjetaAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
				                    $('#num_tarjetaAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove');				                
					                showAlert($('#resultado #alertNum_tarj'),"error"," Tarjeta ya existente");
					            } else if (data.err=="nogrupo"){
					                showAlertValidate("#enlace2"," Selecciona un grupo para el alumno");	
					            }else if (data.dato=="ok"){
					                $('#Id_alumno').closest('.form-inline').removeClass('has-error').addClass('has-success');
					                $('#Id_alumno1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
					        		$('#fotoAlumno').closest('.form-inline').removeClass('has-error').addClass('has-success');
					        		$('#fotoAlumno1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				               
					                $('#tarjetaAlumno').closest('.form-inline').removeClass('has-error').addClass('has-success');
					                $('#tarjetaAlumno11').removeClass('glyphicon-remove').addClass('glyphicon-ok');				                
					                $('#resultado #mensaje').hide();
					                showAlertRedirect($('#resultado #enlace2'),"ok"," Alumno modificado correctamente",'/config');
					            }
					            console.log("success");
						        }).fail(function() {
				                console.log("error");
				            })
		        	} else {
		        		var attach_id = $('#resultado #fotoAlumno').attr("id");
						var size = $('#'+attach_id)[0].files[0].size;
						if (size > 102400){
					        $('#fotoAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
					        $('#fotoAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove');			           	
				            showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
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
		            		}).done(function(data) {
		                	console.log(data)
			                	if (data.err=="existeDNI"){
				            		$('#dniAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
				           			$('#dniAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove'); 		                
			                		showAlert($('#resultado #alertDni'),"error","dni ya existente");
			                	} else if (data.err=="existeCorreo"){
				            		$('#correoAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
				            		$('#correoAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove');			                
			                		showAlert($('#resultado #alertCorreo'),"error","Correo ya existente");
			                	} else if (data.err=="existeTarjeta"){
				            		$('#num_tarjetaAlumno').closest('.form-inline').removeClass('has-success').addClass('has-error');
				            		$('#num_tarjetaAlumno1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
			                		showAlert($('#resultado #alertNum_tarj'),"error","Tarjeta ya existente");
					        	} else if (data.err=="nogrupo"){
					        		showAlertValidate("#enlace2"," Selecciona un grupo para el alumno");	
					        	}else if (data.dato=="ok"){
					        		$('#Id_alumno').closest('.form-inline').removeClass('has-error').addClass('has-success');
					        		$('#Id_alumno1').removeClass('glyphicon-remove').addClass('glyphicon-ok');		                
					        		$('#fotoAlumno').closest('.form-inline').removeClass('has-error').addClass('has-success');
					        		$('#fotoAlumno1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				        
					        		$('#tarjetaAlumno').closest('.form-inline').removeClass('has-error').addClass('has-success');
					        		$('#tarjetaAlumno11').removeClass('glyphicon-remove').addClass('glyphicon-ok');		                
			                		$('#resultado #mensaje').hide();
			                		showAlertRedirect($('#resultado #enlace2'),"ok","Alumno modificado correctamente",'/config');
			                	}
			                	console.log("success");
				            }).fail(function() {
		                	console.log("error");
		            		})
		            	}//.else if (size > 102400)
		        	}//.else	        
		        }//submitHandler
	    });//Validate
	});//.$('#resultado').on("click","#btnModificar",function () {

	
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
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					resp += "<h3 class='busquedaH3Alumno' id='"+data[i].id_alumno+"'> Dni: "+data[i].dni+" Nombre: "+data[i].nombre+" Apellidos:  "+data[i].apellidos+" Correo: "+data[i].correo+"</h3>";
					resp += "<img class='busquedaFotoAlumno'id='fotoBusquedaAlumno' alt='fotoBusquedaAlumno' src='data:img/png;base64,"+data[i].foto+"'/>";					
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
				data: {'id_alumno':$('#resultado #Id_alumno').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				if (data[9]=="o"){
					$('#resultado #mensaje').hide();
					showAlertRedirect("#enlace2","ok"," Alumno borrado correctamente",'/config');
				}
				console.log("success borrar");
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//$('#resultado').on("click","#btnBorrar",function(event) {

	//funcion para buscar las asignaturas de un grupo
	$('#resultado').on("change","#gruposdelAlumno" || "#gruposTodos",function () {
		$(":checkbox").click(function(){
	    	var arrayId_grupo=[];
		    $('#gruposdelAlumno  :checkbox').each(function(){
		    	if($(this).prop('checked')){
		    		arrayId_grupo.push($(this).attr('value'));
		    	} })
		   	$('#gruposTodos  :checkbox').each(function(){
		    	if($(this).prop('checked')){
		    		arrayId_grupo.push($(this).attr('value'));
		    	} })
		   	console.log(arrayId_grupo.length);
		   	if (arrayId_grupo.length == 0){
		   		$('#AsignaturaGrupoRestante').html('');
				$('#AsignaturaGrupo').html('');
		   	} else {
				$.ajax({
					url: '/configGrupo/buscarAsignaturasDelosGrupos',
					type: 'post',
					dataType: 'json',
					data: {id_grupo:arrayId_grupo},
					success:function (data) {
						$('#AsignaturaGrupoRestante').html('');
						$('#AsignaturaGrupo').html('');
						var resp = "";
						resp += "<div class='form-inline'>";
	    				resp += "<div class='input-group'>";
						resp += "<label for='asignaturas' class='input-group-addon'>ASIGNATURAS</label>";
						resp += "</div>";
	  					resp += "</div><br/>";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr class='asignaturas'>";
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
			}//.else
		});//$(":checkbox").click(function()
	});//.$('#resultado').on("change","#gruposdelAlumno" || "#gruposTodos",function () {

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
							resp += "<tr class='grupos'>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_grupo+"' name='grupo' value='"+data[i].id_grupo+"' checked='true'>";
							resp += "<label for='"+data[i].id_grupo+"'>"+data[i].nombre_grupo+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						resp += "<a id='btnMostrarGrupos' class='btn btn-info'>Mostrar Los Grupos</a>";
						resp += "</br>";
						$('#gruposdelAlumno').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarGruposDelAlumno

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
							resp += "<tr class='grupos'>";
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

			//funcion para buscar las asignaturas de un grupo
	function buscarAsignaturasConvalidadasDelAlumno (id) {
		return	$.ajax({
					url: '/configAlumno/buscarAsignaturasConvalidadasDelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<div class='form-inline'>";
    					resp += "<div class='input-group'>";
						resp += "<label for='asignaturas' class='input-group-addon'>ASIGNATURAS</label>";
						resp += "</div>";
  						resp += "</div><br/>";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr class='asignaturas'>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'checked='true' >";
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
	}//function buscarAsignaturasConvalidadasDelAlumno

		function buscarAsignaturasNoConvalidadasDelAlumno (id) {
		return	$.ajax({
					url: '/configAlumno/buscarAsignaturasNoConvalidadasDelAlumno',
					type: 'post',
					dataType: 'json',
					data:{ id_alumno:id },
					success:function (data) {
						var resp = "";
						resp += "<table id='asignaturas'>";
						for (var i = 0; i < data.length; i++) {
							resp += "<tr class='asignaturas'>";
							resp += "<td>";
							resp += "<input type='checkbox' id='"+data[i].id_asignatura+"' name='asignatura' value='"+data[i].id_asignatura+"'>";
							resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
							resp += "</td>";
							resp += "</tr>"
						};
						resp += "</table>";
						$('#AsignaturaGrupoRestante').html(resp);
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarAsignaturasNoConvalidadasDelAlumno

		$('#resultado').on("change","#AsignaturaGrupo" || "#AsignaturaGrupoRestante" || "#gruposdelAlumno"  || "#gruposTodos" ,function () {
			$(":checkbox").click(function(){
		        var id = $(this).attr('id'); 
			if ($(this).attr("checked",true)) {
				$(this).attr("checked",false);
			} else {
				$(this).attr("checked",true)
			}
			});//$(":checkbox").click(function()
		});//.$('#resultado').on("change","#AsignaturaGrupo" || "#AsignaturaGrupoRestante" || "#gruposdelAlumno"  || "#gruposTodos" ,function () {

		$('#resultado').on("click","#btnMostrarGrupos",function(event) {
			if ($('#resultado #btnMostrarGrupos').html() == "Mostrar Los Grupos"){
				$('#resultado #gruposTodos ').show();
		 		$('#resultado #btnMostrarGrupos').html("Ocultar los Grupos");
			} else if ($('#resultado #btnMostrarGrupos').html() == "Ocultar los Grupos"){
				$('#resultado #gruposTodos').hide();
		 		$('#resultado #btnMostrarGrupos').html("Mostrar Los Grupos");				
			}
		});//$('#resultado').on("click","#btnMostrarGrupos",function(event) {

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
    }//.showAlertValidate

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
    }//.showAlert

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
    }//.showAlertRedirect