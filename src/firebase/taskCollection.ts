import { addDoc, collection, getDocs, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
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
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
      const data = snapshot.data(options);
      return TaskModel.create(data.name, snapshot.id, data.completed);
    },
  };

  async addNewTask(task: TaskModel): Promise<any> {
    //   console.log('chegou aqui')
    const taskToFirestore = this.#convert.toFirestore(task);
    console.log(taskToFirestore);

    try {
      const docRef = await addDoc(
        collection(db, "tasks").withConverter(this.#convert),
        taskToFirestore
      );

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAll(): Promise<TaskModel[]> {
    let taskSnap: TaskModel[] = [];

    try {
      const querySnapshot = await getDocs(collection(db, "tasks").withConverter(this.#convert));
      
      querySnapshot.forEach((doc) => {
        taskSnap.push(doc.data());
      });
    } catch (error) {
      console.log("error: ", error);
      
    }

    return taskSnap;
  }

  async save(task: TaskModel): Promise<TaskModel> {
    return TaskModel.empty();
  }

  async delete(id: string): Promise<boolean> {
    return true;
  }
}
