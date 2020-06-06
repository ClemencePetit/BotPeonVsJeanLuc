let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Divine message power
module.exports = {
	name: 'message',
	description: 'Apply stun in a range of 1 case around a random case',
	execute(DemiurgeBot, message, arguments){
		if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0/*&&(message.channel.name==="dieu-peon"||message.channel.name==="dieu-jean-luc") condition de test du channel, a remettre plus tard*/) {
			const ligne=Math.floor(Math.random() * Math.floor(9))+1;
			const colonne="abcdefghijklmn".charAt(Math.floor(Math.random() * Math.floor(14)));
			//tester si c'est dans une des bases
			message.channel.send("Tu jetes un stun en "+colonne+ligne+".");
	
		}
	},
};