import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import "react-alice-carousel/lib/alice-carousel.css";

import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import {BrowserRouter} from "react-router-dom"
const container = document.getElementById('root');
const root = createRoot(container);


const persistedStore = persistStore(store)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<h2>Loading...</h2>} persistor={persistedStore}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
