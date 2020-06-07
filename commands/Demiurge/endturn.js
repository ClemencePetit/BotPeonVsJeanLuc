let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Game entry point
module.exports = {
    name: 'endturn',
    description: 'Termine le tour en cours si tous les joueurs on finit de choisir leurs actions. ' +
        'Bloque les joueurs d annuler leurs actions et affiche ces actions au modo.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (!PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                if (PVSJL.game.NumberPlayersReady >= 4) {
                    PVSJL.game.EndTurn();

                    Utils.PrintStringToAllChannels(DemiurgeBot, "== TOUR FINI ! (le modo va répercuter les actions) ==");
                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Les joueurs ont réalisé les actions suivantes : //TODO ");
                }else {
                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Les joueurs n'ont pas tous fini leurs actions !");
                }
            } else {
                message.channel.send("Tu n\'as pas l\'autorisation de terminer le tour en cours.");
            }

        }
    },
};
