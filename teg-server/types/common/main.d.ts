type DicePlay = [ number, number?, number? ];

interface DiceResults {
    attackerResult: DicePlay, 
    deffenderResult: DicePlay
}

interface CompareDicesResult {
    attackerLose: number,
    deffenderLose: number
}

interface BattleResult {        
        attacker: {
            dices: DiceResult,
            previousArmys: number,
            armysLosed: number,
            finalArmys: number
        },
        deffender: {
            dices: DiceResult,
            previousArmys: number,
            armysLosed: number,
            finalArmys: number
        },
}

interface HttpException extends Error {
    status: number;
    message: string;
}

interface PlayerColor {
    id: number,
    hex: string,
    name: string
}
