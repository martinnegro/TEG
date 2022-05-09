import { Column, ForeignKey, Model, Table, IsUUID, PrimaryKey, Default, BelongsToMany, BelongsTo, HasOne, HasMany, AllowNull } from "sequelize-typescript";
import { DataType } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Color from "./Color.model";
import Game from "./Game.model";
import User from "./User.model";
import ArmyCountry from "./ArmyCountry.model";

interface PlayerAttributes {
    id: string,
    userId: string,
    gameId: string,
    order: number,
    colorId: number,
}

interface CreationPlayerAttributes extends Optional<PlayerAttributes, 'id' | 'order'> {}

@Table({ tableName: 'players', underscored: true })
export default class Player extends Model<PlayerAttributes, CreationPlayerAttributes> {
    
    @IsUUID(4)
    @Default(DataType.UUIDV4)
    @PrimaryKey
    @Column
    id: string
    
    @Column
    order: number

    @AllowNull(false)
    @IsUUID(4)
    @ForeignKey(() => Game)
    @Column
    gameId: string
    
    @BelongsTo(() => Game,'gameId')
    game: Game

    @AllowNull(false)
    @IsUUID(4)
    @ForeignKey(() => User)
    @Column
    userId: string

    @BelongsTo(() => User,'userId')
    user: User

    @BelongsTo(() => Color,'colorId')
    color: Color

    @HasMany(() => ArmyCountry,'playerId')
    armiesCountries: ArmyCountry[]

    @HasOne(() => Game,{ foreignKey: 'nextPlayerId', constraints: false })
    mustPlay: Game
};