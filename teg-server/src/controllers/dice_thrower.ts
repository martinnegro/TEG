const throw_dice = (): number => Math.floor( Math.random() * 6 + 1 );

// Lanzador de dados T.E.G
/* 
    - Recibe la cantidad de dados por jugador: 2 parámetros numéricos.
    - Deben ser entre 1 y 3, de lo contrario devuelve null.
    - Devuelve un objeto con los dos resultados ordenados de mayor a menor.
*/

const dice_thrower = (attacker: number, deffender: number): DiceResults | null => {

    if ( attacker < 1 || attacker > 3 || deffender < 1 || deffender > 3 ) return null;

    const attackerResult: DicePlay = [throw_dice()];
    const deffenderResult: DicePlay = [throw_dice()];
    
    for ( let i = 0; i < attacker - 1; i++ ) {
        attackerResult.push(throw_dice())
    }
    for ( let i = 0; i < deffender - 1; i++ ) {
        deffenderResult.push(throw_dice())
    }   

    attackerResult.sort().reverse()
    deffenderResult.sort().reverse()

    return {
        attackerResult,
        deffenderResult
    }
};

export default dice_thrower;