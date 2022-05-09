import { Model, Table, Column, ForeignKey, Unique, BelongsTo } from "sequelize-typescript";
import  Country from "./Country";

export interface BorderingAttributes {
    countryId: number,
    borderingCountryId: number
}

@Table({ tableName: 'bordering_countries', underscored: true })
export default class BorderingCountries extends Model<BorderingAttributes> {
    
    //@ForeignKey(() => Country)
    //@Column({ field: 'country_id' })
    //countryId: number

    @BelongsTo(() => Country,{ foreignKey: 'countryId'})
    country: Country

    //@ForeignKey(() => Country)
    //@Column({ field: 'bordering_country_id' })
    //borderingCountryId: number

    @BelongsTo(() => Country,{ foreignKey: 'borderingCountryId' })
    borderingCountry: Country
};