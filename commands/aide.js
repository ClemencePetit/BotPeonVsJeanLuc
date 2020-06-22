const MessageEmbed = require('discord.js').MessageEmbed;
let botData = require("../BotData.js");
const fs = require('fs');

module.exports = {
	name: 'aide',
	description: 'Dans ma mansuétude, je te rappelle quelles sont les actions qui sont à ta portée.',
	execute(DemiurgeBot, message, arguments){

	let helpMsg = new MessageEmbed()
            .setColor([210,210,210])
            .setImage(DemiurgeBot.user.avatarURL())
            .setTitle("Guide pour jouer en tant que "+message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")||w.includes("Humain")||w.includes("Dieu")).join(', '));
	console.log(message.member.roles.cache.array().map(a => a.name).join(', '));	
	for (const file of fs.readdirSync('./commands')) {
		if(file.endsWith('.js')){
            const command = require(`./${file}`);
			console.log('./'+file);
			helpMsg.addField(command.name, command.description);
		} else if (fs.statSync('./commands/'+file).isDirectory() && message.member.roles.cache.some(r => r.name.includes(file)))
		{
			for (const sfile of fs.readdirSync('./commands/'+file)) {
				if(sfile.endsWith('.js')){
					const command = require(`./${file}/${sfile}`);
					helpMsg.addField(command.name, command.description);
				}

			}
		}

	}
	message.channel.send(helpMsg).catch(console.error);
	if(message.member.roles.cache.some(r => r.name === "Demiurge")) {


	}

		
	},
};



/*let getCommands = (DemiurgeBot, path)=>{
	console.log("On scanne "+path);
	const commandFiles = fs.readdirSync(path);
	for(const file of commandFiles){
		const newfile=path+'/'+file;
		console.log(newfile.toString());
		if(newfile.endsWith('.js')){
			const command = require(`${newfile}`);
			DemiurgeBot.commands.set(command.name,command);
			console.log(newfile.toString()+" est une commande");
		} else if(fs.statSync(newfile).isDirectory()){
			console.log(newfile.toString() + " est un dossier");
			getCommands(DemiurgeBot,newfile);
		}
	}
}*/