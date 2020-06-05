const GameParams = require ("./GameParams.js");
const Player = require ("./Player.js");

module.exports = class God extends Player
{
    constructor() 
    {
        super();
        this.m_shieldCD = GameParams.GodShielCD;
        this.m_AOEStunCD = GameParams.GodAOEStunCD;
        this.m_mineVisionCD = GameParams.GodMineVisionCD;
        this.m_TPPortalCD = GameParams.GodTPPortalCD;
        this.m_divineOrderCD = GameParams.DivineOrderCD;

        return this;
    }

    get ShieldCD() 
    {
        return m_shieldCD;
	}

    get AOEStunCD()
    {
        return m_AOEStunCD;
	}

    get MineVisionCD()
    {
        return m_mineVisionCD;
	}

    get TPPortalCD()
    {
        return m_TPPortalCD;
	}

    get DivineOrderCD()
    {
        return m_divineOrderCD;
	}

    EndTurn()
    {
        super.EndTurn();

        if (m_shieldCD > 0)
        {
            m_shieldCD -= 1;  
		}

        if (m_AOEStunCD > 0)
        {
            m_AOEStunCD -= 1;  
		}

        if (m_mineVisionCD > 0)
        {
            m_mineVisionCD -= 1;  
		}

        if (m_TPPortalCD > 0)
        {
            m_TPPortalCD -= 1;  
		}

        if (m_divineOrderCD > 0)
        {
            m_divineOrderCD -= 1;  
		}
	}
}