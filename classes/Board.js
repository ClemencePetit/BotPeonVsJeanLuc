const KeyCode = require ("./KeyCode.js");

module.exports = class Board{
	
	constructor() 
    {
		//Création du tableau vide
		var myboard = [];
		
		let i,j;
		for(i=0; i<9;i++){
			myboard.push([]);
			for(j=0;j<14;j++){
				myboard[i].push([]);
			}
		}
		
		//Emplacement des bases
		for(i=3;i<6;i++){
			//base Peon
			for(j=0;j<3;j++){
				myboard[i][j].push(KeyCode.BasePeon);
			}
			//base Jean-Luc
			for(j=11;j<14;j++){
				myboard[i][j].push(KeyCode.BaseJeanLuc);
			}
		}
		
		//Emplacement des joueurs
		myboard[4][2].push(KeyCode.JoueurPeon);
		myboard[4][11].push(KeyCode.JoueurJeanLuc);
		
		//Emplacement des drapeaux
		myboard[4][1].push(KeyCode.DrapeauPeon);
		myboard[4][12].push(KeyCode.DrapeauJeanLuc);
		
		//putting into this
		this.board = myboard;
		
        return this;
    }
	
	get Board() {return this.board;};
	get Name() {return this.name;};
}
