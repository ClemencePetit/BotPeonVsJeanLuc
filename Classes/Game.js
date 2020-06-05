const God = require ("./God.js");
const Human = require ("./Human.js");

module.exports = class Game
{
    constructor() 
    {
        this.m_humanTeamA = new Human();
        this.m_godTeamA = new God();
        this.m_scoreTeamA = 0;
        this.m_humanTeamB = new Human();
        this.m_godTeamB = new God();
        this.m_scoreTeamB = 0;

        return this;
    }

    get HumanTeamA() 
    {
        return this.m_humanTeamA;
	}

    get GodTeamA()
    {
        return this.m_godTeamA;
	}

    get ScoreTeamA()
    {
        return this.m_scoreTeamA;
	}

    get HumanTeamB() 
    {
        return this.m_humanTeamB;
	}

    get GodTeamB()
    {
        return this.m_godTeamB;
	}

    get ScoreTeamB()
    {
        return this.m_scoreTeamB;
	}

    set ScoreTeamA(value)
    {
        this.m_scoreTeamA = value;
	}

    set ScoreTeamB(value)
    {
        this.m_scoreTeamB = value;
	}
}


