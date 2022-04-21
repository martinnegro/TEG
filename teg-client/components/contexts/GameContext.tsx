import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export interface GameContextValues {
    game: GameJson,
    
    players: User_Game[],
    id_next_player: string,
    id_game: string
    id_user_game_logged_player: string
    fetchGame: Function,
    status: Status,
    nextPlayer: User_Game
}

export const GameContext = createContext<GameContextValues>({} as GameContextValues);

interface DigestedInfo {
    nextPlayer: User_Game,
    id_user_game_logged_player: string
}

const initDigestedInfo = {
    nextPlayer: null,
    id_user_game_logged_player: null
}

const GameContextProvider = ({ children }) => {
    const { data: session, status } = useSession();
    const [ game, setGame ] = useState<GameJson | null>(null);
    const [ digestedInfo, setDigestedInfo ] = useState<DigestedInfo>(initDigestedInfo)
    
    const fetchGame = (id: string) => {
      if (!id) return;
      axios.get(`/api/game/${id}`)
      .then(({ data }) => {
          console.log(data)
        setGame(data)
      })
      .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (!game) return;
        setDigestedInfo((_state) => {
            const id_user_game_logged_player: string = game?.users_game.find((ug) => ug.id_user === session.id).id;
            const nextPlayer = game?.users_game.find((g) => game.id_next_player === g.id) || null;
            
            return {
                id_user_game_logged_player,
                nextPlayer
            }
        });
    },[game])

    return (
        <GameContext.Provider
            value={{
                game,
                id_game: game?.id,
                id_next_player: game?.id_next_player,
                ...digestedInfo,
                players: game?.users_game,
                status: game?.status,
                fetchGame,
            }}
        >
            { children }
        </GameContext.Provider>
    )
};

export default GameContextProvider;