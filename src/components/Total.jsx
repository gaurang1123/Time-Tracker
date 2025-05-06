import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../App'

const Total = () => {
    const [taskCount, setTaskCount] = useState({ hours: 0, minutes: 0 });
    const { tasks } = useContext(TaskContext);

    function totalTime() {
        let totalMinutes = 0;
        let totalHours = 0;

        tasks.forEach((task) => {
            totalMinutes += task.totalTime.Minutes;
            totalHours += task.totalTime.Hour;
        });

        // Normalize minutes into hours
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;

        setTaskCount({ hours: totalHours, minutes: totalMinutes });
    }

    useEffect(() => {
        totalTime();
    }, [tasks]);

    return (
        <div>
            <h2>Total Time: {taskCount.hours}:{taskCount.minutes}</h2>
        </div>
    );
}

export default Total;
