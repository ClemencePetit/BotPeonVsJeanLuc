let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;
// Move capacity
module.exports = {
    name: 'move',
    description: 'Move of 1 case in the direction given in parameter (right/left/up/down). Ex : !move right.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (player) {

                if (player.CanMakeActions) {

                    if (player.CanMove()) {
                        if (arguments.length === 0) {
                            message.channel.send("Tu dois indiquer la direction où aller.");
                        } else if (arguments[0].match(/^right$/i)) {
                            message.channel.send("Tu te déplaces à droite");
                            player.AddAction("va à droite");
                            player.DoMove();
                        } else if (arguments[0].match(/^left$/i)) {
                            message.channel.send("Tu te déplaces à gauche");
                            player.AddAction("va à gauche");
                            player.DoMove();
                        } else if (arguments[0].match(/^up$/i)) {
                            message.channel.send("Tu te déplaces en haut");
                            player.AddAction("va en haut");
                            player.DoMove();
                        } else if (arguments[0].match(/^down$/i)) {
                            message.channel.send("Tu te déplaces en bas");
                            player.AddAction("va en bas");
                            player.DoMove();
                        } else {
                            message.channel.send("Indique une direction valide");
                        }
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

