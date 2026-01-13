import { useSession } from "@/components/session-provider";
import { API_BASE_URL } from "@/config";
import { AnswerResponse, WorksheetResponse } from "@repo/shared-types";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useTasks = () => {
    const [tasks, setTasks] = useState<WorksheetResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { token, isLoading: isSessionLoading, error: sessionError } = useSession();

    useEffect(() => {
        const fetchTasks = async () => {
            if (!token) {
                if(sessionError) {
                    setError(sessionError);
                    setIsLoading(false); // Stop loading if there's a session error
                }
                return;
            }
            setIsLoading(true);
            try {
                const response = await axios.get<WorksheetResponse>(
                    `${API_BASE_URL}/worksheet`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Error fetching tasks");
            } finally {
                setIsLoading(false);
            }
        };

        if (!isSessionLoading) {
            fetchTasks();
        }
    }, [token, isSessionLoading,sessionError]);

    const answerTask = useCallback(
        async (taskId: number, optionId: number) => {
            if (!token) return null;
            try {
                const response = await axios.post<AnswerResponse>(
                    `${API_BASE_URL}/worksheet/${taskId}/answer`,
                    {
                        optionId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                console.error("Error answering task:", error);
            }
            return null;
        },
        [token]
    );
    return { tasks, isLoading, answerTask, error };
};
