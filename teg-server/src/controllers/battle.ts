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

const compare_dices = (attacker_result: DicePlay, defender_result: DicePlay): CompareDicesResult => {
    let attacker_lose: number = 0;
    let defender_lose: number = 0;

    for ( let i = 0; i < attacker_result.length; i++) {
        if (defender_result[i] === undefined) break;
        if (attacker_result[i]! > defender_result[i]! ) defender_lose++;
        else attacker_lose++ 
    }
    return {
        attacker_lose,
        defender_lose
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

const battle = (attacker_armys: number, defender_armys: number): BattleResult | null => {
    
    if ( attacker_armys < 2 || defender_armys < 1 ) return null;

    const attacker_dices = dice_counter(attacker_armys,'att');
    const defender_dices = dice_counter(defender_armys,'def');

    const dices = dice_thrower(attacker_dices,defender_dices);

    if (!dices) return null

    const { attacker_result, defender_result } = dices;

    const { attacker_lose, defender_lose } = compare_dices(attacker_result, defender_result)

    return {
        attacker: {
            dices: attacker_result,
            previous_armys: attacker_armys,
            armys_losed: attacker_lose,
            final_armys: attacker_armys - attacker_lose
        },
        defender: {
            dices: defender_result,
            previous_armys: defender_armys,
            armys_losed: defender_lose,
            final_armys: defender_armys - defender_lose
        },
    }

}

export default battle;