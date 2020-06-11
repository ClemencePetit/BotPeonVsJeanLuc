const Actions = require("./Actions.js");

const NB_ACTION_SLOTS = 4;

module.exports = class Player {


    constructor() {
        this.m_isActionsOver = false;
        this.m_isTurnOver = false;

        this.m_currentActionSlot = 0;
        this.m_actionSlots = new Array(NB_ACTION_SLOTS);

        return this;
    }

    get ActionSlots() {
        return this.m_actionSlots;
    }

    IsActionSlotsFull() {
        return this.m_actionSlots.length === NB_ACTION_SLOTS;
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

    Wait() {
        this.AddAction(new Actions.Wait());
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
        this.m_actionSlots = new Array(NB_ACTION_SLOTS);

        this.m_currentActionSlot = 0;

        return true;
    }

    EndTurn() {
        this.m_isTurnOver = true;
    }

    StartTurn() {
        this.m_actionSlots = new Array(NB_ACTION_SLOTS);

        this.m_isActionsOver = false;
        this.m_isTurnOver = false;

        this.m_currentActionSlot = 0;
    }
}
