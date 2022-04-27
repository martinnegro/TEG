import { Model, Table, Column, PrimaryKey, AllowNull, HasMany } from "sequelize-typescript";
import { Game } from "./Game";

interface StatusAttributes {
    id: number,
    description: string
}

@Table({ tableName: 'statuses', timestamps: false, underscored: true })
export class Status extends Model<StatusAttributes> {

    @PrimaryKey
    @Column
    id: number 
    
    @Column
    title: string

    @Column
    description: string

    @HasMany(() => Game,'statusId')
    games: Game[]
    
}