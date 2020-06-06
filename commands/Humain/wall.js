let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Wall capacity
module.exports = {
	name: 'wall',
	description: 'Create a 3-blocks all on the side given in parameter (right/left/up/down). Ex : !wall right.',
	execute(DemiurgeBot, message, arguments){
		
		if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length>0/*&&(message.channel.name==="peon"||message.channel.name==="jean-luc") condition de test du channel, a remettre plus tard*/) {
		
			//check PA
			//pour chaque vérifier s'il n'y a pas déjà un mur ?
			if(arguments.length===0){	
				message.channel.send("Tu dois indiquer le côté où poser le mur.");
			}
			else if(arguments[0].match(/^right$/i)){
				message.channel.send("Tu poses un mur à droite");
			}
			else if(arguments[0].match(/^left$/i)){
				message.channel.send("Tu poses un mur à gauche");
			}
			else if(arguments[0].match(/^up$/i)){
				message.channel.send("Tu poses un mur en haut");
			}
			else if(arguments[0].match(/^down$/i)){
				message.channel.send("Tu poses un mur en bas");
			}
			else {
				message.channel.send("Indique un côté où poser le mur valide");
			}
		}
	
		
	},
};

//amélioration : 
//permettre de choisir l'orientation du mur
//permettre de poser un mur + loin pour + de PA