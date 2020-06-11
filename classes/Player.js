const Actions = require("./Actions.js");
const GameParams = require("./GameParams.js");

module.exports = class Player {


    constructor(name) {
        this.m_isActionsOver = false;
        this.m_isTurnOver = false;

        this.m_currentActionSlot = 0;
        this.m_actionSlots = new Array(GameParams.NbActionSlots);

        this.m_name = name;

        return this;
    }

    get ActionSlots() {
        return this.m_actionSlots;
    }

    get Name() {
        return this.m_name;
    }

    IsActionSlotsFull() {
        return this.m_currentActionSlot >= this.m_actionSlots.length;
    }

    IsActionsOver() {
        return this.m_isActionsOver;
    }

    IsTurnOver() {
        return this.m_isTurnOver;
    }

    CanMakeActions() {
        return this.m_currentActionSlot < this.m_actionSlots.length;
    }

    AddAction(action) {
        if (this.m_currentActionSlot < this.m_actionSlots.length) {

            this.m_actionSlots[this.m_currentActionSlot] = action;
            this.m_currentActionSlot++;

            return true;
        }

        return false;
    }

    ValidActions() {
        if (!this.m_isTurnOver) {
            this.m_isActionsOver = true;

            return true;
        }

        return false;
    }

    CancelActions() {
        if (this.m_isTurnOver) {
            return false;
        }

        this.m_isActionsOver = false;
        this.m_actionSlots = new Array(GameParams.NbActionSlots);

        this.m_currentActionSlot = 0;

        return true;
    }

    EndTurn() {
        this.m_isTurnOver = true;
    }

    StartTurn() {
        this.m_actionSlots = new Array(GameParams.NbActionSlots);

        this.m_isActionsOver = false;
        this.m_isTurnOver = false;

        this.m_currentActionSlot = 0;
    }

    DoWait() {
        let action = new Actions.Wait();
        if (this.AddAction(action)) {
            return action;
        }
        return null;
    }

};