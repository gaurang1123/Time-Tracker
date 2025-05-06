import React, { useContext, useEffect, useState } from 'react'
import AddTaskBtn from "./AddTaskBtn"
import ResetBtn from "./ResetBtn"
import TaskList from "./TaskList"
import Total from './Total'


const TaskManager = () => {
  return (
    <>
    <div className='btns_container'>
        <AddTaskBtn/>
        <ResetBtn/>
        <Total/>
    </div>
        <TaskList/>
    </>
  )
}

export default TaskManager      