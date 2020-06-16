const Utils = require("../../functions/utils").Utils;

// pray power
module.exports = {
    name: 'order',
    description: 'Send an order to your human. Write !order emote1 emote2... You can only use emotes starting by \"PJL_\"',
    execute(DemiurgeBot, message, arguments) 
    {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL || !PVSJL.running) 
        {
            return;
        }

        if (arguments.length < 1)
        {
            message.channel.send("Tu dois indiquer quel ordre tu souhaites envoyer � ton humain. Utilises les emotes commen�ant pas \"JPL_\" et s�pares les d'un espace.");  
            return;
		}

        if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")).length === 0 &&
            message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length === 0) // Only gods can send orders
        {
            // Getting current player
            let player;
            if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Peon")).length !== 0) // HumanA
            {
                player =  PVSJL.game.GodTeamA;   
			}
            else
            {
                player =  PVSJL.game.GodTeamB;   
			}

            // Check if player didnt already communicate this turn
            if (!player.CanCommunicate) 
            {
                message.channel.send("Tu as d�j� envoy� un ordre � ce tour.");  
                return;     
			}

            // Checking if the msg emotes are allowed
            if (!Utils.CheckIfEmotesAreAllowed(message, arguments))
            {
                message.channel.send("Ton ordre contient des emojis interdit !");
                return;
		    }

            // Getting message destination 
            let channel;
            if (player === PVSJL.game.GodTeamA) // GodA
            {
                channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'peon');
            } 
            else if (player === PVSJL.game.GodTeamB) //GodB
            {
                channel = DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc');
            } 

            // Creating message to send
            let msg = "Tu as re�u l'ordre divin suivant: ";
            arguments.forEach(emote => 
            { 
                    msg += emote + " ";
			});
	
            // Send the order and update player status
            channel.send(msg);
            message.channel.send("Ton ordre a bien �t� envoy�e.")
            player.CanCommunicate = false;
        }
        else
        {
            message.channel.send("Seul les dieux peuvent envoyer des ordres.");  
		}
    },
};
