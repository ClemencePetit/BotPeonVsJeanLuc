let botData = require("../BotData.js");
const Utils = require("../functions/utils").Utils;

module.exports = {
    name: 'done',
    description: 'Les joueurs indiquent qu\'ils ont choisi toutes les actions qu\'ils souhaitent faire',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);

        if (player) {

            if(player.ValidActions()) {
                message.channel.send("Tes actions sont validées !");
                Utils.PrintStringToAdminChannel(DemiurgeBot, message.channel.name + " vient de valider ses actions ! Nombre de joueurs prêts : " + PVSJL.game.NumberPlayersReady + "/4");
            }else {
                message.channel.send("Impossible de valider tes actions, ton tour est fini !");
            }
        }else {
            message.channel.send("Aucun joueur trouvé, verifie que tu execute la commande depuis le bon channel !");
        }
    }
};
