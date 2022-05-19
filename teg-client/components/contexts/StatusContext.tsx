import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { isStringObject } from "util/types";
import { GameContext } from "./GameContext";

type MustDo = 'start'|'wait'|'addArmies'|'attack'|'regroup';
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
    sendAttack: Function,
    finishAttack: Function,
    selectedOrigin: string,
    canRegroup: Country[],
    selectOrigin: Function,
    regroupedArmies: {},
    moveArmy: Function,
    backArmy: Function
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

    const [ selectedOrigin, setSelectedOrigin ] = useState('')
    const [ canRegroup, setCanRegroup ] = useState([]);
    const [ regroupedArmies, setRegroupedArmies ] = useState({})
    
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
        if ( statusId === 7 ) {
            setMustDo('regroup');
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
        if (mustDo === 'regroup') {
            setAddedArmies(armiesCountries.reduce((acc,country) => 
                country.playerId !== loggedPlayerId || country.armiesQty < 2 ? 
                acc : { ...acc, [country.id]: 0 }
            ,{}));
            setInfoSay('Puedes reorganizar tu tropas.')
        };
    },[mustDo,statusId])
    
    // Sets can send
    // Doing in this way beacause states are maybe async
    const checkCanSend = (a:string|number,b:string|number) => {        
        setCanSend(() => {
            if (mustDo === 'addArmies') {
                if (a === b) return true;
                else return false;
            }
            if (mustDo === 'attack') {
                if (a.length > 0 && b.length > 0) return true;
                else return false;
            }
            return false;
        })
    };
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
        .then(({ data }) => {
            setAddedQty(0);
            setAddedArmies({})
            fetchGame(data.gameId)
        })
        .catch((err) => console.log(`Can't add armies.`))
    };


    useEffect(() => {
        checkCanSend(underAttack,attackingCountry)
    },[underAttack,attackingCountry]);
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
    const sendAttack = () => {
        axios.post('/api/game/battle',{ attacker: attackingCountry, deffender: underAttack })
        .then(({ data })=> {
            console.log(data.result)
            setAttackingCountry('');
            setAttackableCountries([]);
            setUnderAttack('');
            fetchGame(data.gameId);
        })
        .catch(() => console.log('No se pudo realizar la acción.'))
    }
    const finishAttack = () => {
        axios.post('/api/game/finish-attack',{ loggedPlayerId, gameId })
        .then(({ data }) => {
            fetchGame(data.gameId);
        })
        .catch(() => console.log('No se pudo realizar la acción.'))
    };

    /*====================================================================*/
    // CONTROLS FOR REGROUP
    const selectOrigin = (armyCountryId: string) => {
        let previousOrigin: string;
        setSelectedOrigin(state => {
            previousOrigin = state
            if (previousOrigin === armyCountryId) return '';
            else return armyCountryId
        })
        setCanRegroup( state => {
            if (previousOrigin === armyCountryId) return [];
            else return armiesCountries.find(c => c.id === armyCountryId).country.borderingCountries
        });
    };
    // Manage the state with an object, keys are armieCountriesId with 
    // added or sustracted qty
    const moveArmy = (armyCountryId: string) => {
        setRegroupedArmies(state => {
            const receivingCountry = armiesCountries.find(c => c.id === armyCountryId);
            const originCountry = armiesCountries.find(c => c.id === selectedOrigin);
            if ( originCountry.armiesQty + state[originCountry.id] < 2 ) return state;
            return {
                ...state,
                [armyCountryId]: state[armyCountryId] + 1 || 1,
                [originCountry.id]: state[originCountry.id] - 1 || -1  
            };
            
        });
    };
    const backArmy = (armyCountryId: string) => {
        setRegroupedArmies(state => {
            console.log(state)
            if (!state[armyCountryId] || state[armyCountryId] === 0 ) return state;
            const receivingCountry = armiesCountries.find(c => c.id === armyCountryId);
            const originCountry = armiesCountries.find(c => c.id === selectedOrigin);
            return {
                ...state,
                [armyCountryId]: state[armyCountryId] - 1,
                [originCountry.id]: state[originCountry.id] + 1  
            };
            
        });
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
                underAttack,
                sendAttack,
                finishAttack,
                
                selectedOrigin,
                canRegroup,
                selectOrigin,
                regroupedArmies,
                moveArmy,
                backArmy
            }}
        >
            { children }
        </StatusContext.Provider>
    )
};

export default StatusContextProvider;