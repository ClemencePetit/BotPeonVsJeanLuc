class Action {

    constructor(player, priority, string) {
        this.m_priority = priority;
        this.m_string = string;
        this.m_player = player;
    }

    get Priority() {
        return this.m_priority;
    }

    DoAction() {

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
    constructor(player) {
        super(player, -50, "Attendre la prochaine action.");
    }
}

// ----------- HUMAN ACTIONS -----------

class Mine extends Action {
    constructor(player) {
        super(player, 2, "Poser une MINE");
    }
}

class Move extends Action {
    constructor(player, direction) {
        super(player, 4, "Se déplacer " + DirectionToString(direction));
    }
}

class Wall extends Action {
    constructor(player, direction) {
        super(player, 3, "Poser un mur " + DirectionToString(direction));
    }
}

// -------------------------------------

// ----------- GOD ACTIONS -----------

class Message extends Action {
    constructor(player) {
        super(player, 5, "Envoyer un MESSAGE DIVIN");
    }
}

class Portal extends Action {
    constructor(player, position_1, position_2) {
        super(player, 1, "Poser un PORTAIL de " + position_1 + " à " + position_2);
    }
}

class Shield extends Action {
    constructor(player) {
        super(player, 0, "Protéger son Humain grâce à un BOUCLIER");
    }

    DoAction() {
        super.DoAction();
        this.m_player.Human.AddShield();
    }
}

class Stun extends Action {
    constructor(player, position) {
        super(player, 5, "Lancer un ECLAIR d'etourdissement en " + position);
    }
}

class Vision extends Action {
    constructor(player) {
        super(player, 7, "Détecter les mines pour son Humain");
    }
}

// -----------------------------------

module.exports = {Mine, Move, Wall, Message, Portal, Shield, Stun, Vision, Direction, Wait};
