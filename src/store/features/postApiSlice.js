// import API from "@/helpers/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../helper/api";

export const createPost = createAsyncThunk("post/createPost", async (data) => {
  try {
    const res = await API.post("/post", data);
    return res.data;
  } catch (error) {
    throw new Error(error.message || "something went wrong");
  }
});

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const response = await API.get("/post");
    return response.data;
  } catch (error) {
    throw new Error(error.message || "something went wrong");
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    await API.delete(`/post/${id}`);
    return id;
  } catch (error) {
    throw new Error(error.message || "something went wrong");
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async (data) => {
  try {
    const res = await API.put(`/post/${data.id}`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.message || "something went wrong");
  }
});

export const likeIncrement = createAsyncThunk(
  "post/likeIncrement",
  async (data) => {
    try {
      const res = await API.put(`/post/${data.id}`, data);
      return res.data;
    } catch (error) {
      throw new Error(error.message || "something went wrong");
    }
  }
);
