$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');

    jQuery.validator.addMethod("lettersonly", function(value, element) { 
    return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	},"Please enter only letters");

    jQuery.validator.addMethod("dni", function(value, element) {
        if ($('#dniProfesor').val().length == 10){
            return this.optional(element) || /(\d{8})([-]?)([A-Z]{1})/i.test(value);
        }
    });

    jQuery.validator.addMethod("correo", function(value, element) {
        return this.optional(element) || /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i.test(value);
    });

    jQuery.validator.addMethod("convertHash", function(value) {
        var hash = md5(value, '2063c1608d6e0baf80249c42e2be5804');
        $('#pass').val(hash);
        return hash;
    }, 'Hash');

	var reglas = {
		dni:{required:true,dni:true},
        nombre:{required:true,lettersonly:true},
		apellidos:{required:true,lettersonly:true},
		correo:{required:true,correo:true},
		passwordnuevo:{convertHash:true},
        num_tarjeta:{required:true},
	};

	var mensajes = {
		dni:{required:"",dni:""},
        nombre:{required:"",lettersonly:""},
		apellidos:{required:"",lettersonly:""},
		correo:{required:"",correo:""},
		passwordnuevo:{convertHash:""},
        num_tarjeta:{required:""},
	};

	$('#nombrebusquedaProfesor').keyup(function(event) {
		$("#footer").css("bottom","auto");
		buscarProfesores();
	});

	$('#form').submit(function(event) {
		event.preventDefault();
		$("#footer").css("bottom","auto");
		buscarProfesores();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarProfesorPorId(datos[0].id)
		.done(function(result) {
    		var formulario = "<form class='form-group' action='/modificarProfesor' id='formUpdate' name='formUpdate'>";
	    		formulario += "<div class='form-inline'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='id_profesor' id='labelIdProfesor' class='input-group-addon'>ID PROFESOR</label>";
	    		formulario += "<input type='text' id='Id_profesor' name='id_profesor' class='form-control' value='"+result[0].id_profesor+"'readonly>";
	    		formulario += "<span id='Id_profesor1' class='glyphicon form-control-feedback'></span>";    		    		    		
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	    		formulario += "<div class='form-inline' id='alertDni'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='dni' id='labelDniProfesor' class='input-group-addon'>DNI</label>";
	    		formulario += "<input type='text' id='dniProfesor' name='dni' class='form-control has-feedback' value='"+result[0].dni+"'>";
	    		formulario += "<span id='dniProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Dni ya existente</span></div>";	    		    		
	    		formulario += "<div class='form-inline' id='alertNombre'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='nombre' id='labelNombreProfesor' class='input-group-addon'>NOMBRE</label>";
	    		formulario += "<input type='text' id='nombreProfesor' name='nombre' class='form-control has-feedback' value='"+result[0].nombre+"'>";
	    		formulario += "<span id='nombreProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	    		formulario += "<div class='form-inline' id='alertApellidos'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='apellidos' id='labelApellidosProfesor' class='input-group-addon'>APELLIDOS</label>";
	    		formulario += "<input type='text' id='apellidosProfesor' name='apellidos' class='form-control has-feedback' value='"+result[0].apellidos+"'>";
	    		formulario += "<span id='apellidosProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	    		formulario += "<div class='form-inline' id='alertCorreo'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='correo' id='labelCorreoProfesor' class='input-group-addon'>CORREO</label>";
	    		formulario += "<input type='text' id='correoProfesor' name='correo' class='form-control has-feedback' value='"+result[0].correo+"'>";
	    		formulario += "<span id='correoProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";    		
	    		formulario += "<input type='hidden' id='passwordviejo' name='passwordviejo' class='form-control' value='"+result[0].password+"'>";
	    		formulario += "<div class='form-inline'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='password' id='labelPasswordViejo' class='input-group-addon'>PASSWORD VIEJO</label>";
	    		formulario += "<input type='password' id='passwordProfesor' name='password' class='form-control has-feedback' value=''>";
	    		formulario += "<span id='passwordProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	    		formulario += "<input type='hidden' id='passwordhash' name='passwordhash' class='form-control'>";
	    		formulario += "<div class='form-inline' id='divpasswordnuevo' hidden>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='passwordnuevo' id='labelPassword' class='input-group-addon'>PASSWORD NUEVO</label>";
	    		formulario += "<input type='password' id='passwordNewProfesor' name='passwordnuevo' class='form-control has-feedback' value=''>";
	    		formulario += "<span id='passwordNewProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	  			formulario += "<div class='form-inline' id='divpasswordnuevorepetido' hidden>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='passwordnuevorepetido' id='labelPasswordR' class='input-group-addon'>REPETIR PASSWORD NUEVO</label>";
	    		formulario += "<input type='password' id='passwordNewRepProfesor' name='passwordnuevorepetido' class='form-control has-feedback' value=''>";
	    		formulario += "<span id='passwordNewRepProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	    		formulario += "<input type='hidden' id='pass' name='pass' class='form-control'>";
	    		formulario += "<img id='fotoProfesorPre' alt='fotoProfesor' src='data:img/png;base64,"+result[0].foto+"' width='100' height='100'/>";
	    		formulario += "<div class='form-inline' id='alertFoto'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='foto' id='labelFotoProfesor' class='input-group-addon'>FOTO</label>";
	    		formulario += "<input type='file' id='fotoProfesor' name='foto' class='form-control  has-feedback'>";
	    		formulario += "<span id='fotoProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	  			   if(result[0].tarjeta_activada == 1){
						formulario += "<div class='form-inline'>";
	    				formulario += "<div class='input-group'>";
					    formulario += "<label id='labelTarjeta_activadaProfesor' for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label><br/>";
					    formulario += "<label id='labeltarjeta1Profesor' for='tarjetaProfesor1'>SI</label>";
					    formulario += "<input id='tarjetaProfesor1' type='radio' name='tarjeta_activada' value='1' class='radio form-control' checked='checked'/>";
					    formulario += "<label id='labeltarjetaProfesor' for='tarjetaProfesor'>NO  </label>";
					    formulario += "<input id='tarjetaProfesor' type='radio' name='tarjeta_activada' value='0' class='radio form-control'/><span id='tarjetaProfesor11' class='glyphicon form-control-feedback'></span>";
						formulario += "</br>";
						formulario += "</div>";
	  					formulario += "</div><br/>";		  					
					} else {
						formulario += "<div class='form-inline'>";
	    				formulario += "<div class='input-group'>";
					    formulario += "<label id='labelTarjeta_activadaProfesor' for='tarjeta_activada' class='input-group-addon'>TARJETA ACTIVADA</label><br/>";
					    formulario += "<label id='labeltarjeta1Profesor' for='tarjetaProfesor1'>SI</label>";
					    formulario += "<input id='tarjetaProfesor1' type='radio' name='tarjeta_activada' value='1' class='radio form-control' />";
					    formulario += "<label id='labeltarjetaProfesor' for='tarjetaProfesor'>NO  </label>";
					    formulario += "<input id='tarjetaProfesor' type='radio' name='tarjeta_activada' value='0' class='radio form-control' checked='checked'/><span id='tarjetaProfesor11' class='glyphicon form-control-feedback'></span>";
						formulario += "</br>";
						formulario += "</div>";
	  					formulario += "</div><br/>";					
					}
	    		formulario += "<div class='form-inline' id='alertNum_tarj'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='num_tarjeta' id='labelNum_tarjProfesor' class='input-group-addon'>NUMERO TARJETA</label>";
	    		formulario += "<input type='text' id='num_tarjetaProfesor' name='num_tarjeta' class='form-control  has-feedback' value='"+result[0].num_tarjeta+"'>";
	    		formulario += "<span id='num_tarjetaProfesor1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	  			   if(result[0].admin == 1){
					formulario += "<div class='form-inline'>";
	    				formulario += "<div class='input-group'>";
					    formulario += "<label id='labelAdminProfesor' for='admin' class='input-group-addon'>ADMINISTRADOR</label><br/>";
					    formulario += "<label id='labeladmin1Profesor' for='adminProfesor1'>SI</label>";
					    formulario += "<input id='adminProfesor1' type='radio' name='admin' value='1' class='radio form-control' checked='checked'/>";
					    formulario += "<label id='labeladminProfesor' for='adminProfesor'>NO  </label>";
					    formulario += "<input id='adminProfesor' type='radio' name='admin' value='0' class='radio form-control'/><span id='adminProfesor11' class='glyphicon form-control-feedback'></span>";
						formulario += "</br>";
						formulario += "</div>";
	  					formulario += "</div><br/>";	  					


					} else {
					formulario += "<div class='form-inline'>";
	    				formulario += "<div class='input-group'>";
					    formulario += "<label id='labelAdminProfesor' for='admin' class='input-group-addon'>ADMINISTRADOR</label><br/>";
					    formulario += "<label id='labeladmin1Profesor' for='adminProfesor1'>SI</label>";
					    formulario += "<input id='adminProfesor1' type='radio' name='admin' value='1' class='radio form-control' />";
					    formulario += "<label id='labeladminProfesor' for='adminProfesor'>NO  </label>";
					    formulario += "<input id='adminProfesor' type='radio' name='admin' value='0' class='radio form-control' checked='checked'/><span id='adminProfesor11' class='glyphicon form-control-feedback'></span>";
						formulario += "</br>";
						formulario += "</div>";
	  					formulario += "</div><br/>";					
					}  			
	    		buscarAsignaturasQueImparte(result[0].id_profesor);
	    		formulario += "<div id='asignaturasdelProfesor'>";
	    		formulario += "</div>";
				formulario += "<div class='form-inline'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO DE ASIGNATURA</label>";
				formulario += "<select id='tipo' name='tipo' class='form-control'>";
	    		formulario += "<option value='Ambos'>Ambos</option>";
	    		formulario += "<option value='FP'>FP</option>";
	    		formulario += "<option value='Bachiller'>Bachiller</option>";    		
	     		formulario += "</select>";
	     		formulario += "</div>";
	  			formulario += "</div><br/>";	
	    		buscarTodasLasAsignaturas(result[0].id_profesor);
	    		formulario += "<div id='asignaturasTodas'>";
	    		formulario += "</div>";
				formulario += "<input type='submit' id='btnModificar' class='btn btn-warning' value='Modificar'>";
	    		formulario += "&nbsp;<button id='btnBorrar' class='btn btn-danger'>Borrar</button>";
	    		formulario += "&nbsp;<a id='enlace2' href='/config' class='btn btn-primary'>Volver</a>";
	    		formulario += "<div id='mensaje2' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp2'> Clave ya existente</span></div>";
	    		formulario += "</form>";
    		$('#resultado').html(formulario);
		})
		.fail(function() {
    		console.log("error crear formulario");
		});
	});//$('#resultado').on("click",".celda",function () {
	
	$('#resultado').on('keydown','#passwordProfesor', function(event) {
		$('#resultado #divpasswordnuevo').show();
		$('#resultado #divpasswordnuevorepetido').show();
	});//$('#resultado').on('keydown','#passwordProfesor', function(event) {

	$('#resultado').on("click","#btnModificar",function () {
		$("#formUpdate").validate({
	        rules:reglas,
	        messages:mensajes,
	        highlight: function(element) {
	        if (element.type == "radio"){
	            if ($("input[name=admin]:checked").val() == 1){
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $("#adminProfesor11").removeClass('glyphicon-ok').addClass('glyphicon-remove');
	            } else {
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $("#adminProfesor11").removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
	            }
	           	if ($("input[name=tarjeta_activada]:checked").val() == 1){
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $("#tarjetaProfesor11").removeClass('glyphicon-ok').addClass('glyphicon-remove');
	            } else {
	                $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	                $("#tarjetaProfesor11").removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
	            }
	        } else {
	            var id_attr = "#" + $( element ).attr("id") + "1";
	            $(element).closest('.form-inline').removeClass('has-success').addClass('has-error');
	            $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove'); 
	        }
	        },
	        unhighlight: function(element) {
	            if (element.type == "radio"){
	                if ($("input[name=admin]:checked").val() == 1){
	                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                    $("#adminProfesor11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
	                } else {
	                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                    $("#adminProfesor11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
	                }
	               	if ($("input[name=tarjeta_activada]:checked").val() == 1){
	                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                    $("#tarjetaProfesor11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
	                } else {
	                    $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                    $("#tarjetaProfesor11").removeClass('glyphicon-remove').addClass('glyphicon-ok'); 
	                }
	            } else {
	                var id_attr = "#" + $( element ).attr("id") + "1";
	                $(element).closest('.form-inline').removeClass('has-error').addClass('has-success');
	                $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');  
	            }         
	        },
	        errorPlacement: function(error,element){
	            console.log(error.attr("id"));
	            if (error.attr("id") == "dniProfesor-error"){
	                 showAlertValidate("#alertDni"," Introduce un dni correcto");
	            } else if (error.attr("id") == "nombreProfesor-error"){
	                showAlertValidate("#alertNombre"," Solo Letras por favor");
	            }else if (error.attr("id") == "apellidosProfesor-error"){
	                showAlertValidate("#alertApellidos"," Solo Letras por favor");
	            } else if (error.attr("id") == "correoProfesor-error"){
	                showAlertValidate("#alertCorreo"," Introduce un correo correcto");
	            } else if (error.attr("id") == "fotoProfesor-error"){
	                showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
	            }
	        },
	        submitHandler: function (form) {
	        	if($('#passwordProfesor').val().length == 0){
	        		$('#pass').attr("value",$('#passwordviejo').val());
	        		if ($('#resultado #fotoProfesor').val() == ''){
					   	event.preventDefault();
					    $('#passwordProfesor').attr('disabled',true);  
					    var data = $("#formUpdate").serializeArray();
					        $.ajax({
					            url: '/configProfesor/modificarProfesorSinFoto',
					            type: 'post',
					            dataType: 'json',
					            data: data,
						        success: function (data) {
						        }
						    })
						    .done(function(data) {
						    	console.log(data);
						        $('#passwordProfesor').attr('disabled',false);
						        if (data.err=="existeDNI"){
							        $('#dniProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
							        $('#dniProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								    showAlert($('#resultado #alertDni'),"error"," DNI ya existente");
								} else if (data.err=="existeCorreo"){
								    $('#correoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
								   	$('#correoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								  	showAlert($('#resultado #alertCorreo'),"error"," Correo ya existente");
								} else if (data.err=="existeTarjeta"){
								   	$('#num_tarjetaProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
								   	$('#num_tarjetaProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								   	showAlert($('#resultado #alertNum_tarj'),"error"," Tarjeta ya existente");
								} else if (data.err=="noasignatura"){
									showAlertValidate("#enlace2"," El profesor tiene que tener una asignatura");
								}else if (data.dato=="ok"){
								   	$('#Id_profesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
								   	$('#Id_profesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
								   	$('#fotoProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
								   	$('#fotoProfesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				               
								   	$('#tarjetaProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
								   	$('#tarjetaProfesor11').removeClass('glyphicon-remove').addClass('glyphicon-ok');				        
								   	$('#adminProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
								   	$('#adminProfesor11').removeClass('glyphicon-remove').addClass('glyphicon-ok');			                
								   	$('#resultado #mensaje').hide();
								   	showAlertRedirect($('#resultado #enlace2'),"ok"," Profesor modificado correctamente",'/config');
								}
								    console.log("success");
								})
								    .fail(function() {
							       		console.log("error");
							       		$('#passwordProfesor').attr('disabled',false);
							    	})
				    } else {
					   	var attach_id = $('#resultado #fotoProfesor').attr("id");
						var size = $('#'+attach_id)[0].files[0].size;
						if (size > 102400){
							$('#fotoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
							$('#fotoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');			               
						    showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
						} else {
						    event.preventDefault();
						    $('#passwordProfesor').attr('disabled',true);  
						    var formData = new FormData($('#resultado #formUpdate')[0]);
						        $.ajax({
						            url: '/configProfesor/modificarProfesor',
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
						        $('#passwordProfesor').attr('disabled',false);
						        if (data.err=="existeDNI"){
							        $('#dniProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
							        $('#dniProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
							        showAlert($('#resultado #alertDni'),"error"," DNI ya existente");
							    } else if (data.err=="existeCorreo"){
							        $('#correoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
							        $('#correoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
							        showAlert($('#resultado #alertCorreo'),"error"," Correo ya existente");
							    } else if (data.err=="existeTarjeta"){
							        $('#num_tarjetaProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
							        $('#num_tarjetaProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
							        showAlert($('#resultado #alertNum_tarj'),"error"," Tarjeta ya existente");
							    }else if (data.err=="noasignatura"){
									showAlertValidate("#enlace2"," El profesor tiene que tener una asignatura");
							    }else if (data.dato=="ok"){
							        $('#Id_profesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
							        $('#Id_profesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
							        $('#fotoProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
							        $('#fotoProfesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				               
							        $('#tarjetaProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
							        $('#tarjetaProfesor11').removeClass('glyphicon-remove').addClass('glyphicon-ok');		                
					                $('#resultado #mensaje').hide();
					                showAlertRedirect($('#resultado #enlace2'),"ok"," Profesor modificado correctamente",'/config');
				                }
				                console.log("success");
					            })
					            .fail(function() {
				                console.log("error");
				                $('#passwordProfesor').attr('disabled',false);
					            })
						}//.else if (size > 102400)
					}//.else if ($('#resultado #foto').val() == ''){
	        	} else {
	        		if(($('#passwordNewProfesor').val().length == 0) || ($('#passwordNewRepProfesor').val().length == 0)  ){
	        			$('#passwordNewProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
						$('#passwordNewProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
	        			$('#passwordNewRepProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
						$('#passwordNewRepProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');						        	
	        		} else {
	        			var hash = md5($('#passwordProfesor').val(), '2063c1608d6e0baf80249c42e2be5804');
        				$('#passwordhash').val(hash);
	        			if ($('#passwordviejo').val() == $('#passwordhash').val()){
	        				if ($('#passwordNewProfesor').val() == $('#passwordNewRepProfesor').val()){
	        				    if ($('#resultado #fotoProfesor').val() == ''){
							       	event.preventDefault();
							        $('#passwordProfesor').attr('disabled',true);  
							        var data = $("#formUpdate").serializeArray();
							            $.ajax({
							                url: '/configProfesor/modificarProfesorSinFoto',
							                type: 'post',
							                dataType: 'json',
							                data: data,
							                success: function (data) {
							                }
							            })
							            .done(function(data) {
							                $('#passwordProfesor').attr('disabled',false);
								                if (data.err=="existeDNI"){
										            $('#dniProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
										            $('#dniProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								        	        showAlert($('#resultado #alertDni'),"error"," DNI ya existente");
								                } else if (data.err=="existeCorreo"){
									        	    $('#correoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
									            	$('#correoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								                	showAlert($('#resultado #alertCorreo'),"error"," Correo ya existente");
								                } else if (data.err=="existeTarjeta"){
									            	$('#num_tarjetaProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
									            	$('#num_tarjetaProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								                	showAlert($('#resultado #alertNum_tarj'),"error"," Tarjeta ya existente");
						    					}else if (data.err=="noasignatura"){
													showAlertValidate("#enlace2"," El profesor tiene que tener una asignatura");
							    				}else if (data.dato=="ok"){
										        	$('#Id_profesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        	$('#Id_profesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
										        	$('#fotoProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        	$('#fotoProfesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				               
										        	$('#tarjetaProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        	$('#tarjetaProfesor11').removeClass('glyphicon-remove').addClass('glyphicon-ok');				        
										        	$('#adminProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        	$('#adminProfesor11').removeClass('glyphicon-remove').addClass('glyphicon-ok');			                
								                	$('#resultado #mensaje').hide();
								                	showAlertRedirect($('#resultado #enlace2'),"ok"," Profesor modificado correctamente",'/config');
								                }
								                console.log("success");
									            })
									            .fail(function() {
							                		console.log("error");
							                		$('#passwordProfesor').attr('disabled',false);
							            		})
							    } else {
							    	var attach_id = $('#resultado #fotoProfesor').attr("id");
									var size = $('#'+attach_id)[0].files[0].size;
									if (size > 102400){
										$('#fotoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
										$('#fotoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');			               
									    showAlertValidate("#alertFoto"," Tamaño de la foto maximo 100Kb");
									} else {
							            event.preventDefault();
							            $('#passwordProfesor').attr('disabled',true);  
							            var formData = new FormData($('#resultado #formUpdate')[0]);
							            $.ajax({
							                url: '/configProfesor/modificarProfesor',
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
							                $('#passwordProfesor').attr('disabled',false);
								                if (data.err=="existeDNI"){
									            $('#dniProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
									            $('#dniProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								                showAlert($('#resultado #alertDni'),"error"," DNI ya existente");
								            } else if (data.err=="existeCorreo"){
									            $('#correoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
									            $('#correoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								                showAlert($('#resultado #alertCorreo'),"error"," Correo ya existente");
								            } else if (data.err=="existeTarjeta"){
									            $('#num_tarjetaProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
									            $('#num_tarjetaProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');		                
								                showAlert($('#resultado #alertNum_tarj'),"error"," Tarjeta ya existente");
								            }else if (data.err=="noasignatura"){
												showAlertValidate("#enlace2"," El profesor tiene que tener una asignatura");
							    			}else if (data.dato=="ok"){
										        $('#Id_profesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        $('#Id_profesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');					                
										        $('#fotoProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        $('#fotoProfesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');				               
										        $('#tarjetaProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
										        $('#tarjetaProfesor11').removeClass('glyphicon-remove').addClass('glyphicon-ok');		                
								                $('#resultado #mensaje').hide();
								                showAlertRedirect($('#resultado #enlace2'),"ok"," Profesor modificado correctamente",'/config');
								            }
								            console.log("success");
									        })
									        .fail(function() {
							                console.log("error");
							            $('#passwordProfesor').attr('disabled',false);
							            })
							        }//.else if (size > 102400)
							    }//.else if ($('#resultado #foto').val() == ''){
	        				} else {
	        					$('#passwordNewProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
	        					$('#passwordNewProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
	        					$('#passwordNewRepProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
	        					$('#passwordNewRepProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
	        					showAlertValidate("#enlace2"," No son iguales el password nuevo repetir password nuevo");
	        				}//.else if ($('#passwordnuevo').val() == $('#passwordnuevorepetido').val()){ 	
	        			} else {
	        				$('#passwordProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
	        				$('#passwordProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
	        				showAlertValidate("#enlace2"," No son iguales el password viejo y el password de la bd ");
	        			}//.else if ($('#passwordviejo').val() == $('#passwordhash').val()){
	        		}//.else if(($('#passwordnuevo').val().length == 0) || ($('#passwordnuevorepetido').val().length == 0)  ){
	        	}//.else if($('#password').val().length == 0){
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});//$('#resultado').on("click","#btnModificar",function () {

		//Funcion con buscar asignaturas
	function buscarAsignaturasQueImparte (id) {
		$.ajax({
			url: '/configProfesor/buscarAsignaturasQueImparte',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				var resp = "";
				resp += "<div class='form-inline'>";
    			resp += "<div class='input-group'>";
				resp += "<label for='asignaturasTable' class='input-group-addon'>ASIGNATURAS QUE IMPARTE</label>";
				resp += "</div>";
  				resp += "</div><br/>";
				resp += "<table id='asignaturasTable'>";
				for (var i = 0; i < data.length; i++) {
					resp += "<tr class='asignaturasProfesor'>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"' checked>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasdelProfesor').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturasQueImparte


		//Funcion con buscar asignaturas
	function buscarTodasLasAsignaturas (id) {
		$.ajax({
			url: '/configProfesor/buscarAsignaturasQueNoImpartePorId',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id },
			success:function (data) {
				var resp = "";
				resp += "<table id='asignaturasTodas'>";			
				for (var i = 0; i < data.length; i++) {
					resp += "<tr class='asignaturas'>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"'>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasTodas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarTodasLasAsignaturas
	
			//Funcion con buscar asignaturas
	function buscarAsignaturasQueNoImpartePorTipo (id,tipo) {
		$.ajax({
			url: '/configProfesor/buscarAsignaturasQueNoImpartePorTipo',
			type: 'post',
			dataType: 'json',
			data:{ id_profesor:id , tipo:tipo},
			success:function (data) {
				var resp = "";
				resp += "<table id='asignaturasTodas'>";			
				for (var i = 0; i < data.length; i++) {
					resp += "<tr class='asignaturas'>";
					resp += "<td>";
					resp += "<input type='checkbox' id='checkbox' name='checkbox' value='"+data[i].id_asignatura+"'>";
					resp += "<label for='"+data[i].id_asignatura+"'>"+data[i].nombre+"</label>";
					resp += "</td>";
					resp += "</tr>"
				};
				resp += "</table>";
				$('#asignaturasTodas').html(resp);
			}
		})//ajax
		.done(function() {
			console.log("success");
		})//done
		.fail(function() {
			console.log("error");
		})//fail
	}//function buscarAsignaturasQueNoImpartePorTipo
	
	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarProfesores () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configProfesor/buscarProfesorNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					resp += "<h3 class='busquedaH3Profesor' id='"+data[i].id_profesor+"'> Dni: "+data[i].dni+" Nombre: "+data[i].nombre+" Apellidos:  "+data[i].apellidos+" Correo: "+data[i].correo+" </h3>";
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
	}//function buscarProfesores

	//funcion para buscar alumnos por id
	function buscarProfesorPorId (id) { 
		return	$.ajax({
					url: '/configProfesor/buscarProfesorId',
					type: 'post',
					dataType: 'json',
					data:{ id_profesor:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarProfesorPorId

	
			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar al profesor?")) {
			$.ajax({
				url: '/configProfesor/borrarProfesor',
				type: 'post',
				dataType: 'html',
				data: {'id_profesor':$('#resultado #Id_profesor').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					$('#resultado #mensaje').hide();
					showAlertRedirect("#enlace2","ok"," Profesor borrado correctamente",'/config');
				}
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//$('#resultado').on("click","#btnBorrar",function(event) {


	//cambiar select
	$('#resultado').on("change","#tipo",function(event) {
		 //alert( this.value );
		 if(this.value == "FP"){
		 	//alert("has elegido asignaturas FP");
		 	buscarAsignaturasQueNoImpartePorTipo($('#resultado #Id_profesor').val(),this.value);
		 } else if(this.value == "Bachiller"){
		 	//alert("has elegido asignaturas Bachiller");
		 	buscarAsignaturasQueNoImpartePorTipo($('#resultado #Id_profesor').val(),this.value);
		 } else {
		 	//alert("has elegido todas");
		 	buscarTodasLasAsignaturas($('#resultado #Id_profesor').val());
		 }
		});//$('#resultado').on("change","#tipo",function(event) {

	
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