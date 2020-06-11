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
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanMine()) {
                    let action = player.DoMine();
                    Utils.HandlePlayerAction(player, action, message.channel);
                } else {
                    message.channel.send("Tu n'as plus assez de points d'actions.");
                }
            }
        }
    },
};

