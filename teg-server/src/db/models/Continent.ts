import { BelongsTo, BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Country } from "./Country";

interface ContinentAttributes {
    id: number,
    name: string
}

@Table({ tableName: 'continents' })
export class Continent extends Model<ContinentAttributes> {
    @PrimaryKey
    @Column
    id: number

    @Column
    name: string

    @HasMany(() => Country,'id_continent')
    countries: Country[]

};
