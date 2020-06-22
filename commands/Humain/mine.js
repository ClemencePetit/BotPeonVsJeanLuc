const Utils = require("../../functions/utils").Utils;

// Mine capacity
module.exports = {
    name: 'mine',
    description: 'Pose et cache une mine là où tu te tiens à l\'instant où tu la poses. Si ton adversaire marche dessus, où qu\'un de vos Dieux la touche avec ses pouvoirs, elle explosera. Gare à toi si tu es pris dans le souffle ! Ni mur ni portail n\'y résiste, alors tu penses bien que toi, faible humain, tu ne vas pas finir la journée...',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.HUMAN_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanMine()) {
                    let action = player.DoMine();
                    Utils.HandlePlayerAction(player, action, message.channel);
                } else {
                    message.channel.send("Tu n'as plus assez de force pour la cacher aujourd\'hui.");
                }
            }
        }
    },
};

