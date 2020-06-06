let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Move capacity
module.exports = {
	name: 'move',
	description: 'Move of 1 case in the direction given in parameter (right/left/up/down). Ex : !move right.',
	execute(DemiurgeBot, message, arguments){
		if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length>0/*&&(message.channel.name==="peon"||message.channel.name==="jean-luc") condition de test du channel, a remettre plus tard*/) {
		
			//check PA
			
			if(arguments.length===0){	
				message.channel.send("Tu dois indiquer la direction où aller.");
			}
			else if(arguments[0].match(/^right$/i)){
				message.channel.send("Tu te déplaces à droite");
			}
			else if(arguments[0].match(/^left$/i)){
				message.channel.send("Tu te déplaces à gauche");
			}
			else if(arguments[0].match(/^up$/i)){
				message.channel.send("Tu te déplaces en haut");
			}
			else if(arguments[0].match(/^down$/i)){
				message.channel.send("Tu te déplaces en bas");
			}
			else {
				message.channel.send("Indique une direction valide");
			}
		}
		
		
	
		
	},
};