import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    // como se va a ver mi rootRecuder: 
    ui: uiReducer,
    calendar: calendarReducer,
    
})