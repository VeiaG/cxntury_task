import { AnswerResponse, WorksheetResponse } from "@repo/shared-types";
import { Request, Response } from "express";
import { Session, Task, TaskOption, Answer } from "../models";
import sequelize from "../config/database";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const params = req.query;
        const limit = params.limit ? parseInt(params.limit as string, 10) : 10;
        const page = params.page ? parseInt(params.page as string, 10) : 1;
        const offset = (page - 1) * limit;

        const tasks = await Task.findAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: TaskOption,
                    as: "options",
                },
            ],
        });
        const response: WorksheetResponse = tasks.map((task) => ({
            id: task.id,
            instruction: task.instruction,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            options:
                task.options?.map((option) => ({
                    id: option.id,
                    taskId: option.taskId,
                    text: option.text,
                    createdAt: option.createdAt,
                    updatedAt: option.updatedAt,
                })) || [],
        }));
        res.json(response);
    } catch (error) {
        console.error("Error reading tasks:", error);
        res.status(500).json({ error: "Failed to read tasks" });
    }
};
export const submitAnswers = async (req: Request, res: Response): Promise<void> => {
  try {
        const taskId = parseInt(req.params.taskId, 10);
        if (!taskId) {
          res.status(400).json({ error: "taskId query parameter is required" });
          return;
        }
        const task = await Task.findByPk(taskId);
        if (!task) {
          res.status(404).json({ error: "Task not found" });
          return;
        }
        const optionId = req.body.optionId;
        if(!optionId) {
          res.status(400).json({ error: "optionId in request body is required" });
          return;
        }
        const option = await TaskOption.findOne({ where: { id: optionId, taskId: taskId } });
        if (!option) {
          res.status(404).json({ error: "Option not found for the given task" });
          return;
        }
        const token = req.headers.authorization?.replace("Bearer ", "");
        if(!token) {
          res.status(401).json({ error: "Unauthorized: session token is required" });
          return;
        }
        const session = await Session.findOne({ where: { token } });
        if (!session) {
          res.status(401).json({ error: "Invalid session token" });
          return;
        }
        // Use transaction with findOrCreate for atomic create-or-update (prevents race conditions)
        await sequelize.transaction(async (t) => {
          const [answer, created] = await Answer.findOrCreate({
            where: { sessionId: session.id, taskId: task.id },
            defaults: { optionId: option.id,taskId:option.taskId, sessionId: session.id },
            transaction: t
          });

          if (!created) {
            answer.optionId = option.id;
            await answer.save({ transaction: t });
          }
        });

        const isCorrectAnswer = option.isCorrect;
        

        const response:AnswerResponse = {
          isCorrect: isCorrectAnswer,
        };

        res.json(response);
    } catch (error) {
        console.error("Error submitting answers:", error);
        res.status(500).json({ error: "Failed to submit answers" });
    }
};