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
    users_game: []
}
