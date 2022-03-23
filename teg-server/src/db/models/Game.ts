import { BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataTypes, Optional } from 'sequelize';
import { Status } from "./Status";
import { User } from "./User";
import { User_Game } from "./User_Game";

interface GameAttributes {
    id: string;
    alias: string;
    id_status: number;
    id_next_player: string;
    max_players: number
    round: number
    creator_user: string
    users: User[]
    user_game: User_Game[]
}

interface GameCreationAttributes extends Optional<GameAttributes, 'id_next_player' | 'round' | 'id' | 'users' | 'user_game'> {}

@Table({ tableName: 'games' })
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
    max_players: number
    
    @BelongsToMany(() => User,() => User_Game)
    users: User[]
    
    @BelongsTo(() => Status,'id_status')
    status: number
    
    @BelongsTo(() => User,'creator_user')
    creator: User

    @HasMany(() => User_Game,'id_game')
    users_game: User_Game[]

    @ForeignKey(() => User_Game)
    @Column
    id_next_player: string

    // No se pudo hacer la asociación. 
    // Se recurre a poner el id directamente.
    // @BelongsTo(() => User_Game,{ constraints: false, foreignKey: 'id_next_player', onDelete: 'cascade' }) 
    // next_player: User_Game
};