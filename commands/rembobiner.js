let botData = require("../BotData.js");
const Game = require("../classes/Game.js");
const Utils = require("../functions/utils").Utils;

// Cancel the choice of actions for the current turn before command done is applied
module.exports = {
    name: 'rembobiner',
    description: 'Te permet de recommencer ta journée à 0 avant que tu ne sois allé dormir (sinon, c\'est trop tard, malheureusement.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);

        if (player) {
            if (player.CancelActions()) {
                message.channel.send("Tu viens de recommencer la journée. L\'occasion de faire des choix différents !");

                // Send to admin channel that the player just canceled its turn !
                Utils.PrintStringToAdminChannel(DemiurgeBot, message.channel.name + " vient d'annuler ses actions ! Nombre de joueurs prêts : " + PVSJL.game.NumberPlayersReady + "/4");
            } else {
                message.channel.send("Impossible de revenir en arrière, tu es déjà au lit !");
            }

        } else {
            message.channel.send("Aucun joueur trouvé, vérifie que tu exécute la commande depuis le bon channel !");
        }
    }
};
