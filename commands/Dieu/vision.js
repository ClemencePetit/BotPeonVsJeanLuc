let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Mines' vision power
module.exports = {
	name: 'vision',
	description: 'Give to you and your human the position of all the mines.',
	execute(DemiurgeBot, message, arguments){
		if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0/*&&(message.channel.name==="dieu-peon"||message.channel.name==="dieu-jean-luc") condition de test du channel, a remettre plus tard*/) {
			
			let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
		
			// Test if a game is running
			if(PVSJL && PVSJL.running){
				let player;
				if(message.channel.name==="dieu-peon"){
					player=PVSJL.game.GodTeamA;
				}
				else if(message.channel.name==="dieu-jean-luc"){
					player=PVSJL.game.GodTeamB;
				}
				
				
				//test CD
				if(player.canMineVision()){
					if(message.channel.name==="dieu-peon")
					{
						const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'peon');
						//channel.send("Quand ce sera implementé, ton Dieu t'indique où sont les mines.");
					}
					else{
						const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc');
						//channel.send("Quand ce sera implementé, ton Dieu t'indique où sont les mines.");
					}
					//VISION ICI
					message.channel.send("Détecteur de mine activé!");
					player.useMineVisionCD();
					player.AddAction("Détecte les mines pour lui et son humain");
				}
				else{
					message.channel.send("Un peu de patience. Tu pourras détecter les mines dans " + player.MineVisionCD + " tours");
				}
			}
		}
	},
};