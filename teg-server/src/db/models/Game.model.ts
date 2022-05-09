import { BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataType } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Status from "./Status.model";
import User from "./User.model";
import Player from "./Player.model";
import ArmyCountry from "./ArmyCountry.model";

interface GameAttributes {
    id: string;
    alias: string;
    statusId: number;
    nextPlayerId: string;
    maxPlayers: number
    round: number
    creatorUser: string
    users: User[]
    players: Player[]
    armiesCountries: ArmyCountry[]
}

interface GameCreationAttributes extends Optional<GameAttributes, 'nextPlayerId' | 'round' | 'id' | 'users' | 'players'| 'armiesCountries'> {}

@Table({ tableName: 'games', underscored: true})
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
    
    @BelongsTo(() => Status,'statusId' )
    status: number
    
    @BelongsTo(() => User,'creatorUser')
    creator: User

    @HasMany(() => Player,'gameId')
    players: Player[]

    @HasMany(() => ArmyCountry,'gameId')
    armiesCountries: ArmyCountry[]

    @BelongsTo(() => Player,{ foreignKey: 'nextPlayerId', constraints: false })
    nextPlayer: Player
};