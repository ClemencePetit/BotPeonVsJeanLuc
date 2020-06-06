const GameParams = require ("../../Classes/GameParams.js");
let botData = require("../../BotData.js");
const Player = require ("../../Classes/Human.js");

module.exports = 
{
	name: 'actions',
	description: 'R�capitule les actions que tu as d�j� faites et t\'informe du nombre de PA qu\'il te reste.',
	execute(DemiurgeBot, message, arguments)
	{
		let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
		// Test if a game is running
		if(PVSJL && PVSJL.running)
		{
			// Test if the message comes from a human
			if (message.channel.name === "p�on") // HumanA
			{
				let peon = PVSJL.game.HumanTeamA;
				message.channel.send("Tu es l'humain A: " + peon.CurrentPA);
			}
			else if (message.channel.name === "jean-luc") //HumanB
			{
			
			}
			else if (message.channel.name === "dieu-p�on") // GodA
			{
			
			}
			else if (message.channel.name === "dieu-jean-luc") //GodB
			{
			
			}
			else
			{
				message.channel.send("Tu es l'humain A");
			}
		}
		else
		{
			message.channel.send("Il n\'y a pas de partie en cours");
		}	
		
	},
};