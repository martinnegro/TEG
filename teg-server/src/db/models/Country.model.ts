import { BelongsTo, BelongsToMany, Column, Model, PrimaryKey, Table, HasMany, ForeignKey } from "sequelize-typescript";
import BorderingCountries from "./BorderingCountries.model";
import Continent from "./Continent.model";
import ArmyCountry from './ArmyCountry.model'

interface CountryAttributes {
    id: number,
    name: string,
    continentId: number,
    cssTopPosition: string,
    cssLeftPosition: string
}

@Table({ tableName: 'countries', underscored: true, timestamps: false })
export default class Country extends Model<CountryAttributes> {
    @PrimaryKey
    @Column
    id: number

    @Column
    name: string

    @Column
    cssTopPosition: string

    @Column
    cssLeftPosition: string

    @BelongsTo(() => Continent,{ foreignKey: 'continent_id'})
    continent: Continent

    @BelongsToMany(() => Country, () => BorderingCountries,'countryId','borderingCountryId')
    borderingCountries: Country[]

    @HasMany(() => ArmyCountry,'playerId')
    armiesCountries: ArmyCountry[]
};
