import { GameContext } from 'components/contexts/GameContext'
import { StatusContext } from 'components/contexts/StatusContext';
import React, { useContext,  useEffect,  useMemo, useState } from 'react';
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
        addedArmies,
        selectAttackingCountry,
        attackingCountry,
        attackableCountries
    } =  useContext(StatusContext);
    const [ isMyCountry, setIsMyCountry ] = useState(country.playerId === loggedPlayerId)
    // useMemo is to avoid render every country
    // when addedArmies is updated 
    const qtyArmies: number = useMemo(() => {
        const extraArmies = addedArmies[country.id];
        if (!extraArmies || mustDo === 'wait' ) return country.armiesQty;
        return country.armiesQty + extraArmies
    },[country.armiesQty,addedArmies[country.id]]);
    const [ isAttacker, setIsAttacker ] = useState(country.id === attackingCountry);
    useEffect(() => { setIsAttacker(country.id === attackingCountry) },[attackingCountry]);
    const [ canBeAttacked, setCanBeAttacked ] = useState(false);
    useEffect(() => setCanBeAttacked(attackableCountries.some( a => a.id === country.country.id) && !isMyCountry),[attackableCountries])
    const [ isUnderAttack, setIsUnderAttack ] = useState(false);
    
    /*====================================================================*/
    
    if (canBeAttacked) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
            selected={canBeAttacked}
        >   
            <ArmiesChip 
                bgColor={country.player.color.hex}
            >   
                { qtyArmies } 
            </ArmiesChip>       
        </ArmiesCountryContainer>
    )
    
    /*====================================================================*/

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
        </ArmiesCountryContainer>
    )

    /*====================================================================*/

    if ( mustDo === 'attack' ) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
            canAttack={country.armiesQty > 1}
            onClick={country.armiesQty > 1 ? () => selectAttackingCountry(country.id) : null}
            selected={isAttacker}
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