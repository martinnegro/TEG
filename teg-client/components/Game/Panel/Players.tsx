import React, { useContext } from 'react'
import ColorCircle from 'components/common/ColorCircle'

import { PanelText, PlayerRow } from 'components/styledComponents/panel.scss';
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
                            ?  <PanelText>Ganador </PanelText> 
                            :  nextPlayerId === p.id 
                            ?  <PanelText>Debe jugar:</PanelText> 
                            :  null
                        }
                        <ColorCircle colorHex={p.color?.hex} diameter='25px'/>
                        <PanelText>{p.user.alias || p.user.name}</PanelText>
                    </PlayerRow>
                )})
            }
        </div>
    )
}

export default Players