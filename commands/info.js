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
			var cmd, descrip, cmd1 = null, descrip1;

			switch(arg[0]) {

				case "clear":
					cmd = "!clear 10";
					descrip = "Efface les derniers messages.\nRetire maximum 100 messages par commande.";
				break;

				case "google":
					cmd = "!google parametres";
					descrip = "Lance une recherche internet et affiche la première page trouvée.\nWIP";
				break;

				case "joke":
					cmd = "!joke -day/random {vdm}";
					descrip = "Lis une blague.\nChoisir entre -random pour une blague random et -day pour la blague du jour.\nL'option vdm permet d'avoir soit la vdm du jour ou une vdm random";
				break;

				case "liste":
					cmd = "Liste commande: ";
					descrip ="clear\ngoogle (WIP)\njoke\nmeteo\nnasa\nping\nplay\nplaylist (WIP)\nwikipedia";
				break;

				case "meteo":
					cmd = "!meteo -city {London} {country code}";
					descrip = "Affiche la météo de la ville en anglais. Affiche la ville de Brest par défaut.\nNorme ISO 3166 pour les country code  (fr pour la France).";
				break;
				case "nasa":
					cmd = "!nasa -pic {YYYY-MM-DD}";
					descrip = "Affiche une image de l'espace avec une description donnée par la Nasa.\nAffiche la photo du jour si aucune date n'est passée en paramètres.";
				break;

				case "ping":
					cmd = "!ping";
					descrip = "Affiche pong.";
				break;

				case "play":
					cmd = "!play url_video_youtube";
					descrip = "Joue la musique d'une vidéo dans le channel Audio.";
				break;

				case "playlist":
					cmd = "!playlist";
					descrip = "Joue une playlist youtube.\nWIP";
				break;

				case "wikipedia":
					cmd = "!wikipedia joseph";
					descrip = "Lance une recherche sur wikipedia et affiche le premier paragraphe. \nElle prend en argument juste un mot.";
				break;

				default:
					cmd = "unknow";
					descrip = "Commande inexistante";
			}

			if(cmd1 == null) {
				var info = new Discord.RichEmbed()
				.setTitle(arg[0])
				.addField(cmd,descrip)
				.setColor("0x99ff33");
			} else {
				var info = new Discord.RichEmbed()
				.setTitle(arg[0])
				.addField(cmd,descrip)
				.addField(cmd1, descrip1)
				.setColor("0x99ff33");
			}

			
			
			message.channel.send(info);
		}
		

		
	}
}