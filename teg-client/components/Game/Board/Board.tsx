import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from 'styles/game.module.css'

const Board = ({ game_id }) => {
  const [ armiesCountries, setArmiesCountries ] = useState([])

  useEffect(() => {
    axios.get(`/api/game/armies-countries?game_id=${game_id}`)
    .then(({ data }) => {
      setArmiesCountries(data)
      console.log(data)
    })
    .catch((err) => console.log(err))
  },[])

  return (
    <div className={styles.board}>
      {
        armiesCountries.map((country) => (
          <div 
            id={country.id} 
            className="country" 
            style={{ 
              top: country.country.css_top_position, 
              left: country.country.css_left_position, 
              color: country.user_game.color.hex,
              borderColor: country.user_game.color.hex
            }}
          >
            { country.armys_qty }
          </div>
        ))
      }
    </div>
  )
}

export default Board