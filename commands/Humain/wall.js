let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Wall capacity
module.exports = {
    name: 'wall',
    description: 'Create a 3-blocks all on the side given in parameter (right/left/up/down). Ex : !wall right.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (player) {

                if (player.CanMakeActions) {


                    if (player.CanWall()) {
                        //pour chaque vérifier s'il n'y a pas déjà un mur ?
                        if (arguments.length === 0) {
                            message.channel.send("Tu dois indiquer le côté où poser le mur.");
                        } else if (arguments[0].match(/^right$/i)) {
                            message.channel.send("Tu poses un mur à droite");

                            player.AddAction("pose un mur à droite");
                            player.DoWall();
                        } else if (arguments[0].match(/^left$/i)) {
                            message.channel.send("Tu poses un mur à gauche");

                            player.AddAction("pose un mur à gauche");
                            player.DoWall();
                        } else if (arguments[0].match(/^up$/i)) {
                            message.channel.send("Tu poses un mur en haut");

                            player.AddAction("pose un mur en haut");
                            player.DoWall();
                        } else if (arguments[0].match(/^down$/i)) {
                            message.channel.send("Tu poses un mur en bas");

                            player.AddAction("pose un mur en bas");
                            player.DoWall();
                        } else {
                            message.channel.send("Indique un côté où poser le mur valide");
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

//amélioration : 
//permettre de choisir l'orientation du mur
//permettre de poser un mur + loin pour + de PA



