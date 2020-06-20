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
            PVSJL.game = new Game();

            DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
        }
		if(!PVSJL.game)
		{
			PVSJL.game = new Game();
		}

        if (!PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                message.channel.send(message.author.username + " m'a invoqué, moi, Démiurge Intangible du Jeu.");
                PVSJL.running = true;

                PVSJL.game.StartGame();

                DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);

                Utils.PrintStringToAllChannels(DemiurgeBot, "Moi, Le Démiurge intangible du Jeu, serai maître de votre partie.");
                Utils.PrintStringToAllChannels(DemiurgeBot, "Je vous prierai d'être poli et de commencer toutes vos phrases par **!** qui veut dire *s'il vous plait* en théoludolique. Merci.");
                Utils.PrintStringToAllChannels(DemiurgeBot, "Si tu te perds dans les méandres de la complexité ludique, dis-moi help. *!help* bien entendu.");
                //Utils.PrintCurrentTurnInfo(DemiurgeBot, message);

            } else {
                message.channel.send("L'invocation du Démiurge Intangible du Jeu ne peut être procédée que par des êtres eceptionnels.");
            }

        } else {
            message.channel.send("Le Démiurge Intangible du Jeu répondra à votre requête plus tard.");
        }

    },
};
