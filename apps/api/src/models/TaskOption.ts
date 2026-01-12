import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";
import type { TaskOptionAttributes } from "@repo/shared-types";

class TaskOption
    extends Model<
        TaskOptionAttributes,
        Optional<TaskOptionAttributes, "id" | "createdAt" | "updatedAt">
    >
    implements TaskOptionAttributes
{
    declare id: number;
    declare taskId: number;
    declare text: string;
    declare isCorrect: boolean;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

TaskOption.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {    
                model: "tasks",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        text: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        tableName: "task_options",
        timestamps: true,
    }
);

export default TaskOption;
