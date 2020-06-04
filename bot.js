const Discord = require('discord.js');
const DemiurgeBot = new Discord.Client();

const fs = require('fs');
DemiurgeBot.commands = new Discord.Collection();

DemiurgeBot.PVSJL = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file =>file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	DemiurgeBot.commands.set(command.name,command);
}

//DemiurgeBot.login(process.env.TOKEN);

DemiurgeBot.login('NzE3ODUwNTk2OTQ1NjkwNjc2.Xtiz5g.kibTjYghMtfEhlZ64HKpuDX0XRg');

DemiurgeBot.on('ready', () => {
  console.log(`Logged in as ${DemiurgeBot.user.tag}!`);
  DemiurgeBot.user.setActivity("Building a world to destroy").catch(console.error);
});

DemiurgeBot.on('message', message => {
  
  if (message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith('!')) {
        return;
    }

    if (!DemiurgeBot.commands.has(command)) return;

    try {
        DemiurgeBot.commands.get(command).execute(DemiurgeBot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!').catch(console.error);
    }
  
});