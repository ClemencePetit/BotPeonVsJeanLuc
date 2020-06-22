let botData = require("../../BotData.js");
const Utils = require("../../functions/utils").Utils;

module.exports = {
    name: 'hurry',
    description: 'Indique au joueur donné en paramètre qu\'on l\'attend pour continuer',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL|| !PVSJL.running) {
            return
        }

        if (arguments.length < 1)
        {
			return;
		}
		else
		{
			
				Utils.execute(DemiurgeBot,message,'./Sons/hurry'+arguments[0]+'.wav');
		}


    },
};