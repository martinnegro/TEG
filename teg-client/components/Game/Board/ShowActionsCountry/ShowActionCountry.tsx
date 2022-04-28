import { GameContext } from 'components/contexts/GameContext'
import { StatusContext } from 'components/contexts/StatusContext';
import React, { useContext } from 'react'

interface ShowActionCountryProps {
    country: ArmyCountry
}

const ShowActionCountry = ({ country }: ShowActionCountryProps) => {
    const { nextPlayerId } = useContext(GameContext);
    const { isActionRequired } =  useContext(StatusContext)
    return (
        <div 
            className={`country ${isActionRequired && nextPlayerId === country.playerId && 'selectable'}`} 
            style={{ 
                top: country.country.cssTopPosition, 
                left: country.country.cssLeftPosition, 
                color: country.player.color.hex,
                borderColor: country.player.color.hex
            }}
        >
            { country.armiesQty }
        </div>
  )
}

export default ShowActionCountry