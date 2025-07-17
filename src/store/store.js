import {configureStore} from '@reduxjs/toolkit';
import authReducers from '../store/features/authSlice.js'

const store = configureStore({
    reducer:{
            auth: authReducers,
    }
});

export default store;