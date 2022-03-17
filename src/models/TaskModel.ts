export default class TaskModel {
    #id: string;
    #name: string;
    #completed: boolean;


    private constructor(id: string, name: string, completed = false) {
        this.#id= id;
        this.#name = name;
        this.#completed = completed;
    }

    static create(id: string, name: string){
        return new TaskModel(id, name);
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