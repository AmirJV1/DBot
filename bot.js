require('dotenv').config();
import { insultos } from './data/insultList';

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
		case '-insulto':
			if (command.length !== 2) {
				msg.reply(`Error! aprende a escribir bien culero`);
				return;
			}
			const rnd = Math.floor(Math.random() * insultos.length);
			msg.reply(insultos[rnd].replace('Umi', command[1]));
			return;
		case '-ayuda':
			msg.reply('Que te ayude tu madre imbecil');
			return;
		default:
			msg.reply(`Error! aprende a escribir bien culero`);
			return;
	}
});

client.login(TOKEN);
