const Utils = require("../../functions/utils").Utils;
const Actions = require("../../classes/Actions");

// Move capacity
module.exports = {
    name: 'move',
    description: 'Move of 1 case in the direction given in parameter (right/left/up/down). Ex : !move right.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanMove()) {

                    if (arguments.length === 0) {
                        message.channel.send("Certes, mais où?");
                    } else {

                        let direction = -1;
                        let directionString = arguments[0];

                        if (directionString.match(/^right$/i)) {
                            direction = Actions.Direction.RIGHT;
                        } else if (directionString.match(/^left$/i)) {
                            direction = Actions.Direction.LEFT;
                        } else if (directionString.match(/^up$/i)) {
                            direction = Actions.Direction.UP;
                        } else if (directionString.match(/^down$/i)) {
                            direction = Actions.Direction.DOWN;
                        }

                        if (direction === -1) {
                            message.channel.send("Left?Right?Up?Down? C'est simple pourtant.");
                        } else {
                            let action = player.DoMove(direction);
                            Utils.HandlePlayerAction(player, action, message.channel);
                        }
                    }

                } else {
                    message.channel.send("T'es trop fatigué. Va te coucher.");
                }
            }
        }
    }
    ,
};
