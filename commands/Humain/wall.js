const Utils = require("../../functions/utils").Utils;
const Actions = require("../../classes/Actions");

// Wall capacity
module.exports = {
    name: 'wall',
    description: 'Create a 3-blocks all on the side given in parameter (right/left/up/down). Ex : !wall right.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanWall()) {

                    if (arguments.length === 0) {
                        message.channel.send("Tu dois indiquer la direction où poser le mur.");
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
                            message.channel.send("Tu dois indiquer une position valide !");
                        } else {
                            let action = player.DoWall(direction);
                            Utils.HandlePlayerAction(player, action, message.channel);
                        }
                    }

                } else {
                    message.channel.send("Tu n'as plus assez de points d'actions.");
                }
            }
        }

    },
};

//amélioration : 
//permettre de choisir l'orientation du mur
//permettre de poser un mur + loin pour + de PA
