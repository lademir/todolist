import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	QueryDocumentSnapshot,
	setDoc,
	SnapshotOptions,
} from "firebase/firestore";
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
		fromFirestore: (
			snapshot: QueryDocumentSnapshot,
			options: SnapshotOptions
		) => {
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
			return TaskModel.create(task.name, docRef.id, task.completed);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	}

	async changeTaskStatus(task: TaskModel): Promise<boolean> {
		try {
			await setDoc(doc(db, "tasks", task.id), {
				name: task.name,
				completed: task.completed,
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	async getAll(): Promise<TaskModel[]> {
		let taskSnap: TaskModel[] = [];

		try {
			const querySnapshot = await getDocs(
				collection(db, "tasks").withConverter(this.#convert)
			);

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
		try {
			await deleteDoc(doc(db, "tasks", id));
			return true;
		} catch (error) {
			return false;
		}
	}
}
