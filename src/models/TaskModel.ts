import { v4 } from 'uuid';

export default class TaskModel {
    #id: string;
    #name: string;
    #completed: boolean;


    private constructor(name: string, id = '', completed = false) {
        this.#id= id;
        this.#name = name;
        this.#completed = completed;
    }

    static create(name: string, id: string, completed = false){

        return new TaskModel(name, id, completed);
    }

    static createToFirestore(name: string) {
        return new TaskModel(name)
    }   

    static empty() {
        return TaskModel.create('', '');
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