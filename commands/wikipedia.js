const Command = require('./command');

module.exports = class Wikipedia extends Command{

	static match(message) {
		return message.content.startsWith('!wikipedia');
	}

	static action (message) {
		try {
			let args = message.content.split(' ');
			args.shift();
			console.log(args.length);
			if (message.content === '!wikipedia') {
				message.channel.send("Il manque un sujet à votre commande");
			} else if (message.content !== '!wikipedia' && args.length === 0){
				message.channel.send("Commande inexistante");

			} else {
				let args = message.content.split(' ');
				args.shift();
				message.channel.send("https://fr.wikipedia.org/wiki/"+args[0]);

			}
		} catch(error) {
			console.log(error);
		}
		

		
	}
}
