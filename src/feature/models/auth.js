import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authConfig } from "../config";

const initialState = {
    isLoading: false,
    isError: false,
    auth: {
        type: undefined,
        status: false,
        token: undefined,
        data: undefined,
    },
    login: [],
};

export const getLogin = createAsyncThunk(
    "auth/login", 
    async (body) => {

        const results = { data: {
            data: {
                _id: "123d",
                token: "token;"
            },
        }}

        // const results = await axios.post(
        //     `${authConfig.baseUrl}/login`,
        //     {
        //         params: {
        //             email: body.loginEmail,
        //             password: body.loginPassword,
        //         }
        //     }
        // )

        const user = {
            data: {
                data: {
                    token: "token2"
                }
            }
        }

        // const user = await axios.get(
        //             `${authConfig.baseUrl}/${results.data.data._id}`
        //         );


        localStorage.setItem('auth', JSON.stringify({ id: results.data.data._id, token: results.data.data.token }))
        console.log("login", results.data)

        return await {login: results.data, user: user.data };
    }
)

export const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {},
        extraReducers: {
            [getLogin.pending]: (state) => {
                state.loading = true;
            },
            [getLogin.fulfilled]: (state, { payload }) => {
                state.isLoading = false;
                state.login = payload.login;
                state.auth = {
                    status: true,
                    data: payload.user,
                    token: payload.user.data.token,
                    type: "local"
                };
            },
            [getLogin.rejected]: (state) => {
                state.isLoading = false;
                state.isError = true;
            },
        },
    }
);

export const { reducer } = authSlice
