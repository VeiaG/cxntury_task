import Task from "./Task";
import TaskOption from "./TaskOption";
import Answer from "./Answers";
import Session from "./Session";
Task.hasMany(TaskOption, {
    foreignKey: "taskId",
    as: "options",
    onDelete: "CASCADE",
});

TaskOption.belongsTo(Task, {
    foreignKey: "taskId",
    as: "task",
});

//Answers associations
Task.hasMany(Answer, {
    foreignKey: "taskId",
    as: "answers",
    onDelete: "CASCADE",
});

Answer.belongsTo(Task, {
    foreignKey: "taskId",
    as: "task",
});

TaskOption.hasMany(Answer, {
    foreignKey: "optionId",
    as: "answers",
    onDelete: "CASCADE",
});

Answer.belongsTo(TaskOption, {
    foreignKey: "optionId",
    as: "option",
});

Session.hasMany(Answer, {
    foreignKey: "sessionId",
    as: "answers",
    onDelete: "CASCADE",
});

Answer.belongsTo(Session, {
    foreignKey: "sessionId",
    as: "session",
});

export { Task, TaskOption, Answer };