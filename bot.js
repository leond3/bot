const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix } = require('./config.json');

client.on('ready', ready => {
	console.info('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

client.on('message', message => {

});

client.login(process.env.token);
