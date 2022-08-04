import {createSlice} from "@reduxjs/toolkit";
import {IAppSliceInitialState} from "../types";

const initialState: IAppSliceInitialState = {
    isLoading: false,
    showError: false,
    isUserChecked: false,
    error: ''
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
        }
    }
})

export const {setIsLoadingFalse, setIsLoadingTrue, setShowErrorFalse, setShowErrorTrue,
setIsUserCheckedTrue, setIsUserCheckedFalse} = appSlice.actions;
export default appSlice.reducer;
