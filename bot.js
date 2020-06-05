//getting packages
const Discord = require('discord.js');
const DemiurgeBot = new Discord.Client();

const dotenv = require('dotenv').config()

const fs = require('fs');
DemiurgeBot.commands = new Discord.Collection();

DemiurgeBot.PVSJL = new Map();

//Get list of commands (see folder)
const commandFiles = fs.readdirSync('./commands').filter(file =>file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	DemiurgeBot.commands.set(command.name,command);
}

//Log bot in discord
DemiurgeBot.login(process.env.BOTKEY);

DemiurgeBot.on('ready', () => {
  console.log(`Logged in as ${DemiurgeBot.user.tag}!`);
  DemiurgeBot.user.setActivity("Building a world to destroy").catch(console.error);
});

//React to !message
DemiurgeBot.on('message', message => {
  
  if (message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith('!')) {
        return;
    }

    if (!DemiurgeBot.commands.has(command)) return;

    try {
		//execute apropriate command with apropriate args
        DemiurgeBot.commands.get(command).execute(DemiurgeBot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!').catch(console.error);
    }
  
});