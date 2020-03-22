const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Story extends Command {

	static match(message) {
		return message.content.startsWith('!story');
	}

	static action(message) {
		
		try {
			var story = new Discord.RichEmbed()
			.setTitle("Histoire de Jospeh")
			.setDescription("Joseph est un petit bot Discord qui a grandi au fur et à mesure et qui est en passe de devenir la plus grande IA du monde")
			.setColor('#99ff33');

			message.channel.send(story);

		} catch(e) {
			console.log(e);
		}
		
	}	
}