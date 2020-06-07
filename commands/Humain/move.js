let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");

// Move capacity
module.exports = {
    name: 'move',
    description: 'Move of 1 case in the direction given in parameter (right/left/up/down). Ex : !move right.',
    execute(DemiurgeBot, message, arguments) {
        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            if (message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Humain")).length > 0/*&&(message.channel.name==="peon"||message.channel.name==="jean-luc") condition de test du channel, a remettre plus tard*/) {

                let player;
                if (message.channel.name === "peon") {
                    player = PVSJL.game.HumanTeamA;
                } else if (message.channel.name === "jean-luc") {
                    player = PVSJL.game.HumanTeamB;
                } else {
                    message.channel.send("Mais qui es-tu ?");
                }
                if (player.CanMove()) {
                    if (arguments.length === 0) {
                        message.channel.send("Tu dois indiquer la direction où aller.");
                    } else if (arguments[0].match(/^right$/i)) {
                        message.channel.send("Tu te déplaces à droite");
                        player.AddAction("va à droite");
                        //player.DoMove();
                    } else if (arguments[0].match(/^left$/i)) {
                        message.channel.send("Tu te déplaces à gauche");
                        player.AddAction("va à gauche");
                        //player.DoMove();
                    } else if (arguments[0].match(/^up$/i)) {
                        message.channel.send("Tu te déplaces en haut");
                        player.AddAction("va en haut");
                        //player.DoMove();
                    } else if (arguments[0].match(/^down$/i)) {
                        message.channel.send("Tu te déplaces en bas");
                        player.AddAction("va en bas");
                        //player.DoMove();
                    } else {
                        message.channel.send("Indique une direction valide");
                    }
                } else {
                    message.channel.send("Tu n'as plus assez de points d'actions.");
                }
            }

        }


    },
};
