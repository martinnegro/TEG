import React, { useContext } from 'react'
import ColorCircle from 'components/common/ColorCircle'

import { PlayerRow } from 'components/styledComponents/panel.scss';
import { GameContext, GameContextValues } from 'contexts/GameContext'
import { StatusContext } from 'contexts/StatusContext';

interface PlayersProps {
    
}

const Players = () => {
    const { players, nextPlayerId } = useContext(GameContext) as GameContextValues;
    const { mustDo } = useContext(StatusContext);
    return (
        <div>
            {
                players?.map((p) => {
                return (
                    <PlayerRow key={p.id} userActionRequired={p.id === nextPlayerId}>
                        {   
                               mustDo === 'finished' 
                            && nextPlayerId === p.id 
                            ?  <p>Ganador </p> 
                            :  nextPlayerId === p.id 
                            ?  <p>Debe jugar:</p> 
                            :  null
                        }
                        <ColorCircle colorHex={p.color?.hex} diameter='25px'/>
                        <p>{p.user.alias || p.user.name}</p>
                    </PlayerRow>
                )})
            }
        </div>
    )
}

export default Players