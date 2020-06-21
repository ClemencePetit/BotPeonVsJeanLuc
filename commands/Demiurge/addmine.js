let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Game entry point
module.exports = {
    name: 'addmine',
    description: 'Ajoute une mine à la position donnée.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                let position = arguments[0];
                if (arguments.length === 0) {
                    message.channel.send("Certes. Mais où?");
                } else if (position.match(/^[a-o]([1-9]|10)$/i)) {
                    if (PVSJL.game.AddMine(position)) {
                        Utils.PrintStringToAdminChannel(DemiurgeBot, "Une mine est ajoutée en " + position + " !");
                    }
                } else {
                    Utils.PrintStringToAdminChannel(DemiurgeBot, "Euuuh c'est où ça?");
                }

            } else {
                Utils.PrintStringToAdminChannel(DemiurgeBot, "Pour qui te prends-tu? Seuls des êtres supérieurs peuvent ajouter une mine.");
            }

        }
    },
};
