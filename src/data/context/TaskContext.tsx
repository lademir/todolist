/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import TaskModel from "../../models/TaskModel";
import TaskRepository from '../../core/taskRepository'
import TaskCollection from "../../firebase/taskCollection";

type TaskContextType = {
    removeTask: (id: string) => Promise<boolean>,
    addNewTask: (name: string) => Promise<TaskModel>,
    tasks: TaskModel[]
}


export const TaskContext = createContext<TaskContextType>({} as TaskContextType);


export function TaskProvider({ children }: { children: any}) {

    const repo: TaskRepository = new TaskCollection()

    const [tasks, setTasks] = useState<TaskModel[]>([]);

    // Load all tasks from firebase
    useEffect(() => {
        getAllTasks().then((res) => {
            setTasks(res);
        })
    }, []);

    

    //remover task
    async function removeTask(id: string): Promise<boolean> {
        try {
            setTasks(tasks.filter((task) => task.id !== id));
            return true
        } catch {
            return false;
        }
    }
    //adicionar task
    async function addNewTask(name: string): Promise<TaskModel> {

        const task = TaskModel.createToFirestore(name);

        setTasks([...tasks, task]);

        repo.addNewTask(task);

        return task;
    }

    async function getAllTasks(): Promise<TaskModel[]> {
        try {
            const res = await repo.getAll();
            return res
        } catch (error) {
            console.log("Não foi possível receber os dados", error);   
            return [];
        }
    }

    return (
        <TaskContext.Provider value={{
            removeTask,
            addNewTask,
            tasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}