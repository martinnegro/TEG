import { Model, Table, Column, ForeignKey, Unique } from "sequelize-typescript";
import { Country } from "./Country";

interface BorderingAttributes {
    id_country: number,
    id_bordering_country: number
}

@Table({ tableName: 'bordering_countries' })
export class Bordering_Countries extends Model<BorderingAttributes> {
    
    @ForeignKey(() => Country)
    @Column
    id_country: number

    @ForeignKey(() => Country)
    @Column
    id_bordering_country: number

};