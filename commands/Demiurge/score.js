
module.exports =
    {
        name: 'score',
        description: 'Permet de modifier le score des équipes',
        execute(DemiurgeBot, message, arguments) {
            let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

            if (PVSJL && PVSJL.running) 
            {
                // Checking all arguments
                if (arguments.length !== 2)
                {
                    message.channel.send("Il faut deux arguments à la commande. Le premier doit être \"JL\" ou \"Peon\" pour indiquer l'équipe dont tu veux modifier le score. Le second doit être \"+X\" ou \"-X\", X étant le montant dont tu veux changer le score.'");
                    return;
				}

                const team = arguments[0];
                if (team !== "JL" && team !== "Peon")
                {
                    message.channel.send("Le premier argument doit être \'JL\' ou \'Peon\' pour indiquer l'équipe correspondante.");
                    return;
				}

                const number = arguments[1];
                const sign = number[0];
                if (sign !== '-' && sign !== '+')
                {
                    message.channel.send("Le second argument doit démarrer par un + ou un -, suivit d\'un nombre.");
                    return;
				}

                const value = number.substr(1);
                if (isNaN(value))
                {
                    message.channel.send("Le second argument doit démarrer par un + ou un -, suivit d\'un nombre.");
                    return;
				}

                // Converting 2nd argument to a value to add
                let toAdd = parseInt(value);
                if (sign === '-')
                {
                    toAdd *= -1;  
                }

                // Adding the score to the right team
                if (team === "JL")
                {
                    PVSJL.game.ScoreTeamB += toAdd;
                    message.channel.send("Le nouveau score de la team JL est: " + PVSJL.game.ScoreTeamB);
				}
                else 
                {
                    PVSJL.game.ScoreTeamA += toAdd;
                    message.channel.send("Le nouveau score de la team Pean est: " + PVSJL.game.ScoreTeamA);
				}
            } 
            else 
            {
                message.channel.send("Il n\'y a pas de partie en cours");
            }

        },
    };
