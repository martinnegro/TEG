import { GameContext } from 'components/contexts/GameContext'
import React, { useContext } from 'react'

interface ShowActionCountryProps {
    country: Army_Country
}

const ShowActionCountry = ({ country }: ShowActionCountryProps) => {

    const { id_next_player, id_user_game_logged_player } = useContext(GameContext)
    return (
        <div 
            className={`country ${id_next_player === id_user_game_logged_player && id_next_player === country.id_user_game ? 'selectable': ''}`} 
            style={{ 
                top: country.country.css_top_position, 
                left: country.country.css_left_position, 
                color: country.user_game.color.hex,
                borderColor: country.user_game.color.hex
            }}
        >
            
            { country.armys_qty }
        </div>
  )
}

export default ShowActionCountry