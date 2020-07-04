const Discord = require("discord.js");
const { prefix } = require("./config.json");

const fs = require("fs");
let username = JSON.parse(fs.readFileSync("./name.json"));

const bot = new Discord.Client();

bot.once('ready', () => {
	console.log('? bot responded and is operational!');
	bot.user.setStatus('online');
	bot.user.setActivity('Well this name sucks');
	bot.user.setUsername("Wise Ain't Profit");
});

bot.on('message', message => {
	/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/let blacklisted = ["fack", "fuck", "niger", "nigger", "idiot", "bitch", "dick", "homo", "gay", "kys", "kill yourself", "kill your self", "kill urself", "kill ur self", "cancer", "f@ck", "f4ck", "d!ck", "d1ck", "b1tch", "b!tch", "g@y", "g4y", "n1gg3r", "nigg3r", "n1gg3r", "n!gger", "n!gg3r", "n1ger", "n!ger", "n1g3r", "n!g3r"];
	for (var i in blacklisted) {
		if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase()) && !message.author.bot) {
			message.delete({timeout:200});
			message.channel.send("\:warning: " + message.member.user.tag + " you cannot use blacklisted words or characters in your message:\n||`" + message.content + "`||").then(msg => {msg.delete({timeout:10000})});
			return;
		}
	}
	if (!message.author.bot) {
		if (message.channel.name == "chat" || message.channel.name == "guild-chat") {
			message.guild.channels.cache.find(c => c.name === 'chat-log').send(message.member.user.tag + " in <#" + message.channel.id + "> (" + message.id + "):\n'`" + message.content + "`'");
			return;
		}
	}
	else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mee6') || message.channel.name == "apply-for-rank") {
		message.delete({timeout:30000});
		return;
	}
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if(message.channel.name == "verify") {
		message.delete({timeout:1000});
	}
	else if(message.channel.name == "commands") {
		if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'verify')) {
			message.delete({timeout:30000});
			return;
		}
		
		if (message.author.bot) {
			return;
		}
		if (command === 'help') {
			 message.channel.send("**Commands help list:**\n- !help\n*Shows this help list.*\n- !coinflip (!cf)\n*Flips a coin, can be heads or tails.*\n- !role [role/list]\n*Self assign/remove pingable roles.*\n- !mypermissions (!myperms)\n*Shows all your additional (unlisted) permissions.*\n- v!verify [in-game username]\n*Updates your roles as well as removes any existing ghost roles.*\n- !nick [nickname] [rank]\n*Change your username and rank.*\n- !unnick\n*Removes your nicked status.*").then(msg => {msg.delete({timeout:30000})});
		}
		else if (command === 'coinflip' || command === 'cf') {
			var cf = Array(2);
			cf[1] = "Heads";
			cf[2] = "Tails";
			
			var coinflip = getRandomInt(1, 3);
			if (coinflip === 1) { message.channel.send("It's **" + cf[1] + "**!").then(msg => {msg.delete({timeout:10000})}); }
			if (coinflip === 2) { message.channel.send("It's **" + cf[2] + "**!").then(msg => {msg.delete({timeout:10000})}); }
		}
		else if (message.content.startsWith("v!verify")) {
			if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'nicked')) {
				message.channel.send(":warning: Oops! It appears you're currently nicked, please **`!unnick`** to remove any ghost roles.").then(msg => {msg.delete({timeout:10000})});
				return;
			}
			if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp++')) {
				message.member.roles.remove('726923236776083569');
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
					message.member.roles.remove('728748298168696852');
				}
			}
			else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp+')) {
				message.member.roles.remove('726923237614682133');
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
					message.member.roles.remove('728748298168696852');
				}
			}
			else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp')) {
				message.member.roles.remove('726923237812076637');
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
					message.member.roles.remove('728748298168696852');
				}
			}
			else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip+')) {
				message.member.roles.remove('726923238331908154');
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
					message.member.roles.remove('728748298168696852');
				}
			}
			else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip')) {
				message.member.roles.remove('726923239049396457');
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
					message.member.roles.remove('728748298168696852');
				}
			}
			message.channel.send(":white_check_mark: Your rules are currently being updated. Any ghost roles will be removed.").then(msg => {msg.delete({timeout:10000})});
		}
		else if (command === 'role') {
			if (!args[0]) {
				message.channel.send("\:no_entry: You didn't specify an argument, try **`!role list`**.").then(msg => {msg.delete({timeout:4000})});
			}
			else if (args[0].toLowerCase() === 'list') {
				message.channel.send("**Commands help list:**\n- Splash\n- Update").then(msg => {msg.delete({timeout:10000})});
			}
			else if (args[0].toLowerCase() === 'splash') {
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'splash')) {
					message.member.roles.remove('727099300743479356');
					message.channel.send("\:white_check_mark: Successfully remove role.").then(msg => {msg.delete({timeout:10000})});
				}
				else {
					message.member.roles.add('727099300743479356');
					message.channel.send("\:white_check_mark: Successfully added role.").then(msg => {msg.delete({timeout:10000})});
				}
			}
			else if (args[0].toLowerCase() === 'update') {
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'update')) {
					message.member.roles.remove('727903675917533284');
					message.channel.send("\:white_check_mark: Successfully remove role.").then(msg => {msg.delete({timeout:10000})});
				}
				else {
					message.member.roles.add('727903675917533284');
					message.channel.send("\:white_check_mark: Successfully added role.").then(msg => {msg.delete({timeout:10000})});
				}
			}
			else {
				message.channel.send("\:no_entry: Couldn't find this argument, try **`!role list`**.").then(msg => {msg.delete({timeout:4000})});
			}
		}
		else if (command === 'mypermissions' || command === 'myperms') {
			if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'admin')) {
				message.channel.send("**Your (discord) permissions list:**\n - !ban [mention] [reason]\n*Bans a user from the discord.*\n - !unban [mention]\n*Unbans a user from the discord.*\n - !kick [mention] [reason]\n*Removes a user from the discord.*\n - !mute [mention] [reason]\n*Disables an users ability to chat.*\n - !unmute [mention]\n*Enables an users ability to chat.*\n - !tv [mention]\n*Starts a trail vote (must be send in <#727255140293279827>).*\n - !promote [mention]\n*Promotes an user from trail status (must be send in <#727255140293279827>).*\n - !accept [mention]\n*Accepts a role request (must be send in <#728991321012043777>).*").then(msg => {msg.delete({timeout:30000})});
			}
			else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'trail admin')) {
				message.channel.send("**Your (discord) permissions list:**\n - !mute [mention] [reason]\n*Disables an users ability to chat.*\n - !unmute [mention]\n*Enables an users ability to chat.*").then(msg => {msg.delete({timeout:30000})});
			}
			else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'helper')) {
				message.channel.send("**Your (discord) permissions list:**\n - !mute [mention] [reason]\n*Disables an users ability to chat.*\n - !unmute [mention]\n*Enables an users ability to chat.*").then(msg => {msg.delete({timeout:30000})});
			}
			else {
				message.channel.send(":no_entry: Your rank doesn't give any (additional/unlisted) discord permissions.").then(msg => {msg.delete({timeout:10000})});
			}
		}
		else if (command === 'nick') {
			if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp++') || message.member.roles.cache.some(r => r.name.toLowerCase() === 'nicked')) {
				if (args[0]) {
					message.member.setNickname(args[0]);
					if (!message.member.roles.cache.some(r => r.name.toLowerCase() === 'nicked')) {
						message.member.roles.add('728755013127635037');
					} else {
						if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
							message.member.roles.remove('728748298168696852');
						} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip')) {
							message.member.roles.remove('726923239049396457');
						} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip+')) {
							message.member.roles.remove('726923238331908154');
						} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp')) {
							message.member.roles.remove('726923237812076637');
						} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp+')) {
							message.member.roles.remove('726923237614682133');
						}
						message.member.roles.add('726923236776083569');
					}
					message.channel.send(":white_check_mark: Successfully nicked.").then(msg => {msg.delete({timeout:4000})});
					if (args[1]) {
						if (args[1].toLowerCase() === 'none' || args[1].toLowerCase() === 'vip' || args[1].toLowerCase() === 'vip+' || args[1].toLowerCase() === 'mvp' || args[1].toLowerCase() === 'mvp+') {
							if (args[1].toLowerCase() === 'none') {
								message.member.roles.add('728748298168696852');
							} else if (args[1].toLowerCase() === 'vip') {
								message.member.roles.add('726923239049396457');
							} else if (args[1].toLowerCase() === 'vip+') {
								message.member.roles.add('726923238331908154');
							} else if (args[1].toLowerCase() === 'mvp') {
								message.member.roles.add('726923237812076637');
							} else if (args[1].toLowerCase() === 'mvp+') {
								message.member.roles.add('726923237614682133');
							}
							message.member.roles.remove('726923236776083569');
						}
					}
				}
				else {
					message.channel.send(":no_entry: You've to specify a nickname!").then(msg => {msg.delete({timeout:4000})});
				}
				message.delete({timeout:200});
				return;	
			} else {
				message.channel.send(":no_entry: This command is currently is a beta fase, only `@mvp++` may use this command right now.").then(msg => {msg.delete({timeout:10000})});
			}
		} else if (command === 'unnick') {
			if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'nicked')) {
				message.member.roles.remove('728755013127635037');
				if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none') || message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip') || message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip+') || message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp') || message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp+')) {
				    	if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'none')) {
						message.member.roles.remove('728748298168696852');
					} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip')) {
						message.member.roles.remove('726923239049396457');
					} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'vip+')) {
						message.member.roles.remove('726923238331908154');
					} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp')) {
						message.member.roles.remove('726923237812076637');
					} else if (message.member.roles.cache.some(r => r.name.toLowerCase() === 'mvp+')) {
						message.member.roles.remove('726923237614682133');
					}
					message.member.roles.add('726923236776083569');
				}
				if (username[message.author.id]) {
					message.member.setNickname(username[message.author.id]);
				} else {
					message.channel.send("\:warning: Couldn't find your in-game username in the database. Please try again later. You'll have to verify your account again by typing **'v!verify [in-game username]'**").then(msg => {msg.delete({timeout:10000})});
					message.member.roles.add('728748298168696852');
					message.member.roles.remove('726923236776083569');
					return;
				}
				message.channel.send("\:white_check_mark: Successfully unnicked.").then(msg => {msg.delete({timeout:4000})});
			} else {
				message.channel.send("\:no_entry: You are not nicked.").then(msg => {msg.delete({timeout:10000})});
			}
		}
		message.delete({timeout:10000});
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
			message.channel.send("\:no_entry: **You can't chat in this channel, try: '!help'.**").then(msg => {msg.delete({timeout:4000})});
		}
	}
	else if(message.channel.name == "trail-vote") {
		if (command === 'tv') {
			const mention = message.mentions.members.first();
			if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail helper')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Helper**; should this status be kept? Please vote by reacting to this message.\nHelper's need at least **5** upvotes (+1 from bot).\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍').catch(); await msg.react('👎').catch();});
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail splasher')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Splasher**; should this status be kept? Please vote by reacting to this message.\nSplasher's need at least **4** upvotes (+1 from bot).\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍').catch(); await msg.react('👎').catch();});
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail admin')) {
				message.channel.send("What did you think of <@" + mention + "> as a **Trail Admin**; should this status be kept? Please vote by reacting to this message.\Admin's need at least **6** upvotes (+1 from bot).\n*The voting will end soon, voting is not required. Exceptions might be made.*").then(async msg => {await msg.react('👍').catch(); await msg.react('👎').catch();});
			}
			else {
				message.channel.send("\:no_entry: This user doesn't have any **Trail Status** active.").then(msg => {msg.delete({timeout:10000})});
			}
			message.delete({timeout:1000});
		}
		else if (command === 'promote') {
			const mention = message.mentions.members.first();
			if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail helper')) {
				message.channel.send("Congratulations <@" + mention + ">, you've been accepted as **Helper**!\n*Your roles have automatically been updated. Please contact an administrator if an error occured.*");
				mention.roles.remove('727180920830034050');
				mention.roles.add('726942583024254986');
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail splasher')) {
				message.channel.send("Congratulations <@" + mention + ">, you've been accepted as **Splasher**!\n*Your roles have automatically been updated. Please contact an administrator if an error occured.*");
				mention.roles.remove('727180786541002812');
				mention.roles.add('726931348698300557');
			}
			else if (mention.roles.cache.some(r => r.name.toLowerCase() === 'trail admin')) {
				message.channel.send("Congratulations <@" + mention + ">, you've been accepted as **Admin**!\n*Your roles have automatically been updated. Please contact an administrator if an error occured.*");
				mention.roles.remove('727180504402624532');
				mention.roles.add('726926448044015656');
			}
			else {
				message.channel.send(":no_entry: This user doesn't have any **Trail Status** active.").then(msg => {msg.delete({timeout:10000})});
			}
			message.delete({timeout:1000});
		}
	}
	else if(message.channel.name == "role-request") {
		if (command === 'accept') {
			if (message.roles.cache.some(r => r.name.toLowerCase() === 'admin')) {
				const mention = message.mentions.members.first();
				mention.roles.add('728990103678091335');
				message.channel.send(":white_check_mark: Success!").then(msg => {msg.delete({timeout:1000})});
			}
			else {
				message.channel.send(":no_entry: Invalid permission!").then(msg => {msg.delete({timeout:1000})});
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
