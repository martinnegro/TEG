import infoShouldSay from "components/Game/Board/ActionInfo/infoShouldSay";
import React, { createContext, useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";

interface StatusContexValues {
    isActionRequired: boolean,
    infoSay: string
}

export const StatusContext = createContext({} as StatusContexValues);

const StatusContextProvider = ({ children }) => {
    const { statusId, nextPlayerId, nextPlayer, loggedPlayerId } = useContext(GameContext);
    const [ isActionRequired, setIsActionRequired ] = useState(false);
    const [ infoSay, setInfoSay ] = useState('');

    useEffect(() => {
        console.log({nextPlayerId,loggedPlayerId})
        if (nextPlayerId === loggedPlayerId) {
            setIsActionRequired(true)
        } else setIsActionRequired(false)
    },[nextPlayerId,loggedPlayerId])
    useEffect(() => {
        if (isActionRequired) {
            setInfoSay(infoShouldSay(statusId))
        } else {
            setInfoSay(`Debes esperar a que ${ nextPlayer?.user.alias || nextPlayer?.user.name } complete su turno`)
        }
    },[isActionRequired,nextPlayerId,loggedPlayerId])

    return (
        <StatusContext.Provider
            value={{
                isActionRequired,
                infoSay
            }}
        >
            { children }
        </StatusContext.Provider>
    )
};

export default StatusContextProvider;