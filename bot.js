const Discord = require('discord.js');
const { prefix } = require('./config.json');

const bot = new Discord.Client();

bot.once('ready', () => {
	console.log('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

bot.on('message', message => {
	if (message.author.bot) {
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(message.channel.name == "verify") {
		message.delete({timeout:1000});
	}
	else if(message.channel.name == "giveaways") {
			if (command === 'gstart' && message.member.roles.find(r => r.name === "Giveaways") && !message.author.bot) {
				message.delete({timeout:100000});
			}
			else if (command === 'gstart' && !message.member.roles.find(r => r.name === "Giveaways") && !message.author.bot) {
				message.delete({timeout:100000});
			}
			else if (!message.member.roles.find(r => r.name === "Giveaway") && !message.author.bot) {
				message.delete({timeout:100000});
			}
		}
		else if(message.channel.name == "music") {
			if (message.content.startsWith(prefix) && !message.author.bot) {
				message.delete({timeout:100000});
			}
			else if (message.member.roles.find(r => r.name.toLowerCase() === "music")) {
				message.delete({timeout:1000});
			}
			else if (!message.content.startsWith(prefix) && !message.author.bot) {
				message.delete({timeout:1000});
				message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
			}
		}
		else if(message.channel.name == "commands") {
			if (command === 'help') {
				 message.channel.send("**Commands help list:**\n- !help\n- !hg!link [in-game username]\n- !coinflip (cf)").then(msg => {msg.delete({timeout:10000})});
			}
			else if (command === 'coinflip' || command === 'cf') {
				var cf = Array(2);
				cf[1] = "Heads";
				cf[2] = "Tails";
				
				var coinflip = getRandomInt(1, 3);
				if (coinflip === 1) { message.channel.send(cf[1]).then(msg => {msg.delete({timeout:10000})}); }
				if (coinflip === 2) { message.channel.send(cf[2]).then(msg => {msg.delete({timeout:10000})}); }
			}
			message.delete({timeout:1000});
		}
		else if(message.channel.name == "trail-vote") {
			if (command === 'tv') {
				const mention = message.mentions.members.first();//() => message.react('👍')).then(() => message.react('👎')
				message.channel.send("What did you think of " + mention + " and his/her Trail Status; should this status be kept?\n\n👍 yes\n\n👎 no").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			message.delete({timeout:1000});
		}
});

bot.login(process.env.token);
