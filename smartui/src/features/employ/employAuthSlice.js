import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UI_BASE_URL } from "../../utils/axios";


export const login = createAsyncThunk(
  "employAuth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axios.post(`${UI_BASE_URL}/login`, credentials);
      console.log("Login API response:", res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);


export const getEmployProfile = createAsyncThunk(
  "employAuth/fetchprofile",
  async (recruiterId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${UI_BASE_URL}/fetchprofile/${recruiterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

const initialState = {
  users: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  loading: false,
  error: null,
  isAutenticated: !!localStorage.getItem("token"),
  user: (() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return null;
    }
  })(),
};

const employAuthSlice = createSlice({
  name: "employAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.users = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.isAutenticated = false;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("recruiterId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const user = action.payload;

        state.token = user.token;
        state.users = user;
        state.role = user.role?.toLowerCase() || null;
        state.isAutenticated = true;

        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("recruiterId", user.recruiterId);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(getEmployProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(getEmployProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = employAuthSlice.actions;
export default employAuthSlice.reducer;
