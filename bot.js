require('dotenv').config();
const axios = require('axios');
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
	'No aportas nada a la sociedad',
	'Seguro Umi es un gordo fetichista maricon que hace mods de discord',
	'Tus padres son primos ',
	'Tu cara ya es un insulto',
	'Das pena aportas mas a la vida muriendo',
	'Aveces cuando me siento mal recuerdo que no puedo ser una mierda mas grande y desastrozada que Umi y se me pasa'
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
			msg.reply(`
			Los comandos son:
			**-s** : consigue gifs e imagenes aleatorias [NSFW] .
			**-s $categoria** : consigue gifs e imagenes de la categoria que buscaste [NSFW] .
			**-i $nombre** : insulta a $nombre.
			**-h** : nos dice el doujin favorito de tu mama [NSFW]
			**-h $nombre** : nos dice el doujin favorito de $nombre [NSFW]
			**-g** : quien es el gay del grupo?.

			__*esos son todos los comandos*__
			`);
			return;
		case '-g':
			const rnd2 = Math.floor(Math.random() * integrantes.length);
			msg.reply(`${integrantes[rnd2]} es gay!`);
			return;
		case '-h':
			let hCode = Math.floor(Math.random() * 39998);
			const link = `
			El hentai favorito de ${command[1] === undefined ? 'tu mama' : command[1]} es:
			https://nhentai.net/g/${hCode}/
			`;
			msg.reply(link);
			return;
		case '-s':
			//https://www.nekos.fun/apidoc.html
			const getJuice = async (categoria) => {
				if (categoria === undefined) {
					axios
						.get('http://api.nekos.fun:8080/api/pussy')
						.then((res) => {
							msg.reply(res.data.image);
						})
						.catch((e) => {
							console.log(e);
							msg.reply('La base de datos se fue alv no es culpa mia hdp');
						});
				} else {
					axios
						.get(`http://api.nekos.fun:8080/api/${categoria}`)
						.then((res) => {
							msg.reply(res.data.image);
						})
						.catch((e) => {
							msg.reply(`Esa categoria no existe!
							Categorias disponibles:
> **4k** 	
> **boobs**	
> **cum**	
> **feet**	
> **hentai**	
> **spank**	
> **gasm**	
> **lesbian**	
> **lewd**	
									`);
						});
				}
			};
			getJuice(command[1]);
			return;
		default:
			msg.reply(`Error!, como tu vida, escribe **-ayuda** para ver los comandos`);
			return;
	}
});

client.login(TOKEN);
