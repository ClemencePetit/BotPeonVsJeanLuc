let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Mine capacity
module.exports = {
	name: 'mine',
	description: 'Drop and hide a mine where the human stand',
	execute(DemiurgeBot, message, arguments){
	if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length>0/*&&(message.channel.name==="peon"||message.channel.name==="jean-luc") condition de test du channel, a remettre plus tard*/) {	
		//check PA
		message.channel.send("Tu poses une mine là où tu te tiens.");
		const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'mines');
		channel.send(message.channel.name + " vient de poser une bombe.");
		//rajouter un moyen de savoir la position de l'humain quand il pose une mine
	}
	
	},
};