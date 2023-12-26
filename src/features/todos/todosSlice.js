import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    userId: 1,
    todos: [
      {
        id: 1,
        title: "Abs",
        description: `Russian twist (20reps - 3sets)\nPlank (20s - 3sets)\nHeel touch (20reps - 3sets)`,
        completed: true,
        completedDate: 1703471827658,
      },
      {
        id: 2,
        title: "Chest",
        description: `Push ups (8reps - 3sets)\nKnee push ups (8reps - 3sets)\nWide arm push ups (8reps - 3sets)`,
        completed: true,
        completedDate: Date.now(),
      },
      {
        id: 3,
        title: "Arm",
        description: `Diamond push ups (6reps - 3sets)\nDiagonal plank (10reps - 2sets)\nInchworms (8reps - 2sets)`,
        completed: false,
        completedDate: null,
      },
      {
        id: 4,
        title: "Leg",
        description: `Squats (12reps - 3sets)\nBackward lunge (14reps - 2sets)`,
        completed: false,
        completedDate: null,
      },
    ],
  },
];

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    newUserTodos: (state, action) => {
      const newUser = {
        userId: action.payload.userId,
        todos: [],
      };

      state.push(newUser);
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        completedDate: null,
      };

      const index = state.findIndex((todo) => todo.userId === action.payload.userId);

      if (index !== -1) {
        state[index].todos.push(newTodo);
      }
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.userId === action.payload.userId);

      if (index !== -1) {
        const updatedTodos = state[index].todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.title, description: action.payload.description };
          }

          return todo;
        });

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], todos: updatedTodos };

        return updatedState;
      }

      return state;
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.userId === action.payload.userId);

      if (index !== -1) {
        const updatedTodos = state[index].todos.filter((todo) => todo.id !== action.payload.id);

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], todos: updatedTodos };

        return updatedState;
      }

      return state;
    },
    updateStatus: (state, action) => {
      const index = state.findIndex((todo) => todo.userId === action.payload.userId);

      if (index !== -1) {
        const updatedTodos = state[index].todos.map((todo) => {
          if (todo.id === action.payload.id) {
            if (action.payload.completed) {
              return {
                ...todo,
                completed: action.payload.completed,
                completedDate: Date.now(),
              };
            }
            else {
              return { ...todo, completed: action.payload.completed, completedDate: null };
            }
          }

          return todo;
        });

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], todos: updatedTodos };

        return updatedState;
      }

      return state;
    }
  },
});

export const { newUserTodos, addTodo, updateTodo, deleteTodo, updateStatus } = todosSlice.actions;

export default todosSlice.reducer;