let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Divine message power
module.exports = {
    name: 'message',
    description: 'Apply stun in a range of 1 case around a random case',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (player) {

                if (player.CanMakeActions) {

                    if (player.canDivineOrder()) {

                        const ligne = Math.floor(Math.random() * Math.floor(9)) + 1;
                        const colonne = "abcdefghijklmn".charAt(Math.floor(Math.random() * Math.floor(14)))

                        //tester si c'est dans une des bases
                        player.useDivineOrderCD();
                        player.AddAction("Message divin en " + colonne + ligne);
                        message.channel.send("Ton message divin est arrivé en " + colonne + ligne + ".");

                    } else {
                        message.channel.send("Saviez-vous qu'on disait 'Le Foudre' pour parler de l'arme de Zeus? En tout cas, vous n'avez pas pu utiliser le votre.");
                    }

                } else {
                    message.channel.send("Tu ne peux plus réaliser d'action, ton tour est fini!");
                }
            }
        }
    },
};

