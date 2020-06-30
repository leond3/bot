const Discord = require('discord.js');
const bot = new Discord.Client();

bot.once('ready', ready => {
	console.log('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

bot.on('message', message => {
	const prefix = '!';
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(message.channel.name == "verify") {
		message.delete(1000);
	}
});

bot.login(process.env.token);