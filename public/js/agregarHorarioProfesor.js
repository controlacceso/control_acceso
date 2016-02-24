$(document).ready(function() {
controlFooter();
    $('img').attr("src",'/images/sshot-1.png');
    $('#id_horario_grupo').on("change",function(event) {
        $.ajax({
            url: '/configHorarioGrupo/buscarHorarioGrupoPorId',
            type: 'post',
            dataType: 'json',
            data:{ id_horario_grupo:this.value},
            success:function (data) {
                console.log(data);
                var resp = "";
                resp += "<table id='horario_grupo'>";
                for (var i = 0; i < data.length; i++) {
                    resp += "<tr>";
                    resp += "<td>";
                    resp += "<div class='form-inline has-success'>";
                    resp += "<div class='input-group'>";
                    resp += "<label id='labelHoraInicioHorarioProfesor' for='hora_inicio' class='input-group-addon'>HORA INICIO</label>";
                    resp += "<input id='hora_inicioHorarioProfesor' type='time' name='hora_inicio' class='form-control has-feedback' value='"+data[i].hora_inicio+"' readonly/>";
                    resp += "<span id='hora_inicioHorarioProfesor1' class='glyphicon form-control-feedback glyphicon-ok'></span>";
                    resp += "</div>";
                    resp += "</div><br/>";
                    resp += "<div class='form-inline  has-success'>";
                    resp += "<div class='input-group'>";
                    resp += "<label id='labelHoraFinalHorarioProfesor' for='hora_final' class='input-group-addon'>HORA FINAL</label>";
                    resp += "<input id='hora_finalHorarioProfesor' type='time' name='hora_final' class='form-control has-feedback' value='"+data[i].hora_final+"'readonly/>";
                    resp += "<span id='hora_finalHorarioProfesor1' class='glyphicon form-control-feedback glyphicon-ok'></span>";                    
                    resp += "</div>";
                    resp += "</div><br/>";                    
                    resp += "<div class='form-inline  has-success'>";
                    resp += "<div class='input-group'>";
                    resp += "<label id='labelDiaHorarioProfesor' for='dia' class='input-group-addon'>DIA</label>";
                    resp += "<select id='selectDiaHorarioProfesor' name='dia' class='form-control has-feedback' disabled>";
                    resp += "<option value='default'>Elige el dia</option>";
                        if (data[i].dia_semana == 'Lunes'){
                            resp += "<option value='Lunes' selected>Lunes</option>";   
                        } else {
                            resp += "<option value='Lunes'>Lunes</option>";   
                        }
                        if (data[i].dia_semana == 'Martes'){
                            resp += "<option value='Martes' selected>Martes</option>";   
                        } else {
                            resp += "<option value='Martes'>Martes</option>";   
                        }
                        if (data[i].dia_semana == 'Miercoles'){
                            resp += "<option value='Miercoles' selected>Miercoles</option>";   
                        } else {
                            resp += "<option value='Miercoles'>Miercoles</option>";   
                        }
                        if (data[i].dia_semana == 'Jueves'){
                            resp += "<option value='Jueves' selected>Jueves</option>";   
                        } else {
                            resp += "<option value='Jueves'>Jueves</option>";   
                        }
                        if (data[i].dia_semana == 'Viernes'){
                            resp += "<option value='Viernes' selected>Viernes</option>";   
                        } else {
                            resp += "<option value='Viernes'>Viernes</option>";   
                        }
                    resp += "</select><span id='selectDiaHorarioProfesor1' class='glyphicon form-control-feedback glyphicon-ok''></span>";
                    resp += "</div>";
                    resp += "</div>";
                    resp += "</td>";
                    resp += "</tr>"
                };
                    resp += "</table>";
                    $('#horarioGrupoHorarioProfesor').html(resp);
                }
        }).done(function() {
            console.log("success");
        }).fail(function() {
            console.log("error");
        })
    });//.buscarHorarioGrupoPorId

    $.validator.addMethod("valueNotEquals", function(value, element, arg){
    return arg != value;
    }, "Value must not equal arg.");

    var reglas = {
        id_horario_grupo:{required:true,valueNotEquals: "default" },
        id_profesor:{required:true,valueNotEquals: "default"},
        hora_inicio:{required:true},
        hora_final:{required:true},
        dia:{required:true,valueNotEquals: "default" },
    };

    var mensajes = {
        id_horario_grupo:{required:"",valueNotEquals: "" },
        id_profesor:{required:"",valueNotEquals: ""},
        hora_inicio:{required:""},
        hora_final:{required:"" },
        dia:{required:"",valueNotEquals: "" },
    };

    $("#agregarHorarioProfesorForm").validate({
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
            $('#selectDiaHorarioProfesor').prop("disabled",false);
            var data = $("#agregarHorarioProfesorForm").serializeArray();
            $.ajax({
                url: '/configHorarioProfesor/agregarHorarioProfesor',
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                }
            })
            .done(function(data) {
                $('#selectDiaHorarioProfesor').prop("disabled",true);
                console.log(data);
                if (data.err=="existe"){
                    $('#id_horario_grupo').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#id_horario_grupo1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $('#selectProfesorHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#selectProfesorHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $('#hora_inicioHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#hora_inicioHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $('#hora_finalHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#hora_finalHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    $('#selectDiaHorarioProfesor').closest('.form-inline').removeClass('has-success').addClass('has-error');
                    $('#selectDiaHorarioProfesor1').removeClass('glyphicon-ok').addClass('glyphicon-remove');
                    showAlert("#enlace","error"," Horario Profesor ya existente ");                
                }else if (data.dato=="ok"){
                    $('#selectDiaHorarioProfesor').closest('.form-inline').removeClass('has-error').addClass('has-success');
                    $('#selectDiaHorarioProfesor1').removeClass('glyphicon-remove').addClass('glyphicon-ok');    
                    $('#mensaje').hide();     
                    showAlertRedirect("#enlace","ok"," Horario Profesor añadido correctamente",'/config');
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