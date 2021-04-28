import { DataTypes, Model } from "sequelize";
import seq from "./index";

export default class EmailMessage extends Model {
    id: string;

    fromEmail: string;

    parameters: string;

    templateId: number;

    status: string;

    emailType: string;

    sibMessageId: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}

EmailMessage.init({
    id: {
        type:         DataTypes.UUID,
        primaryKey:   true,
        allowNull:    false,
        defaultValue: DataTypes.UUIDV4,
    },
    fromEmail: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    parameters: {
        type:      DataTypes.TEXT,
        allowNull: false,
    },
    templateId: {
        type:      DataTypes.INTEGER,
        allowNull: false,
    },
    emailType: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type:      DataTypes.STRING,
        allowNull: false,
    },
    sibMessageId: {
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
    tableName:   "email_messages",
    timestamps:  true,
    underscored: true,
});
