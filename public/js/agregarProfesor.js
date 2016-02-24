$(document).ready(function() {
controlFooter();
$('img').attr("src",'/images/sshot-1.png');
    jQuery.validator.addMethod("fileSize", function (val, element) {
        var size = element.files[0].size;
        console.log(size);
        if (size > 102400){
            return false;
        } else {
            return true;
        }
    }, "File type error");
    
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
        password:{required:true,convertHash:true},
        foto:{required:true,fileSize:true},
        num_tarjeta:{required:true},
	};

	var mensajes = {
		dni:{required:"",dni:""},
        nombre:{required:"",lettersonly:""},
		apellidos:{required:"",lettersonly:""},
		correo:{required:"",correo:""},
        password:{required:"",convertHash:""},
        foto:{required:"",fileSize:""},
        num_tarjeta:{required:""},
	};

	$("#agregarProfesorForm").validate({
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
            event.preventDefault();
            $('#passwordProfesor').attr('disabled',true);            
            var formData = new FormData($("#agregarProfesorForm")[0]);
            $.ajax({
                url: '/configProfesor/agregarProfesor',
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
                    showAlert("#alertDni","error"," DNI ya existente");
                    $('#dniProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#dniProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                    
                } else if (data.err=="existeCorreo"){
                    showAlert("#alertCorreo","error"," Correo ya existente");
                    $('#correoProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#correoProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                        
                }else if(data.err=="existeTarjeta"){
                    showAlert("#alertNum_tarj","error"," Numero Tarjeta ya existente");
                    $('#num_tarjetaProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#num_tarjetaProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');                        
                }else if (data.dato=="ok"){
                    $('#mensaje').hide();     
                    showAlertRedirect("#enlace","ok"," Profesor añadido correctamente",'/config');
                }
                console.log("successdata");
            }).fail(function() {
                console.log("error");
                $('#passwordProfesor').attr("disabled",false);
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