import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";
import type { TaskAttributes } from "@repo/shared-types";
import TaskOption from "./TaskOption.js";

class Task
    extends Model<
        TaskAttributes,
        Optional<TaskAttributes, "id" | "createdAt" | "updatedAt">
    >
    implements TaskAttributes
{
    declare id: number;
    declare instruction: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
     declare options?: TaskOption[];
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        instruction: {
            type: DataTypes.STRING(1024),
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
        tableName: "tasks",
        timestamps: true,
    }
);

export default Task;
