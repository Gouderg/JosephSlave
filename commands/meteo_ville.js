const Command = require('./command');
const Discord = require('discord.js');
const {cleOpenWeather} = require('../config.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class Meteo_City extends Command{

	static match(message) {
		return message.content.startsWith('!meteo -city');
	}

	static action (message) {

		let args = message.content.split(' ');
		if (args[2] == null) {
			var url = "http://api.openweathermap.org/data/2.5/weather?q=Brest,fr&lang=fr&APPID="+cleOpenWeather;	
		} else if(args[3] == null) {
			var url = "http://api.openweathermap.org/data/2.5/weather?q="+args[2]+"&lang=fr&APPID="+cleOpenWeather; 
		} else {
			var url = "http://api.openweathermap.org/data/2.5/weather?q="+args[2]+","+args[3]+"&lang=fr&APPID="+cleOpenWeather;
		}
		try {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.send(null);
			xhr.addEventListener('readystatechange', function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var data = JSON.parse(xhr.responseText);
					var meteoVille = buildPage(data);
					message.channel.send(meteoVille);
					

				} else if ((xhr.status === 400 || xhr.status === 401 || xhr.status === 404) && xhr.readyState === 4 ) {
					message.channel.send("La ville saisie n'existe pas.");
				} else if (xhr.status === 429 && xhr.readyState === 4) {
					message.channel.send("Tu as envoyé trop de demande en 1 min. Calmes toi, espèce de voyou");
				}

			});
			//xhr.end();
		} catch (error) {
			console.log(error);
		}
	}
}


function time(time) {
	let date = new Date(time * 1000);
	let hours = date.getHours();
	let minutes = "0" + date.getMinutes();
	let seconds = "0" + date.getSeconds();
	let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}

function windDirection(degree) {
	if(degree <= 27.5 || degree > 342.5) return "Nord";
	else if(degree <= 72.5) return "Nord-Est";
	else if(degree <= 117.5) return "Est";
	else if(degree <= 162.5) return "Sud-Est";
	else if(degree <= 207.5) return "Sud";
	else if(degree <= 252.5) return "Sud-Ouest";
	else if(degree <= 297.5) return "Ouest";
	else if(degree <= 342.5) return "Nord-Ouest";
	else return "Fuck: Error wind Direction";
}

function buildPage(data) {
	let sunrise = time(data.sys.sunrise); 									//Heure levé de soleil
	let sunset = time(data.sys.sunset); 									//Heure couché de soleil
	let direction = windDirection(data.wind.deg); 							//Direction du vent
	let temp = Number((data.main.temp - 273.1).toFixed(1));					//Température en °C
	let tempFeelLike = Number((data.main.feels_like - 273.1).toFixed(1));	//Température ressentie en °C
	let description = data.weather[0].description; 							//Description du temps
	let pressure = data.main.pressure; 										//Pression atmosphérique en hPa
	let clouds = data.clouds.all; 											//Taux de nuage en %
	let humidity = data.main.humidity; 										//Humidité en %
	let wind = Number((data.wind.speed * 3.6).toFixed(1)); 					//Vitesse du vent en km/h
	let title = "Météo de " + data.name;									//Nom de la ville

	var meteoVille = new Discord.RichEmbed()
			.setTitle(title)
			.setColor("#99ff33")
			.addField('Levé du soleil', sunrise, true)
			.addField('Couché du soleil',sunset, true)
			.addBlankField()
			.addField('Vitesse du vent', wind + " km/h",true)
			.addField('Direction du vent', direction, true)
			.addBlankField()
			.addField('Température', temp + " °C", true)
			.addField('Température ressentie', tempFeelLike + " °C", true)
			.addBlankField()
			.addField('Pression atmosphérique', pressure + " hPa", true)
			.addField('Humidité', humidity + " %", true)
			.addBlankField()
			.addField('Pourcentage de nuages', clouds + " %", true)
			.addField('Description du temps', description, true)			

	//Alternative à RichEmbeb
	var meteoVilleMessage = "Le soleil se lève à "+sunrise+" et se couche à "+sunset+".\nLa température est de "+temp+" °C ressentie "+tempFeelLike+" °C.\nLe vent est dirigé vers le "+
							direction+" et va à une vitesse de "+wind+" km/h.\nLa pression atmosphérique est de "+pressure+" hPa et l'humidité est de "+humidity+" %.\nLe temps est "+description
							+" avec "+clouds+" % de nuage dans le ciel."; 


	return meteoVille;


}