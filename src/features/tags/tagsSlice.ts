// blog redux slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TagsProps } from "../../components/relatedPosts/RelatedPosts";
import { getTags } from "./tagsAPI";

export interface TagsState {
  tags: [];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TagsState = {
  tags: [],
  status: "idle",
  error: null,
};

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async ({ relatedPosts, currentId }: TagsProps) => {
    const res = await getTags(relatedPosts, currentId);
    return res;
  }
);

const blogsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "idle";
        state.tags = action.payload;
        state.error = null;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.tags = [];
        state.error = action.error.message ?? null;
      });
  },
});

export default blogsSlice.reducer;
