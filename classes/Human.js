const GameParams = require("./GameParams.js");
const Player = require("./Player.js");

module.exports = class Human extends Player {
    constructor() {
        super();

        this.m_currentPA = GameParams.HumanPA;
        this.m_stunDuration = 0; // number of turn the human will be stun
        this.m_shieldDuration = 0; // number of turn the human will be shield

        return this;
    }

    get CurrentPA() {
        return this.m_currentPA;
    }

    get StunDuration() {
        return this.m_stunDuration;
    }

    get ShieldDuration() {
        return this.m_shieldDuration;
    }

    get Position() {
        return this.m_position;
    }

    set ShieldDuration(value) {
        this.m_shieldDuration = value;
    }

    set StunDuration(value) {
        this.m_stunDuration = value;
    }

    set CurrentPA(value) {
        this.m_currentPA = value;
    }

    set Position(value) {
        this.m_position = value;
    }

    CanMine() {
        return (this.m_currentPA >= GameParams.HumanDeployMine);
    }

    CanMove() {
        return (this.m_currentPA >= GameParams.HumanMovementCost);
    }

    CanWall() {
        return (this.m_currentPA >= GameParams.HumanPlaceWall);
    }

    DoMine() {

        this.m_currentPA -= GameParams.HumanDeployMine;
    }

    DoMove() {
        this.m_currentPA -= GameParams.HumanMovementCost;
    }

    DoWall() {
        this.m_currentPA -= GameParams.HumanPlaceWall;
    }

    CancelActions() {
        if (super.CancelActions()) {

            this.m_currentPA = GameParams.HumanPA;
            this.m_shieldDuration = 0;

            return true;
        }
        return false;
    }

    StartTurn() {

        super.StartTurn();
        this.m_currentPA = GameParams.HumanPA;

        if (this.m_stunDuration > 0) {
            this.m_stunDuration -= 1;
        }

        if (this.m_shieldDuration > 0) {
            this.m_shieldDuration -= 1;
        }
    }
};
