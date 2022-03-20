import TaskModel from "../models/TaskModel";


export default interface TaskRepository {
    
    save(task: TaskModel): Promise<TaskModel>,

    delete(id: string): Promise<boolean>,

    getAll(): Promise<TaskModel[]>,

    addNewTask(task: TaskModel): Promise<TaskModel>,

    changeTaskStatus(task: TaskModel): Promise<boolean>

}