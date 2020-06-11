class Action {
    constructor() {
        this.m_priority = 0;
        this.m_string = "";
    }

    get Priority() {
        return this.m_priority;
    }

    ToString() {
        return this.m_string;
    }

}

const Direction = {
    LEFT: 0,
    RIGHT: 1,
    DOWN: 2,
    UP: 3
};

function DirectionToString(direction) {

    let direction_string = "DIRECTION INCORRECTE";
    switch (direction) {
        case Direction.LEFT:
            direction_string = "à GAUCHE";
            break;
        case Direction.RIGHT:
            direction_string = "à DROITE";
            break;
        case Direction.DOWN:
            direction_string = "en BAS";
            break;
        case Direction.UP:
            direction_string = "en HAUT";
            break;
    }

    return direction_string;
}

class Wait extends Action {
    constructor() {
        super(-50, "Attendre la prochaine action.");
    }
}

// ----------- HUMAN ACTIONS -----------

class Mine extends Action {
    constructor() {
        super(2, "Poser une MINE.");
    }
}

class Move extends Action {
    constructor(direction) {
        super(4, "Se déplacer " + DirectionToString(direction) + ".");
    }
}

class Wall extends Action {
    constructor(direction) {
        super(3, "Poser un mur " + DirectionToString(direction) + ".");
    }
}

// -------------------------------------

// ----------- GOD ACTIONS -----------

class Message extends Action {
    constructor() {
        super(5, "Envoyer un MESSAGE DIVIN");
    }
}

class Portal extends Action {
    constructor(position_1, position_2) {
        super(1, "Poser un portail de " + position_1 + " à " + position_2);
    }
}

class Shield extends Action {
    constructor() {
        super(0, "Proteger son Humain grâce à un BOUCLIER.");
    }
}

class Stun extends Action {
    constructor(position) {
        super(5, "Lancer un éclair d'etourdissement en " + position);
    }
}

class Vision extends Action {
    constructor() {
        super(7, "Détecter les mines pour son Humain.");
    }
}

// -----------------------------------

module.exports = {Mine, Move, Wall, Message, Portal, Shield, Stun, Vision, Direction, Wait};
