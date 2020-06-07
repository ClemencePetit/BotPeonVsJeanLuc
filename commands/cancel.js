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
            player.CancelActions();
            message.channel.send("Tu viens d'annuler toutes tes actions pour ce tour !");

            // Send to admin channel that the player just canceled its turn !
            const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'modo');
            channel.send(message.channel.name + " vient d'annuler ses actions ! Nombre de joueurs prêts : " + PVSJL.game.NumberPlayersReady + "/4");
        } else {
            PVSJL.game.HumanTeamA.CancelActions();
            PVSJL.game.HumanTeamB.CancelActions();
            PVSJL.game.GodTeamA.CancelActions();
            PVSJL.game.GodTeamB.CancelActions();
        }
    }
};
