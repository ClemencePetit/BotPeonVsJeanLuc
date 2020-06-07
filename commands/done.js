let botData = require("../BotData.js");
const Utils = require("../functions/utils");

module.exports = {
    name: 'done',
    description: 'Les joueurs indiquent qu\'ils ont choisi toutes les actions qu\'ils souhaitent faire',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);

        if (player) {

            player.ValidAction();
            message.channel.send("Tes actions sont validées !");

            // Send to admin channel that the player just finished its turn !
            const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'modo');

            channel.send(message.channel.name + " vient de valider ses actions ! Nombre de joueurs prêts : " + PVSJL.game.NumberPlayersReady + "/4");
        }
    }
};
