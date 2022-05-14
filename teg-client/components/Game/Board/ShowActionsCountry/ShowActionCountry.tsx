import { GameContext } from 'components/contexts/GameContext'
import { StatusContext } from 'components/contexts/StatusContext';
import React, { useContext,  useMemo, useState } from 'react';
import { ArmiesChip, ArmiesCountryContainer, QtyArmiesButton } from 'styledComponents/board'


interface ShowActionCountryProps {
    country: ArmyCountry
}

const ShowActionCountry = ({ country }: ShowActionCountryProps) => {
    const { loggedPlayerId } = useContext(GameContext);
    const { 
        mustDo, 
        addArmy,
        sustractArmy,
        addedArmies
    } =  useContext(StatusContext);
    const [ isMyCountry, setIsMyCountry ] = useState(country.playerId === loggedPlayerId)
    // useMemo is to avoid render every country
    // when addedArmies is updated 
    const qtyArmies = useMemo(() => {
        const extraArmies = addedArmies[country.id];
        if (!extraArmies || mustDo === 'wait' ) return country.armiesQty;
        console.log(extraArmies)
        return country.armiesQty + extraArmies
    },[country.armiesQty,addedArmies[country.id]])
    
    if ( !isMyCountry || mustDo === 'wait' ) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
        >   
            <ArmiesChip 
                bgColor={country.player.color.hex}
            >   
                { qtyArmies } 
            </ArmiesChip>       
        </ArmiesCountryContainer>
    )

    /*====================================================================*/
    
    if ( mustDo === 'addArmies') return (
        <ArmiesCountryContainer    
            top={ country.country.cssTopPosition} 
            left={`calc(${country.country.cssLeftPosition} - 2%)`} 
        >
            <QtyArmiesButton onClick={()=> sustractArmy(country.id)}>-</QtyArmiesButton>
                <ArmiesChip bgColor={country.player.color.hex}>   
                    { qtyArmies } 
                </ArmiesChip>
            <QtyArmiesButton onClick={() => addArmy(country.id)}> + </QtyArmiesButton>
        </ArmiesCountryContainer>)

    if ( mustDo === 'attack' ) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
            attack
        >
            <ArmiesChip 
                bgColor={country.player.color.hex}
            >   
                { qtyArmies } 
            </ArmiesChip>     
        </ArmiesCountryContainer>
    )
}

export default ShowActionCountry