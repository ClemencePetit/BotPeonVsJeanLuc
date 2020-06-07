const God = require("./God.js");
const Human = require("./Human.js");

module.exports = class Game {

    constructor() {
        this.m_humanTeamA = new Human();
        this.m_humanTeamA.Position = ['C', '5'];
        this.m_godTeamA = new God();
        this.m_scoreTeamA = 0;
        this.m_humanTeamB = new Human();
        this.m_humanTeamB.Position = ['L', '5'];
        this.m_godTeamB = new God();
        this.m_scoreTeamB = 0;

        this.m_currentTurn = 1;

        return this;
    }

    get HumanTeamA() {
        return this.m_humanTeamA;
    }

    get GodTeamA() {
        return this.m_godTeamA;
    }

    get ScoreTeamA() {
        return this.m_scoreTeamA;
    }

    get HumanTeamB() {
        return this.m_humanTeamB;
    }

    get GodTeamB() {
        return this.m_godTeamB;
    }

    get ScoreTeamB() {
        return this.m_scoreTeamB;
    }

    set ScoreTeamA(value) {
        this.m_scoreTeamA = value;
    }

    set ScoreTeamB(value) {
        this.m_scoreTeamB = value;
    }

    get CurrentTurn() {
        return this.m_currentTurn;
    }

    get NumberPlayersReady() {
        let nb = 0;

        this.HumanTeamA.IsActionsOver() ? nb++ : nb;
        this.HumanTeamB.IsActionsOver() ? nb++ : nb;

        this.GodTeamA.IsActionsOver() ? nb++ : nb;
        this.GodTeamB.IsActionsOver() ? nb++ : nb;

        return nb;
    }

    EndTurn() {

        if (this.NumberPlayersReady >= 4) {

            // Ends the turn of all players
            this.HumanTeamA.EndTurn();
            this.HumanTeamB.EndTurn();
            this.GodTeamA.EndTurn();
            this.GodTeamB.EndTurn()

        }
    }

    StartTurn() {

        this.HumanTeamA.StartTurn();
        this.HumanTeamB.StartTurn();
        this.GodTeamA.StartTurn();
        this.GodTeamB.StartTurn()

        this.m_currentTurn++;
    }
}


