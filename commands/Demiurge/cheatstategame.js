let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const MessageEmbed = require('discord.js').MessageEmbed;

// Display the state of the game
module.exports = {
    name: 'cheatstategame',
    description: 'Affiche l\'état du jeu.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {
                let peonMsg = new MessageEmbed()
                    .setColor([210, 210, 210])
                    .setTitle("Game State")
                    .addField("Péon", "PA :" + PVSJL.game.HumanTeamA.CurrentPA + " - Shield : " + PVSJL.game.HumanTeamA.ShieldDuration + " - Stun : " + PVSJL.game.HumanTeamA.StunDuration + " - Position : " + PVSJL.game.HumanTeamA.Position)
                    .addField("Jean-Luc", "PA :" + PVSJL.game.HumanTeamB.CurrentPA + " - Shield : " + PVSJL.game.HumanTeamB.ShieldDuration + " - Stun : " + PVSJL.game.HumanTeamB.StunDuration + " - Position : " + PVSJL.game.HumanTeamB.Position)
                    .addField("Dieu Péon", "Shield :" + PVSJL.game.GodTeamA.ShieldCD + " - Stun : " + PVSJL.game.GodTeamA.AOEStunCD + " - Portails : " + PVSJL.game.GodTeamA.TPPortalCD + " - Vision : " + PVSJL.game.GodTeamA.MineVisionCD)
                    .addField("Dieu Jean-Luc", "Shield :" + PVSJL.game.GodTeamB.ShieldCD + " - Stun : " + PVSJL.game.GodTeamB.AOEStunCD + " - Portails : " + PVSJL.game.GodTeamB.TPPortalCD + " - Vision : " + PVSJL.game.GodTeamB.MineVisionCD);
                message.channel.send(peonMsg).catch(console.error);

            }
        }

    },
};
