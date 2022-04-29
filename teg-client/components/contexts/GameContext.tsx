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
    status: Status,
    nextPlayer: Player,
    players: Player[],
    
    fetchStatus: FetchStatus
    fetchGame: Function,
}

export const GameContext = createContext<GameContextValues>({} as GameContextValues);

interface DigestedInfo {
    nextPlayer: Player,
    loggedPlayerId: string
}

const GameContextProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [ game, fetchStatus, err, setUrl ] = useFetch<GameJson | null>(null)
    const [ digestedInfo, setDigestedInfo ] = useState<DigestedInfo>(null)
    
    const fetchGame = (gameId) => {
        const url = '/api/game/' + gameId;
        setUrl(url)
    };

    useEffect(() => {
        if (!game || status === 'loading' || status === 'unauthenticated') return;
        setDigestedInfo((_state) => {
            console.log(game)
            const loggedPlayerId: string = game?.players.find((p) => p.userId === session.id).id;
            const nextPlayer: Player | null = game?.players.find((g) => game.nextPlayerId === g.id) || null;
            
            return {
                loggedPlayerId,
                nextPlayer
            }
        });
    },[game,status])
    
    return (
        <GameContext.Provider
            value={{
                game,
                statusId: game?.status.id,
                gameId: game?.id,
                nextPlayerId: game?.nextPlayerId,
                ...digestedInfo,
                players: game?.players,
                status: game?.status,
                fetchStatus,
                fetchGame,
            }}
        >
            { children }
        </GameContext.Provider>
    )
};

export default GameContextProvider;