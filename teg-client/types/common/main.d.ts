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
    user_action_required: string | null,
    max_players: number,
    round: number | null,
    createdAt: Date,
    updatedAt: Date,
    user_game: []
}
