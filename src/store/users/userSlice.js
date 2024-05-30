import { createSlice } from '@reduxjs/toolkit';
import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.current = null;
            state.isLoading = false;
            state.mes = ''
        },
        clearMessage: (state) => {
            state.mes = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getInforUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getInforUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(actions.getInforUser.rejected, (state, action) => {
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.mes = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!'
        });
    }
});

export const { login, logout, clearMessage } = userSlice.actions;

export default userSlice.reducer
