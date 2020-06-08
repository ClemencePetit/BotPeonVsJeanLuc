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
            message.channel.send("Tu dois indiquer quel ping tu souhaites faire: \"attack\", \"defense\" ou \"taunt\".");  
            return;
		}
        else if (arguments.length > 1)
        {
            message.channel.send("Tu as indiqu� trop de param�tres. Tu dois simplement indiquer quel ping tu souhaites faire: \"attack\", \"defense\" ou \"taunt\".");  
            return;   
		}

        if (arguments[0] !== "defense" && arguments[0] !== "attack" && arguments[0] !== "taunt" )
        {
            message.channel.send("Param�tre incorrect. Tu dois simplement indiquer quel ping tu souhaites faire: \"attack\", \"defense\" ou \"taunt\".");  
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
                    pingMessage = "Votre dieu, dans son infinie bont�, vous fait savoir qu'il souhaite passer � l'offensive !";
				}
                else if (arguments[0] === "defense")
                {
                    pingMessage = "Votre dieu, dans son infinie bont�, vous fait savoir qu'il souhaite d�fendre la position !";        
				}
                else //taunt
                {
                    pingMessage = "Le dieu d'une religion d'h�r�tiques vous fait savoir son d�sir de vous an�antir!";
				}
			}
            else // A human send the message
            {
                if (arguments[0] === "attack")
                {
                    pingMessage = "La cr�ature insiginifiante que vous supervisez vous fait savoir qu'elle souhaite passer � l'offensive !";
				}
                else if (arguments[0] === "defense")
                {
                    pingMessage = "La cr�ature insiginifiante que vous supervisez vous fait savoir qu'elle souhaite d�fendre la position !";        
				}
                else //taunt
                {
                    pingMessage = "Une cr�ature insignifiante suivant une religiant d'h�r�tique vous fait savoir son d�sir de vous an�antir !";
				}
			}

            // Send the ping
            channels.forEach(channel => channel.send(pingMessage));
        }     
    },
};
