require('dotenv').config();
const insultos = [
	'Umi eres un aborto mal hecho',
	'Cuando Umi nacio su mama no le dio el pecho pero la espalda',
	'Umi bañate porfavor puedo olerte y no tengo olfato',
	'Umi tu fracaso se siente hasta los servidores de discord',
	'Umi para que eran las fotos de mis pies que me pediste?',
	'Umi porque me miras asi y donde estan tus pantalones?',
	'Pasan los dias y sigues siendo un fracasad@ Umi',
	'Huele a culo, seguro es Umi',
	'Umi que feo!',
	'Aveces cuando me siento mal recuerdo que no puedo ser una mierda mas grande y desastroza que Umi y se me pasa'
];
const integrantes = ['Amir', 'Adrian', 'Jose Carlos', 'Jorge', 'Gerardo', 'Ramon'];

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
		case '-i':
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
		case '-g':
			const rnd2 = Math.floor(Math.random() * integrantes.length);
			msg.reply(`${integrantes[rnd2]} es gay!`);
			return;
		case '-h':
			let hCode = Math.floor(Math.random() * 39998);
			const link = `
			El hentai favorito de ${command[0]} es:
			https://nhentai.net/g/${hCode}/
			`;
			msg.reply(link);
			return;
		default:
			msg.reply(`Error! como tu`);
			return;
	}
});

client.login(TOKEN);
