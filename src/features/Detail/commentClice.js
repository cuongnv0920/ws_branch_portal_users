import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentApi } from "api";

export const create = createAsyncThunk("comment/create", async (payload) => {
  const data = await commentApi.create(payload);

  return data;
});

export const edit = createAsyncThunk("comment/edit", async (payload) => {
  const data = await commentApi.update(payload);

  return data;
});

export const deleted = createAsyncThunk("comment/delete", async (payload) => {
  const data = await commentApi.delete(payload);

  return data;
});

const commentSlice = createSlice({
  name: "comment",
  initialState: {},
  reducers: {
    getEdit(state, action) {
      return (state = action.payload);
    },

    removeGetEdit(state) {
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

const { actions, reducer } = commentSlice;
export const { getEdit, removeGetEdit } = actions;
export default reducer;
