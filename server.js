"use strict";
var rpc = require('sock-rpc');
var jsonfile = require('jsonfile')
var file = 'data.json'
var data;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function mail(subject,medalla){
	var mailOptions = {
		from: 'Servidor Esus  <alvrosolm@gmail.com>', // sender address
		to: 'alvrosolm@gmail.com', // list of receivers
		subject: subject, // Subject line
		html: 	'#<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <title>asdasdmklmmasd</title> </head> <body> <div style="width:100%;" align="center"> <table width="600" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="left" valign="top" style="background-color:FF9B0A;padding:0.4em" bgcolor="#B07B3D;"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="13" align="left" valign="top">&nbsp;</td> <td width="465" align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="10"> <tr> <td style="font-family:Georgia, Times New Roman, Times, serif; color:black;"> <div style="font-size:28px;font-weight:bold"><i>Nueva Condecoración</i></div> </td> </tr> </table></td> </tr> <tr> <td align="left" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td align="left" valign="top" bgcolor=black><table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td width="10">&nbsp;</td> <td align="left" valign="top" style="color:white; font-size:12px; font-family:Arial, Helvetica, sans-serif;"> <div style="font-size:24px;"><img src="http://clanesus.com/sites/default/files/firmas-alpha/jsoc_operador.jpg"></div> <br> Por su...... <br> http://clanesus.com/sites/default/files/firmas-alpha/jsoc_operador.jpg </td> <td width="10">&nbsp;</td> </tr> </table></td> </tr> </table> </td> </tr> </table></td> <td align="left" valign="top">&nbsp;</td> </tr> </table></td> </tr> </table> </div> </body> </html>'
			
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});	
}


rpc.register("guardarinfo",function(uid,nombremision,tipo,estado, callback){


// Crear esquema base de jugador
var EsquemaJugador = new Schema(
	{
		id: String,
		puntuacion: Number,
		partidasjugadas : 
		[
			{
			nombre : String,
			clase : String,
			ultimavez : String,
			resultado : false
			}
		]
	}
);

//Defino el modelo de jugador
var Jugador = mongoose.model('Jugadores', EsquemaJugador);

var NuevoPlayer = new Jugador(
	{
	id: uid,
	puntuacion: 0,
	partidasjugadas : 
	[
		{
		nombre : nombremision,
		clase : String,
		ultimavez : String,
		resultado : false
		}
	]
	}
);

mongoose.connect('mongodb://localhost/DBJugadores');

 
callback(null);

});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

rpc.listen();

