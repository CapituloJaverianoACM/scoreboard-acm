import {createBrowserRouter} from "react-router-dom";
import ScoreBoard from "./components/scoreboard/ScoreBoard.tsx";
import AdminPage from "./components/admin/AdminPage.tsx";
import React from "react";
import Revelator from "./components/scoreboard/Revelator.tsx";
import Landing from "./components/landing/Landing.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/admin',
        element: <AdminPage />
    },
    {
        path: '/revelator',
        element: <Revelator />
    },
    {
        path: '/scoreboard',
        element: <ScoreBoard />
    }
])

export default router;