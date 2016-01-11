var time = {};
var now = new Date();
now.setHours(now.getUTCHours()+1);
var diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

/*
*	devuelve la hora del sistema hh:mm:ss
*/
time.horaActual = function(callback) {
	var curr_time;
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	if (hour < 10) {
		hour = "0"+hour;
	};//.if
	if (min < 10) {
		min = "0"+min;
	};//.if
	if (sec < 10) {
		sec = "0"+sec;
	};//.if
	curr_time = hour+":"+min+":"+sec;
	console.log(curr_time);
	if (curr_time) {
		callback(null,curr_time);
	}else{
		console.log("error obteniendo la hora");
	}//.else
}//.time.horaActual

/*
*	devuelve la hora del sistema hh:mm:ss
*/
time.diaDeLaSemana = function (callback) {
	var day = diasSemana[now.getDay()];
	if (day) {
		callback(null,day);
	}else{
		console.log("Error obteniendo dia");
	}//.else
}//.time.diaDeLaSemana 

/*
*	devuelve el dia completo año,mes,dia xxxx-xx-xx
*/
time.diaCompleto = function (callback) {
	var ano = now.getFullYear();
	var mes = now.getMonth()+1;
	if (mes < 10) {
		mes = "0"+mes;
	};//.if
	var dia = now.getDate();
	var diaCompleto = ano+"-"+mes+"-"+dia;
	if (diaCompleto) {
		callback(null,diaCompleto);
	}else{
		console.log("Error obteniendo dia completo");
	}//.else
}//.time.diaCompleto 

module.exports = time;