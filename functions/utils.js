const PLAYER_TYPE = {
    ALL: 0,
    HUMAN_ONLY: 1,
    GOD_ONLY: 2
};

const MessageEmbed = require('discord.js').MessageEmbed;

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

    static GetChannelFromPlayer(DemiurgeBot, game, player) {

        switch (player) {

            case game.HumanTeamA:
                return DemiurgeBot.channels.cache.find(ch => ch.name === 'peon');
            case game.GodTeamA:
                return DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-peon');
            case game.HumanTeamB:
                return DemiurgeBot.channels.cache.find(ch => ch.name === 'jean-luc');
            case game.GodTeamB:
                return DemiurgeBot.channels.cache.find(ch => ch.name === 'dieu-jean-luc');

        }

        return null;
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

    static PrintToAll(DemiurgeBot, message, content) {

        let PVSJL = DemiurgeBot.PVSJL.get(message.guild.id);
        if (PVSJL && PVSJL.running && PVSJL.game) {

            Utils.PrintStringToAllChannels(DemiurgeBot, content);
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
            channel.send("J'accepte d'ajouter ton " + "\" " + action.ToString() + " \" à ta la liste d'actions.");

            if (player.IsActionSlotsFull()) {
                channel.send("Wow wow ça suffit. Plus d'actions pour toi ce tour là. dis moi *done* pour confirmer, et dis moi *cancel* pour annuler. De manière polie bien entendu.");
            } else {
                channel.send("Et puis?");
            }
        } else {
            channel.send("Mon pouvoir a failli...Il te faudra prier d'autres démiurge pour dénouer ta situation.");
        }
    }

    // Check if the given args match with the allowed emojis of the server
    static CheckIfEmotesAreAllowed(message, args) {
        const allowedEmotes = message.guild.emojis.cache;
        for (let argumentsIndex = 0; argumentsIndex < args.length; ++argumentsIndex) {
            const msgEmote = args[argumentsIndex].split('').join('');
            let isMsgEmoteAllowed = false;
            allowedEmotes.each(emote => {
                if (emote.toString() === msgEmote) {
                    isMsgEmoteAllowed = true;
                }
            });

            if (!isMsgEmoteAllowed) {
                return false;
            }
        }

        return true;
    }


    static GetMineStatus(game) {
        let mines = game.Mines;

        let minesMsg = new MessageEmbed()
            .setColor([210, 210, 210])
            .setTitle("Mines");

        mines.forEach(mine => {
            minesMsg.addField("Mine " + mine.Position, mine.ToString());
        });

        if (mines.length === 0) {
            minesMsg.setDescription("Aucune mine présente.");
        }

        return minesMsg;
    }

	
	static async execute(DemiurgeBot, message, son){
		let voiceChannel = message.member.voice.channel;
		if(!voiceChannel)
		{
			return message.channel.send("Faut être dans un vocal");
		}
		if(!DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id)){
			let queueConstruct={
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				playing: true
			};
			
			DemiurgeBot.PVSJL.get(message.guild.id).queue.set(message.guild.id, queueConstruct);
			console.log("1 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			message.channel.send("1 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			queueConstruct.songs.push(son);
			
			try{
				let connection = await voiceChannel.join();
				queueConstruct.connection=connection;
				Utils.play(DemiurgeBot,message,son);
			}
			catch(err){
				console.log(err);
				DemiurgeBot.PVSJL.get(message.guild.id).queue.delete(message.guild.id);
				return message.channel.send(err);
			}
		}
		else{
			message.channel.send("5 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			console.log("5 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs.push(son);
			return message.channel.send(son + " en attente.");
		}
	}
	
	static stop(DemiurgeBot,message){
		console.log("here");
		if(!message.member.voice.channel)
		{
			return message.channel.send("Faut être connecté");
		}
		//console.log(DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
		message.channel.send("2 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
		console.log("2 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
		/*DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs=[];
		DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).connection.dispatcher.end();*/
		DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).voiceChannel.leave();
	}
	
	static play(DemiurgeBot,message,son) {
		let serveurQueue=DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id);
		if(!son){
			message.reply("VIDE");
			DemiurgeBot.PVSJL.get(message.guild.id).queue.delete(message.guild.id);
			return;
		}
		
		let dispatcher = serveurQueue.connection.play(son)
		.on("finish",()=>{
			message.channel.send("3 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			console.log("3 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			if(serveurQueue.songs[1])
			{
				message.reply("prochaine : "+serveurQueue.songs[1]);
				serveurQueue.songs.shift();
				Utils.play(DemiurgeBot,message,serveurQueue.songs[0]);
			}
			else{
				message.reply("fin de la liste");
			}
			
			/*message.channel.send("4 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			console.log("4 " + DemiurgeBot.PVSJL.get(message.guild.id).queue.get(message.guild.id).songs);
			Utils.play(DemiurgeBot,message,serveurQueue.songs[0]);*/
		});
		serveurQueue.textChannel.send("on lance "+son);
}
}

Utils.PLAYER_TYPE = PLAYER_TYPE;

module.exports = {Utils};
