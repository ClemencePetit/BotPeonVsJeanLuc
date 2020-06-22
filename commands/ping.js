// Mines' vision power
module.exports = {
    name: 'ping',
    description: 'Send a ping to your mate that says you want to attack. You must give as argument \"attack\", \"defense\" or \"taunt\"',
    execute(DemiurgeBot, message, arguments) 
    {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        if (!PVSJL || !PVSJL.running) 
        {
            return;
        }

        if (arguments.length < 1)
        {
            message.channel.send("Je ne ferais passer que les messages suivants : \"attack\", \"defense\" ou \"taunt\".");  
            return;
		}
        else if (arguments.length > 1)
        {
            message.channel.send("Tu parles trop. Je ne ferais passer que les messages suivants : \"attack\", \"defense\" ou \"taunt\".");  
            return;   
		}

        if (arguments[0] !== "defense" && arguments[0] !== "attack" && arguments[0] !== "taunt" )
        {
            message.channel.send("Damn, c'est dur de te comprendre....Redit pour voir?");  
		    return;
        }

        if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")).length === 0) // Only players can ping
        {
            // Getting message destination
            let channels = [];
            if (arguments[0] === "taunt") // taunt message 
            {
                if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Peon")).length !== 0) // team A to team B
                {
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc'));
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc'));
				}
                else // team B to team A
                {
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'peon'));
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon'));
				}
			}
            else // message from a mate to another in the same team
            {
                if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain-Peon")).length !== 0) // HumanA
                {
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon'));
                } 
                else if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain-Jean-Luc")).length !== 0) //HumanB
                {
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc'));
                } 
                else if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Peon")).length !== 0) //GodA
                {
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'peon'));
                } else //GodB
                {
                    channels.push(DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc'));
                }
			}

            // Choosing right message in function of the argument and the player's role
            let pingMessage;
            if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length > 0) // A god send the message
            {
                if (arguments[0] === "attack")
                {
                    pingMessage = "Votre dieu, dans son infinie bonté, vous fait savoir qu'il souhaite passer à l'offensive !";
				}
                else if (arguments[0] === "defense")
                {
                    pingMessage = "Votre dieu, dans son infinie bonté, vous fait savoir qu'il souhaite défendre la position !";        
				}
                else //taunt
                {
                    pingMessage = "Le dieu d'une religion d'hérétiques vous fait savoir son désir de vous anéantir!";
				}
			}
            else // A human send the message
            {
                if (arguments[0] === "attack")
                {
                    pingMessage = "La créature insiginifiante que vous supervisez vous fait savoir qu'elle souhaite passer à l'offensive !";
				}
                else if (arguments[0] === "defense")
                {
                    pingMessage = "La créature insiginifiante que vous supervisez vous fait savoir qu'elle souhaite défendre la position !";        
				}
                else //taunt
                {
                    pingMessage = "Une créature insignifiante suivant une religion d'hérétiques vous fait savoir son désir de vous anéantir !";
				}
			}

            // Send the ping
            channels.forEach(channel => channel.send(pingMessage));
        }     
    },
};
