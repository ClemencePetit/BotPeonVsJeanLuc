const GameParams = require("./GameParams.js");
const Player = require("./Player.js");

const Actions = require("./Actions");

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
        if (this.CanMine()) {
            let action = new Actions.Mine();
            if (super.AddAction(action)) {

                this.m_currentPA -= GameParams.HumanDeployMine;
                return action;
            }
        }

        return null;
    }

    DoMove(direction) {
        if (this.CanMove()) {
            let action = new Actions.Move(direction);
            if (super.AddAction(action)){

                this.m_currentPA -= GameParams.HumanMovementCost;
                return action;
            }
        }

        return null;
    }

    DoWall(direction) {
        if (this.CanWall()) {
            let action = new Actions.Wall(direction);
            if (super.AddAction(action)) {

                this.m_currentPA -= GameParams.HumanPlaceWall;
                return action;
            }
        }

        return null;
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
