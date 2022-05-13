import axios from "axios";
import infoShouldSay from "components/Game/Board/ActionInfo/infoShouldSay";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";

type MustDo = 'wait'|'addArmies'|'attack'
interface StatusContexValues {
    isActionRequired: boolean,
    infoSay: string,
    mustDo: MustDo,
    addArmy: Function,
    sustractArmy: Function,
    canSend: boolean,
    necesaryArmies: number,
    addedArmies: {},
    sendArmies: Function
}

export const StatusContext = createContext({} as StatusContexValues);

const StatusContextProvider = ({ children }) => {
    const { gameId, statusId, nextPlayerId, nextPlayer, loggedPlayerId, armiesCountries, fetchGame } = useContext(GameContext);
    
    const [ isActionRequired, setIsActionRequired ] = useState(false);
    const [ mustDo, setMustDo ] = useState<MustDo>('wait');
    const [ infoSay, setInfoSay ] = useState('');

    const [ addedArmies, setToAddArmies ] = useState<{}>({});
    const [ necesaryArmies, setNecesaryArmies  ] = useState<number | null>(null);
    const [ addedQty, setAddedQty ] = useState(0);
    const [ canSend, setCanSend ] = useState(false)
    
    useEffect(() => {
        if (nextPlayerId === loggedPlayerId) setIsActionRequired(true);
        else setIsActionRequired(false);
    },[nextPlayerId,loggedPlayerId])
    
    
    useEffect(() => {
        // SET REQUIRED ACTION
        if (statusId === 1) {
            setInfoSay('Todavía no comenzó la partida')
        }
        if (!isActionRequired) {
            setMustDo('wait');
            return;
        };
        if ( statusId === 3 || statusId === 4 || statusId === 5) {
            setMustDo('addArmies');
            return 
        }
    },[isActionRequired,statusId])
    
    useEffect(() => {
        // SET NECESARY DATA FOR REQUIRED ACTION
        if (mustDo === 'wait') {
            setInfoSay(`Debes esperar a que ${ nextPlayer?.user.alias || nextPlayer?.user.name } complete su turno`);
            setAddedQty(0);
            setToAddArmies({})
            return;
        }
        if (mustDo === 'addArmies') {
            if (statusId === 3) {
                setNecesaryArmies(5);
            } else if (statusId === 4) {
                setNecesaryArmies(3);
            }
            setAddedQty(0);
            setToAddArmies(armiesCountries.reduce((acc,country) => 
                country.playerId !== loggedPlayerId ? 
                acc : { ...acc, [country.id]: 0 }
            ,{}));
            return;
        }
    },[mustDo])
    
    useEffect(() => {
        // SET TEXT INFO BASED ON DATA
        if (mustDo === 'addArmies') {
            setInfoSay(`Tienes que agregar ${necesaryArmies - addedQty} ejércitos`);
        }
    },[necesaryArmies,addedQty,mustDo])

    useEffect(() => {
        if (addedQty === necesaryArmies) setCanSend(true)
        else setCanSend(false)
    },[addedQty])

    const addArmy = (armiesCountryId: string) => {
        if ( canSend === true ) return;
        setAddedQty(state => state + 1)
        setToAddArmies(state => { 
            return {...state, [armiesCountryId]: state[armiesCountryId] + 1};
        });
    }
    const sustractArmy = (armiesCountryId: string) => {
        if (addedQty === 0 || addedArmies[armiesCountryId] === 0) return; 
        setAddedQty(state => state - 1)
        setToAddArmies(state => { 
            return {...state, [armiesCountryId]: state[armiesCountryId] - 1};
        });
    };
    const sendArmies = () => {
        axios.post('/api/game/add-armies',{ addedArmies, gameId })
        .then(({ data }) => fetchGame(data.gameId))
        setAddedQty(0);
        setToAddArmies({})
    };

    return (
        <StatusContext.Provider
            value={{
                isActionRequired,
                infoSay,
                mustDo,
                necesaryArmies,
                addArmy,
                sustractArmy,
                addedArmies,
                canSend,
                sendArmies
            }}
        >
            { children }
        </StatusContext.Provider>
    )
};

export default StatusContextProvider;