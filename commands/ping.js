const Command = require('./command');

module.exports = class Ping extends Command{

	static match(message) {
		return message.content.startsWith('!ping');
	}

	static action (message) {
		message.channel.send("Arrête s'il te plaît j'en ai marre de répondre pong");
	}
}


