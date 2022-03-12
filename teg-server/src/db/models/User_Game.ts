import { Column, ForeignKey, Model, Table, IsUUID, PrimaryKey, Default, BelongsToMany, BelongsTo, HasOne } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Color } from "./Color";
import { Game } from "./Game";
import { User } from "./User";

@Table({ tableName: 'user_game' })
export class User_Game extends Model {
    
    @IsUUID(4)
    @Default(DataTypes.UUIDV4)
    @PrimaryKey
    @Column
    id: string

    @IsUUID(4)
    @ForeignKey(() => User)
    @Column
    id_user: string

    @IsUUID(4)
    @ForeignKey(() => Game)
    @Column
    id_game: string

    @BelongsTo(() => Color,'id_color')
    color: Color
    
    @Column
    order: number

    @BelongsTo(() => User)
    users: User[]

    @BelongsTo(() => Game)
    games: Game[]
};