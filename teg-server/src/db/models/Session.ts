import { AllowNull, BelongsTo, Column, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table, DataType, Unique } from "sequelize-typescript";
import User from "./User";

@Table({ tableName: 'sessions', underscored: true, timestamps: false })
export default class Session extends Model {

    @Default(DataType.UUIDV4)
    @IsUUID(4)
    @PrimaryKey
    @Column
    id: string

    @Unique('sessionToken')
    @AllowNull(false)
    @Column
    sessionToken: string
    
    @AllowNull(false)
    @Column(DataType.DATE)
    expires: Date
    
    @BelongsTo(() => User,'userId')
    user: User
}