let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// shield power
module.exports = {
	name: 'shield',
	description: 'Protect your human.',
	execute(DemiurgeBot, message, arguments){
		if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0/*&&(message.channel.name==="dieu-peon"||message.channel.name==="dieu-jean-luc") condition de test du channel, a remettre plus tard*/) {
			//test CD
			message.channel.send("Quand ce sera implémenté, ton humain sera protégé.");

		}
	},
};