import { AllowNull, BelongsTo, Column, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table, DataType, Unique } from "sequelize-typescript";

@Table({ tableName: 'verification_tokens', underscored: true, timestamps: false })
export default class VerificationToken extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column
    id: string

    @AllowNull(false)
    @Column(DataType.DATE)
    expires: Date
    
    @Unique('sessionToken')
    @AllowNull(false)
    @Column
    sessionToken: string
    
    @Column(DataType.UUID)
    userId: string
}