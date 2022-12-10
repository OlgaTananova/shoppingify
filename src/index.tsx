import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
import { store } from './store/store';
import { checkUser } from './store/profileSlice';
import { onLogin, setIsUserCheckedTrue } from './store/appSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(checkUser()).unwrap().then(() => {
  store.dispatch(onLogin());
}).catch(() => {
  store.dispatch(setIsUserCheckedTrue());
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/shoppingify">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);