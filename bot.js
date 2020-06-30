const Discord = require('discord.js');
const { prefix } = require('./config.json');

const bot = new Discord.Client();

bot.once('ready', () => {
	console.log('Ready!');
});

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
		message.delete({timeout:1000});
	}
});

bot.login(process.env.token);
