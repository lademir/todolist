import { addDoc, collection, QuerySnapshot } from "firebase/firestore";
import TaskRepository from "../core/taskRepository";
import TaskModel from "../models/TaskModel";
import { db } from "./clientApp";


export default class TaskCollection implements TaskRepository {
  #convert = {
    toFirestore(task: TaskModel) {
      return {
        name: task.name,
        completed: task.completed,
      };
    },
  };

  async addNewTask(task: TaskModel): Promise<boolean> {
    //   console.log('chegou aqui')
    const taskToFirestore = this.#convert.toFirestore(task);
    console.log(taskToFirestore);

    try {
      const docRef = await addDoc(collection(db, "tasks"), taskToFirestore);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    return true;
  }

  async getAll(): Promise<TaskModel[]> {
    return [];
  }

  async save(task: TaskModel): Promise<TaskModel> {
    return TaskModel.empty();
  }

  async delete(id: string): Promise<boolean> {
    return true;
  }
}
