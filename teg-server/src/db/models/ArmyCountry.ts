import { AllowNull, BelongsTo, Column, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataType } from 'sequelize-typescript'
import { Optional } from "sequelize";
import Country from "./Country";
import Player from "./Player";
import Game from "./Game";

interface ArmyCountryAttributes {
    id: string
    gameId: string,
    countryId: number,
    playerId: string,
    armiesQty: number
}

interface ArmyCountryCreationAttributes extends Optional<ArmyCountryAttributes, 'id' > {};

@Table({ tableName: 'armies_countries', underscored: true, timestamps: false })
export default class ArmyCountry extends Model<ArmyCountryAttributes, ArmyCountryCreationAttributes> {
    
    @Default(DataType.UUIDV4)
    @IsUUID(4)
    @PrimaryKey
    
    @Column
    id: string

    @BelongsTo(() => Game,'gameId')
    game: Game

    @BelongsTo(() => Player,'playerId')
    player: Player

    @BelongsTo(() => Country,'countryId')
    country: Country

    @AllowNull(false)
    @Column
    armiesQty: number
}