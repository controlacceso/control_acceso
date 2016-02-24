$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');

	$.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg != value;
    }, "Value must not equal arg.");


	var reglas = {
		nombre:{required:true},
		tipo:{required:true,valueNotEquals: "default" }
	};

	var mensajes = {
		nombre:{required:""},
		tipo:{required:"",valueNotEquals: "" }
	};

	$('#nombrebusquedaGrupo').keyup(function(event) {
		$("#footer").css("bottom","auto");
		buscarGrupos();
	});

	$('#form').submit(function(event) {
		event.preventDefault();
		$("#footer").css("bottom","auto");
		buscarGrupos();
	});

	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarGrupoId(datos[0].id)
		.done(function(result) {
			$("#footer").css("bottom",0);
    		var formulario = "<form class='form-group' action='/updateGrupo' id='formUpdate' name='formUpdate' method='post'>";
    		formulario += "<div class='form-inline'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='id_grupo' id='labelIdGrupo' class='input-group-addon'>ID GRUPO</label>";    		
    		formulario += "<input type='text' id='IdGrupo' name='id_grupo' class='form-control has-feedback' value='"+result[0].id_grupo+"'readonly>";
    		formulario += "<span id='IdGrupo1' class='glyphicon form-control-feedback'></span>";    		
    		formulario += "</div>";
  			formulario += "</div><br/>";  
    		formulario += "<div class='form-inline' id='alertNombre'>";
    		formulario += "<div class='input-group'>";
			formulario += "<label for='nombre'  id='labelNombreGrupo' class='input-group-addon'>NOMBRE</label>";   		
    		formulario += "<input type='text' id='nombreGrupo' name='nombre' class='form-control has-feedback' value='"+result[0].nombre_grupo+"'>";
    		formulario += "<span id='nombreGrupo1' class='glyphicon form-control-feedback'></span>";
    		formulario += "</div>";
  			formulario += "</div><br/>";   			     		
    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Nombre ya existente</span></div>";	
				if(result[0].tipo == 'FP'){
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO</label>";
					formulario += "<select id='selectTipoGrupo' name='tipo' class='form-control has-feedback'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'>Bachiller</option>";
					formulario += "<option value='FP' selected>FP</option>";
					formulario += "</select><span id='selectTipoGrupo1' class='glyphicon form-control-feedback'></span>";
					formulario += "</div>";
  					formulario += "</div>";   
				} else {
					formulario += "<div class='form-inline'>";
    				formulario += "<div class='input-group'>";
					formulario += "<label id='labelTipoGrupo' for='tipo' class='input-group-addon'>TIPO</label>";
					formulario += "<select id='selectTipoGrupo' name='tipo' class='form-control has-feedback'>";
					formulario += "<option value='default'>Elige el tipo</option>";
					formulario += "<option value='Bachiller'selected>Bachiller</option>";
					formulario += "<option value='FP'>FP</option>";
					formulario += "</select><span id='selectTipoGrupo1' class='glyphicon form-control-feedback'></span>";
			  		formulario += "</div>";
  					formulario += "</div>";   				
				}
			formulario += "</br><input type='submit' name='btnModificar' id='btnModificar' class='btn btn-warning' value='Modificar'>";
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
	                url: '/configGrupo/updateGrupo',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
		                if (data.err=="existe"){
		                	showAlert("#alertNombre","error"," Grupo ya existente ");
			                $('#resultado #nombreGrupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
			                $('#resultado #nombreGrupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');  		                
		                }else if (data.dato=="ok"){
			                $('#IdGrupo').closest('.form-inline').removeClass('has-error').addClass('has-success');
			                $('#IdGrupo1').removeClass('glyphicon-remove').addClass('glyphicon-ok');		                	
		                	$('#resultado #mensaje').hide();
		                	showAlertRedirect($('#resultado #enlace2'),"ok"," Grupo modificado correctamente ",'/config');
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
	});//$('#resultado').on("click","#btnModificar",function () {

	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarGrupos () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configGrupo/buscarGrupoNombre',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					resp += "<h3 class='busquedaH3Grupo' id='"+data[i].id_grupo+"'>Nombre: "+data[i].nombre_grupo+" Tipo: "+data[i].tipo+"</h3>";
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
	}//function buscarGrupos

	//funcion para buscar alumnos por id
	function buscarGrupoId (id) { 
		return	$.ajax({
					url: '/configGrupo/buscarGrupoPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_grupo:id },
					success:function (data) {
					}
				})//ajax
				.done(function() {
					console.log("success");
				})//done
				.fail(function() {
					console.log("error");
				})//fail
	}//function buscarGrupoId
	
			//Al clicar en borrar el alumno
	$('#resultado').on("click","#btnBorrar",function(event) {
		event.preventDefault();
		if(confirm("Estas seguro de borrar el grupo?")) {
			$.ajax({
				url: '/configGrupo/borrarGrupo',
				type: 'post',
				dataType: 'html',
				data: {'id_grupo':$('#resultado #IdGrupo').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					$('#resultado #mensaje').hide();
					showAlertRedirect("#enlace2","ok"," Grupo borrado correctamente",'/config');
				}
			})//done
			.fail(function() {
				console.log("error borrar");
			})//fail
		}//if confirm
	});//$('#resultado').on("click","#btnBorrar",function(event) {
	
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
