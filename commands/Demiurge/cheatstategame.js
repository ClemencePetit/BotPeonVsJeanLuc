let botData = require("../../BotData.js");
const Game = require ("../../Classes/Game.js");
const MessageEmbed = require('discord.js').MessageEmbed;

// Display the state of the game
module.exports = {
	name: 'cheatstategame',
	description: 'Affiche l\'état du jeu.',
	execute(DemiurgeBot, message, arguments){
	let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
	
		// Test if a game is running
		if(PVSJL && PVSJL.running)
		{
		
			if(message.member.roles.cache.some(r => r.name === "Demiurge")) {
				let peonMsg = new MessageEmbed()
				.setColor([210,210,210])
				.setTitle("Peon")
				.addField("Points Action",PVSJL.game.HumanTeamA.CurrentPA);
				message.channel.send(peonMsg).catch(console.error);
				let jlMsg = new MessageEmbed()
				.setColor([210,210,210])
				.setTitle("JL")
				.addField("Points Action",PVSJL.game.HumanTeamB.CurrentPA);
				message.channel.send(jlMsg).catch(console.error);
				let dPeonMsg = new MessageEmbed()
				.setColor([210,210,210])
				.setTitle("Dieu Peon")
				.addField("CD Shield",PVSJL.game.GodTeamA.ShieldCD)
				.addField("CD Stun",PVSJL.game.GodTeamA.AOEStunCD)
				.addField("CD Portal",PVSJL.game.GodTeamA.TPPortalCD)
				.addField("CD Vision",PVSJL.game.GodTeamA.MineVisionCD);
				message.channel.send(dPeonMsg).catch(console.error);
				let djlMsg = new MessageEmbed()
				.setColor([210,210,210])
				.setTitle("Dieu JL")
				.addField("CD Shield",PVSJL.game.GodTeamB.ShieldCD)
				.addField("CD Stun",PVSJL.game.GodTeamB.AOEStunCD)
				.addField("CD Portal",PVSJL.game.GodTeamB.TPPortalCD)
				.addField("CD Vision",PVSJL.game.GodTeamB.MineVisionCD);
				message.channel.send(djlMsg).catch(console.error);
			}
		}
		
	},
};