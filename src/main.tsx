import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminLogin from './components/admin/AdminLogin.tsx'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import ScoreBoard from "./components/scoreboard/ScoreBoard.tsx";
import {Provider} from "react-redux";
import store from './utils/store/store.ts'
import { persistor } from './utils/store/store.ts'
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ScoreBoard />
    },
    {
        path: '/admin',
        element: <AdminLogin />
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <RouterProvider router={router} />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
