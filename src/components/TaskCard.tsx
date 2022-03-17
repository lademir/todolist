import { Checkbox } from "antd"
import { useState } from "react";
import useTasks from "../data/hooks/useTasks";
import TaskModel from "../models/TaskModel"
import { Icons } from "../Utils/Icons";

interface TaskCardProps {
    task: TaskModel
}


export default function TaskCard({ task }: TaskCardProps) {

    const [completed, setCompleted] = useState(task.completed);
    const { removeTask } = useTasks();


    //LOGIC

    function deleteTask() {
        removeTask(task.id);
    }

    function handleCompleteTask() {
        task.completed = !task.completed;
        setCompleted(task.completed);
    }

    //JSX

    function deleteButton() {
        return (
            <i onClick={deleteTask} className="
                h-full flex justify-center items-center
                cursor-pointer hover:text-primaryColor transition duration-100 ease-in
            ">{Icons.delete}</i>
        )
    }


    return (
        <div className="p-3 flex justify-between">
            <p className={`${completed ? 'line-through text-gray-400' : ''}`}>
                {task.name}
            </p>
            <div className="flex items-center gap-x-5">
                <Checkbox onChange={handleCompleteTask} />
                {deleteButton()}
            </div>
        </div>
    )
}