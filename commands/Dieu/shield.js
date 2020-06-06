let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");
const GameParams = require ("../../Classes/GameParams.js");

// shield power
module.exports = {
	name: 'shield',
	description: 'Protect your human.',
	execute(DemiurgeBot, message, arguments){
		let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
		// Test if a game is running
		if(PVSJL && PVSJL.running)
		{
			if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0/*&&(message.channel.name==="dieu-peon"||message.channel.name==="dieu-jean-luc") condition de test du channel, a remettre plus tard*/) {
				//test CD
				let player;
				let human;
				if(message.channel.name==="dieu-peon"&&message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Peon")).length>0){
					player=PVSJL.game.GodTeamA;
					human=PVSJL.game.HumanTeamA;
				}
				else if(message.channel.name==="dieu-jean-luc"&&message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Jean-Luc")).length>0){
					player=PVSJL.game.GodTeamB;
					human=PVSJL.game.HumanTeamB;
				}
				else{
					message.channel.send("Tu n\'es pas au bon endroit");
				}
				if(player){
					if(player.canShield()){
						message.channel.send("Quand ce sera implémenté, ton humain sera protégé.");
						player.AddAction("protège son humain");
						player.useShieldCD();
						//mettre ça dans EndTurn human.ShieldDuration=GameParams.GodShieldDuration;
					}
					else{
						message.channel.send("Le cooldown n\'est pas fini");
					}
				}
				else{
					console.log("mauvais endroit");
				}

			}
		}
	},
};