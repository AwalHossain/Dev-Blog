// blog redux slice

import { createSlice } from "@reduxjs/toolkit";

export interface FilterState {
  filter: string;
  sort: string;
}

const initialState: FilterState = {
  filter: "all",
  sort: "default",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterBy: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy(state, action) {
      state.sort = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setFilterBy, setSortBy } = filterSlice.actions;
