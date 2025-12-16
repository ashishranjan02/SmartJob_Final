import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../utils/axios";
// import { baseurl } from "../../utils/axios";

// Fetch all jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, thunkApi) => {
    try {
        const res = await axios.get(`${baseURL}/`);
        return res.data.data;
    } catch (err) {
        return thunkApi.rejectWithValue(
            err.response?.data?.message || "Failed to fetch jobs");
    }
});

// Apply for a job
// export const applyJob = createAsyncThunk(
//     "jobs/applyJob",
//     async (jobId, thunkApi) => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.post(
//                 `${baseurl}/apply-job`,
//                 { jobId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             return res.data;
//         } catch (err) {
//             return thunkApi.rejectWithValue(
//                 err.response?.data?.message || "Failed to apply for job"
//             );
//         }
//     }
// );

// Get applied jobs
// export const getAppliedJobs = createAsyncThunk(
//     "jobs/getAppliedJobs",
//     async (_, thunkApi) => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get(`${baseurl}/jobs/applied`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return res.data.appliedJobs;
//         } catch (err) {
//             return thunkApi.rejectWithValue(
//                 err.response?.data?.message || "Failed to fetch applied jobs"
//             );
//         }
//     }
// );

// Withdraw job
// export const withdrawJob = createAsyncThunk(
//     "jobs/withdrawJob",
//     async (jobId, thunkApi) => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.post(
//                 `${baseurl}/jobs/withdraw`,
//                 { jobId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             return res.data;
//         } catch (err) {
//             return thunkApi.rejectWithValue(
//                 err.response?.data?.message || "Failed to withdraw application"
//             );
//         }
//     }
// );

const initialState = {
    jobs: [],
    // appliedJobs: [],
    loading: false,
    error: null,
    success: false,
    stats: { totalJobs: 0, activeJobs: 0 },
};

const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        clearSuccess: (state) => {
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch jobs
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Apply Job
        // builder
        //     .addCase(applyJob.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(applyJob.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.success = true;
        //         state.appliedJobs.push(action.payload); // add newly applied job
        //     })
        //     .addCase(applyJob.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload;
        //     });

        // Get Applied Jobs
        // builder
        //     .addCase(getAppliedJobs.pending, (state) => {
        //         state.loading = true;
        //     })
        //     .addCase(getAppliedJobs.fulfilled, (state, action) => {
        //         state.loading = false;
        //         state.appliedJobs = action.payload;
        //     })
        //     .addCase(getAppliedJobs.rejected, (state, action) => {
        //         state.loading = false;
        //         state.error = action.payload;
        //     });

        // Withdraw Job
        // builder
        //     .addCase(withdrawJob.fulfilled, (state, action) => {
        //         state.appliedJobs = state.appliedJobs.filter(
        //             (job) => job.job._id !== action.meta.arg
        //         );
        //     });
    },
});

export const { clearSuccess, clearError } = jobSlice.actions;
export default jobSlice.reducer;