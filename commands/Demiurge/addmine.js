let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Game entry point
module.exports = {
    name: 'addmine',
    description: 'Ajoute une mine à la position donnée et au joueur donné.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                let position = arguments[0];
                if (arguments.length === 0) {
                    message.channel.send("Certes. Mais où?");
                } else if (position.match(/^[a-o]([1-9]|10)$/i)) {


                    let playerName = arguments[1];
                    if (arguments.length === 2) {

                        let player = PVSJL.game.GetPlayerFromString(playerName);
                        if (player != null) {
                            if (PVSJL.game.AddMine(position, player)) {
                                message.channel.send("Une mine est ajoutée en " + position + " !");
                            }
                        } else {
                            message.channel.send("Cet Humain n'existe pas !");
                        }

                    } else {
                        message.channel.send("Certes. Mais pour quel joueur?");
                    }


                } else {
                    message.channel.send("Euuuh c'est où ça?");
                }

            } else {
                message.channel.send("Pour qui te prends-tu? Seuls des êtres supérieurs peuvent ajouter une mine.");
            }

        }
    },
};
