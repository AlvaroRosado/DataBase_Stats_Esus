var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/DBJugadores');

// Crear esquema base de jugador
var EsquemaJugador = new Schema(
	{
		id: String,
		nombrejugador : String,
		partidasjugadas : 
		[
			{
			nombre : String,
			clase : String,
			ultimavez : String,
			resultado : false
			}
		],
		condecoraciones : {
			condecoracion1 : Boolean,
			condecoracion2 : Boolean,
			condecoracion3 : Boolean
		},
		puntuacion: Number
	}
);

//Defino el modelo de jugador
var Jugador = mongoose.model('Jugadores', EsquemaJugador);

var NuevoPlayer = new Jugador(
	{
		id: "7656119803884619",
		nombrejugador : String,
		partidasjugadas : 
		[
			{
			nombre : String,
			clase : String,
			ultimavez : String,
			resultado : false
			}
		],
		condecoraciones : {
			condecoracion1 : Boolean,
			condecoracion2 : Boolean,
			condecoracion3 : Boolean
		},
		puntuacion: 0
	}
);

console.log("############");

//busco globalmente si la uid está en la base de datos
Jugador.find({ "id": "76561198038´g846196" }, function(err, user) {
if (err) throw err;

//si el documento NO esta vacio...
if(!isEmpty(user)) 
{
	//actualizo los datos
	Jugador.findOne({ "id": "76561198038846196" }, function (err, doc)
	{
		console.log('("############");');
		var encontrada = false;
		//Recorro el array de partidas para actualizar datos
		for (var i = 0; i < doc.partidasjugadas.length; i++) 
		{
			if(doc.partidasjugadas[i].nombre == "PARTIDAMODIFICADA")
			{
				doc.partidasjugadas[i].nombre = "PARTIDAMODIFICADA";
				doc.partidasjugadas[i].resultado = true;
				console.log("@@@@@@@@@@@@@EXISTE ");
				encontrada = true;
			}
		}	
		if (encontrada == false){
		doc["partidasjugadas"].push(
		{
			nombre : "partida1",
			clase : "JSOC",
			ultimavez :"AYER" ,
			resultado : true
			}
		);
		}
		doc.save();
	}
); 	  
}else{
	//si el documento SI está vacio, añado los datos desde el modelo
	NuevoPlayer.save(function(err) 
	{
	if (err) throw err;
	console.log('User saved successfully!');
	}); 
};
});

//funcion para determinar si un string está vacio
function isEmpty(str) {
    return (!str || 0 === str.length);
}
