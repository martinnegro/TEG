import { BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataTypes, Optional } from 'sequelize';
import { Status } from "./Status";
import { User } from "./User";
import { Player } from "./Player";
import { ArmyCountry } from "./ArmyCountry";

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
export class Game extends Model<GameAttributes, GameCreationAttributes> {

    @IsUUID(4)
    @Default(DataTypes.UUIDV4)
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

    @ForeignKey(() => Player)
    @Column
    nextPlayerId: string

    // No se pudo hacer la asociación. 
    // Se recurre a poner el id directamente.
    // @BelongsTo(() => Player,{ constraints: false, foreignKey: 'id_next_player', onDelete: 'cascade' }) 
    // next_player: Player
};