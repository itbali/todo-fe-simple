import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import CssBaseline from '@mui/material/CssBaseline';
import {router} from "./components/router/routes.tsx";
import {RouterProvider} from "react-router-dom";
import {SnackbarProvider} from "notistack";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CssBaseline />
        <SnackbarProvider />
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
