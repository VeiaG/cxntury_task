export interface TaskAttributes {
    id: number;
    instruction: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TaskOptionAttributes {
    id: number;
    taskId: number;
    text: string;
    isCorrect: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type WorksheetResponse = Array<
    NonNullable<TaskAttributes> & {
        options: Omit<NonNullable<TaskOptionAttributes>, "isCorrect">[];
    }
>;
