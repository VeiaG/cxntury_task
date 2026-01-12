import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";
import type { SessionAttributes } from "@repo/shared-types";

class Session
    extends Model<
        SessionAttributes,
        Optional<SessionAttributes, "id" | "createdAt" | "updatedAt">
    >
    implements SessionAttributes
{
    declare id: number;
    declare token: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        token: {
            type: DataTypes.STRING(512),
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "sessions",
        timestamps: true,
    }
);

export default Session;
