import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import todosReducer from "./features/todos/todosSlice";
import statisticsReducer from "./features/statistics/statisticsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    statistics: statisticsReducer,
  },
});