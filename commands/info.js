const Command = require('./command');
const Discord = require('discord.js');

module.exports = class Info extends Command{

	static match(message) {
		return message.content.startsWith('!info');
	}

	static action (message) {
		let arg = message.content.split(' ');
		arg.shift();
		if (arg.length === 0 || arg.length > 1) {
			message.channel.send("Nombre de paramètres incorrect");
		} else {
			var cmd, descrip;

			switch(arg[0]) {

				case "clear":
					cmd = "!clear 10";
					descrip = "Efface les derniers messages.\nRetire maximum 100 messages par commande";
				break;

				case "google":
					cmd = "!google parametres";
					descrip = "Lance une recherche internet et affiche la première page trouvée.\nWIP";
				break;

				case "liste":
					cmd = "Liste commande: ";
					descrip ="clear\ngoogle\nping\nplay\nplaylist\nwikipedia";
				break;

				case "ping":
					cmd = "!ping";
					descrip = "Affiche pong";
				break;

				case "play":
					cmd = "!play url_video_youtube";
					descrip = "Joue la musique d'une vidéo dans le channel Audio";
				break;

				case "playlist":
					cmd = "!playlist";
					descrip = "Joue une playlist youtube\nWIP";
				break;

				case "wikipedia":
					cmd = "!wikipedia joseph";
					descrip = "Lance une recherche sur wikipedia et affiche le premier paragraphe. \nElle prend en argument juste un mot";
				break;

				default:
					cmd = "unknow";
					descrip = "Commande inexistante";
			}

			var info = new Discord.RichEmbed()
				.setTitle(arg[0])
				.addField(cmd,descrip)
				.setColor("0x99ff33");
			
			message.channel.send(info);
		}
		

		
	}
}