//const Board = require("../../classes/Board.js");

module.exports =
    {
        name: 'laura',
        description: 'Tests de Laura',
        execute(DemiurgeBot, message, arguments) {
			const arg = arguments[0].split('').join('');
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
