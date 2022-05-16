import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";

type MustDo = 'start'|'wait'|'addArmies'|'attack'
interface StatusContexValues {
    isActionRequired: boolean,
    infoSay: string,
    mustDo: MustDo,
    addArmy: Function,
    sustractArmy: Function,
    canSend: boolean,
    necesaryArmies: number,
    addedArmies: {},
    sendArmies: Function,
    selectAttackingCountry: Function
    attackingCountry: string,
    attackableCountries: Country[],
    selectAttackedCountry: Function,
    underAttack: string
}

export const StatusContext = createContext({} as StatusContexValues);

const StatusContextProvider = ({ children }) => {
    const { game, gameId, statusId, nextPlayerId, nextPlayer, loggedPlayerId, armiesCountries, fetchGame } = useContext(GameContext);
    const [ isActionRequired, setIsActionRequired ] = useState(false);
    const [ mustDo, setMustDo ] = useState<MustDo>('wait');
    const [ infoSay, setInfoSay ] = useState('');

    const [ addedArmies, setAddedArmies ] = useState<{}>({});
    const [ necesaryArmies, setNecesaryArmies  ] = useState<number | null>(null);
    const [ addedQty, setAddedQty ] = useState(0);
    const [ canSend, setCanSend ] = useState(false);

    const [ attackingCountry, setAttackingCountry ] = useState('');
    const [ attackableCountries, setAttackableCountries ] = useState([]);
    const [ underAttack, setUnderAttack ] = useState('');
    
    useEffect(() => {
        if (nextPlayerId === loggedPlayerId) setIsActionRequired(true);
        else setIsActionRequired(false);
    },[nextPlayerId,loggedPlayerId]);
    
    useEffect(() => {
        // SET REQUIRED ACTION
        if (statusId === 1 || statusId === 2) {
            setMustDo('start');
            return
        }
        if (!isActionRequired) {
            setMustDo('wait');
            return
        }
        if ( statusId === 3 || statusId === 4 || statusId === 5) {
            setMustDo('addArmies');
            return 
        }
        if ( statusId === 6) {
            setMustDo('attack');
            return 
        }

    },[isActionRequired,statusId])
    
    useEffect(() => {
        // SET NECESARY DATA FOR REQUIRED ACTION
        setAddedQty(0);
        setAddedArmies({})
        if (mustDo === 'start') {
            setInfoSay('Todavía no comenzó.')
            return;
        }
        if (mustDo === 'wait') {
            setInfoSay(`Debes esperar a que ${ nextPlayer?.user.alias || nextPlayer?.user.name } complete su turno`);
            return;
        }
        if (mustDo === 'addArmies') {
            let newNecesaryArmies: number;
            if (statusId === 3) newNecesaryArmies = 5;
            if (statusId === 4) newNecesaryArmies = 3;
            if (statusId === 5) newNecesaryArmies = 3;
            setNecesaryArmies(newNecesaryArmies);
            // Crea un objeto cuyas keys sean los armiesCountryId que pertenezcan al jugador con accion requerida si está logueado.
            // Usado para mostrar mostrar el progreso en la ui
            setAddedArmies(armiesCountries.reduce((acc,country) => 
                country.playerId !== loggedPlayerId ? 
                acc : { ...acc, [country.id]: 0 }
            ,{}));
            setInfoSay(`Tienes que agregar ${newNecesaryArmies} ejércitos`);
            return;
        }
        if (mustDo === 'attack') {
            // Sets an object with keys named with each country belonging to the logged and attacker player
            // The value is a boolean indicating if is selected
            // setAttackingCountry(armiesCountries.reduce((acc,country) => 
            //     country.playerId !== loggedPlayerId ? 
            //     acc :  { ...acc, [country.id]: false }
            // ,{}))
            setAttackingCountry('')
            setInfoSay('Es tu turno para atacar!')
            return;
        };
    },[mustDo,statusId])
    
    // Sets can send
    const checkCanSend = useCallback((a:number,b:number) => a === b ? setCanSend(true) : setCanSend(false),[])
    useEffect(() => {
        // Helps user follow with quantities when is adding armies
        // And notify when complete task, so can send
        if (mustDo === 'addArmies') {
            setInfoSay(`Tienes que agregar ${necesaryArmies - addedQty} ejércitos`);
            checkCanSend(necesaryArmies,addedQty)
        }
    },[necesaryArmies,addedQty])

    /*====================================================================*/
    // CONTROLS FOR ADD ARMIES
    const addArmy = (armiesCountryId: string) => {
        if ( canSend === true ) return;
        setAddedQty(state => state + 1)
        setAddedArmies(state => { 
            return {...state, [armiesCountryId]: state[armiesCountryId] + 1};
        });
    }
    const sustractArmy = (armiesCountryId: string) => {
        if (addedQty === 0 || addedArmies[armiesCountryId] === 0) return; 
        setAddedQty(state => state - 1)
        setAddedArmies(state => { 
            return {...state, [armiesCountryId]: state[armiesCountryId] - 1};
        });
    };
    const sendArmies = () => {
        axios.post('/api/game/add-armies',{ addedArmies, gameId })
        .then(({ data }) => fetchGame(data.gameId))
        setAddedQty(0);
        setAddedArmies({})
    };

    /*====================================================================*/
    // CONTROLS FOR ATTACK
    const selectAttackingCountry = (armyCountryId: string) => {
        let prevCountry: string;
        setAttackingCountry( state => {
            prevCountry = state;
            return state === armyCountryId && attackableCountries.length > 0 ? '' : armyCountryId
        });
        setAttackableCountries( state => {
            if (prevCountry === armyCountryId && state.length > 0) return [];
            return armiesCountries.find(c => c.id === armyCountryId).country.borderingCountries
        });
        setUnderAttack('')
    };
    const selectAttackedCountry = (armyCountryId: string) => {
        setAttackableCountries([]);
        setUnderAttack(armyCountryId)
    };

    return (
        <StatusContext.Provider
            value={{
                isActionRequired,
                infoSay,
                mustDo,
                
                necesaryArmies,
                addedArmies,
                addArmy,
                sustractArmy,
                canSend,
                sendArmies,

                attackingCountry,
                selectAttackingCountry,
                attackableCountries,
                selectAttackedCountry,
                underAttack
            }}
        >
            { children }
        </StatusContext.Provider>
    )
};

export default StatusContextProvider;