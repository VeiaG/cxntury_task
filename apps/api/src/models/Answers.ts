import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database.js";
import type { AnswerAttributes } from "@repo/shared-types";
import Task from './Task.js'
import TaskOption from './TaskOption.js'
import Session from './Session.js'
class Answer
    extends Model<
        AnswerAttributes,
        Optional<AnswerAttributes, "id" | "createdAt" | "updatedAt">
    >
    implements AnswerAttributes
{
    declare id: number;
    declare sessionId: number;
    declare taskId: number;
    declare optionId: number;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;

      declare task?: Task;
  declare option?: TaskOption;
  declare session?: Session;
}

Answer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "sessions",
                key: "id",
            }
        },
        taskId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "tasks",
                key: "id",
            }
        },
        optionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "task_options",
                key: "id",
            }
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
        tableName: "answers",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['sessionId', 'taskId'],
                name: 'unique_session_task_answer'
            }
        ]
    }
);

export default Answer;
