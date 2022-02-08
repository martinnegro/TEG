type DicePlay = [ number, number?, number? ];

interface DiceResults {
    attacker_result: DicePlay, 
    defender_result: DicePlay
}

interface CompareDicesResult {
    attacker_lose: number,
    defender_lose: number
}

interface BattleResult {        
        attacker: {
            dices: DiceResult,
            previous_armys: number,
            armys_losed: number,
            final_armys: number
        },
        defender: {
            dices: DiceResult,
            previous_armys: number,
            armys_losed: number,
            final_armys: number
        },
}

interface HttpException extends Error {
    status: number;
    message: string;
}

