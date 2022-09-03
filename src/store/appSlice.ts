import {createSlice} from "@reduxjs/toolkit";
import {IAppSliceInitialState} from "../types";

const initialState: IAppSliceInitialState = {
    isLoading: false,
    showError: false,
    isUserChecked: false,
    showCancelSL: false,
    showMobileSL: false,
    error: null,
    appStatus: 'idle'
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoadingTrue(state) {
            state.isLoading = true;
        },
        setIsLoadingFalse(state) {
            state.isLoading = false;
        },
        setShowErrorTrue(state, action) {
            state.showError = true;
            state.error = action.payload;
        },
        setShowErrorFalse(state) {
            state.showError = false;
            state.error = '';
        },
        setIsUserCheckedTrue(state) {
            state.isUserChecked = true;
        },
        setIsUserCheckedFalse(state) {
            state.isUserChecked = false;
        },
        onLogin(state) {
            state.appStatus = 'notIdle';
            state.isUserChecked = true;
        },
        onLogout(state) {
            state.showError = false;
            state.isUserChecked = false;
            state.error = null;
            state.appStatus = 'idle'
        },
        setShowCancelSLTrue(state) {
            state.showCancelSL = true;
        },
        setShowCancelSLFalse(state){
            state.showCancelSL = false;
        },
        setShowMobileSLTrue (state) {
            state.showMobileSL = true;
        },
        setShowMobileSLFalse(state) {
            state.showMobileSL = false;
        }
    }
})

export const {
    setIsLoadingFalse, setIsLoadingTrue, setShowErrorFalse, setShowErrorTrue,
    setIsUserCheckedTrue, setIsUserCheckedFalse, setShowMobileSLFalse, onLogout, setShowMobileSLTrue, onLogin, setShowCancelSLFalse,
    setShowCancelSLTrue
} = appSlice.actions;
export default appSlice.reducer;
