import React, { useContext, useEffect, useState } from 'react'
import AddTaskBtn from "./AddTaskBtn"
import ResetBtn from "./ResetBtn"
import TaskList from "./TaskList"


const TaskManager = () => {
  return (
    <>
    <div className='btns_container'>
        <AddTaskBtn/>
        <ResetBtn/>
    </div>
        <TaskList/>
    </>
  )
}

export default TaskManager      