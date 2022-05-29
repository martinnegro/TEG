import { GameContext } from 'contexts/GameContext'
import { StatusContext } from 'contexts/StatusContext';
import React, { useContext,  useEffect,  useMemo, useState } from 'react';
import { ArmiesChip, ArmiesCountryContainer, QtyArmiesButton } from 'components/styledComponents/board'


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
        attackableCountries,
        selectAttackedCountry,
        underAttack,
        selectedOrigin,
        selectOrigin,
        canRegroup,
        moveArmy,
        regroupedArmies,
        backArmy
    } =  useContext(StatusContext);
    const [ isMyCountry, setIsMyCountry ] = useState(country.playerId === loggedPlayerId)
    useEffect(() => setIsMyCountry(country.playerId === loggedPlayerId),[country.id,loggedPlayerId])
    // useMemo is to avoid render every country
    // when addedArmies is updated 
    const qtyArmies: number = useMemo(() => {
        if (mustDo === 'addArmies') {
            const extraArmies = addedArmies[country.id];
            if (!extraArmies) return country.armiesQty;
            return country.armiesQty + extraArmies;
        }
        if (mustDo === 'regroup'){
            const movedArmies = regroupedArmies[country.id];
            if (!movedArmies) return country.armiesQty;        
            return country.armiesQty + movedArmies
        }
        return country.armiesQty;
    },[country.armiesQty,addedArmies[country.id],regroupedArmies[country.id]]);

    
    const [ isAttacker, setIsAttacker ] = useState(country.id === attackingCountry);
    useEffect(() => { setIsAttacker(country.id === attackingCountry) },[attackingCountry]);
    const [ canBeAttacked, setCanBeAttacked ] = useState(false);
    useEffect(() => setCanBeAttacked(attackableCountries.some( a => a.id === country.country.id) && !isMyCountry),[attackableCountries])
    const [ isUnderAttack, setIsUnderAttack ] = useState(false);
    useEffect(() => setIsUnderAttack(underAttack === country.id),[underAttack])
    
    /*====================================================================*/

    if (isUnderAttack) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
            selected={isUnderAttack}
        >
            <ArmiesChip 
                bgColor={country.player.color.hex}
            >   
                { qtyArmies } 
            </ArmiesChip>       
        </ArmiesCountryContainer>
    )

    /*====================================================================*/
    if (canBeAttacked) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
            canBeAttacked
            onClick={() => selectAttackedCountry(country.id)}
        >   
            <ArmiesChip 
                bgColor={country.player.color.hex}
            >   
                { qtyArmies } 
            </ArmiesChip>       
        </ArmiesCountryContainer>
    )
    
    /*====================================================================*/

    if ( !isMyCountry || mustDo === 'wait' || mustDo === 'finished') return (
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

    /*====================================================================*/
    if ( mustDo === 'regroup' ) return (
        <ArmiesCountryContainer
            top={country.country.cssTopPosition}
            left={country.country.cssLeftPosition}
            selected={country.id === selectedOrigin}
            canAttack={country.armiesQty > 1}
            >
            {
                canRegroup.some(c => c.id === country.country.id) &&
                <QtyArmiesButton
                    onClick={() => backArmy(country.id)}
                >-</QtyArmiesButton>
            }
            <ArmiesChip 
                onClick={country.armiesQty > 1 ? (() => selectOrigin(country.id)): undefined}            
                bgColor={country.player.color.hex}
            >   
                { qtyArmies } 
            </ArmiesChip> 
            {
                canRegroup.some(c => c.id === country.country.id) &&
                <QtyArmiesButton
                    onClick={() => moveArmy(country.id)}
                >+</QtyArmiesButton>
            }
        </ArmiesCountryContainer>
    );
}

export default ShowActionCountry