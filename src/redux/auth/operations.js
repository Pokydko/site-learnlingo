import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase.js";

axios.defaults.baseURL = "https://site-learnlingo-default-rtdb.firebaseio.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, name, password }, thunkAPI) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setAuthHeader(res.user.accessToken);
      await updateProfile(res.user, { displayName: name });
      return {
        user: {
          name: res.user.displayName,
          email: res.user.email,
        },
        token: res.user.refreshToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.user.accessToken);
      return {
        user: {
          name: res.user.displayName,
          email: res.user.email,
        },
        token: res.user.refreshToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  signOut(auth)
    .then(() => {
      // After a successful logout, remove the token from the HTTP header
      clearAuthHeader();
    })
    .catch((error) => {
      return thunkAPI.rejectWithValue(error.message);
    });
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(thunkAPI.rejectWithValue("User not authenticated"));
          }
        });
      });
      return {
        user: {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        },
        token: user.refreshToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
