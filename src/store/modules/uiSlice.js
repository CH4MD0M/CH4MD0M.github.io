import { createSlice } from "@reduxjs/toolkit";

import { setValueToLocalStorage } from "../../utils/localStorage";

const initialState = {
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      setValueToLocalStorage("theme", action.payload);
    },
  },
});

export const { setTheme } = uiSlice.actions;
export default uiSlice.reducer;
