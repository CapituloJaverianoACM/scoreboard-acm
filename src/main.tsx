import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import {Provider} from "react-redux";
import store from './utils/store/store.ts'
import { persistor } from './utils/store/store.ts'
import { PersistGate } from "redux-persist/integration/react";
import router from "./routes.tsx";
import Template from "./components/landing/Template.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Template>
                <RouterProvider router={router} />
            </Template>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
)
