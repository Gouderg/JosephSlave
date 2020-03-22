const Discord = require('discord.js');
const {token} = require('./config.json');
const bot = new Discord.Client();

const Google = require('./commands/google');
const Ping = require('./commands/ping');
const Play = require('./commands/play');
const Help = require('./commands/help');
const Clear =  require('./commands/clear');
const Playlist = require('./commands/playlist');
const Wikipedia = require('./commands/wikipedia');
const Info = require('./commands/info');
const Nasa_pic = require('./commands/nasa_pic');
const Meteo_city = require('./commands/meteo_ville.js');
const Joke = require('./commands/joke.js');
const Story = require('./commands/story.js');

bot.on('ready', function () {
	//bot.user.setAvatar('./avatar.jpg').catch(console.error)
	bot.user.setActivity("!help").catch(console.error);
})

bot.on('guildMenberAdd', function (member) {
	member.createDM().then(function (channel) {
		channel.send('Bienvenue' + member.displayName);
	}).catch(console.error);
})

bot.on('message', message => {
	let commandUsed = 
		Info.parse(message) ||
		Clear.parse(message) ||
		Wikipedia.parse(message) ||
		Help.parse(message) ||
		Playlist.parse(message) ||
		Google.parse(message) || 
		Ping.parse(message) || 
		Play.parse(message) ||
		Nasa_pic.parse(message) ||
		Meteo_city.parse(message) ||
		Joke.parse(message) ||
		Story.parse(message)
	});

bot.login(token);