const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Help extends Command{

	static match(message) {
		return message.content.startsWith('!help');
	}

	static action (message) {
		let help = new Discord.RichEmbed()
			.setTitle('Documentation')
			.addField("!info nomCommande", "Affiche la description de la commande détaillée")
			.addField("!info liste", "Affiche la liste des commandes")
			.setColor("0x99ff33");

		message.channel.send(help);

		
	}
}


