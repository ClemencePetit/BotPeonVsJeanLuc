const Utils = require("../../functions/utils").Utils;

module.exports =
    {
        name: 'score',
        description: 'Permet de modifier le score des �quipes',
        execute(DemiurgeBot, message, arguments) {
            let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

            if (PVSJL && PVSJL.running) {


                //Checking autorisations
                if (message.member.roles.cache.some(r => r.name === "Demiurge")) {
                    
                    // Checking all arguments
                    if (arguments.length !== 2) {
                        message.channel.send("Il faut deux arguments à la commande. Le premier doit étre \"JL\" ou \"Peon\" pour indiquer l'équipe dont tu veux modifier le score. Le second doit �tre \"+X\" ou \"-X\", X �tant le montant dont tu veux changer le score.'");
                        return;
                    }

                    const team = arguments[0];
                    if (team !== "JL" && team !== "Peon") {
                        message.channel.send("Le premier argument doit étre \'JL\' ou \'Peon\' pour indiquer l'équipe correspondante.");
                        return;
                    }

                    const number = arguments[1];
                    const sign = number[0];
                    if (sign !== '-' && sign !== '+') {
                        message.channel.send("Le second argument doit démarrer par un + ou un -, suivit d\'un nombre.");
                        return;
                    }

                    const value = number.substr(1);
                    if (isNaN(value)) {
                        message.channel.send("Le second argument doit démarrer par un + ou un -, suivit d\'un nombre.");
                        return;
                    }

                    // Converting 2nd argument to a value to add
                    let toAdd = parseInt(value);
                    if (sign === '-') {
                        toAdd *= -1;
                    }

                    // Adding the score to the right team
                    if (team === "JL") {
                        PVSJL.game.ScoreTeamB += toAdd;
                        message.channel.send("Le nouveau score de la team JL est: " + PVSJL.game.ScoreTeamB);
                        Utils.PrintStringToAllChannels(DemiurgeBot, "La religion de Jean-Luc gagne " + toAdd + " point supplémentaire. Elle en a désormais " + PVSJL.game.ScoreTeamB);
                        Utils.execute(DemiurgeBot, message, './Sons/' + PVSJL.game.ScoreTeamB + 'JL.wav');
                        if (PVSJL.game.ScoreTeamB === 3) {
                            Utils.execute(DemiurgeBot, message, './Sons/victoireJL.wav');
                        }
                    } else {
                        PVSJL.game.ScoreTeamA += toAdd;
                        message.channel.send("Le nouveau score de la team Peon est: " + PVSJL.game.ScoreTeamA);
                        Utils.PrintStringToAllChannels(DemiurgeBot, "Péon et son Dieu augmentent leur compteur et atteignent le score de " + PVSJL.game.ScoreTeamA);
                        Utils.execute(DemiurgeBot, message, './Sons/' + PVSJL.game.ScoreTeamA + 'P.wav');
                        if (PVSJL.game.ScoreTeamA === 3) {
                            Utils.execute(DemiurgeBot, message, './Sons/victoireP.wav');
                        }
                    }
                } else {
                    message.channel.send("Tu ne dispose des permissions nécessaires, simple mortel.");
                }

            } else {
                message.channel.send("Nous sommes en temps de paix.");
            }

        },
    };
