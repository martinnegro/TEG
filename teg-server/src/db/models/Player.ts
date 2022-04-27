import { Column, ForeignKey, Model, Table, IsUUID, PrimaryKey, Default, BelongsToMany, BelongsTo, HasOne, HasMany, AllowNull } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import { Color } from "./Color";
import { Game } from "./Game";
import { User } from "./User";
import { ArmyCountry } from "./ArmyCountry";

interface PlayerAttributes {
    id: string,
    userId: string,
    gameId: string,
    order: number,
    colorId: number,
}

interface CreationPlayerAttributes extends Optional<PlayerAttributes, 'id' | 'order'> {}

@Table({ tableName: 'players', underscored: true })
export class Player extends Model<PlayerAttributes, CreationPlayerAttributes> {
    
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

    // No se pudo hacer la asociación. 
    // Se recurre a poner el id directamente.
    // @HasOne(() => Game,{ foreignKey: 'id_next_player', onDelete: 'cascade', constraints: false })
    // next_play: Game
};