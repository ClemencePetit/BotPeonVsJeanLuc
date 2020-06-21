const Utils = require("../../functions/utils").Utils;
const Actions = require("../../classes/Actions");

// Wall capacity
module.exports = {
    name: 'mur',
    description: 'Crée un mur de cases du côté donné en paramètre (droite/gauche/haut/bas). Ex : !mur droite.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanWall()) {

                    if (arguments.length === 0) {
                        message.channel.send("Certes, mais où? Haut ? Bas ? Gauche ? Droite ?");
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
                            message.channel.send("Je ne te comprends pas...");
                        } else {
                            let action = player.DoWall(direction);
                            Utils.HandlePlayerAction(player, action, message.channel);
                        }
                    }

                } else {
                    message.channel.send("Tu es trop fatigué pour faire de la maçonnerie aujourd\'hui.");
                }
            }
        }

    },
};

//amélioration : 
//permettre de choisir l'orientation du mur
//permettre de poser un mur + loin pour + de PA
