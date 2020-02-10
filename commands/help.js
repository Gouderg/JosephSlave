const Command = require('./command')
const Discord = require('discord.js')

module.exports = class Help extends Command{

	static match(message) {
		return message.content.startsWith('!help')
	}

	static action (message) {
		let help = new Discord.RichEmbed()
			.setTitle('HELP')
			.setDescription("Liste des commandes :")
			.addBlankField()
			.addField("!ping", "Renvoie Pong", true)
			.addField("!help", "Affiche l'aide", true)
			.addField("!clear nbMessage", "Supprime le nombre de message tapé")
			.addField("!google", "Lance une recherche Google")
			.addField("!play url_youtube", "Lance une musique dans le channel vocal")
			.setColor("0x99ff33")
			.setFooter("Fin")
		message.channel.send(help)

		
	}
}


