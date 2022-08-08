import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ICreateUserPayload, ILoginPayload, IUpdateUserPayload, IUserInitialState} from "../types";
import {createUser, login, verifyUser, logout, updateUser} from '../utils/apiUsers';

const initialState: IUserInitialState  = {
    user: {
        name: '',
        email: ''
    },
    status: 'idle',
    error: null,
    isEditProfile: false,
    isLoggedIn: false,
}
const profileSlice = createSlice({
    name: 'editProfile',
    initialState,
    reducers: {
        setEditProfileTrue(state){
            state.isEditProfile = true
        },
        setEditProfileFalse(state){
            state.isEditProfile = false
        },
        setIsLoggedInTrue(state) {
            state.isLoggedIn= true;
        },
        setIsLoggedInFalse(state) {
            state.isLoggedIn = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createNewUser.pending, (state, action)=> {
            state.status = 'loading';
            })
            .addCase(createNewUser.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(createNewUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logIn.pending, (state, action)=> {
                state.status = 'loading';
            })
            .addCase(logIn.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.error = null;
                state.isLoggedIn = true;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(checkUser.pending, (state, action)=> {
                state.status = 'loading';
            })
            .addCase(checkUser.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.isLoggedIn = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logOut.pending, (state, action)=> {
                state.status = 'loading';
            })
            .addCase(logOut.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.isLoggedIn = false;
                state.error = null;
                state.user = initialState.user;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserProfile.pending, (state, action)=> {
                state.status = 'loading';
            })
            .addCase(updateUserProfile.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.user = {name: action.payload.name, email: action.payload.email};
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})
export const createNewUser = createAsyncThunk('user/createUser',  async(values: ICreateUserPayload)=> {
    return createUser(values);
});

export const logIn = createAsyncThunk('user/login', async(values: ILoginPayload) => {
    return login(values);
});

export const checkUser = createAsyncThunk('user/verifyUser', async ()=> {
    return verifyUser();
});


export const logOut = createAsyncThunk('user/logout', async ()=>{
   return logout();
});

export const updateUserProfile = createAsyncThunk('user/updateUser', async (values: IUpdateUserPayload)=> {
    return updateUser(values)
})
export const {setEditProfileTrue, setEditProfileFalse,setIsLoggedInFalse, setIsLoggedInTrue} = profileSlice.actions;

export default profileSlice.reducer
