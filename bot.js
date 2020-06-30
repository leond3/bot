const Discord = require('discord.js');
const { prefix } = require('./config.json');

const fs = require("fs");

const client = new Discord.Client();

client.once('ready', ready => {
	console.log('MineCraft bot responded and is operational!');
	client.user.setStatus('online');
	client.user.setActivity('First Place Splooshers bot');
});

client.on('message', message => {
	let blacklisted = ["randomgeneratedblacklistedword"];
	for (var i in blacklisted) {
		if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()) && !message.author.bot) {
			message.delete(200);
			message.channel.send(":warning: " + message.member.user.tag + " you cannot use blacklisted words or characters in your message:\n||`" + message.content + "`||").then(msg => {msg.delete(12000)});
		}
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(message.channel.name == "verify") {
		message.delete(10000);
	}
	
	if(message.channel.name == "giveaways") {
		if (command === 'gstart' && message.member.roles.find(r => r.name === "Giveaways") && !message.author.bot) {
			message.delete(100000);
		}
		else if (command === 'gstart' && !message.member.roles.find(r => r.name === "Giveaways") && !message.author.bot) {
			message.delete(100000);
		}
		else if (!message.member.roles.find(r => r.name === "Giveaway") && !message.author.bot) {
			message.delete(100000);
		}
	}
	if(message.channel.name == "music") {
		if (message.content.startsWith(prefix) && !message.author.bot) {
			message.delete(4000);
		}
		else if (message.member.roles.find(r => r.name.toLowerCase() === "music")) {
			message.delete(10000);
		}
		else if (!message.content.startsWith(prefix) && !message.author.bot) {
			message.delete();
			message.channel.send(":no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete(4000)});
		}
	}
	
	if(message.channel.name == "commands") {
		if (command === 'cf') {
			var cf = Array(2);
			cf[1] = "Heads";
			cf[2] = "Tails";
			
			var coinflip = getRandomInt(1, 3);
			if (coinflip === 1) { message.channel.send(cf[1]).then(msg => {msg.delete(100000)}); }
			if (coinflip === 2) { message.channel.send(cf[2]).then(msg => {msg.delete(100000)}); }
			message.delete(10000);
		}
		else {
			message.delete(10000);
		}		
	}
});

client.login(process.env.token);