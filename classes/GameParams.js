module.exports = class GameParams
{
	// Players' Params
	static get NbActionSlots() { return 4; };

	// Humans' Params
	static get HumanPA() { return 4; };
	static get HumanMovementCost() { return 1; };
	static get HumanMovementWithFlagCost() { return 1; };
	static get HumanDeployMine() { return  1; };
	static get HumanPlaceWall() { return 3; };
	static get HumanMineStunDuration() { return 1; };

	// Gods' param
	// Le cd indique dans combien de tour je pourrais le r�utiliser
	// et non pas combien de temps de cooldown.
	static get GodShielCD() { return 4; };
	static get GodShieldDuration()  { return 3; };
	static get GodAOEStunCD() { return 6; };
	static get GodAOEStunRange() { return 2; };
	static get GodMineVisionCD()  { return 4; };
	static get GodTPPortalCD()  { return 5; };
	static get GodTPPortalDuration()  { return 4; };
	static get GodTPPortalMaxDistance()  { return 4; };
	static get GodStunDuration() { return 1; };
	static get DivineOrderCD() {return 1; };
}


