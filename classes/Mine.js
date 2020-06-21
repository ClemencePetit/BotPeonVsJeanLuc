const GameParams = require("./GameParams.js");

module.exports = class Mine {

    constructor(position, player) {

        this.m_position = position;
        this.m_player = player;
    }

    get Position() {
        return this.m_position;
    }

    ToString() {
        return "MINE en " + this.m_position + " posée par " + this.m_player.Name;
    }
};
