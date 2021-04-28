import { DataTypes, Model } from "sequelize";
import seq from "./index";

export default class WhatsappMessage extends Model {
    id: string;

    fromNumber: string;

    phoneNumber: string;

    body: string;

    status: string;

    twilioSid: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

    readonly deletedAt: Date;
}

WhatsappMessage.init({
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
    deletedAt: {
        allowNull: true,
        type:      DataTypes.DATE,
    },
}, {
    paranoid:    true,
    sequelize:   seq,
    tableName:   "whatsapp_messages",
    timestamps:  true,
    underscored: true,
});
