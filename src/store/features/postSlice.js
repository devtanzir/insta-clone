import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "./postApiSlice";

// Create the slice
const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    success: false,
    error: null,
    loading: false,
  },
  reducers: {
    activeLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.success = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.post.push(action.payload);
        state.success = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = state.post.filter((data) => data.id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const postIndex = state.post.findIndex(
          (post) => post.id === action.payload.id
        );
        if (postIndex > -1) {
          state.post[postIndex] = action.payload;
        }
        state.success = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update post";
        state.success = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch post";
        state.success = false;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create post";
        state.success = false;
      });
  },
});

export const { activeLoading } = postSlice.actions;

// Export the reducer
export default postSlice.reducer;
