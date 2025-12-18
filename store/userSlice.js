import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.data = null;
      state.isAuthenticated = false;
    },
    updateUser(state, action) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;