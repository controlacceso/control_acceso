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

	$("#agregarGrupoForm").validate({
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
            var data = $("#agregarGrupoForm").serializeArray();
            console.log(data);
            $.ajax({
                url: '/configGrupo/agregarGrupo',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                }
            }).done(function(data) {
                console.log(data);
                if (data.err=="existe"){
                    showAlert("#alertNombre","error"," Grupo ya existente ");
                    $('#nombreGrupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#nombreGrupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');  
                }else if (data.dato=="ok"){
                    $('#mensaje').hide();     
                    showAlertRedirect("#enlace","ok"," Grupo añadido correctamente ",'/config');
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