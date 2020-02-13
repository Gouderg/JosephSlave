const Command = require('./command');
const Discord = require('discord.js');
const {cleNasa} = require('../config.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class NasaPic extends Command{

	static match(message) {
		return message.content.startsWith('!nasa -pic');
	}

	static action (message) {

		let args = message.content.split(' ');
		if (args[2] == null) {
			var url = "https://api.nasa.gov/planetary/apod?api_key="+cleNasa;	
		} else {
			var url = "https://api.nasa.gov/planetary/apod?api_key="+cleNasa+"&date="+args[2];
		}
		
		try {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.send(null);
			xhr.addEventListener('readystatechange', function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var data = JSON.parse(xhr.responseText);
					var nasaPic = new Discord.RichEmbed()
						.setTitle(data.title)
						.setDescription(data.explanation)
						.setImage(data.hdurl)
						.setColor("#99ff33");

					message.channel.send(nasaPic);
				} else if (xhr.status === 400 && xhr.readyState === 4) {

					message.channel.send("La date saisie n'est pas juste");
				}



			});
			//xhr.end();
		} catch (error) {
			console.log(error);
		}

		

		
	}
}