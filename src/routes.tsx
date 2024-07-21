import {createBrowserRouter} from "react-router-dom";
import AdminPage from "./components/admin/AdminPage.tsx";
import React from "react";
import Revelator from "./components/scoreboard/Revelator.tsx";
import Landing from "./components/landing/Landing.tsx";
import CreateContest from "./components/admin/CreateContest.tsx";
import ScoreBoard from "./components/scoreboard/ScoreBoard.tsx";

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
    },
    {
        path: '/create',
        element: <CreateContest />
    }
])

export default router;