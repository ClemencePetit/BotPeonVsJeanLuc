let BotData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Game entry point
module.exports = {
    name: 'start',
    description: 'Démarrer une partie',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL) {
            PVSJL = BotData.PVSJL;
        }

        // Checking if a game is not already running
        if (!PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                // Create a new game object
                PVSJL.game = new Game();
                PVSJL.queue = new Map();

                DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);

                message.channel.send(message.author.username + " m'a invoqué, moi, Démiurge Intangible du Jeu.");
                PVSJL.running = true;

                PVSJL.game.StartGame();
                DemiurgeBot.user.setActivity("Observer de vaines luttes d\'égo et de pouvoir.").catch(console.error);

                DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
                Utils.execute(DemiurgeBot, message, './Sons/start.wav');
                Utils.execute(DemiurgeBot, message, './Sons/start_fr.wav');
                Utils.PrintStringToAllChannels(DemiurgeBot, "Moi, Le Démiurge intangible du Jeu, serai maître de votre partie.");
                Utils.PrintStringToAllChannels(DemiurgeBot, "Je vous prierai d'être poli et de commencer toutes vos phrases par **!** qui veut dire *s'il vous plait* en théoludolique. Merci.");
                Utils.PrintStringToAllChannels(DemiurgeBot, "Si tu te perds dans les méandres de la complexité ludique, dis-moi aide. *!aide* bien entendu.");
                //Utils.PrintCurrentTurnInfo(DemiurgeBot, message);

            } else {
                message.channel.send("L'invocation du Démiurge Intangible du Jeu ne peut être procédée que par des êtres exceptionnels.");
            }

        } else {
            message.channel.send("Le Démiurge Intangible du Jeu répondra à votre requête plus tard.");
        }

    },
};
