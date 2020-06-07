const Board = require("../../classes/Board.js");

module.exports =
    {
        name: 'laura',
        description: 'Tests de Laura',
        execute(DemiurgeBot, message, arguments) {
            var result = "";
            var b = new Board();

            var myB = b.Board;
            var name = b.name;


            for (i = 0; i < 9; i++) {
                for (j = 0; j < 14; j++) {
                    result += "[" + myB[i][j] + "]";
                }
                result += "\n";
            }
            message.channel.send(result);
        },
    };
