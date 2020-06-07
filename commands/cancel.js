let botData = require("../BotData.js");
const Game = require("../classes/Game.js");
const Utils = require("../functions/utils").Utils;

// Cancel the choice of actions for the current turn before command done is applied
module.exports = {
    name: 'cancel',
    description: 'Reset your choice of actions for the current turn before \'done\' call.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);

        if (player) {
            if (player.CancelActions()) {
                message.channel.send("Tu viens d'annuler toutes tes actions pour ce tour !");

                // Send to admin channel that the player just canceled its turn !
                Utils.PrintStringToAdminChannel(DemiurgeBot, message.channel.name + " vient d'annuler ses actions ! Nombre de joueurs prêts : " + PVSJL.game.NumberPlayersReady + "/2");
            } else {
                message.channel.send("Impossible d'annuler tes actions, ton tour est fini !");
            }

        } else {
            message.channel.send("Auncun joueur trouvé, verifie que tu execute la commande depuis le bon channel !");
        }
    }
};
