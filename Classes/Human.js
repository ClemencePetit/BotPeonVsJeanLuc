const GameParams = require ("./GameParams.js");
const Player = require ("./Player.js");

module.exports = class Human extends Player
{
    constructor() 
    {
        super();
        this.m_currentPA = GameParams.HumanPA;
        this.m_stunDuration = 0; // number of turn the human will be stun
        this.m_shieldDuration = 0; // number of turn the human will be shield

        return this;
    }

    get CurrentPA()
    {
        return this.m_currentPA;
	}

    get StunDuration()
    {
        return this.m_StunDuration;
	}

    get ShieldDuration()
    {
        return this.m_shieldDuration;
	}

    set ShieldDuration(value)
    {
        this.m_shieldDuration = value;
	}

    set StunDuration(value)
    {
        this.m_stunDuration = value;
	}

    set CurrentPA(value)
    {
        this.m_currentPA = value;
	}
	
	canMine()
	{
		return(this.m_currentPA>=GameParams.HumanDeployMine);
	}
	
	canMove()
	{
		return(this.m_currentPA>=GameParams.HumanMovementCost);
	}
	
	canWall()
	{
		return(this.m_currentPA>=GameParams.HumanPlaceWall);
	}
	
	doMine()
	{
		
		this.m_currentPA-=GameParams.HumanDeployMine;
	}
	
	doMove()
	{
		this.m_currentPA-=GameParams.HumanMovementCost;
	}
	
	doWall()
	{
		this.m_currentPA-=GameParams.HumanPlaceWall;
	}
	
	
	
	cancel()
	{
		this.m_currentPA=GameParams.HumanPA;
		super.EndTurn();
	}

    EndTurn()
    {
        super.EndTurn();
        m_currentPA = GameParams.HumanPa;
        if (m_stunDuration > 0)
        {
            m_stunDuration -= 1;  
		}

        if (m_shieldDuration > 0)
        {
            m_shieldDuration -= 1;  
		}
	}
	
	
}