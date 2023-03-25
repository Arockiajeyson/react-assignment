import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './_store';
import { App } from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
// setup fake backend
// import { fakeBackend } from './_helpers';
// fakeBackend();

const container = document.getElementById('root');
const root = createRoot(container);
let persistor = persistStore(store)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
