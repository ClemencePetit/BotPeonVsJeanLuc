const GameParams = require("../../classes/GameParams.js");
let botData = require("../../BotData.js");
const Player = require("../../classes/Player.js");

module.exports =
    {
        name: 'actions',
        description: 'Récapitule les actions que tu as déjà faites et t\'informe du nombre de PA qu\'il te reste.',
        execute(DemiurgeBot, message, arguments) {
            let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

            // Test if a game is running
            if (PVSJL && PVSJL.running) {
                // Test if the message comes from a human
                if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Demiurge")).length === 0) // Player
                {
                    // Getting message's player
                    let player;
                    if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain-Peon")).length !== 0) // HumanA
                    {
                        player = PVSJL.game.HumanTeamA;
                    } else if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain-Jean-Luc")).length !== 0) //HumanB
                    {
                        player = PVSJL.game.HumanTeamB;
                    } else if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Peon")).length !== 0) //GodA
                    {
                        player = PVSJL.game.GodTeamA;
                    } else //GodB
                    {
                        player = PVSJL.game.GodTeamB;
                    }

                    // Getting player's actions
                    let actions_msg = "";
                    player.Actions.forEach(action => {
                        actions_msg += "- " + action + "\n";
                    });

                    // Displaying actions
                    message.channel.send("Durant ce tour, tu as réalisé les actions suivantes:\n" + actions_msg);
                } else {
                    // Getting each player's actions
                    let player = PVSJL.game.HumanTeamA;
                    let actions_msg = "\n Joueur Humain-Peon:\n";
                    player.Actions.forEach(action => {
                        actions_msg += "- " + action + "\n";
                    });

                    player = PVSJL.game.GodTeamA;
                    actions_msg += "\nJoueur Dieu-Peon:\n";
                    player.Actions.forEach(action => {
                        actions_msg += "- " + action + "\n";
                    });

                    player = PVSJL.game.HumanTeamB;
                    actions_msg += "\nJoueur Humain-Jean-Luc:\n";
                    player.Actions.forEach(action => {
                        actions_msg += "- " + action + "\n";
                    });

                    player = PVSJL.game.GodTeamB;
                    actions_msg += "\nJoueur Dieu-Jean-Luc:\n";
                    player.Actions.forEach(action => {
                        actions_msg += "- " + action + "\n";
                    });

                    // Displaying actions
                    message.channel.send("Durant ce tour, les joueurs ont réalisé les actions suivantes:\n" + actions_msg);
                }
            } else {
                message.channel.send("Il n\'y a pas de partie en cours");
            }

        },
    };
