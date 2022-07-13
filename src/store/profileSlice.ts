import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IEditProfile} from "../types";

const initialState: IEditProfile  = {
    isEditProfile: false
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
        }

    }
})

export const {setEditProfileTrue, setEditProfileFalse} = profileSlice.actions;

export default profileSlice.reducer
