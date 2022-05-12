import { AllowNull, BelongsTo, Column, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table, DataType, Unique } from "sequelize-typescript";

@Table({ tableName: 'verification_tokens', underscored: true, timestamps: false })
export default class VerificationToken extends Model {

    @PrimaryKey
    @Column
    token: string

    @AllowNull(false)
    @Column
    identifier: string
    
    @AllowNull(false)
    @Column(DataType.DATE)
    expires: Date
}