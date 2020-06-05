//getting packages
const Discord = require('discord.js');
const DemiurgeBot = new Discord.Client();

const dotenv = require('dotenv').config()

const fs = require('fs');
DemiurgeBot.commands = new Discord.Collection();

DemiurgeBot.PVSJL = new Map();

//Get list of commands (see folder)
let getCommands = (DemiurgeBot, path)=>{
	const commandFiles = fs.readdirSync(path);
	for(const file of commandFiles){
		const newfile=path+'/'+file;
		if(newfile.endsWith('.js')){
			const command = require(`${newfile}`);
			DemiurgeBot.commands.set(command.name,command);
		} else if(fs.statSync(newfile).isDirectory()){
			getCommands(DemiurgeBot,newfile);
		}
	}
}
getCommands(DemiurgeBot,'./commands');

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
	if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")||w.includes("Humain")||w.includes("Dieu")).length===0){
	  message.channel.send("Tu n\'es pas autorisé à me parler, simple mortel.");
  }else{

    try {
		//execute apropriate command with apropriate args
        DemiurgeBot.commands.get(command).execute(DemiurgeBot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!').catch(console.error);
    }
  }
  
});