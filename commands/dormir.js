let botData = require("../BotData.js");
const Utils = require("../functions/utils").Utils;

module.exports = {
    name: 'dormir',
    description: 'Permet de faire savoir que tu as choisi tout ce que tu voulais faire pour la journée.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);

        if (player) {

            if(player.ValidActions()) {
                message.channel.send("Tu t\'en vas regagner tes pénates avec le sentiment du devoir accompli.");
                Utils.PrintStringToAdminChannel(DemiurgeBot, message.channel.name + " vient de valider ses actions ! Nombre de joueurs prêts : " + PVSJL.game.NumberPlayersReady + "/4");
            }else {
                message.channel.send("Tu es déjà parti te couché, pas la peine d\'y aller deux fois.");
            }
        }else {
            message.channel.send("Aucun joueur trouvé, vérifie que tu exécute la commande depuis le bon channel !");
        }
    }
};
