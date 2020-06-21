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

                message.channel.send(message.author.username + " choisit d'arrêter ces enfantillages sans autre forme de procès.");
				
				Utils.stop(DemiurgeBot,message);
                PVSJL.running = false;
                try {
                    DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);

                    Utils.PrintStringToAllChannels(DemiurgeBot, "Les enfantillages ont assez duré. Les Démiurges vous en ont eu marre.");
					DemiurgeBot.user.setActivity("Construire un monde à détruire").catch(console.error);
					

                } catch (e) {
                    console.error(e);
                }
            } else {
                message.channel.send("Tu n\'as pas l\'autorité pour arrêter ce conflit.");
            }

        } else {
            message.channel.send("Nous sommes en temps de paix.");
        }

    },
};
