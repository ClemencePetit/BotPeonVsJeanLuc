const PLAYER_TYPE = {
    ALL: 0,
    HUMAN_ONLY: 1,
    GOD_ONLY: 2
};

class Utils {


    // Returns the Player Object associated with the channel the message has been send from
    static GetPlayerInCurrentChannel(DemiurgeBot, message, mode = this.PLAYER_TYPE.ALL) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = null;

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            switch (mode) {
                case this.PLAYER_TYPE.ALL:

                    if (message.channel.name === "peon") {
                        player = PVSJL.game.HumanTeamA;
                    } else if (message.channel.name === "jean-luc") {
                        player = PVSJL.game.HumanTeamB;
                    } else if (message.channel.name === "dieu-peon") {
                        player = PVSJL.game.GodTeamA;
                    } else if (message.channel.name === "dieu-jean-luc") {
                        player = PVSJL.game.GodTeamB;
                    }

                    break;

                case this.PLAYER_TYPE.GOD_ONLY:
                    if (message.channel.name === "dieu-peon") {
                        player = PVSJL.game.GodTeamA;
                    } else if (message.channel.name === "dieu-jean-luc") {
                        player = PVSJL.game.GodTeamB;
                    }
                    break;

                case this.PLAYER_TYPE.HUMAN_ONLY:
                    if (message.channel.name === "peon") {
                        player = PVSJL.game.HumanTeamA;
                    } else if (message.channel.name === "jean-luc") {
                        player = PVSJL.game.HumanTeamB;
                    }
                    break;
            }
        }

        return player;
    }

    // Returns a String with all the player's actions for the turn.
    static GetPlayerActionsString(player) {
        if (player == null) {
            return "";
        }

        let actionsStr = "";

        let actionSlots = player.ActionSlots;
        for (let i = 0; i < actionSlots.length; i++) {

            let action = actionSlots[i];
            let actionStr = action != null ? action.ToString() : "NON DEFINI";

            actionsStr += (i + 1) + " - " + actionStr + "\n";
        }

        return actionsStr;
    }

    // Prints the message to all channels (dieu-peon; peon; dieu-jean-luc; jean-luc)
    static PrintStringToAllChannels(DemiurgeBot, string) {
        let channelNames = ["dieu-peon", "peon", "jean-luc", "dieu-jean-luc", "modo"];
        for (let channelName of channelNames) {
            const channel = DemiurgeBot.channels.cache.find(ch => ch.name === channelName);
            channel.send(string);
        }
    }

    static PrintStringToAdminChannel(DemiurgeBot, string) {

        const channel = DemiurgeBot.channels.cache.find(ch => ch.name === "modo");
        channel.send(string);

    }

    static PrintCurrentTurnInfo(DemiurgeBot, message) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL && PVSJL.running && PVSJL.game) {

            Utils.PrintStringToAllChannels(DemiurgeBot, "=== TOUR EN COURS : " + PVSJL.game.CurrentTurn + "  ===");
            Utils.PrintStringToAllChannels(DemiurgeBot, "-- SCORE TEAM PEON : " + PVSJL.game.ScoreTeamA + "  |  " + "SCORE TEAM JEAN-LUC : " + PVSJL.game.ScoreTeamB + " --");
        }
    }

    // Determine if the player can make an action (is the turn over ?) and prints according message
    static CanPlayerMakeAction(player, channel) {

        if (player) {

            if (!player.IsTurnOver()) {

                if (player.CanMakeActions()) {

                    return true;
                } else {
                    channel.send("Tu as défini toutes tes actions pour ce tour, fais !done pour confirmer.");
                }
            } else {
                channel.send("Tu ne peux plus réaliser d'action, ton tour est fini !");
            }
        } else {
            channel.send("Aucun joueur trouvé, verifie que tu execute la commande depuis le bon channel !");
        }

        return false;
    }

    // Prints according messages when player just realize its action.
    static HandlePlayerAction(player, action, channel) {
        if (action) {
            channel.send("Action " + "\" " + action.ToString() + " \" correctement ajoutée dans la liste d'actions !");

            if (player.IsActionSlotsFull()) {
                channel.send("Tu as défini toutes tes actions pour ce tour, fais !done pour confirmer.");
            }
        } else {
            channel.send("Erreur dans l'ajout de l'action (contacter les développeurs).");
        }
    }
}

Utils.PLAYER_TYPE = PLAYER_TYPE;

module.exports = {Utils};
