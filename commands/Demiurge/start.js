let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Game entry point
module.exports = {
	name: 'start',
	description: 'Démarrer une partie',
	execute(DemiurgeBot, message, arguments){
		
	let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
	if(!PVSJL){
		PVSJL=botData.PVSJL;
		PVSJL.game = new Game();
		DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
	}
	
	if(!PVSJL.running){
	//Checking autorisations
	if(message.member.roles.cache.some(r => r.name === "Demiurge")) {

			message.channel.send(message.author.username + " choisit de démarrer une partie.");
			PVSJL.running = true;
			DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
		}
		else{
			message.channel.send("Tu n\'as pas l\'autorisation de démarrer une partie.");
		}
		
	}
	else{
		message.channel.send("Une partie est déjà en cours");
	}	
		
	},
};