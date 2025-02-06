import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const instance = axios.create({
  baseURL: "https://site-learnlingo-default-rtdb.firebaseio.com",
});

export const fetchTeachersData = createAsyncThunk(
  "teachers/fetchTeachers",
  async ({ searchParams, favorites }, thunkAPI) => {
    try {
      if (favorites) return fetchFromArray(favorites);

      const { limit, teachers } = thunkAPI.getState().teachers;
      const params = {
        ...searchParams,
        orderBy: '"$key"',
        limitToFirst: limit + 1,
      };

      if (teachers.length) {
        params.startAfter = `"${teachers.length - 1}"`;
      }

      let res = await instance.get("/teachers.json", { params });
      let entries = Object.entries(res.data)
        .filter(([id, value]) => value !== null)
        .map(([id, teacher]) => ({
          id,
          ...teacher,
        }));

      const hasMore = entries.length > limit;
      if (hasMore) entries.pop();

      return { items: entries, hasMore };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

async function fetchFromArray(arr) {
  const requests = arr.map((id) =>
    instance.get(`/teachers/${id}.json`).then((res) => ({
      id,
      ...res.data,
    }))
  );

  return {
    favorites: (await Promise.all(requests)).filter(
      (element) => element.data !== null
    ),
  };
}

export const updateFavorites = createAsyncThunk(
  "teachers/updateFavorites",
  async (favoritesId, thunkAPI) => {
    const state = thunkAPI.getState();
    const userName = state.auth.user?.name;
    const currentFavorites = state.teachers.favorites;

    const updatedFavorites = currentFavorites.includes(favoritesId)
      ? currentFavorites.filter((id) => id !== favoritesId)
      : [...currentFavorites, favoritesId];

    if (userName) {
      localStorage.setItem(
        `${userName ?? "localUnSign"}_favoriteTeachers`,
        JSON.stringify(updatedFavorites)
      );
    }

    return updatedFavorites;
  }
);

export const loadFavorites = createAsyncThunk(
  "teachers/loadFavorites",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userName = state.auth.user?.name;

    if (!userName) return [];

    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem(`${userName ?? "localUnSign"}_favoriteTeachers`)
      );
      return Array.isArray(storedFavorites) ? storedFavorites : [];
    } catch (error) {
      return [];
    }
  }
);
