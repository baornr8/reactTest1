import { combineReducers } from "@reduxjs/toolkit";
import toDoReducer from "./toDo";
export default combineReducers({
  toDo: toDoReducer,
});
