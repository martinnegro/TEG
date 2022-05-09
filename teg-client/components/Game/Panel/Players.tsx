import React, { useContext } from 'react'
import ColorCircle from 'components/common/ColorCircle'

import styles from 'styles/game.module.css'
import { GameContext, GameContextValues } from 'components/contexts/GameContext'

interface PlayersProps {
    
}

const Players = () => {
    const { players, nextPlayerId } = useContext(GameContext) as GameContextValues;
    return (
        <div>
            {
                players.map((p) => (
                    <div key={p.id} className={`${styles.playerRow} ${p.id === nextPlayerId ? styles.userActionRequired : ''}`}>
                        {   
                            nextPlayerId === p.id ?
                            <p>Debe jugar:</p> 
                            :null
                        }
                        <ColorCircle colorHex={p.color.hex} diameter='25px'/>
                        <p>{p.user.alias || p.user.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Players