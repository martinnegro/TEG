const throw_dice = (): number => Math.floor( Math.random() * 6 + 1 );

// Lanzador de dados T.E.G
/* 
    - Recibe la cantidad de dados por jugador: 2 parámetros numéricos.
    - Deben ser entre 1 y 3, de lo contrario devuelve null.
    - Devuelve un objeto con los dos resultados ordenados de mayor a menor.
*/

const dice_thrower = (attacker: number, defender: number): DiceResults | null => {

    if ( attacker < 1 || attacker > 3 || defender < 1 || defender > 3 ) return null;

    const attacker_result: DicePlay = [throw_dice()];
    const defender_result: DicePlay = [throw_dice()];
    
    for ( let i = 0; i < attacker - 1; i++ ) {
        attacker_result.push(throw_dice())
    }
    for ( let i = 0; i < defender - 1; i++ ) {
        defender_result.push(throw_dice())
    }   

    attacker_result.sort().reverse()
    defender_result.sort().reverse()

    return {
        attacker_result,
        defender_result
    }
};

export default dice_thrower;