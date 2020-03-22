const Command = require('./command');
const Discord = require('discord.js');
const {cleJoke} = require('../config.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = class Joke extends Command{

	static match(message) {
		return message.content.startsWith('!joke');
	}

	static action(message) {
		let msg = message.content.split(" ");
		msg.shift();
		var url = setURL(msg);
		
		try {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.setRequestHeader('Authorization', cleJoke, false);
			xhr.send(null);
			xhr.addEventListener('readystatechange', function() {
				if(xhr.readyState === 4 && xhr.status === 200) {
					var data = JSON.parse(xhr.responseText);
	
					displayMessage(data, msg, message);
				}
			});

		} catch(error) {
			console.log(error);
		}

	}
}


function setURL(msg) {

	if(msg[0] === "-day" && msg[1] === undefined){
		return "https://blague.xyz/api/joke/day";

	} else if(msg[0] === "-random" && msg[1] === undefined) {
		return "https://blague.xyz/api/joke/random";
	
	} else if(msg[0] === "-day" && msg[1] === "vdm") {
		return "https://blague.xyz/api/vdm/day";
	
	} else if(msg[0] === "-random" && msg[1] === "vdm") {
		return "https://blague.xyz/api/vdm/random";
	
	} else {
		return "https://blague.xyz/api/joke/1";
	}
	
}


function displayMessage(data, msg, message) {
	if(msg[1] === 'vdm') {
		message.channel.send(data['vdm']['content']);
	} else {
		message.channel.send(data['joke']['question']+"\n\n\t"+data['joke']['answer']);
	}
}