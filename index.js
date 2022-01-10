require('dotenv').config();
import { insultos } from './data/data';
import { randNum } from './helpers/helpers';
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
		msg.reply('Hola put@');
	}

	//message validation
	const command = msg.content.split(' ');
	console.log(command.length);
	if (command[0][0] !== '-') return;
	switch (command[0]) {
		case '-insultar':
			if (command.length !== 2) {
				msg.reply(`Error! No sabes escribir o que? imbecil`);
				return;
			}
			const textInsult = insultos[randNum(insultos)];
			msg.reply(textInsult[randNum(insultos)].replace('Umi', command[1]));
			return;
		case '-ayuda':
			msg.reply('Que te ayude tu madre');
			return;
		default:
			msg.reply(`Error! No sabes escribir o que? imbecil`);
			return;
	}
});

client.login(TOKEN);
