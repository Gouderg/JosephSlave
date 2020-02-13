const Command = require('./command');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


module.exports = class Google extends Command{

	static match(message) {
		return message.content.startsWith('!google');
	}

	static action (message) {
		let args = message.content.split(' ');
		args.shift();
		let url = "https://www.google.fr/search?q=";
		args.forEach(function(arg) {
			arg = encodeURIComponent(arg);
			url = url+arg;
		});
		console.log(url);
		
		try {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.send(null);
			xhr.addEventListener('readystatechange', function() {
				if (xhr.readyState === 4 && xhr.status === 200) {
					var data = xhr.responseText;
					//console.log(data);
				}


			});
			//xhr.end();
		} catch (error) {
			console.log(error);
		}
		
	}
}


