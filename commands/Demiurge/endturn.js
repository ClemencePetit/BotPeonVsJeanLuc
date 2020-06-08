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
					// Getting each player's actions
					let player;
					let actions_msg;
					if(PVSJL.game.GetCurrentTurnType==1){
						player = PVSJL.game.GodTeamA;
						actions_msg = "\nJoueur Dieu-Peon:\n";
						player.Actions.forEach(action => {
							actions_msg += "- " + action + "\n";
						});
						player = PVSJL.game.GodTeamB;
						actions_msg += "\nJoueur Dieu-Jean-Luc:\n";
						player.Actions.forEach(action => {
							actions_msg += "- " + action + "\n";
						});

					}
					else{
						player = PVSJL.game.HumanTeamA;
						actions_msg = "\n Joueur Humain-Peon:\n";
						player.Actions.forEach(action => {
							actions_msg += "- " + action + "\n";
						});
						player = PVSJL.game.HumanTeamB;
						actions_msg += "\nJoueur Humain-Jean-Luc:\n";
						player.Actions.forEach(action => {
							actions_msg += "- " + action + "\n";
						});
					}
                  
                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Les joueurs ont réalisé les actions suivantes : "+actions_msg);
                }else {

                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Les joueurs n'ont pas tous fini leurs actions !");
                }
            } else {
                message.channel.send("Tu n\'as pas l\'autorisation de terminer le tour en cours.");
            }

        }
    },
};
