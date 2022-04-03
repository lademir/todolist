/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import TaskModel from "../../models/TaskModel";
import TaskRepository from '../../core/taskRepository'
import TaskCollection from "../../services/taskCollection";

type TaskContextType = {
    removeTask: (id: string) => Promise<boolean>,
    addNewTask: (name: string) => Promise<TaskModel>,
    completeTask: (task: TaskModel) => Promise<boolean>
    tasks: TaskModel[]
}


export const TaskContext = createContext<TaskContextType>({} as TaskContextType);


export function TaskProvider({ children }: { children: any }) {

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
            const res = await repo.delete(id);
            return res;
        } catch {
            return false;
        }
    }
    //adicionar task
    async function addNewTask(name: string): Promise<TaskModel> {

        const task = TaskModel.createToFirestore(name);

        const newTask = await repo.addNewTask(task);

        setTasks([...tasks, newTask]);

        return newTask;
    }

    //completar uma task
    async function completeTask(task: TaskModel) {
        return await repo.changeTaskStatus(task);
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
            completeTask,
            tasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}