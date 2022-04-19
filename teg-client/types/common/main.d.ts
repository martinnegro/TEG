interface GameJson {
    id: string,
    alias: string,
    creator: {
        alias: string,
        id: string,
        name: string
    },
    creator_user: string,
    status: {
        id: number,
        description: string,
        title: string
    },
    id_next_player: string | null,
    max_players: number,
    round: number | null,
    createdAt: Date,
    updatedAt: Date,
    users_game: User_Game[]
}

interface User_Game {
    color: Color,
    user: User,
    createdAt: Date,
    updatedAt: Date,
    id: string,
    id_game: string,
    id_user: string,
    order: number,

}

interface Color {
    hex: string, 
    id: number,
    name: string
}

interface User {
    alias: string | null,
    email: string,
    id: string,
    image: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
}