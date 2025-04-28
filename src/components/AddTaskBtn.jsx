import React, { useContext } from 'react'
import { TaskContext } from '../App'

const AddTaskBtn = () => {
    const {tasks,setTasks} = useContext(TaskContext)
    function handler(){
        const newTaskNum = tasks.length + 1;
        const newTask = {taskNum:newTaskNum, startTime: {Hour: 0 , Minutes: 0, Period: 'AM'}, completedTime: {Hour: 0 , Minutes: 0, Period: 'AM'}, totalTime:{Hour:0, Minutes: 0}}
        const updatedTask = [...tasks,newTask]
        localStorage.setItem("tasks",JSON.stringify(updatedTask));
        setTasks(updatedTask);

    }
  return (
    <button onClick={handler}>Add Task</button>
  )
}

export default AddTaskBtn