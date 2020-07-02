const Discord = require('discord.js');
const { prefix } = require('./config.json');

const bot = new Discord.Client();

bot.once('ready', () => {
	console.log('? bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('? bot');
});

bot.on('message', message => {
	let blacklisted = ["fack", "fuck", "niger", "nigger", "idiot", "bitch", "dick", "homo", "gay", "kys", "kill yourself", "kill your self", "kill urself", "kill ur self", "cancer", "f@ck", "f4ck", "d!ck", "d1ck", "b1tch", "b!tch", "g@y", "g4y", "n1gg3r", "nigg3r", "n1gg3r", "n!gger", "n!gg3r", "n1ger", "n!ger", "n1g3r", "n!g3r"];
	for (var i in blacklisted) {
		if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()) && !message.author.bot) {
			message.delete({timeout:200});
			message.channel.send(":warning: " + message.member.user.tag + " you cannot use blacklisted words or characters in your message:\n||`" + message.content + "`||").then(msg => {msg.delete({timeout:10000})});
			return;
		}
	}
	if (!message.author.bot) {
		if (message.channel.name == "chat" || message.channel.name == "guild-chat") {
			message.guild.channels.cache.find(c => c.name === 'chat-log').send(message.member.user.tag + " in <#" + message.channel.id + "> (" + message.id + "):\n'`" + message.content + "`'");
			return;
		}
	}
	
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
			 message.channel.send("**Commands help list:**\n- !help\n- !coinflip (!cf)\n- !role [role/list]").then(msg => {msg.delete({timeout:30000})});
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
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Helper**; should this status be kept? Please vote by reacting to this message.\nHelper's need at least **5** upvotes (+1 from bot).\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail splasher')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Splasher**; should this status be kept? Please vote by reacting to this message.\nSplasher's need at least **4** upvotes (+1 from bot).\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail admin')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Admin**; should this status be kept? Please vote by reacting to this message.\Admin's need at least **6** upvotes (+1 from bot).\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍'); await msg.react('👎');});
			}
			message.delete({timeout:1000});
		}
		else if (command === 'promote') {
			const mention = message.mentions.members.first();
			if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail helper')) {
				message.channel.send("Congratulations <@" + mention + ">, you've been accepted as **Helper**!\n*Your roles have automatically been updated. Please contact an administrator if an error occured.*");
				mention.member.roles.remove('727180920830034050');
				mention.member.roles.add('726942583024254986');
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail splasher')) {
				message.channel.send("Congratulations <@" + mention + ">, you've been accepted as **Splasher**!\n*Your roles have automatically been updated. Please contact an administrator if an error occured.*");
				mention.member.roles.remove('727180786541002812');
				mention.member.roles.add('726931348698300557');
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail admin')) {
				message.channel.send("Congratulations <@" + mention + ">, you've been accepted as **Admin**!\n*Your roles have automatically been updated. Please contact an administrator if an error occured.*");
				mention.member.roles.remove('727180504402624532');
				mention.member.roles.add('726926448044015656');
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
