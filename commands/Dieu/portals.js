let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Teleportation portals power
module.exports = {
	name: 'portals',
	description: 'Create teleportation portals between the cases given in parameter (if the distance is lower than 3 cases). Ex : !portals E7 E5',
	execute(DemiurgeBot, message, arguments){
	if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0/*&&(message.channel.name==="dieu-peon"||message.channel.name==="dieu-jean-luc") condition de test du channel, a remettre plus tard*/) {
		//test CD
		if(arguments.length<2){	
			message.channel.send("Tu dois indiquer où créer les portails.");
		}
		else if(arguments[0].match(/^[a-n][1-9]$/i) && arguments[1].match(/^[a-n][1-9]$/i)){
			//test distance 
			message.channel.send("Tu crées un portail entre "+arguments[0]+" et "+arguments[1]+" (la distance n\'a pas encore été vérifiée).");
		}
		else{
			message.channel.send("Tu dois indiquer un positionnement valide.");
		}	
	}
		
	},
};