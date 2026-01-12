import { TaskAttributes, TaskOptionAttributes } from "@repo/shared-types";
import { Task,TaskOption } from "../models";

type SeedTask = Omit<TaskAttributes,'id'> & {
    options: Omit<TaskOptionAttributes,'taskId' | 'id'>[];
}
const seedTasks = async ():Promise<boolean> => {
    const tasksData: SeedTask[] = [
        {
            instruction: "What is the capital of France?",
            options:[
                {
                    text: "Berlin",
                    isCorrect: false,
                },
                {
                    text: "Madrid",
                    isCorrect: false,
                },
                {
                    text: "Paris",
                    isCorrect: true,
                },
                {
                    text: "Rome",
                    isCorrect: false,
                }
            ]
        },
        {
            instruction: "What is 2 + 2?",
            options:[
                {
                    text: "3",
                    isCorrect: false,
                },
                {
                    text: "4",
                    isCorrect: true,
                },
                {
                    text: "5",
                    isCorrect: false,
                },
                {
                    text: "22",
                    isCorrect: false,
                }
            ]
        },{
            instruction: "Which planet is known as the Red Planet?",
            options:[
                {
                    text: "Earth",
                    isCorrect: false,
                },
                {
                    text: "Mars",
                    isCorrect: true,
                },
                {
                    text: "Jupiter",
                    isCorrect: false,
                },
                {
                    text: "Venus",
                    isCorrect: false,
                }
            ]   
        }
    ]
    //Check existing tasks
    if(await Task.count() > 0) {
        console.log("Tasks already seeded");
        return false;
    }
    for(const taskData of tasksData) {
        const { options, ...taskInfo } = taskData;
        const task = await Task.create(taskInfo);
        for(const optionData of options) {
            await TaskOption.create({
                ...optionData,
                taskId: task.id,
            });
        }
    }
    return true;
}
const seedDatabase = async () => {
    const seedFunctions = [
        seedTasks,
    ];
    const results = await Promise.all(seedFunctions.map((fn) => fn()));
    if (results.some((res) => res)) {
        console.log("Database seeded successfully");
    }
};

export default seedDatabase;