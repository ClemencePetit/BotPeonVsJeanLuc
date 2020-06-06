let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Divine message power
module.exports = {
	name: 'message',
	description: 'Apply stun in a range of 1 case around a random case',
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
				
				if(player.canDivineOrder()){
					
					const ligne=Math.floor(Math.random() * Math.floor(9))+1;
					const colonne="abcdefghijklmn".charAt(Math.floor(Math.random() * Math.floor(14)));
					//tester si c'est dans une des bases
					player.useDivineOrderCD();
					player.AddAction("Message divin en " +colonne+ligne);
					message.channel.send("Ton message divin est arrivé en "+colonne+ligne+".");
				}
				else{
					message.channel.send("Saviez-vous qu'on disait 'Le Foudre' pour parler de l'arme de Zeus? En tout cas, vous n'avez pas pu utiliser le votre.");
				}
			}
		}
	},
};