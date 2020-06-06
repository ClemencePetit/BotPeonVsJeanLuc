let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Mines' vision power
module.exports = {
	name: 'vision',
	description: 'Give to you and your human the position of all the mines.',
	execute(DemiurgeBot, message, arguments){
		if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0/*&&(message.channel.name==="dieu-peon"||message.channel.name==="dieu-jean-luc") condition de test du channel, a remettre plus tard*/) {
			
			//test CD
			if(message.channel.name==="dieu-peon")
			{
				const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'peon');
				channel.send("Quand ce sera implementé, ton Dieu t'indique où sont les mines.");
			}
			else{
				const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc');
				channel.send("Quand ce sera implementé, ton Dieu t'indique où sont les mines.");
			}
			message.channel.send("Quand ce sera implementé, tu sauras où sont les mines, et ton humain aussi.");
		}
	},
};