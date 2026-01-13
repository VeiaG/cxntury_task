import { useTasks } from "@/hooks/useTasks"

import { Skeleton } from "./ui/skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { List } from "lucide-react";
import { Task } from "./task";

export const TaskList = () => {
    const {tasks, isLoading, answerTask, error} = useTasks();

    if(!isLoading && tasks?.length === 0) {
        return <Empty>
            <EmptyHeader>
                <EmptyMedia>
                    <List/>
                </EmptyMedia>
                <EmptyTitle>No Tasks Available</EmptyTitle>
                <EmptyDescription>
                    There are currently no tasks to display. Please check back later.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    }
    return (
        <div className="space-y-4 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6 ">
            {isLoading && Array.from({length: 3}).map((_, idx) => (
            <Skeleton key={idx} className="h-64 w-full rounded-md" />
        ))}
        {
            error && <div className="text-destructive">Error: {error}</div>
        }
            {tasks?.map((task) => (
                <Task key={task.id} task={task} answerTask={answerTask}/>
            ))}
        </div>
    );
}

    
