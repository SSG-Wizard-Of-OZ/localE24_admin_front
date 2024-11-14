import {Cookies} from "react-cookie";
import {IAdminlogin} from "../types/iadminlogin.ts";
import {postSignin} from "../apis/adminlogin/adminloginAPI.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const cookies = new Cookies();

const initalState:IAdminlogin = {
    adminId : '',
    pw : '',
    accessToken : '',
    refreshToken : '',
    adminName : ''
}

export const postSigninThunk = createAsyncThunk('postSigninThunk', postSignin)

const signinSlice = createSlice({
    name: "signin",
    initialState: initalState,
    reducers: {
        signin: (state, action) => {
            console.log(state, action);
            const adminId = action.payload.username;

            // `state`를 직접 수정합니다.
            state.adminId = adminId;
            state.pw = action.payload.pw || state.pw;
            state.accessToken = action.payload.accessToken || state.accessToken;
            state.refreshToken = action.payload.refreshToken || state.refreshToken;
            state.adminName = action.payload.adminName || state.adminName;

            // 쿠키 설정
            const result = { adminId };
            cookies.set("adminlogin", JSON.stringify(result), { path: "/", maxAge: 3600 });
        },
        signout: (state) => {
            console.log(state);
            // signout 시 초기 상태로 리셋
            return { ...initalState };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postSigninThunk.fulfilled, (state, action) => {
                console.log("postSigninThunk.fulfilled");

                const result = action.payload; // payload에서 필요한 값을 state에 할당
                if (result) {
                    state.adminId = result.adminId;
                    state.pw = result.pw;
                    state.accessToken = result.accessToken;
                    state.refreshToken = result.refreshToken;
                    state.adminName = result.adminName;
                }
            })
            .addCase(postSigninThunk.pending, () => {
                console.log("postSigninThunk.pending");
            });
    }
});

export const { signin, signout } = signinSlice.actions;

export default signinSlice.reducer;