const Command = require('./command')
const Discord = require("discord.js")

module.exports = class Clear extends Command{

	static match(message) {
		return message.content.startsWith('!clear')
	}

	static action (message) {
		let msg = message.content.split(" ")
		msg.shift()

		if (message.content === "!clear") {
			message.reply("Combien de messages à supprimé ?")

		} else {
			let x = parseInt(msg[0], 10)
			if (x > 100) {
				x = 100
			}
			message.delete()
			message.channel.bulkDelete(x)
			message.reply(x = 'messages supprimés')
			message.channel.bulkDelete(1)
		}
	}
}


