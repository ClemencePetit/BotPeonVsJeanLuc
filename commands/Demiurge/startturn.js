let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Game entry point
module.exports = {
    name: 'startturn',
    description: 'Commence le prochain tour et affiche les infos à tous les joueurs.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                PVSJL.game.StartTurn();
                Utils.PrintCurrentTurnInfo(DemiurgeBot, message);

            } else {
                message.channel.send("Tu n\'as pas l\'autorisation de démarrer un nouveau tour.");
            }

        }
    },
};
