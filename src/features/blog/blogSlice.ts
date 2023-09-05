// blog slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBlog } from "./blogAPI";

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

export interface BlogState {
  blog: BlogProps;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const obj = {
  id: 0,
  title: "",
  description: "",
  image: "",
  tags: [],
  likes: 0,
  isSaved: false,
  createdAt: "",
};

const initialState: BlogState = {
  blog: obj,
  status: "idle",
  error: null,
};

export const fetchBlog = createAsyncThunk(
  "blog/fetchBlog",
  async ({ blogId }: { blogId: string | undefined }) => {
    const res = await getBlog(blogId);
    return res;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.status = "idle";
        state.blog = action.payload;
        state.error = null;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = "failed";
        state.blog = obj;
        state.error = action.error.message ?? null;
      });
  },
});

export default blogSlice.reducer;
