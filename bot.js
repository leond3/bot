require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix } = require('./config.json');

client.on('ready', ready => {
	console.info('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(message.channel.name == "verify") {
		message.delete(1000);
	}
	
});

client.login(process.env.token);
