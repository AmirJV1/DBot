const { Client, Intents } = require('discord.js');
require('dotenv').config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
	console.log('Logged in as ' + client.user.tag + '!');
});
client.on('message', async (interaction) => {
	console.log('message recieved');
	if (!interaction.isCommand()) return;
	if (interaction.content === 'ping') {
		await interaction.reply('Pong!');
	}
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});
client.login(process.env.DISCORD_TOKEN);
