import { createContext, useState } from "react";
import TaskModel from "../../models/TaskModel";
import TaskRepository from '../../core/taskRepository'
import TaskCollection from "../../firebase/taskCollection";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/clientApp";


type TaskContextType = {
    removeTask: (id: string) => Promise<boolean>,
    addNewTask: (name: string) => Promise<TaskModel>,
    tasks: TaskModel[]
}


export const TaskContext = createContext<TaskContextType>({} as TaskContextType);


export function TaskProvider({ children }: { children: any }) {

    const repo: TaskRepository = new TaskCollection()

    const inMemoryTasks: TaskModel[] = [
        TaskModel.create('Capoeira'),
        TaskModel.create('Estudar Calculo 1'),
        TaskModel.create('Estagio'),
        TaskModel.create('Aula de Biologia'),
        TaskModel.create('Redação da semana'),
    ]
    const [tasks, setTasks] = useState(inMemoryTasks);

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

        const task = TaskModel.create(name);

        setTasks([...tasks, task]);

        repo.addNewTask(task);

        return task;
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