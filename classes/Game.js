const God = require("./God.js");
const Human = require("./Human.js");
const GameParams = require("./GameParams.js");
const Mine = require("./Mine.js");

const TurnType = {
    HUMAN: 0,
    GOD: 1,
};

module.exports = class Game {

    constructor() {
        this.m_humanTeamA = new Human("Péon", this);
        this.m_humanTeamA.Position = ['C', '5'];
        this.m_godTeamA = new God("Dieu Péon", this);
        this.m_scoreTeamA = 0;
        this.m_humanTeamB = new Human("Jean-Luc", this);
        this.m_humanTeamB.Position = ['L', '5'];
        this.m_godTeamB = new God("Dieu Jean-Luc", this);
        this.m_scoreTeamB = 0;

        this.m_currentTurn = 1;
        //this.m_currentTurnType = TurnType.HUMAN;

        this.m_mines = new Map();

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

    /*
    get GetCurrentTurnType() {
        return this.m_currentTurnType;
    }
    */

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
            this.GodTeamB.EndTurn();

            return true;
        }

        return false;
    }

    StartTurn() {

        // We start a new turn
        this.GodTeamA.StartTurn();
        this.GodTeamB.StartTurn();

        this.HumanTeamA.StartTurn();
        this.HumanTeamB.StartTurn();

        this.m_currentTurn++;
    }

    StartGame() {

        this.HumanTeamA.StartTurn();
        this.HumanTeamB.StartTurn();

        this.GodTeamA.StartTurn();
        this.GodTeamB.StartTurn();
    }

    GetHumanFromGod(god) {
        if (god === this.GodTeamA) {
            return this.HumanTeamA;
        } else if (god === this.GodTeamB) {
            return this.HumanTeamB;
        }

        return null;
    }

    GetPlayerFromString(string) {
        switch (string) {
            case "jean-luc":
                return this.m_humanTeamB;
            case "dieu jean-luc":
                return this.m_godTeamB;
            case "peon":
                return this.m_humanTeamA;
            case "dieu peon":
                return this.m_godTeamA;
        }
        return null;
    }

    GetOrderedActionsFromPlayers() {

        let allActions = [];
        for (let i = 0; i < GameParams.NbActionSlots; i++) {

            let playersActions = [];
            playersActions.push(this.GetActionFromPlayer(this.HumanTeamA, i));
            playersActions.push(this.GetActionFromPlayer(this.GodTeamA, i));

            playersActions.push(this.GetActionFromPlayer(this.HumanTeamB, i));
            playersActions.push(this.GetActionFromPlayer(this.GodTeamB, i));

            playersActions.sort(((a, b) => {

                if (a.action == null || b.action == null) {
                    return 0;
                }

                return a.action.Priority - b.action.Priority;
            }));

            allActions.push(playersActions);
        }

        return allActions;
    }

    GetActionFromPlayer(player, slot) {
        return {
            name: player.Name,
            action: player.ActionSlots[slot]
        }
    }

    AddMine(position, player) {
        return this.m_mines.set(position, new Mine(position, player)) != null;
    }

    RemoveMine(position) {
        return this.m_mines.delete(position);
    }

    get Mines() {
        return Array.from(this.m_mines.values());
    }
};


