// blog redux slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlogs } from "./blogsAPI";

export interface BlogProps {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  likes: number;
  isSaved: boolean;
  createdAt: string;
}

export interface BlogsState {
  blogs: BlogProps[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: BlogsState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ filter, sort }: { filter: string; sort: string }) => {
    const res = await getBlogs(filter, sort);
    return res;
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "idle";
        state.blogs = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.blogs = [];
        state.error = action.error.message ?? null;
      });
  },
});

export default blogsSlice.reducer;
