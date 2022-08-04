import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store, } from "./store/store";
import {checkUser} from "./store/profileSlice";
import {setIsUserCheckedTrue} from "./store/appSlice";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkUser()).unwrap().then(() => {
    store.dispatch(setIsUserCheckedTrue())
}).catch((err) => {
    store.dispatch(setIsUserCheckedTrue());
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

