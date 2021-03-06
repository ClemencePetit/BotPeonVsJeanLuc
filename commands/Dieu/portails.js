let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const GameParams = require("../../classes/GameParams.js");
const Utils = require("../../functions/utils").Utils;

// Teleportation portals power
module.exports = {
    name: 'portails',
    description: 'Crée des portails de téléportation entre les cases données en paramètres, à condition que pas plus de trois cases directement adjacentes ne les séparent. Ex : !portails E7 E5',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanTPPortal()) {

                    if (arguments.length < 2) {

                        message.channel.send("Certes, mais où?");

                    } else if (arguments[0].match(/^[a-o]([1-9]|10)$/i) && arguments[1].match(/^[a-o]([1-9]|10)$/i)) {

                        //test distance
                        let disRow = Math.abs(arguments[0].toLowerCase().charCodeAt(0) - arguments[1].toLowerCase().charCodeAt(0));
                        let disLine = Math.abs(parseInt(arguments[0][1]) - parseInt(arguments[1][1]));
                        let maxDis = GameParams.GodTPPortalMaxDistance;
                        if ((disRow + disLine) <= maxDis) {

                            // WE CAN PLACE A PORTAL
                            let action = player.DoTPPortal(arguments[0],arguments[1]);
                            Utils.HandlePlayerAction(player, action, message.channel);
                        } else {
                            message.channel.send("Tes portails sont trop éloignés ! La distance maximale est de " + maxDis + " cases.");
                        }
                    } else {
                        message.channel.send("Tu dois indiquer un positionnement valide. Sinon le tissu même de l'espace-temps risque de se déchirer. Ceci serait fort dommageable.");
                    }

                } else {
                    message.channel.send("Le tissu de l'espace-temps n\'a pas encore eu le temps de cicatriser. Laisse lui encore " + player.TPPortalCD + " jours.");
                }
            }
        }
    },
};
