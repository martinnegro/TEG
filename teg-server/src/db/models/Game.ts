import { BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataTypes, Optional } from 'sequelize';
import { Status } from "./Status";
import { User } from "./User";
import { User_Game } from "./User_Game";

interface GameAttributes {
    id: string;
    alias: string;
    id_status: number;
    user_action_required: string;
    max_players: number
    round: number
    creator_user: string
    users: User[]
    user_game: User_Game[]
}

interface GameCreationAttributes extends Optional<GameAttributes, 'user_action_required' | 'round' | 'id' | 'users' | 'user_game'> {}

@Table({ tableName: 'games' })
export class Game extends Model<GameAttributes, GameCreationAttributes> {

    @IsUUID(4)
    @Default(DataTypes.UUIDV4)
    @PrimaryKey
    @Column
    id:string
    
    @Column
    alias: string
    
    @BelongsTo(() => Status,'id_status')
    status: number
    
    @IsUUID(4)
    @Column    
    user_action_required: string 
    
    @Column    
    round: number
    
    @Column
    max_players: number
    
    @BelongsTo(() => User,'creator_user')
    creator: User

    @BelongsToMany(() => User,() => User_Game)
    users: User[]
    
    @HasMany(() => User_Game)
    user_game: User_Game[]
};