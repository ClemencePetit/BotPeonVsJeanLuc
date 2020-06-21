let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;
const Actions = require("../../classes/Actions.js");

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

                    Utils.PrintStringToAllChannels(DemiurgeBot, "Les conséquences de cette journée seront-elles mémorables ? Nous contactons les Démiurges présents sur place.");
					
				Utils.execute(DemiurgeBot,message,'./Sons/Soir/1.mp3');

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

                    // Check for Human Shield
                    let humans = [PVSJL.game.m_humanTeamA, PVSJL.game.m_humanTeamB];
                    humans.forEach(human => {
                        if (human.ShieldDuration === 1) {
                            Utils.PrintStringToAdminChannel(DemiurgeBot, human.Name + " va perdre son bouclier à la fin du tour !");
                        }
                    });
                } else {

                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Hophophop, tout le monde n'a pas fini sa journée de travail. ");
                }
            } else {
                message.channel.send("Seuls les êtres supérieurs décrètent la fin de journée. Toi non.");
            }

        }
    },
};
