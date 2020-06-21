let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const MessageEmbed = require('discord.js').MessageEmbed;
const Utils = require("../../functions/utils").Utils;

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
                    .setTitle("Etat du jeu")
                    .addField("Scores", "Religion de Péon : " + PVSJL.game.ScoreTeamA + " | " + " Religion de Jean-Luc : " + PVSJL.game.ScoreTeamB)
                    .addField("Péon", "PA :" + PVSJL.game.HumanTeamA.CurrentPA + " - Bouclier : " + PVSJL.game.HumanTeamA.ShieldDuration + " - Assommé : " + PVSJL.game.HumanTeamA.StunDuration + " - Position : " + PVSJL.game.HumanTeamA.Position)
                    .addField("Jean-Luc", "PA :" + PVSJL.game.HumanTeamB.CurrentPA + " - Bouclier : " + PVSJL.game.HumanTeamB.ShieldDuration + " - Assommé : " + PVSJL.game.HumanTeamB.StunDuration + " - Position : " + PVSJL.game.HumanTeamB.Position)
                    .addField("Dieu Péon", "Bouclier :" + PVSJL.game.GodTeamA.BouclierCD + " - Assommé : " + PVSJL.game.GodTeamA.AOEStunCD + " - Portails : " + PVSJL.game.GodTeamA.TPPortalCD + " - Vision : " + PVSJL.game.GodTeamA.MineVisionCD)
                    .addField("Dieu Jean-Luc", "Bouclier :" + PVSJL.game.GodTeamB.BouclierCD + " - Assommé : " + PVSJL.game.GodTeamB.AOEStunCD + " - Portails : " + PVSJL.game.GodTeamB.TPPortalCD + " - Vision : " + PVSJL.game.GodTeamB.MineVisionCD);
                message.channel.send(peonMsg).catch(console.error);

                // Send Mine Status
                message.channel.send(Utils.GetMineStatus(PVSJL.game)).catch(console.error);
            }
        }

    },
};
