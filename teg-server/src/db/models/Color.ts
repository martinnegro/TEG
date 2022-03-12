
import { Model, Table, Column, PrimaryKey, BelongsToMany, HasMany } from "sequelize-typescript";
import { User_Game } from "./User_Game";

interface ColorAttributes {
    id: number,
    hex: string,
    name: string
}

@Table({ tableName: 'colors', timestamps: false })
export class Color extends Model<ColorAttributes> {
    
    @PrimaryKey
    @Column
    id: number
    
    @Column
    hex: string
    
    @Column
    name: string

    @HasMany(() => User_Game,'id_color')
    players: User_Game[]
}

