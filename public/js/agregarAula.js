$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');
	
	var reglas = {
		numero:{required:true,max: 250},
        piso:{required:true,max:3},
		capacidad:{required:true,max:30},
	};
	
	var mensajes = {
		numero:{required:"",max:""},
        piso:{required:"",max:""},
		capacidad:{required:"",max:""},
	};

	$("#agregarAulaForm").validate({
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
            if (error.attr("id") == "numeroAula-error"){
                showAlertValidate("#alertNumero"," Numero maximo 250");
            } else if (error.attr("id") == "pisoAula-error"){
                 showAlertValidate("#alertPiso"," Piso maximo 3");
            } else if (error.attr("id") == "capacidadAula-error"){
                 showAlertValidate("#alertCapacidad"," Capacidad maxima 30");
            }
        },
        submitHandler: function (form) {
            event.preventDefault();
            var data = $("#agregarAulaForm").serializeArray();
            console.log(data);
            $.ajax({
                url: '/configAula/agregarAula',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                }
            }).done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                    showAlert("#alertNumero","error"," Aula ya existente ");
                    $('#numeroAula').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#numeroAula1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                }else if (data.dato=="ok"){
                    $('#mensaje').hide(); 
                    showAlertRedirect("#enlace","ok","Aula añadida correctamente",'/config');
                }
                console.log("success");
            }).fail(function() {
                console.log("error");
            })
        }//submitHandler
    });//Validate
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