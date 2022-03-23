import { Column, ForeignKey, Model, Table, IsUUID, PrimaryKey, Default, BelongsToMany, BelongsTo, HasOne, HasMany, AllowNull } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import { Color } from "./Color";
import { Game } from "./Game";
import { User } from "./User";
import { Army_Country } from "./Army_Country";

interface User_GameAttributes {
    id: string,
    id_user: string,
    id_game: string,
    order: number,
    id_color: number,
}

interface CreationUser_GameAttributes extends Optional<User_GameAttributes, 'id' | 'order'> {}

@Table({ tableName: 'user_game' })
export class User_Game extends Model<User_GameAttributes, CreationUser_GameAttributes> {
    
    @IsUUID(4)
    @Default(DataTypes.UUIDV4)
    @PrimaryKey
    @Column
    id: string
    
    @Column
    order: number

    @AllowNull(false)
    @IsUUID(4)
    @ForeignKey(() => Game)
    @Column
    id_game: string
    
    @BelongsTo(() => Game,'id_game')
    game: Game

    @AllowNull(false)
    @IsUUID(4)
    @ForeignKey(() => User)
    @Column
    id_user: string

    @BelongsTo(() => User,'id_user')
    user: User

    @BelongsTo(() => Color,'id_color')
    color: Color

    @HasMany(() => Army_Country,'id_user_game')
    armies_countries: Army_Country[]

    // No se pudo hacer la asociación. 
    // Se recurre a poner el id directamente.
    // @HasOne(() => Game,{ foreignKey: 'id_next_player', onDelete: 'cascade', constraints: false })
    // next_play: Game
};