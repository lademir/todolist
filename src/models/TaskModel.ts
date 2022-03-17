import { v4 } from 'uuid';

export default class TaskModel {
    #id: string;
    #name: string;
    #completed: boolean;


    private constructor(id: string, name: string, completed = false) {
        this.#id= id;
        this.#name = name;
        this.#completed = completed;
    }

    static create(name: string){

        const id = v4();

        return new TaskModel(id, name);
    }

    static empty() {
        return TaskModel.create('');
    }

    get id() {
        return this.#id;
    }

    get name (){
        return this.#name;
    }

    get completed() {
        return this.#completed;
    }

    set completed(newCompleted: boolean) {
        this.#completed = newCompleted;
    }

    toJson(){
        return {
            id: this.#id,
            name: this.#name,
            completed: this.#completed,
        }
    }

}