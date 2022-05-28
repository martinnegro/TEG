import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import useFetch, { FetchStatus } from "hooks/useFetch";

export interface GameContextValues {
    gameId: string
    statusId: number,
    nextPlayerId: string,
    loggedPlayerId: string
    
    game: GameJson,
    status: GameStatus,
    nextPlayer: Player,
    players: Player[],
    armiesCountries: ArmyCountry[],
    
    fetchStatus: FetchStatus
    fetchGame: Function,
}

export const GameContext = createContext<GameContextValues>({} as GameContextValues);
/*

*/

const GameContextProvider = ({ children }) => {
    const { data: session, status: sessionStatus } = useSession();
    const [ game, fetchStatus, err, doFetch ] = useFetch<GameJson | null>()
    const fetchGame = (gameId: string) => {
        const url = '/api/game/' + gameId;
        doFetch(url)
    };

    /* MAYBE A CNTRALIZE STATUS */
    // const [ status, setStatus ] = useState<FetchStatus>('waiting')
    
    // useEffect(() => {
    //     if (sessionStatus === 'loading' || fetchStatus === 'loading') {
    //         setStatus('loading')
    //         return
    //     }
    //     if (sessionStatus === "unauthenticated") {
    //         setStatus('error') 
    //     }

    // },[sessionStatus,fetchStatus])

    return (
        <GameContext.Provider
            value={{
                statusId: game?.status.id,
                gameId: game?.id,
                nextPlayerId: game?.nextPlayerId,
                loggedPlayerId: session && game?.players.find((p) => p.userId === session?.id).id,
                
                game,
                nextPlayer: game?.nextPlayer,
                players: game?.players,
                status: game?.status,
                armiesCountries: game?.armiesCountries,    

                fetchStatus,
                fetchGame,
            }}
        >
            { children }
        </GameContext.Provider>
    )
};

export default GameContextProvider;