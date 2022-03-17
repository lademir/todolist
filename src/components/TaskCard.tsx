import { Checkbox } from "antd"
import { useState } from "react";
import TaskModel from "../models/TaskModel"

interface TaskCardProps {
    task: TaskModel
}


export default function TaskCard({ task }: TaskCardProps) {

    const [completed, setCompleted] = useState(task.completed);

    function handleCompleteTask() {
        task.completed = !task.completed;
        setCompleted(task.completed);
    }

   

    return (
        <div className="p-3 flex justify-between">
            <p className={`${completed ? 'line-through text-opacity-80' : ''}`}>
                {task.name}
            </p>
            <Checkbox onChange={handleCompleteTask} />
        </div>
    )
}