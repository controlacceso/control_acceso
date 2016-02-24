$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');

	var reglas = {
		numero:{required:true,max: 250},
        piso:{required:true,max: 3},
		capacidad:{required:true,max: 30},
	};

	var mensajes = {
		numero:{required:"",max:""},
        piso:{required:"",max:""},
		capacidad:{required:"",max:""},
	};

	$('#numerobusquedaAula').keyup(function(event) {
		$("#footer").css("bottom","auto");
		buscarAulas();
	});

	$('#form').submit(function(event) {
		event.preventDefault();
		$("#footer").css("bottom","auto");
		buscarAulas();
	});

	//Crear formulario para modificar o borrar alumno al clicar en la celda
	$('#resultado').on("click",".celda",function () {
		var datos = $(this).contents();
		buscarAulaId(datos[0].id)
		.done(function(result) {
			$("#footer").css("bottom","auto");
    		var formulario = "<form class='form-group' action='/updateAula' id='formUpdate' name='formUpdate' method='post'>";
    			formulario += "<div class='form-inline' >";
    			formulario += "<div class='input-group'>";
				formulario += "<label for='id_aula' id='labelIdAula' class='input-group-addon'>ID AULA</label>";
	    		formulario += "<input type='text' id='IdAula' name='id_aula' class='form-control' value='"+result[0].id_aula+"'readonly>";
	    		formulario += "<span id='IdAula1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	  			formulario += "<div class='form-inline' id='alertNumero'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='numero'  id='labelNumeroAula' class='input-group-addon'>NUMERO</label>";
	    		formulario += "<input type='number' id='numeroAula' name='numero' min='1' class='form-control has-feedback' value='"+result[0].numero+"'>";
	    		formulario += "<span id='numeroAula1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";    		
	    		formulario += "<div id='mensaje' style='display: none' class='alert alert-error fade in'><a href='#' data-dismiss='alert' class='close'>×</a><strong>Comprueba!</strong><span id='sp'> Numero ya existente</span></div>";	
	  			formulario += "<div class='form-inline' id='alertPiso'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='piso' id='labelPisoAula' class='input-group-addon'>PISO</label>";    		
	    		formulario += "<input type='number' id='pisoAula' name='piso' min='0' class='form-control has-feedback' value='"+result[0].piso+"'>";
	    		formulario += "<span id='pisoAula1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div><br/>";
	  			formulario += "<div class='form-inline' id='alertCapacidad'>";
	    		formulario += "<div class='input-group'>";
				formulario += "<label for='capacidad' id='labelCapacidadAula' class='input-group-addon'>CAPACIDAD</label>";         		
	       		formulario += "<input type='number' id='capacidadAula' name='capacidad' min='1' class='form-control has-feedback' value='"+result[0].capacidad+"'>";
	    		formulario += "<span id='capacidadAula1' class='glyphicon form-control-feedback'></span>";
	    		formulario += "</div>";
	  			formulario += "</div>";			
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
				console.log(error.attr("id"));
	            if (error.attr("id") == "numeroAula-error"){
	                showAlertValidate($('#resultado #alertNumero')," Numero maximo 250");
	            } else if (error.attr("id") == "pisoAula-error"){
	                 showAlertValidate($('#resultado #alertPiso')," Piso maximo 3");
	            } else if (error.attr("id") == "capacidadAula-error"){
	                 showAlertValidate($('#resultado #alertCapacidad')," Capacidad maxima 30");
	            }
			},
	        submitHandler: function (form) {
	            event.preventDefault();
	            var data = $("#formUpdate").serializeArray();
	            console.log(data);
	            $.ajax({
	                url: '/configAula/updateAula',
	                type: 'post',
	                dataType: 'json',
	                data: data,
	                success: function (data) {
	                }
	            })
	            .done(function(data) {
	                console.log(data)
		                if (data.err=="existe"){
		                	showAlert($('#resultado #alertNumero'),"error"," Aula ya existente ");
		                }else if (data.dato=="ok"){
		                	$('#IdAula').closest('.form-inline').removeClass('has-error').addClass('has-success');
			            	$('#IdAula1').removeClass('glyphicon-remove').addClass('glyphicon-ok');	
		                	$('#resultado #mensaje').hide();
		                	showAlertRedirect($('#resultado #enlace2'),"ok","Aula modificada correctamente",'/config');
		                }
		                console.log("success");
			            })
			            .fail(function() {
	                console.log("error");
	            })
	        }//submitHandler
	    });//Validate
	  //$( "#target" ).submit();
	});

	//Funcion con ajax para recoger datos alumnos y crear tabla
	function buscarAulas () {
		var formData = $('#form').serializeArray();
		$.ajax({
			url: '/configAula/buscarAulaNumero',
			type: 'post',
			dataType: 'json',
			data: formData,
			success:function (data) {
				var resp = "";
				for (var i = 0; i < data.length; i++) {
					resp += "<table class='table'><tr class='active'><td class='celda'>";
					resp += "<h3 class='busquedaH3Aula' id='"+data[i].id_aula+"'>Aula:"+data[i].numero+"</h3>";
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
	}//function buscarAulas

	//funcion para buscar alumnos por id
	function buscarAulaId (id) { 
		return	$.ajax({
					url: '/configAula/buscarAulaPorId',
					type: 'post',
					dataType: 'json',
					data:{ id_aula:id },
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
		if(confirm("Estas seguro de borrar el aula?")) {
			$.ajax({
				url: '/configAula/borrarAula',
				type: 'post',
				dataType: 'html',
				data: {'id_aula':$('#resultado #IdAula').val()},
				success:function(data){
				}//success
			})//ajax
			.done(function(data) {
				console.log("success borrar");
				if (data[9]=="o"){
					$('#resultado #mensaje').hide();
					showAlertRedirect("#enlace2","ok"," Aula borrada correctamente",'/config');
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