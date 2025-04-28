import React, { useContext } from 'react'
import { TaskContext } from '../App'
import TaskItem from "./TaskItem"

const TaskList = () => {
  const {tasks} = useContext(TaskContext)
  
  return (
    <div>
      {tasks.map((item)=>{
        return(
        <TaskItem key={item.taskNum} taskNum={item.taskNum} oldstartTime={item.startTime} oldcompletedTime={item.completedTime} oldtotalTime={item.totalTime}/>
      )})}
    </div>
  )
}

export default TaskList