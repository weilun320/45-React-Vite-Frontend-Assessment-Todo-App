import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    userId: 1,
    statistics: [
      {
        todoId: 1,
        duration: 2340,
        completed: true,
      },
      {
        todoId: 2,
        duration: 1823,
        completed: true,
      },
    ],
  },
];

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: initialState,
  reducers: {
    newUserStatistics: (state, action) => {
      const newUser = {
        userId: action.payload.userId,
        statistics: [],
      };

      state.push(newUser);
    },
    updateStatistic: (state, action) => {
      const index = state.findIndex((statistic) => statistic.userId === action.payload.userId);

      if (index !== -1) {
        const todoIndex = state[index].statistics.findIndex((statistic) => statistic.todoId === action.payload.todoId);

        if (todoIndex === -1) {
          const newStatistic = {
            todoId: action.payload.todoId,
            duration: action.payload.duration,
            completed: action.payload.completed,
          };

          state[index].statistics.push(newStatistic);
        }
        else {
          const updatedStatistics = state[index].statistics.map((statistic) => {
            if (statistic.todoId === action.payload.todoId) {
              return {
                ...statistic,
                duration: action.payload.duration,
                completed: action.payload.completed,
              };
            }

            return statistic;
          });

          const updatedState = [...state];
          updatedState[index] = { ...updatedState[index], statistics: updatedStatistics };

          return updatedState;
        }

        return state;
      }
    },
    deleteStatistic: (state, action) => {
      const index = state.findIndex((statistic) => statistic.userId === action.payload.userId);

      if (index !== -1) {
        const updatedStatistics = state[index].statistics.filter((statistic) =>
          statistic.todoId !== action.payload.todoId
        );

        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], statistics: updatedStatistics };

        return updatedState;
      }

      return state;
    }
  },
});

export const { newUserStatistics, updateStatistic, deleteStatistic } = statisticsSlice.actions;

export default statisticsSlice.reducer;