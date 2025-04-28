import { createContext, useEffect, useState } from "react"
import TaskManager from "./components/TaskManager"

export const TaskContext = createContext();

const App = () => {
  const [tasks,setTasks] = useState([]);

  useEffect(()=>{
    const taskData = localStorage.getItem("tasks");
    const localTasks = taskData ? JSON.parse(taskData) : [];
    
    if(localTasks.length){
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
    else{
      localStorage.setItem("tasks","[]")
    }
  },[])
  
  
  return (

    <TaskContext.Provider value={{tasks,setTasks}}>
      <TaskManager/>
    </TaskContext.Provider>
  )
}

export default App