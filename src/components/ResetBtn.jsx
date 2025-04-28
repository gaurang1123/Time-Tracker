import React, { useContext } from 'react'
import { TaskContext } from '../App'

const ResetBtn = () => {
    const {setTasks} = useContext(TaskContext);
    function handler(){
        localStorage.setItem("tasks",[]);
        setTasks([]);
    }
  return (
    <button onClick={handler}>Reset Task</button>
  )
}

export default ResetBtn