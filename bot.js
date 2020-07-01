const Discord = require('discord.js');
const { prefix } = require('./config.json');

const bot = new Discord.Client();

bot.once('ready', () => {
	console.log('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

bot.on('message', message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if(message.channel.name == "verify" || message.channel.name == "apply-for-rank") {
		message.delete({timeout:1000});
	}
	else if(message.channel.name == "giveaways") {
		if (command === 'gstart' && message.member.roles.cache.some(r => r.name.toLowerCase() === 'giveaways') && !message.author.bot) {
			message.delete({timeout:100000});
			}
		else if (command === 'gstart' && !message.member.roles.cache.some(r => r.name.toLowerCase() === 'giveaways') && !message.author.bot) {
			message.delete({timeout:100000});
			}
		else if (!message.member.roles.cache.some(r => r.name.toLowerCase() === 'giveaways') && !message.author.bot) {
			message.delete({timeout:100000});
		}
	}
	else if(message.channel.name == "music") {
		if (message.content.startsWith(prefix) && !message.author.bot) {
			message.delete({timeout:10000});
		}
		else if (message.roles.cache.some(r => r.name.toLowerCase() === 'music')) {
			message.delete({timeout:30000});
		}
		else if (!message.content.startsWith(prefix) && !message.author.bot) {
			message.delete({timeout:1000});
			message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	else if(message.channel.name == "commands") {
		if (command === 'help') {
			 message.channel.send("**Commands help list:**\n- !help\n- !hg!link [in-game username]\n- !coinflip (cf)\n- v!help\n- !role [role/list]").then(msg => {msg.delete({timeout:30000})});
		}
		else if (command === 'coinflip' || command === 'cf') {
			var cf = Array(2);
			cf[1] = "Heads";
			cf[2] = "Tails";
			
			var coinflip = getRandomInt(1, 3);
			if (coinflip === 1) { message.channel.send("It's **" + cf[1] + "**!").then(msg => {msg.delete({timeout:10000})}); }
			if (coinflip === 2) { message.channel.send("It's **" + cf[2] + "**!").then(msg => {msg.delete({timeout:10000})}); }
		}
		else if (command === 'role') {
			if (!args[0]) {
				message.channel.send(":no_entry: You didn't specify an argument, try **`!role list`**.").then(msg => {msg.delete({timeout:4000})});
			}
			else if (args[0].toLowerCase() === 'list') {
				message.channel.send("**Commands help list:**\n- Splash\n- Update").then(msg => {msg.delete({timeout:10000})});
			}
			else if (args[0].toLowerCase() === 'splash') {
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'splash')) {
					message.member.roles.remove('727099300743479356');
					message.channel.send(":white_check_mark: Successfully remove role.").then(msg => {msg.delete({timeout:10000})});
				}
				else {
					message.member.roles.add('727099300743479356');
					message.channel.send(":white_check_mark: Successfully added role.").then(msg => {msg.delete({timeout:10000})});
				}
			}
			else if (args[0].toLowerCase() === 'update') {
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'update')) {
					message.member.roles.remove('727903675917533284');
					message.channel.send(":white_check_mark: Successfully remove role.").then(msg => {msg.delete({timeout:10000})});
				}
				else {
					message.member.roles.add('727903675917533284');
					message.channel.send(":white_check_mark: Successfully added role.").then(msg => {msg.delete({timeout:10000})});
				}
			}
			else {
				message.channel.send(":no_entry: Couldn't find this argument, try **`!role list`**.").then(msg => {msg.delete({timeout:4000})});
			}
		}
		message.delete({timeout:10000});
	}
	else if(message.channel.name == "trail-vote") {
		if (command === 'tv') {
			const mention = message.mentions.members.first();
			if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail helper')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Helper**; should this status be kept? Please vote by reacting to this message.\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail splasher')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Splasher**; should this status be kept? Please vote by reacting to this message.\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail admin')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Admin**; should this status be kept? Please vote by reacting to this message.\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			message.delete({timeout:1000});
		}
	}
	
	function getRandomInt(min, max) {
	 	min = Math.ceil(min);
	  	max = Math.floor(max);
	 	return Math.floor(Math.random() * (max - min)) + min;
	}
});

bot.login(process.env.token);
