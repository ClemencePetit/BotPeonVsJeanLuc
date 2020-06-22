const Utils = require("../functions/utils").Utils;

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
                    let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message);

                    // Displaying actions
                    message.channel.send("Durant ce jour, tu as réalisé les actions suivantes:\n" + Utils.GetPlayerActionsString(player));
                } else {

                    // Getting each player's actions
                    let player = PVSJL.game.HumanTeamA;
                    let actions_msg = "\nJoueur Humain-Peon:\n";
                    actions_msg += Utils.GetPlayerActionsString(player);

                    player = PVSJL.game.GodTeamA;
                    actions_msg += "\nJoueur Dieu-Peon:\n";
                    actions_msg += Utils.GetPlayerActionsString(player);

                    player = PVSJL.game.HumanTeamB;
                    actions_msg += "\nJoueur Humain-Jean-Luc:\n";
                    actions_msg += Utils.GetPlayerActionsString(player);

                    player = PVSJL.game.GodTeamB;
                    actions_msg += "\nJoueur Dieu-Jean-Luc:\n";
                    actions_msg += Utils.GetPlayerActionsString(player);

                    // Displaying actions
                    message.channel.send("Durant ce tour, les joueurs ont réalisé les actions suivantes:\n" + actions_msg);
                }
            } else {
                message.channel.send("Nous sommes en temps de paix.");
            }

        },
    };
