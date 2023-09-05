import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import blogSlice from "../features/blog/blogSlice";
import blogsSlice from "../features/blogs/blogsSlice";
import counterReducer from "../features/counter/counterSlice";
import filterSlice from "../features/filter/filterSlice";
import tagsSlice from "../features/tags/tagsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    blogs: blogsSlice,
    blog: blogSlice,
    tags: tagsSlice,
    filter: filterSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
