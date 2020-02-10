const Discord = require('discord.js')
const {token} = require('./config.json')
const bot = new Discord.Client()

const Google = require('./commands/google')
const Ping = require('./commands/ping')
const Play = require('./commands/play')
const Help = require('./commands/help')
const Clear =  require('./commands/clear')

bot.on('ready', function () {
	//bot.user.setAvatar('./avatar.jpg').catch(console.error)
	bot.user.setActivity("!help").catch(console.error)
})

bot.on('guildMenberAdd', function (member) {
	member.createDM().then(function (channel) {
		channel.send('Bienvenue' + member.displayName)
	}).catch(console.error)
})

bot.on('message', message => {
	let commandUsed = 
		Google.parse(message) || 
		Ping.parse(message) || 
		Play.parse(message) ||
		Help.parse(message) ||
		Clear.parse(message)

});

bot.login(token);