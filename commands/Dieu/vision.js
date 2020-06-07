let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Mines' vision power
module.exports = {
    name: 'vision',
    description: 'Give to you and your human the position of all the mines.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (player) {

                if (player.CanMakeActions) {

                    //test CD
                    if (player.canMineVision()) {
                        if (message.channel.name === "dieu-peon") {
                            const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'peon');
                            //channel.send("Quand ce sera implementé, ton Dieu t'indique où sont les mines.");
                        } else {
                            const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc');
                            //channel.send("Quand ce sera implementé, ton Dieu t'indique où sont les mines.");
                        }
                        //VISION ICI
                        message.channel.send("Détecteur de mine activé!");
                        player.useMineVisionCD();
                        player.AddAction("Détecte les mines pour lui et son humain");
                    } else {
                        message.channel.send("Un peu de patience. Tu pourras détecter les mines dans " + player.MineVisionCD + " tours");
                    }
                } else {
                    message.channel.send("Tu ne peux plus réaliser d'action, ton tour est fini!");
                }
            }
        }
    },
};

