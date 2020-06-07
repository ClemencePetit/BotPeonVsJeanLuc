let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Mine capacity
module.exports = {
    name: 'mine',
    description: 'Drop and hide a mine where the human stand',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (player) {

                if (player.CanMakeActions) {

                    if (player.CanMine()) {
                        message.channel.send("Tu poses une mine là où tu te tiens.");
                        const channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'mines');
                        channel.send(message.channel.name + " vient de poser une bombe.");
                        //rajouter un moyen de savoir la position de l'humain quand il pose une mine
                        player.AddAction("pose une mine");
                        player.DoMine();

                    } else {
                        message.channel.send("Tu n'as plus assez de points d'actions.");
                    }
                } else {
                    message.channel.send("Tu ne peux plus réaliser d'action, ton tour est fini!");
                }
            }
        }
    },
};

