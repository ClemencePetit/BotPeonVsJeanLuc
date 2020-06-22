const Utils = require("../../functions/utils").Utils;

// Divine message power
module.exports = {
    name: 'foudre',
    description: 'Lance la foudre, précise et destructrice sur une case aléatoire, détruisant murs et portails, déclenchant les mines et assommant les humains pour le reste de la journée.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (Utils.CanPlayerMakeAction(player, message.channel)) {

                if (player.CanDivineOrder()) {
                    let action = player.DoDivineOrder();
                    Utils.HandlePlayerAction(player, action, message.channel);
                } else {
                    message.channel.send("Saviez-vous qu'on disait 'Le Foudre' pour parler de l'arme de Zeus? En tout cas, vous ne pouvez pas utiliser le votre maintenant.");
                }
            }
        }

    },
};

//const ligne=Math.floor(Math.random() * Math.floor(9))+1;
//const colonne="abcdefghijklmn".charAt(Math.floor(Math.random() * Math.floor(14)));
