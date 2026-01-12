export interface AnswerAttributes {
    id: number;
    sessionId: number;
    taskId: number;
    optionId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AnswerResponse {
   isCorrect: boolean;
}