const Discord = require('discord.js');
const DemurgeBot = new Discord.Client();

const fs = require('fs');
DemurgeBot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file =>file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	DemurgeBot.commands.set(command.name,command);
}

DemurgeBot.login(process.env.TOKEN);

DemurgeBot.on('ready', () => {
  console.log(`Logged in as ${DemurgeBot.user.tag}!`);
  DemurgeBot.user.setActivity("Building a world to destroy").catch(console.error);
});

DemurgeBot.on('message', message => {
  
  if (message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith('!')) {
        return;
    }

    if (!DemurgeBot.commands.has(command)) return;

    try {
        DemurgeBot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!').catch(console.error);
    }
  
});