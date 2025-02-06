import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTeachersData,
  updateFavorites,
  loadFavorites,
} from "./operations";

const INITIAL_STATE = {
  favorites: [],
  teachers: [],
  filters: {
    // equalTo: "2"
  },
  limit: 4,
  isThereMore: false,
  loading: false,
  error: null,
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState: INITIAL_STATE,
  reducers: {
    loadMore(state) {
      state.page += 1;
    },
    setFilter(state, action) {},
    initializeFilters(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachersData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachersData.fulfilled, (state, action) => {
        // state.isThereMore = action.payload.total > state.page * state.limit;
        // console.dir(action.payload);
        // if (state.refresh) state.teachers = [];
        if (action.payload.favorites) {
          state.loading = false;
          state.error = null;
          return;
        }

        if (action.payload.items) {
          state.teachers.push(...action.payload.items);
          state.isThereMore = action.payload.hasMore;
        } else {
          console.dir("fetch not an items:", action.payload);
          state.teachers.push(action.payload);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTeachersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.teachers = [];
      })
      .addCase(updateFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { loadMore, setFilter } = teachersSlice.actions;
export const teachersReducer = teachersSlice.reducer;
