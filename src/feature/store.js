import { configureStore } from "@reduxjs/toolkit";
import { reducer as movieReducer } from "./models/movies";

export const store = configureStore({
    reducer: {
        movies: movieReducer,
    }
})