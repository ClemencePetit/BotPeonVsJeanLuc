let botData = require("../BotData.js");
const Game = require ("../Classes/Game.js");

// Cancel the choice of actions for the current turn before command done is applied
module.exports = {
	name: 'cancel',
	description: 'Reset your choice of actions for the current turn before \'done\' call.',
	execute(DemiurgeBot, message, arguments){
		let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
		// Test if a game is running
		if(PVSJL && PVSJL.running)
		{
			if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")).length==0)
			{
				let player;
				if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length>0){
					if(message.channel.name==="peon"){
						player=PVSJL.game.HumanTeamA;
					}
					else if(message.channel.name==="jean-luc"){
						player=PVSJL.game.HumanTeamB;
					}
					else{
						message.channel.send("Mais qui es-tu ?");
					}
				}else if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0) {
					if(message.channel.name==="dieu-peon"){
						player=PVSJL.game.GodTeamA;
					}
					else if(message.channel.name==="dieu-jean-luc"){
						player=PVSJL.game.GodTeamB;
					}
					else{
						message.channel.send("Mais qui es-tu ?");
					}
					
				}
				player.cancel();
			} else {
				PVSJL.game.HumanTeamA.cancel();
				PVSJL.game.HumanTeamB.cancel();
				PVSJL.game.GodTeamA.cancel();
				PVSJL.game.GodTeamB.cancel();
			}
		}
		
		
	
		
	},
};