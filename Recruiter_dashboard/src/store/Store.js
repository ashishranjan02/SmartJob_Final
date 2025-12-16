import {configureStore} from '@reduxjs/toolkit';
import jobSlice from '../slice/JobSlice';
import ProfileSlice from '../slice/ProfileSlice';


export const store = configureStore({
    reducer:{
        jobs:jobSlice,
        recruiterProfile: ProfileSlice,
        
    }
})