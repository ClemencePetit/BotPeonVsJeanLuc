let botData = require("../../BotData.js");
const Utils = require("../../functions/utils").Utils;

module.exports = {
    name: 'stop',
    description: 'Forcer l\'arrêt d\'une partie',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL) {
            PVSJL = botData.PVSJL;
            DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
        }

        if (PVSJL.running) {

            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                message.channel.send(message.author.username + " choisit d'arrêter ces enfantillages sans autre forme de procès.");

				Utils.stop(DemiurgeBot,message);
                

                try {
                    DemiurgeBot.PVSJL.set(message.guild.id, PVSJL);
                    if (PVSJL.game.ScoreTeamA === 3 || PVSJL.game.ScoreTeamB === 3) {

                        let winnerName = PVSJL.game.ScoreTeamB === 3 ? "Jean-Luc" : "Péon";
						let sonwinner = PVSJL.game.ScoreTeamB === 3 ? "./Sons/victoireJL.wav" : "./Sons/victoireP.wav";

						Utils.execute(DemiurgeBot, message, sonwinner);

                        Utils.PrintStringToAllChannels(DemiurgeBot, "La religion de " + winnerName + " est sacrée vainqueur !");
                        Utils.PrintStringToAllChannels(DemiurgeBot, "Maintenant que cette rivalité a trouvé sa conclusion, nous pouvons retourner à notre repos... jusqu\'à la prochaine fois.");
                    } else {

                        Utils.PrintStringToAllChannels(DemiurgeBot, "Les enfantillages ont assez duré. Les Démiurges en ont eu marre.");
                    }
                    DemiurgeBot.user.setActivity("Construire un monde à détruire").catch(console.error);
					PVSJL.running = false;
					PVSJL.game = null;
					console.log("On a bien arrêté");

                } catch (e) {
                    console.error(e);
                }
            } else {
                message.channel.send("Tu n\'as pas l\'autorité pour arrêter ce conflit.");
            }

        } else {
            message.channel.send("Nous sommes en temps de paix.");
        }

    },
};
