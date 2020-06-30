const Discord = require('discord.js');

const client = new Discord.Client();

client.once('ready', ready => {
	console.log('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

client.on('message', message => {
	const prefix = '!';
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(message.channel.name == "verify") {
		message.delete(1000);
	}
});

client.login(process.env.token);
