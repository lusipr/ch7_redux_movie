import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authConfig } from "../config";

const initialState = {
    isLoading: false,
    isError: false,
    authRegister: {
        type: undefined,
        status: false,
        token: undefined,
        data: undefined,
    },
    register: [],
};

export const getRegister = createAsyncThunk(
    "authRegister/register",
    async (body) => {
        const results = await axios.post(
            `${authConfig.baseUrl}`,
            {
               ...body
            }
        )

        localStorage.setItem('auth', JSON.stringify({ id: results.data.data._id, token: results.data.data.token }))

        return await results.data;
    }
)

export const authRegisterSlice = createSlice(
    {
        name: "authRegister",
        initialState,
        extraReducers: {
            [getRegister.pending]: (state) => {
                state.loading = true;
            },
            [getRegister.fulfilled]: (state, { payload }) => {
                state.isLoading = false;
                state.register = payload.register;
                state.authRegister = {
                    status: true,
                    data: payload.user,
                    type: "local"
                };
            },
            [getRegister.rejected]: (state) => {
                state.isLoading = false;
                state.isError = true;
            },
        },
    }
);

export const { reducer } = authRegisterSlice