class Utils {

    // Returns the Player Object associated with the channel the message has been send from
    static GetPlayerInCurrentChannel(DemiurgeBot, message) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        let player = null;

        // Test if a game is running
        if (PVSJL && PVSJL.running) {

            if (message.channel.name === "peon") {
                player = PVSJL.game.HumanTeamA;
            } else if (message.channel.name === "jean-luc") {
                player = PVSJL.game.HumanTeamB;
            } else if (message.channel.name === "dieu-peon") {
                player = PVSJL.game.GodTeamA;
            } else if (message.channel.name === "dieu-jean-luc") {
                player = PVSJL.game.GodTeamB;
            }
        }

        return player;
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
            Utils.PrintStringToAllChannels(DemiurgeBot, "=== TOUR EN COURS : " + PVSJL.game.m_currentTurn + " ===");
            Utils.PrintStringToAllChannels(DemiurgeBot, "-- SCORE TEAM PEON : " + PVSJL.game.ScoreTeamA + "  |  " + "SCORE TEAM JEAN-LUC : " + PVSJL.game.ScoreTeamB + " --");
        }
    }
}

module.exports = {Utils};
