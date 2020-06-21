let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;
const God = require("../../classes/God.js");

// Game entry point
module.exports = {
    name: 'givevision',
    description: 'Donne à un Dieu et son Humain la vision des mines présentent dans le jeu.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                if (arguments.length === 0) {
                    message.channel.send("Certes. Mais pour quel joueur?");
                } else {
                    let playerName = arguments[0];
                    let player = PVSJL.game.GetPlayerFromString(playerName);

                    if (player != null) {

                        if (player instanceof God) {

                            let human = player.Human;

                            let channels = [Utils.GetChannelFromPlayer(DemiurgeBot, PVSJL.game, player), Utils.GetChannelFromPlayer(DemiurgeBot, PVSJL.game, human)];
                            channels.forEach(channel => {
                                if (channel != null) {
                                    channel.send("L'être suprême Demiurge te gracie de son don d'omniscience qui te permet de voir les mines en jeu !");
                                    channel.send(Utils.GetMineStatus(PVSJL.game));
                                }
                            });

                            message.channel.send("Vision des mines correctement envoyée !");

                        } else {
                            message.channel.send("Cet être n'est pas un Dieu !");
                        }

                    } else {
                        message.channel.send("Cet être n'existe pas !");
                    }

                }

            } else {
                message.channel.send("Pour qui te prends-tu? Seuls des êtres supérieurs peuvent communiquer avec le Démiurge.");
            }

        }
    },
};
