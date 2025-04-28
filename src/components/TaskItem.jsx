import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../App';
import CustomInput from './CustomInput';

const TaskItem = ({ taskNum, oldstartTime, oldcompletedTime, oldtotalTime }) => {
  const { setTasks } = useContext(TaskContext);

  const [startTime, setStartTime] = useState({ Hour: null, Minutes: null, Period: 'AM' });
  const [completedTime, setCompletedTime] = useState({ Hour: null, Minutes: null, Period: 'AM' });
  const [totalTime, setTotalTime] = useState({ Hour: 0, Minutes: 0 });
  const [estimatedHour, setEstimatedHour] = useState(null);
  const [showEstimateOptions, setShowEstimateOptions] = useState(false);
  const [showStartInput, setShowStartInput] = useState(false);
  const [showCompleteInput, setShowCompleteInput] = useState(false);

  useEffect(() => {
    if (oldstartTime) setStartTime(oldstartTime);
    if (oldcompletedTime) setCompletedTime(oldcompletedTime);
    if (oldtotalTime) setTotalTime(oldtotalTime);
  }, [oldstartTime, oldcompletedTime, oldtotalTime]);

  function getCurrentTimeWithPeriod() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    if (hours === 0) hours = 12;
    else if (hours > 12) hours -= 12;

    return { Hour: hours, Minutes: minutes, Period: period };
  }

  function convertTo24Hour({ Hour, Minutes, Period }) {
    let hours24 = Hour % 12;
    if (Period === 'PM') hours24 += 12;
    return { Hour: hours24, Minutes };
  }

  function handlerStartTime() {
    const newStart = getCurrentTimeWithPeriod();
    setStartTime(newStart);

    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.taskNum === taskNum ? { ...task, startTime: newStart } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function handleCompletedTime() {
    const newCompleted = getCurrentTimeWithPeriod();
    setCompletedTime(newCompleted);

    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.taskNum === taskNum ? { ...task, completedTime: newCompleted } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function handleTotalTime() {
    const convertToDecimal = ({ Hour, Minutes, Period }) => {
      let hour = Hour;
      if (Period === 'PM' && Hour !== 12) hour += 12;
      if (Period === 'AM' && Hour === 12) hour = 0;
      return hour + (Minutes / 60);
    };

    const startDecimal = convertToDecimal(startTime);
    const completedDecimal = convertToDecimal(completedTime);

    let totalDecimal = completedDecimal - startDecimal;
    if (totalDecimal < 0) totalDecimal += 24;

    const hours = Math.floor(totalDecimal);
    const minutes = Math.round((totalDecimal - hours) * 60);

    const newTotalTime = { Hour: hours, Minutes: minutes };
    setTotalTime(newTotalTime);

    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.taskNum === taskNum ? { ...task, totalTime: newTotalTime } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  }

  function handleEstimateTimeChange(value) {
    const hoursToAdd = parseFloat(value);
    const totalMinutesToAdd = Math.floor(hoursToAdd * 60);

    const start24 = convertTo24Hour(startTime);
    let newMinutes = start24.Minutes + totalMinutesToAdd;
    let newHour24 = start24.Hour + Math.floor(newMinutes / 60);
    newMinutes = newMinutes % 60;
    newHour24 = newHour24 % 24;

    const period = newHour24 >= 12 ? 'PM' : 'AM';
    let displayHour = newHour24 % 12;
    if (displayHour === 0) displayHour = 12;

    setEstimatedHour({ Hour: displayHour, Minutes: newMinutes, Period: period });
  }

  return (
    <div className="container" style={{ border: "1px solid gray", padding: "10px", marginBottom: "15px" }}>
      <div className="starttime">
        <p>{taskNum + ">"}</p>
        <p>
          {startTime?.Hour?.toString().padStart(2, '0') || '--'}:
          {startTime?.Minutes?.toString().padStart(2, '0') || '--'} {startTime?.Period || ''}
        </p>
        <button onClick={handlerStartTime}>Start Time</button>
        <button onClick={() => setShowStartInput(prev => !prev)}>
          {showStartInput ? "Hide Manual" : "Set Start Manually"}
        </button>
        {showStartInput && <CustomInput inputfor="startTime" taskNum={taskNum} />}
      </div>

      <p style={{marginInline:"10px"}}>{'==>'}</p>

      <div className="completedtime">
        <p>
          {completedTime?.Hour?.toString().padStart(2, '0') || '--'}:
          {completedTime?.Minutes?.toString().padStart(2, '0') || '--'} {completedTime?.Period || ''}
        </p>
        <button onClick={handleCompletedTime}>Finish Time</button>
        <button onClick={() => setShowCompleteInput(prev => !prev)}>
          {showCompleteInput ? "Hide Manual" : "Set End Manually"}
        </button>
        {showCompleteInput && <CustomInput inputfor="completedTime" taskNum={taskNum} />}
      </div>

      <div className="Totaltime">
        <p>
          Total Time: {(totalTime?.Hour + (totalTime?.Minutes / 60)).toPrecision(2)} hours
        </p>
        <button onClick={handleTotalTime}>Total</button>
      </div>

      <div className="estimateTime">
        <button onClick={() => setShowEstimateOptions(!showEstimateOptions)}>
          Estimate Time
        </button>

        {showEstimateOptions && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {[0.25, 0.5, 0.75, 1].map((val) => (
              <button key={val} onClick={() => handleEstimateTimeChange(val)}>
                {val}
              </button>
            ))}
            <input
              type="number"
              step="0.01"
              placeholder="Custom"
              onChange={(e) => handleEstimateTimeChange(e.target.value)}
              style={{ width: '60px' }}
            />
          </div>
        )}

        <p style={{ marginTop: "8px" }}>
          Estimated End Time: {estimatedHour?.Hour?.toString().padStart(2, '0') || '00'}:
          {estimatedHour?.Minutes?.toString().padStart(2, '0') || '00'} {estimatedHour?.Period || ''}
        </p>
      </div>
    </div>
  );
};

export default TaskItem;
