let botData = require("../../BotData.js");
const Game = require("../../classes/Game.js");
const GameParams = require("../../classes/GameParams.js");
const Utils = require("../../functions/utils").Utils;

// Stun power
module.exports = {
    name: 'stun',
    description: 'Apply stun in a range of 1 case around the case given in parameter. Ex : !stun E7',
    execute(DemiurgeBot, message, arguments) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        // Test if a game is running
        if (PVSJL && PVSJL.running) {
            let player = Utils.GetPlayerInCurrentChannel(DemiurgeBot, message, Utils.PLAYER_TYPE.GOD_ONLY);
            if (player) {

                if (player.CanMakeActions) {

                    //faut tester le cooldown de l'action
                    if (player.canAOEStun()) {
                        if (arguments.length === 0) {
                            message.channel.send("Tu dois indiquer où jeter le stun.");
                        } else if (arguments[0].match(/^[a-n][1-9]$/i)) {
                            message.channel.send("Tu jetes un stun en " + arguments[0]);
                            player.AddAction("Stun en " + arguments[0]);
                            player.useAOEStunCD();
                        } else {
                            message.channel.send("Tu dois indiquer un positionnement valide.");
                        }
                    } else {
                        message.channel.send("Pas encore! Encore " + player.AOEStunCD + " tours");
                    }
                } else {
                    message.channel.send("Tu ne peux plus réaliser d'action, ton tour est fini!");
                }
            }
        }


        /*
                let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);

                // Test if a game is running
                if(PVSJL && PVSJL.running)
                {
                    if(message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu")).length>0) {
                        let player;
                        let human_ally;
                        let human_adverse;
                        if(message.channel.name==="dieu-peon"&&message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Peon")).length>0){
                            player=PVSJL.game.GodTeamA;
                            human_ally=PVSJL.game.HumanTeamA;
                            human_adverse=PVSJL.game.HumanTeamB;
                        }
                        else if(message.channel.name==="dieu-jean-luc"&&message.member.roles.cache.array().map(a => a.name).filter(w => w.includes("Dieu-Jean-Luc")).length>0){
                            player=PVSJL.game.GodTeamB;
                            human_adverse=PVSJL.game.HumanTeamA;
                            human_ally=PVSJL.game.HumanTeamB;
                        }
                        else{
                            message.channel.send("Tu n\'es pas au bon endroit");
                        }
                        if(player){
                            if(player.canAOEStun()){
                                if(arguments.length===0){
                                    message.channel.send("Tu dois indiquer où jeter le stun.");
                                }
                                else if(arguments[0].match(/^[a-n][1-9]$/i)){
                                    message.channel.send("Tu jetes un stun en "+arguments[0]);
                                    player.AddAction("stun en "+arguments[0]);
                                    player.useAOEStunCD();
                                    console.log(Math.abs(human_adverse.Position[0].toLowerCase().charCodeAt(0)-arguments[0].toLowerCase().charCodeAt(0))<=1);
                                    console.log(human_adverse.Position[1]);
                                    console.log(arguments[0].toLowerCase().charCodeAt(1));
                                    console.log((human_adverse.Position[1]-arguments[0].toLowerCase().charCodeAt(1)));
                                    console.log(Math.abs(human_adverse.Position[1]-arguments[0].toLowerCase().charCodeAt(1)));
                                    console.log(Math.abs(human_adverse.Position[1]-arguments[0].toLowerCase().charCodeAt(1))<=1);

                                    if(Math.abs(human_adverse.Position[0].toLowerCase().charCodeAt(0)-arguments[0].toLowerCase().charCodeAt(0))<=1 && Math.abs(human_adverse.Position[1].toLowerCase().charCodeAt(0)-arguments[0].toLowerCase().charCodeAt(1))<=1)
                                    {
                                        if(human_adverse.ShieldDuration===0)
                                        {
                                            human_adverse.StunDuration=GameParams.GodStunDuration;
                                            message.channel.send("Humain touché");
                                        }
                                        else{
                                            message.channel.send("Humain protégé");
                                        }
                                    }
                                    if(Math.abs(human_ally.Position[0].toLowerCase().charCodeAt(0)-arguments[0].toLowerCase().charCodeAt(0))<=1&& Math.abs(human_ally.Position[1].toLowerCase().charCodeAt(0)-arguments[0].toLowerCase().charCodeAt(1))<=1)
                                    {
                                        if(human_ally.ShieldDuration===0)
                                        {
                                            human_ally.StunDuration=GameParams.GodStunDuration;
                                            message.channel.send("Humain touché");
                                        }
                                        else{
                                            message.channel.send("Humain protégé");
                                        }
                                    }
                                }
                                else{
                                    message.channel.send("Tu dois indiquer un positionnement valide.");
                                }



                            }
                            else{
                                message.channel.send("Le cooldown n\'est pas fini");
                            }
                        }
                        else{
                            console.log("mauvais endroit");
                        }

                    }
                }
        */

    },
};
