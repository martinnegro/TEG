import { BelongsTo, BelongsToMany, Column, Model, PrimaryKey, Table, HasMany } from "sequelize-typescript";
import { Bordering_Countries } from "./Bordering_Countries";
import { Continent } from "./Continent";
import { Army_Country } from './Army_Country'

interface CountryAttributes {
    id: number,
    name: string,
    id_continent: number
}

@Table({ tableName: 'countries' })
export class Country extends Model<CountryAttributes> {
    @PrimaryKey
    @Column
    id: number

    @Column
    name: string

    @BelongsTo(() => Continent,'id_continent')
    continent: Continent

    @BelongsToMany(() => Country, () => Bordering_Countries,'id_country','id_bordering_country')
    bordering_countries: Country[]

    @HasMany(() => Army_Country,'id_user_game')
    armies_countries: Army_Country[]
};
