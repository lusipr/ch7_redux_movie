import { configureStore } from "@reduxjs/toolkit";
import { reducer as movieReducer } from "./models/movies";
import { reducer as authReducer } from './models/auth';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        auth: authReducer,
    }
})