const INITIAL_STATE = {
    startTime : oldstartTime,
    completedTime : oldcompletedTime,
    totalTime : oldtotalTime,
};
const ACTION_TYPE={
    startTime : "startTime",
    totalTime : "totalTime",
    completedTime : "completedTime",
}
const reducer = (state,action)=>{
    switch (action.type){
        case (ACTION_TYPE.startTime):
            return {...state,startTime : action.payload.newStartTime}
        case (ACTION_TYPE.completedTime):
            return {...state,completedTime : action.payload.newCompletedTime}
        case (ACTION_TYPE.totalTime):
            return {...state,totalTime : action.payload.newTotalTime}
        default:
            return state   
    }
}

