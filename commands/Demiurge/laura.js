//const Board = require("../../classes/Board.js");

module.exports =
    {
        name: 'laura',
        description: 'Tests de Laura',
        execute(DemiurgeBot, message, arguments) {
			
			//on reformule l'emoji, même toi devrait le voir
			const arg = arguments[0].split('').join('');
			console.log(arg);
			
			//on récupère l'emojiList
			const emojiList = message.guild.emojis.cache;
			emojiList.each(user =>
			{
				if(user.toString() === arg){
					console.log("C'est gagné!")
				}
			}
			);
        },
    };
