import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    username: "johndoe@example.com",
    password: "password",
  },
];

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = {
        id: action.payload.id,
        username: action.payload.username,
        password: action.payload.password,
      };

      state.push(newUser);
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;