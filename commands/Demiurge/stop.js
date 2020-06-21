let botData = require("../../BotData.js");
const Utils = require("../../functions/utils").Utils;

module.exports = {
    name: 'stop',
    description: 'Forcer l\'arrêt d\'une partie',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL) {
            PVSJL = botData.PVSJL;
            DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
        }

        if (PVSJL.running) {

            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                message.channel.send(message.author.username + " choisit d'arrêter la partie comme un(e) sauvage.");
				
				Utils.stop(DemiurgeBot,message);
                PVSJL.running = false;
                try {
                    DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);

                    Utils.PrintStringToAllChannels(DemiurgeBot, "===== FIN DE PARTIE =====")
					

                } catch (e) {
                    console.error(e);
                }
            } else {
                message.channel.send("Tu n\'as pas l\'autorisation d\'arrêter la partie.");
            }

        } else {
            message.channel.send("Il n\'y a pas de partie en cours");
        }

    },
};
