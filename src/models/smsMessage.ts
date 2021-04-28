import { DataTypes, Model } from "sequelize";
import seq from "./index";

export default class SmsMessage extends Model {
    id: string;

    fromNumber: string;

    phoneNumber: string;

    body: string;

    status: string;

    twilioSid: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}

SmsMessage.init({
    id: {
        type:         DataTypes.UUID,
        primaryKey:   true,
        allowNull:    false,
        defaultValue: DataTypes.UUIDV4,
    },
    fromNumber: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type:      DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    twilioSid: {
        type:      DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        allowNull:    false,
        type:         DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        allowNull:    false,
        type:         DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize:   seq,
    tableName:   "sms_messages",
    timestamps:  true,
    underscored: true,
});
