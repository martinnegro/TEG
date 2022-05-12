import { AllowNull, BelongsTo, Column, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table, DataType, Unique } from "sequelize-typescript";
import User from "./User.model";

@Table({ tableName: 'sessions', underscored: true, timestamps: false })
export default class Session extends Model {

    @PrimaryKey
    @Column
    token: string

    @AllowNull(false)
    @Column
    identifier: string
    @AllowNull(false)
    
    @Column(DataType.DATE)
    expires: Date
    
    @BelongsTo(() => User,'userId')
    user: User
}