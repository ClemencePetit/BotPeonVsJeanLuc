const GameParams = require("./GameParams.js");
const Player = require("./Player.js");
const Actions = require("./Actions.js");

module.exports = class God extends Player {
    constructor(name, game) {
        super(name, game);

        this.m_shieldCD = 0;
        this.m_AOEStunCD = 0;
        this.m_mineVisionCD = 0;
        this.m_TPPortalCD = 0;
        this.m_divineOrderCD = 0;

        return this;
    }

    get ShieldCD() {
        return this.m_shieldCD;
    }

    get AOEStunCD() {
        return this.m_AOEStunCD;
    }

    get MineVisionCD() {
        return this.m_mineVisionCD;
    }

    get TPPortalCD() {
        return this.m_TPPortalCD;
    }

    get DivineOrderCD() {
        return this.m_divineOrderCD;
    }

    get Human() {
        return this.m_game.GetHumanFromGod(this);
    }

    DOShield() {

        if (this.CanShield()) {
            let action = new Actions.Shield(this);
            if (super.AddAction(action)) {
                this.m_shieldCD = GameParams.GodShielCD;
                return action;
            }
        }
        return null;
    }

    DOAOEStun(position) {

        if (this.CanAOEStun()) {
            let action = new Actions.Stun(this, position);
            if (super.AddAction(action)) {
                this.m_AOEStunCD = GameParams.GodAOEStunCD;
                return action;
            }
        }
        return null;
    }

    DoMineVision() {

        if (this.CanMineVision()) {
            let action = new Actions.Vision(this);
            if (super.AddAction(action)) {

                this.m_mineVisionCD = GameParams.GodMineVisionCD;
                return action;
            }
        }

        return null;
    }

    DoTPPortal(position_1, position_2) {

        if (this.CanTPPortal()) {
            let action = new Actions.Portal(this, position_1, position_2);
            if (super.AddAction(action)) {

                this.m_TPPortalCD = GameParams.GodTPPortalCD;
                return action;
            }
        }

        return null;
    }

    DoDivineOrder() {
        if (this.CanDivineOrder()) {
            let action = new Actions.Message(this);
            if (super.AddAction(action)) {
                this.m_divineOrderCD = GameParams.DivineOrderCD;
                return action;
            }
        }
        return null;
    }

    CanShield() {
        return this.m_shieldCD === 0;
    }

    CanAOEStun() {
        return this.m_AOEStunCD === 0;
    }

    CanMineVision() {

        return this.m_mineVisionCD === 0;
    }

    CanTPPortal() {

        return this.m_TPPortalCD === 0;
    }

    CanDivineOrder() {
        return this.m_divineOrderCD === 0;
    }

    CancelActions() {
        if (super.CancelActions()) {
            if (this.m_shieldCD === GameParams.GodShielCD) {
                this.m_shieldCD = 0;
            }
            if (this.m_AOEStunCD === GameParams.GodAOEStunCD) {
                this.m_AOEStunCD = 0;
            }
            if (this.m_mineVisionCD === GameParams.GodMineVisionCD) {
                this.m_mineVisionCD = 0;
            }
            if (this.m_TPPortalCD === GameParams.GodTPPortalCD) {
                this.m_TPPortalCD = 0;
            }
            if (this.m_divineOrderCD === GameParams.DivineOrderCD) {
                this.m_divineOrderCD = 0;
            }

            return true;
        }

        return false;
    }

    StartTurn() {
        super.StartTurn();

        if (this.m_shieldCD > 0) {
            this.m_shieldCD -= 1;
        }

        if (this.m_AOEStunCD > 0) {
            this.m_AOEStunCD -= 1;
        }

        if (this.m_mineVisionCD > 0) {
            this.m_mineVisionCD -= 1;
        }

        if (this.m_TPPortalCD > 0) {
            this.m_TPPortalCD -= 1;
        }

        if (this.m_divineOrderCD > 0) {
            this.m_divineOrderCD -= 1;
        }
    }
};
