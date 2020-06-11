const Utils = require("../functions/utils").Utils;

// Mine capacity
module.exports = {
    name: 'wait',
    description: 'Do nothing and wait for the next turn.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                let action = player.DoWait();
                Utils.HandlePlayerAction(player, action, message.channel);
            }
        }
    },
};

