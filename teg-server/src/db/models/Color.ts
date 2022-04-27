
import { Model, Table, Column, PrimaryKey, BelongsToMany, HasMany } from "sequelize-typescript";
import { Player } from "./Player";

interface ColorAttributes {
    id: number,
    hex: string,
    name: string
}

@Table({ tableName: 'colors', timestamps: false, underscored: true })
export class Color extends Model<ColorAttributes> {
    
    @PrimaryKey
    @Column
    id: number
    
    @Column
    hex: string
    
    @Column
    name: string

    @HasMany(() => Player,'colorId')
    players: Player[]
}

