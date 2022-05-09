import { StatusContext } from 'components/contexts/StatusContext'
import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';

import styles from 'styles/game.module.css'

const ActionInfo = () => {
    const { infoSay, canSend, sendArmies, mustDo } = useContext(StatusContext);   

    return (
        <div className={styles.actionInfo}>
            <p>
                { infoSay }
            </p>
            {
                mustDo === 'addArmies' &&
                <Button 
                    disabled={!canSend}
                    onClick={() => sendArmies()}
                >
                    Enviar
                </Button>
            }
        </div>
    )
}

export default ActionInfo