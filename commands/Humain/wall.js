let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");

// Wall capacity
module.exports = {
	name: 'wall',
	description: 'Create a 3-blocks all on the side given in parameter (right/left/up/down). Ex : !wall right.',
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
				if(player.canWall()){		
					//pour chaque vérifier s'il n'y a pas déjà un mur ?
					if(arguments.length===0){	
						message.channel.send("Tu dois indiquer le côté où poser le mur.");
					}
					else if(arguments[0].match(/^right$/i)){
						message.channel.send("Tu poses un mur à droite");
						player.AddAction("pose un mur à droite");
						player.doWall();
					}
					else if(arguments[0].match(/^left$/i)){
						message.channel.send("Tu poses un mur à gauche");
						player.AddAction("pose un mur à gauche");
						player.doWall();
					}
					else if(arguments[0].match(/^up$/i)){
						message.channel.send("Tu poses un mur en haut");
						player.AddAction("pose un mur en haut");
						player.doWall();
					}
					else if(arguments[0].match(/^down$/i)){
						message.channel.send("Tu poses un mur en bas");
						player.AddAction("pose un mur en bas");
						player.doWall();
					}
					else {
						message.channel.send("Indique un côté où poser le mur valide");
					}
					
				}
				else{
					message.channel.send("Tu n'as plus assez de points d'actions.");
				}
			}
		
		}
		
	},
};

//amélioration : 
//permettre de choisir l'orientation du mur
//permettre de poser un mur + loin pour + de PA