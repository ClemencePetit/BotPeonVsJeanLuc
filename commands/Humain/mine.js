let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Mine capacity
module.exports = {
	name: 'mine',
	description: 'Drop and hide a mine where the human stand',
	execute(DemiurgeBot, message, arguments){
		let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
		// Test if a game is running
		if(PVSJL && PVSJL.running)
		{
			if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length>0/*&&(message.channel.name==="peon"||message.channel.name==="jean-luc") condition de test du channel, a remettre plus tard*/) {	
				let player;
				if(message.channel.name==="peon"){
					player=PVSJL.game.HumanTeamA;
				}
				else if(message.channel.name==="jean-luc"){
					player=PVSJL.game.HumanTeamB;
				}
				else{
					message.channel.send("Mais qui es-tu ?");
				}
				if(player.canMine()){
					message.channel.send("Tu poses une mine là où tu te tiens.");
					const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'mines');
					channel.send(message.channel.name + " vient de poser une bombe.");
					//rajouter un moyen de savoir la position de l'humain quand il pose une mine
					player.AddAction("pose une mine");
					//player.doMine();
				}
				else{
					message.channel.send("Tu n'as plus assez de points d'actions.");
				}
			}
		}
	},
};