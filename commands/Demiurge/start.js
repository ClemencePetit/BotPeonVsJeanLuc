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

                message.channel.send(message.author.username + " choisit de démarrer une partie.");
                PVSJL.running = true;

                PVSJL.game.StartGame();

                DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);

                Utils.PrintStringToAllChannels(DemiurgeBot, "===== DEBUT D'UNE NOUVELLE PARTIE =====");
                Utils.PrintCurrentTurnInfo(DemiurgeBot, message);

            } else {
                message.channel.send("Tu n\'as pas l\'autorisation de démarrer une partie.");
            }

        } else {
            message.channel.send("Une partie est déjà en cours");
        }

    },
};
