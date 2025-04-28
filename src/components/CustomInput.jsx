import React, { useContext } from 'react';
import { TaskContext } from '../App';

const CustomInput = ({ inputfor, taskNum }) => {
  const { setTasks } = useContext(TaskContext);

  const handleChange = (field, value) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.taskNum === taskNum) {
          const existingTime = task[inputfor] || { Hour: null, Minutes: null, Period: 'AM' };
          const updatedTime = {
            ...existingTime,
            [field]: field === 'Hour' || field === 'Minutes' ? parseInt(value) || 0 : value
          };
          return { ...task, [inputfor]: updatedTime };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div style={{ display: 'flex', gap: '5px', marginTop: '8px' }}>
      <input
        type="number"
        placeholder="HH"
        min="1"
        max="12"
        onChange={(e) => handleChange('Hour', e.target.value)}
        style={{ width: '50px' }}
      />
      <input
        type="number"
        placeholder="MM"
        min="0"
        max="59"
        onChange={(e) => handleChange('Minutes', e.target.value)}
        style={{ width: '50px' }}
      />
      <select onChange={(e) => handleChange('Period', e.target.value)} defaultValue="AM">
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default CustomInput;
