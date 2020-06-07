module.exports = class Player {
    constructor() {
        this.m_actions = [];
        this.m_isActionsOver = false;
        this.m_isTurnOver = false;

        return this;
    }

    get Actions() {
        return this.m_actions;
    }

    get IsActionsOver() {
        return this.m_isActionsOver;
    }

    get IsTurnOver() {
        return this.m_isTurnOver;
    }

    AddAction(action) {
        this.m_actions.push(action);
    }

    ValidActions() {
        this.m_isActionsOver = true;
    }

    CancelActions() {
        if (this.m_isTurnOver) {
            return;
        }

         this.m_isActionsOver = false;
    }

    EndTurn() {
        this.m_isTurnOver = true;
    }

    StartTurn() {
        this.m_actions = [];

        this.m_isActionsOver = false;
        this.m_isTurnOver = false;
    }
}
