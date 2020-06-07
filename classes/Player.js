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

    get CanMakeActions() {
        return !this.m_isTurnOver;
    }

    AddAction(action) {
        this.m_actions.push(action);
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

        return true;
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
