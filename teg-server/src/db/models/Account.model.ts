import { AllowNull, BelongsTo, Column, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table, DataType } from "sequelize-typescript";
import User from "./User.model";

@Table({ tableName: 'accounts', underscored: true, timestamps: false })
export default class Account extends Model {
    
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column
    id: string
    
    @AllowNull(false)
    @Column
    type: string
    
    @AllowNull(false)
    @Column
    provider: string
    
    @AllowNull(false)
    @Column
    providerAccountId: string
    @Column
    refreshToken: string
    @Column
    accessToken: string
    @Column
    expiresAt: number
    @Column
    tokenType: string
    @Column
    scope: string
    @Column
    idToken: string
    @Column
    sessionState: string


    @BelongsTo(() => User,'userId')
    user: User
}