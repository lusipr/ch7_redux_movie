import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiConfig } from "../config";

const initialState = {
    isLoading: false,
    isError: false,
    popularMovie: [],
    categories: [],
    details: [],
    search: [],
    allMovies: [],
    genre: {},
    category: {},
}

export const getPopularMovie = createAsyncThunk(
    'movies/popularMovies',
    async () => {
        const results = await axios.get(
            `${apiConfig.baseUrl}/trending/all/day`,
            {
                params: {
                    api_key: apiConfig.apiKey
                }
            }
        )

        return await results.data;
    }
)

export const getCategories = createAsyncThunk(
    'movies/categories',
    async () => {
        const results = await axios.get(
            `${apiConfig.baseUrl}/genre/movie/list`,
            {
                params: {
                    api_key: apiConfig.apiKey
                }
            }
        )

        return await results.data;
    }
)

export const getAllMovies = createAsyncThunk(
    'movies/allMovies',
    async (page) => {
        console.log(page)
        const results = await axios.get(
            `${apiConfig.baseUrl}/discover/movie`,
            {
                params: {
                    api_key: apiConfig.apiKey,
                    page: page,
                }
            }
        )
            console.log(results)
        return await results.data;
    }
)

export const getDetails = createAsyncThunk(
    'movies/details',
    async (id) => {
        const results = await axios.get(
            `${apiConfig.baseUrl}/movie/${id}`,
            {
                params: {
                    api_key: apiConfig.apiKey
                }
            }
        )

        return await results.data;
    }
)

export const getSearch = createAsyncThunk(
    'movies/search',
    async (id) => {
        const results = await axios.get(
            `${apiConfig.baseUrl}/search/movie`,
            {
                params: {
                    api_key: apiConfig.apiKey,
                    query: id.replace(/ /g, '+')
                }
            }
        )

        return await results.data;
    }
)

export const getGenre = createAsyncThunk(
    'movies/genre',
    async (body) => {
        
        const results = await axios.get(
            `${apiConfig.baseUrl}/discover/movie`,
            {
                params: {
                    api_key: apiConfig.apiKey,
                    with_genres: body.id,
                    page: body.page,
                }
            }
        )
        console.log("movie-fetch-genre",results.data)
        return await results.data;
    }
)

export const getCategory = createAsyncThunk(
    'movies/category',
    async () => {
        const results = await axios.get(
            `${apiConfig.baseUrl}/genre/movie/list`,
            {
                params: {
                    api_key: apiConfig.apiKey
                }
            }
        )
        return await results.data;
    }
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: {
        [getPopularMovie.pending]: (state) => {
            state.isLoading = true
        },
        [getPopularMovie.fulfilled]: (state, { payload }) => {
            state.popularMovie = payload;
            state.isLoading = false;
        },
        [getPopularMovie.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [getCategories.pending]: (state) => {
            state.isLoading = true
        },
        [getCategories.fulfilled]: (state, { payload }) => {
            state.categories = payload;
            state.isLoading = false;
        },
        [getCategories.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [getDetails.pending]: (state) => {
            state.isLoading = true
        },
        [getDetails.fulfilled]: (state, { payload }) => {
            state.details = payload;
            state.isLoading = false;
        },
        [getDetails.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [getSearch.pending]: (state) => {
            state.isLoading = true
        },
        [getSearch.fulfilled]: (state, { payload }) => {
            state.search = payload;
            state.isLoading = false;
        },
        [getSearch.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [getAllMovies.pending]: (state) => {
            state.isLoading = true
        },
        [getAllMovies.fulfilled]: (state, { payload }) => {
            state.allMovies = payload;
            state.isLoading = false;
        },
        [getAllMovies.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [getGenre.pending]: (state) => {
            state.isLoading = true
        },
        [getGenre.fulfilled]: (state, { payload }) => {
            state.genre = payload;
            state.isLoading = false;
        },
        [getGenre.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
        [getCategory.pending]: (state) => {
            state.isLoading = true
        },
        [getCategory.fulfilled]: (state, { payload }) => {
            state.category = payload;
            state.isLoading = false;
        },
        [getCategory.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },
    }
})

export const { reducer } = moviesSlice