module.exports = class Player
{
    constructor() 
    {
        this.m_actions = [];

        return this;
    }

    get Actions() 
    {
        return this.m_actions;
    }

    AddAction(action)
    {
        this.m_actions.push(action);
	}

    EndTurn()
    {
        m_actions = [];
	}
}