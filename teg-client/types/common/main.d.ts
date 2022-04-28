interface GameJson {
    id: string,
    alias: string,
    creator: {
        alias: string,
        id: string,
        name: string
    },
    creator_user: string,
    status: Status
    nextPlayerId: string | null,
    maxPlayers: number,
    round: number | null,
    createdAt: Date,
    updatedAt: Date,
    players: Player[]
}

interface Status  {
    id: number,
    description: string,
    title: string
}
interface Player {
    color: Color,
    user: User,
    createdAt: Date,
    updatedAt: Date,
    id: string,
    gameId: string,
    userId: string,
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

interface Country {
    cssLeftPosition: string,
    cssTopPosition: string,
    id: number,
    continentId: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
}
interface ArmyCountry {
    armiesQty: number,
    country: Country,
    id: string,
    gameId: string,
    playerId: string,
    player: User_Game,
    createdAt: Date,
    updatedAt: Date,
}