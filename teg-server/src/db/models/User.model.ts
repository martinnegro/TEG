import { Model, Table, Column, IsUUID, PrimaryKey, BelongsToMany, Default, HasMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Game from './Game.model';
import Player from './Player.model';
import Account from './Account.model';
import Session from './Session.model';

interface UserAttributes {
    id: string,
    name: string
    email: string
    emailVerified?: Date
    image?: string
    alias?: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'alias' | 'image' | 'emailVerified'> {}

@Table({ tableName: 'users', underscored: true, timestamps: false })
export default class User extends Model<UserAttributes, UserCreationAttributes> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @IsUUID(4)
    @Column
    id: string

    @Column
    name: string

    @Column
    email: string

    @Column(DataType.TIME)
    emailVerified: Date

    @Column
    image: string

    @Column
    alias: string

    @HasMany(() => Game,'creatorUser')
    gamesCreated: Game[]

    @HasMany(() => Player,'userId')
    userPlayers: Player[]
    
    @BelongsToMany(() => Game, () => Player)
    games: Game[]

    @HasMany(() => Account,'userId')
    accounts: Account[]

    @HasMany(() => Session,'userId')
    sessions: Session[]
};