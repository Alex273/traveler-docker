import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
    userId: number;
    userPhoto: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    isActive: boolean;
}

export interface AppState {
    user: UserState | null;
}

const initialState: AppState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<UserState | null>) => {
            state.user = action.payload;
        },
        removeCurrentUser: (state) => {
            state.user = null;
        },
    },
});

export const {setCurrentUser, removeCurrentUser} = userSlice.actions;

export default userSlice.reducer;
