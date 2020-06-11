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
        if (PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                if (PVSJL.game.EndTurn()) {

                    Utils.PrintStringToAllChannels(DemiurgeBot, "== TOUR FINI ! (le modo va répercuter les actions) ==");

                    let actions = PVSJL.game.GetOrderedActionsFromPlayers();
                    let actions_msg = "";

                    for (let i = 0; i < actions.length; i++) {

                        actions_msg += "" + (i + 1) + ".";
                        for (let j = 0; j < actions[i].length; j++) {

                            let action = actions[i][j].action;
                            let actionStr = action != null ? action.ToString() : "NON DEFINI";

                            actions_msg += " / " + actions[i][j].name + " : " + actionStr;
                        }

                        actions_msg += "\n";
                    }

                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Les joueurs ont réalisé les actions suivantes : \n" + actions_msg);
                } else {

                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Les joueurs n'ont pas tous fini leurs actions !");
                }
            } else {
                message.channel.send("Tu n\'as pas l\'autorisation de terminer le tour en cours.");
            }

        }
    },
};
