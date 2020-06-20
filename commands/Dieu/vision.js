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
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanMineVision()) {
                    let action = player.DoMineVision();
                    Utils.HandlePlayerAction(player, action, message.channel);
                } else {
                    message.channel.send("Tes éclaireurs divins pourront repartir dans " + player.MineVisionCD + " jours.");
                }
            }
        }
    },
};
