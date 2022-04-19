import { AllowNull, BelongsTo, Column, Default, IsUUID, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import { Country } from "./Country";
import { User_Game } from "./User_Game";
import { Game } from "./Game";

interface ArmyCountryAttributes {
    id: string
    id_game: string,
    id_country: number,
    id_user_game: string,
    armys_qty: number
}

interface ArmyCountryCreationAttributes extends Optional<ArmyCountryAttributes, 'id' > {};

@Table({ tableName: 'armies_countries' })
export class Army_Country extends Model<ArmyCountryAttributes, ArmyCountryCreationAttributes> {
    
    @Default(DataTypes.UUIDV4)
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string

    @BelongsTo(() => Game,'id_game')
    game: Game

    @BelongsTo(() => User_Game,'id_user_game')
    user_game: User_Game

    @BelongsTo(() => Country,'id_country')
    country: Country

    @AllowNull(false)
    @Column
    armys_qty: number
}