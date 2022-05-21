import dice_thrower from "./dice_thrower";

// CONTADOR DE DADOS
/*
    - Calcula la cantidad de dados a tirar por jugador.
    - El defensor recibe tantos dados cómo ejércitos.
    - El atacante recibe en dados la cantidad de ejércitos menos 1
    - Ambos jugadores reciben un máximo de 3.
*/
const dice_counter = (armys: number, player: 'att' | 'def'): number => {
    return armys > 3 ? 3 : player === 'att' ? armys - 1 : armys;
};

const compareDices = (attackerResult: DicePlay, deffenderResult: DicePlay): CompareDicesResult => {
    let attackerLose: number = 0;
    let deffenderLose: number = 0;

    for ( let i = 0; i < attackerResult.length; i++) {
        if (deffenderResult[i] === undefined) break;
        if (attackerResult[i]! > deffenderResult[i]! ) deffenderLose++;
        else attackerLose++ 
    }
    return {
        attackerLose,
        deffenderLose
    }
}

// Simulador de batalla T.E.G
/*
    - Recibe la cantidad de ejércitos.
    - Atacante debe ser mayor a dos y defensor debe ser mayor a uno. Si no cumple esta condición, devuelve null.
    - Calcula cantidad de dados por jugador (función auxiliar).
    - Invoca el simulador de dados (dice_thrower).
    - Compara los resultados de ambos jugadores (compare_dices):
        - Compara dado por dado, ordenados de mayor a menor.
        - Dado atacante gana solo si es mayor a dado defensor.
        - Suma los ejércitos perdidos por jugador.
    - Devuelve objeto con dados, ejercitos previos, ejercitos perdidos y ejercitos finales.
*/

const battle = (attackerArmys: number, defenderArmys: number): BattleResult | null => {
    
    if ( attackerArmys < 2 || defenderArmys < 1 ) return null;

    const attackerDices = dice_counter(attackerArmys,'att');
    const defenderDices = dice_counter(defenderArmys,'def');

    const dices = dice_thrower(attackerDices,defenderDices);

    if (!dices) return null

    const { attackerResult, deffenderResult } = dices;

    const { attackerLose, deffenderLose } = compareDices(attackerResult, deffenderResult)

    return {
        attacker: {
            dices: attackerResult,
            previousArmys: attackerArmys,
            armysLosed: attackerLose,
            finalArmys: attackerArmys - attackerLose
        },
        deffender: {
            dices: deffenderResult,
            previousArmys: defenderArmys,
            armysLosed: deffenderLose,
            finalArmys: defenderArmys - deffenderLose
        },
    }

}

export default battle;