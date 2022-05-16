import { GameContext } from 'components/contexts/GameContext';
import { StatusContext } from 'components/contexts/StatusContext'
import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';

import styles from 'styles/game.module.css'

const ActionInfo = () => {
    const { 
        infoSay, 
        canSend, 
        sendArmies, 
        mustDo,
        attackingCountry,
        underAttack,
        sendAttack
    } = useContext(StatusContext);   
    const { armiesCountries } = useContext(GameContext)

    return (
        <div className={styles.actionInfo}>
            <p>
                { infoSay }
            </p>
            {
                mustDo === 'addArmies' ?
                <Button 
                    disabled={!canSend}
                    onClick={() => sendArmies()}
                >
                    Enviar
                </Button>
                : mustDo === 'attack' &&
                <>
                    <p>{
                        attackingCountry.length > 0 &&
                        armiesCountries.find((c) => c.id === attackingCountry).country.name + ' ataca'  
                    }{
                        underAttack.length === 0 
                        ? '...' :
                        ' ' + armiesCountries.find((c) => c.id === underAttack).country.name + '!'    
                    }</p>
                    <Button
                        disabled={!canSend}
                        onClick={() => sendAttack()}
                    >
                        Atacar!
                    </Button>
                    <Button>Terminar de atacar</Button>
                </>
            }
        </div>
    )
}

export default ActionInfo