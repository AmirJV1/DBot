require('dotenv').config();

// add bot to server link:
// https://discord.com/api/oauth2/authorize?client_id=929818334025900132&permissions=446677052480&scope=bot%20applications.commands

const Discord = require('discord.js');
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_MESSAGES']
});

client.on('ready', () => {
	console.log(`Logged in as: ${client.user.tag}`);
});

client.on('messageCreate', (msg) => {
	if (msg.author.bot) return;
	if (
		msg.content.toLowerCase() === 'hi bot' ||
		msg.content.toLowerCase() === 'hola bot'
	) {
		msg.reply('Hello');
	}

	//message validation
	const command = msg.content.split(' ');
	console.log(command.length);
	if (command[0][0] !== '-') return;
	switch (command[0]) {
		case '-meeting':
			if (command.length !== 4) {
				msg.reply(`Error! Not a valid command, please type "-help" for more information`);
				return;
			}
			msg.reply(`Meeting scheduled for ${command[1]} at ${command[2]} ${command[3]} `);
			return;
		case '-help':
			msg.reply(
				'Type -meeting to schedule a zoom meeting example: -meeting MM/DD/YY HH:MM Timezone'
			);
			return;
		default:
			msg.reply(`Error! Not a valid command, please type "-help" for more information`);
			return;
	}
});

client.login(TOKEN);
