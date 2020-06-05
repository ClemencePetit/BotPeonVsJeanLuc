const GameParams = require ("../../Classes/GameParams.js");
let botData = require("../../BotData.js");

module.exports = 
{
	name: 'ben',
	description: 'Tests de benjamin',
	execute(DemiurgeBot, message, arguments)
	{
		let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
		if(!PVSJL)
		{
			return;
		}
	
		if(PVSJL.running)
		{
			message.channel.send("Player PA:: " + PVSJL.game.HumanTeamA.CurrentPA);
		
		}
		else
		{
			message.channel.send("Il n\'y a pas de partie en cours");
		}	
		
	},
};