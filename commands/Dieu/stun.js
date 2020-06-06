let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Stun power
module.exports = {
	name: 'stun',
	description: 'Apply stun in a range of 1 case around the case given in parameter. Ex : !stun E7',
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
			
			//faut tester le cooldown de l'action
			if(player.canAOEStun()){
				if(arguments.length===0){	
					message.channel.send("Tu dois indiquer où jeter le stun.");
				}
				else if(arguments[0].match(/^[a-n][1-9]$/i)){
					message.channel.send("Tu jetes un stun en "+ arguments[0]);
					player.AddAction("Stun en " + arguments[0]);
					player.useAOEStunCD();
				}
				else{
					message.channel.send("Tu dois indiquer un positionnement valide.");
				}	
			}
			else{
				message.channel.send("Pas encore! Encore " + player.AOEStunCD + " tours");
			}
		}
	}
		
	},
};