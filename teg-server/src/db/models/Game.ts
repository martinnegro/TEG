import { BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataType } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Status from "./Status";
import User from "./User";
import Player from "./Player";
import ArmyCountry from "./ArmyCountry";

interface GameAttributes {
    id: string;
    alias: string;
    statusId: number;
    status: Status[];
    nextPlayerId: string;
    maxPlayers: number
    round: number
    creatorUser: string
    users: User[]
    players: Player[]
    armiesCountries: ArmyCountry[]
    canRegroup: boolean
}

interface GameCreationAttributes 
    extends Optional
        <GameAttributes, 
        'nextPlayerId' | 
        'round' | 'id' | 
        'statusId' | 'status' |
        'users' | 'players'| 
        'armiesCountries' | 
        'canRegroup'> 
{}

@Table({ tableName: 'games', underscored: true, timestamps: false })
export default class Game extends Model<GameAttributes, GameCreationAttributes> {

    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column
    id:string
    
    @Column
    alias: string
    
    @Column    
    round: number
    
    @Column
    maxPlayers: number
    
    @BelongsToMany(() => User,() => Player)
    users: User[]
    
    @ForeignKey(() => Status)
    @Column
    statusId: number
    @BelongsTo(() => Status,'statusId' )
    status: number
    
    @BelongsTo(() => User,'creatorUser')
    creator: User

    @HasMany(() => Player,'gameId')
    players: Player[]

    @HasMany(() => ArmyCountry,'gameId')
    armiesCountries: ArmyCountry[]

    @ForeignKey(() => Player)
    @Column
    nextPlayerId: string

    @BelongsTo(() => Player,{ foreignKey: 'nextPlayerId', constraints: false })
    nextPlayer: Player

    @Default(false)
    @Column
    canRegroup: boolean
};