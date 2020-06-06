const GameParams = require ("./GameParams.js");
const Player = require ("./Player.js");

module.exports = class God extends Player
{
    constructor() 
    {
        super();
        this.m_shieldCD = 0;
        this.m_AOEStunCD = 0;
        this.m_mineVisionCD = 0;
        this.m_TPPortalCD = 0;
        this.m_divineOrderCD = 0;

        return this;
    }

    get ShieldCD() 
    {
        return this.m_shieldCD;
	}

    get AOEStunCD()
    {
        return this.m_AOEStunCD;
	}

    get MineVisionCD()
    {
        return this.m_mineVisionCD;
	}

    get TPPortalCD()
    {
        return this.m_TPPortalCD;
	}

    get DivineOrderCD()
    {
        return this.m_divineOrderCD;
	}
	
	setShieldCD()
    {
        this.m_shieldCD = GameParams.GodShielCD;
	}

    setAOEStunCD()
    {
        this.m_AOEStunCD = GameParams.GodAOEStunCD;
	}

    setMineVisionCD()
    {
        
        this.m_mineVisionCD = GameParams.GodMineVisionCD;
	}

    setTPPortalCD()
    {
        
        this.m_TPPortalCD = GameParams.GodTPPortalCD;
	}

    setDivineOrderCD()
    {
        this.m_divineOrderCD = GameParams.DivineOrderCD;
	}
	
	cancel()
	{
		if(this.m_shieldCD === GameParams.GodShielCD)
		{
			this.m_shieldCD=0;
		}
		if(this.m_AOEStunCD === GameParams.GodAOEStunCD)
		{
			this.m_AOEStunCD=0;
		}
		if(this.m_mineVisionCD === GameParams.GodMineVisionCD)
		{
			this.m_mineVisionCD=0;
		}
		if(this.m_TPPortalCD === GameParams.GodTPPortalCD)
		{
			this.m_TPPortalCD=0;
		}
		super.EndTurn();
	}

    EndTurn()
    {
        super.EndTurn();

        if (this.m_shieldCD > 0)
        {
            this.m_shieldCD -= 1;  
		}

        if (this.m_AOEStunCD > 0)
        {
            this.m_AOEStunCD -= 1;  
		}

        if (this.m_mineVisionCD > 0)
        {
            this.m_mineVisionCD -= 1;  
		}

        if (this.m_TPPortalCD > 0)
        {
            this.m_TPPortalCD -= 1;  
		}

        if (this.m_divineOrderCD > 0)
        {
            this.m_divineOrderCD -= 1;  
		}
	}
}
