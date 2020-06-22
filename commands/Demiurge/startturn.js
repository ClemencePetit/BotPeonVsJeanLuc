let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const Utils = require("../../functions/utils").Utils;

// Game entry point
module.exports = {
    name: 'startturn',
    description: 'Commence le prochain tour et affiche les infos à tous les joueurs.',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL.running) {

            //Checking autorisations
            if (message.member.roles.cache.some(r => r.name === "Demiurge")) {

                PVSJL.game.StartTurn();
				Utils.PrintToAll(DemiurgeBot,message, "Un jour de plus. Au travail.");
				
				Utils.execute(DemiurgeBot,message,'./Sons/startturn.wav');
                //Utils.PrintCurrentTurnInfo(DemiurgeBot, message);
				if(PVSJL.game.GetCurrentTurnType==1)
				{
					if(PVSJL.game.GodTeamA.TPPortalCD==2)
					{
						Utils.PrintStringToAdminChannel(DemiurgeBot,"Les portails de Dieu Péon se referment.");
					}
					if(PVSJL.game.GodTeamB.TPPortalCD==2)
					{
						Utils.PrintStringToAdminChannel(DemiurgeBot,"Les portails de Dieu Jean-Luc se referment.");
					}if(PVSJL.game.GodTeamA.ShieldCD==2)
					{
						Utils.PrintStringToAdminChannel(DemiurgeBot,"Le bouclier de Péon disparait.");
					}
					if(PVSJL.game.GodTeamB.ShieldCD==2)
					{
						Utils.PrintStringToAdminChannel(DemiurgeBot,"Le bouclier de Jean-Luc disparait.");
					}
				}

            } else {
                message.channel.send("Pour qui te prends-tu? Seuls des êtres supérieurs peuvent démarrer une nouvelle journée.");
            }

        }
    },
};
