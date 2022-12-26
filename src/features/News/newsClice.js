import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsApi } from "../../api";

export const create = createAsyncThunk("news/create", async (payload) => {
  const data = await newsApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("news/edit", async (payload) => {
  const data = await newsApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("news/delete", async (payload) => {
  const data = await newsApi.delete(payload);

  return data;
});

const newsSlice = createSlice({
  name: "news",
  initialState: {},
  reducers: {
    hotNews(state, action) {
      return (state = action.payload);
    },

    removeHotNews(state) {
      return (state = {});
    },
  },
  extraReducers: {
    [create.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [edit.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [deleted.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = newsSlice;
export const { hotNews, removeHotNews } = actions;
export default reducer;
