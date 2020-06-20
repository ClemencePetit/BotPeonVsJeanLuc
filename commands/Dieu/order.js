const Utils = require("../../functions/utils").Utils;

// pray power!
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
            message.channel.send("Quitte à dire quelquechose, essaye au moins de dire quelquechose...");  
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
                message.channel.send("Je transmettrai pas cet ordre. Pas aujourd'hui en tout cas.");  
                return;     
			}

            // Checking if the msg emotes are allowed
            if (!Utils.CheckIfEmotesAreAllowed(message, arguments))
            {
                message.channel.send("Ton ordre contient des emojis interdits. Fais un effort et écrit bien avec les emojis de ma terre natale.");
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
            let msg = "Ton Dieu t'envoit une vision : ";
            arguments.forEach(emote => 
            { 
                    msg += emote + " ";
			});
	
            // Send the order and update player status
            channel.send(msg);
            message.channel.send("Que ton ordre soit transmis.")
            player.CanCommunicate = false;
        }
        else
        {
            message.channel.send("Seuls les dieux peuvent envoyer des ordres.");  
		}
    },
};
