import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { profile_URL } from "../utils/axios.js";

export const getEmployProfile = createAsyncThunk(
  "recruiterProfile/fetchprofile",
  async (recruiterId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${profile_URL}/fetchprofile/${recruiterId}`, {
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

export const updateRecruiterProfile = createAsyncThunk(
  "recruiterProfile/update",
  async ({ recruiterId, updateData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(updateData).forEach((key) => {
        formData.append(key, updateData[key]);
      });

      const res = await axios.put(`${profile_URL}/update/${recruiterId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
};

const ProfileSlice = createSlice({
  name: "recruiterProfile",
  initialState,
  reducers: {
    clearProfileState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
    setUserFromLocalStorage: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getEmployProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRecruiterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.user = action.payload.employ;
      })
      .addCase(updateRecruiterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileState, setUserFromLocalStorage } = ProfileSlice.actions;
export default ProfileSlice.reducer;
