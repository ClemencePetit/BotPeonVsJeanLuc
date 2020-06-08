let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const GameParams = require("../../classes/GameParams.js");
const Utils = require("../../functions/utils").Utils;

// Teleportation portals power
module.exports = {
    name: 'portals',
    description: 'Create teleportation portals between the cases given in parameter (if the distance is lower than 3 cases). Ex : !portals E7 E5',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (player) {

                if (player.CanMakeActions) {

                    //test CD
                    if (player.canTPPortal()) {
                        if (arguments.length < 2) {
							message.channel.send("Tu dois indiquer où créer les portails.");
						} else if (arguments[0].match(/^[a-n][1-9]$/i) && arguments[1].match(/^[a-n][1-9]$/i)) {
							//test distance
							let disRow = Math.abs(arguments[0].toLowerCase().charCodeAt(0) - arguments[1].toLowerCase().charCodeAt(0));
							let disLine = Math.abs(parseInt(arguments[0][1]) - parseInt(arguments[1][1]));
							let maxDis = GameParams.GodTPPortalMaxDistance;
							if ((disRow + disLine) <= maxDis + 1) {
								//ON POSE LES PORTAILS ICI
								player.useTPPortalCD();
								player.AddAction("Pose portail " + arguments[0] + " " + arguments[1]);
								message.channel.send("Tu as posé des portails");
							} else {
								message.channel.send("Tes portails sont trop éloignés! La distance maximale est de " + maxDis + " cases.");
							}
						} else {
							message.channel.send("Tu dois indiquer un positionnement valide.");
						}
                    } else {
						message.channel.send("Tu as déjà utilisé ce pouvoir récemment! encore " + player.TPPortalCD + " tours pour pouvoir l'utiliser");
					}


                } else {
                    message.channel.send("Tu ne peux plus réaliser d'action, ton tour est fini!");
                }
            }
        }
    },
};



