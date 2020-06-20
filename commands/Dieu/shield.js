let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const GameParams = require("../../classes/GameParams.js");
const Utils = require("../../functions/utils").Utils;

// shield power
module.exports = {
    name: 'shield',
    description: 'Protect your human.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanShield()) {

                    let action = player.DOShield(position);
                    Utils.HandlePlayerAction(player, action, message.channel);

                } else {
                    message.channel.send("Un peu de patience! Je te donne encore " + player.ShieldCD + " jours avant de pouvoir recréer un bouclier.");
                }
            }
        }
    },
};
