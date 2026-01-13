import { AnswerResponse, WorksheetResponse } from "@repo/shared-types";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { Check, X } from "lucide-react";

export const Task = ({answerTask, task}: {answerTask: (taskId: number, optionId: number) => Promise<AnswerResponse | null>, task: WorksheetResponse[number]}) => {
    const [answerResult, setAnswerResult] = useState<{
        correct: boolean;
        id: number;
    } | null>(null);

    const handleAnswer = async (optionId: number) => {
        const result = await answerTask(task.id, optionId);
        if (result) {
            setAnswerResult({
                correct: result.isCorrect,
                id: optionId,
            });
        }
    }
    return (<Card className="h-full">
        <CardHeader>
            <CardDescription>
                {task.instruction}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                {task.options.map((option) => {
                    const isAnswered = answerResult?.id === option.id;
                    const isCorrect = answerResult?.correct;
                    return (
                    <Button key={option.id} 
                        variant={isAnswered ? (isCorrect ? "default" : "destructive") : "outline"}
                    className="w-full text-left justify-start" onClick={() => handleAnswer(option.id)}>
                        {
                            isAnswered ? (isCorrect ? <Check/> : <X/>) : null
                        }
                        {option.text}
                    </Button>
                )
                })}
            </div>
        </CardContent>
    </Card>)
}