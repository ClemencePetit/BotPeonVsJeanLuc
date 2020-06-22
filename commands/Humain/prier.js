const Utils = require("../../functions/utils").Utils;

// pray power
module.exports = {
    name: 'prier',
    description: 'Adresse une prière à ton Dieu. Ecris !prier emote1 emote2... Tu peux utiliser toutes les emots commençant par \"PJL_\"',
    execute(DemiurgeBot, message, arguments) 
    {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL || !PVSJL.running) 
        {
            return;
        }

        if (arguments.length < 1)
        {
            message.channel.send("C'est bien beau de prier si tu penses Ã  rien...");  
            return;
		}

        if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")).length === 0 &&
            message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length === 0) // Only humans can send prayers
        {
            // Getting current player
            let player;
            if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain-Peon")).length !== 0) // HumanA
            {
                player =  PVSJL.game.HumanTeamA;   
			}
            else
            {
                player =  PVSJL.game.HumanTeamB;   
			}

            // Check if player didnt already communicate this turn
            if (!player.CanCommunicate) 
            {
                message.channel.send("Une seule priÃ¨re par jour. DÃ©solÃ©.");  
                return;     
			}

            // Checking if the msg emotes are allowed
            if (!Utils.CheckIfEmotesAreAllowed(message, arguments))
            {
                message.channel.send("Ta priÃ¨re contient des emojis interdit ! Bouh !");
                return;
		    }

            // Getting message destination 
            let channel;
            if (player === PVSJL.game.HumanTeamA) // HumanA
            {
                channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon');
            } 
            else if (player === PVSJL.game.HumanTeamB) //HumanB
            {
                channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc');
            } 

            // Creating message to send
            let msg = "Une priÃ¨re est montÃ© jusqu'Ã  toi : ";
            arguments.forEach(emote => 
            { 
                    msg += emote + " ";
			});
	
            // Send the prayer and update player status
            channel.send(msg);
            message.channel.send("Ta priÃ¨re a bien Ã©tÃ© priÃ©e.")
            player.CanCommunicate = false;
        }
        else
        {
            message.channel.send("Seul les humains peuvent prier.");  
		}
    },
};
