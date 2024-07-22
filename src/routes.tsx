import {createBrowserRouter} from "react-router-dom";
import ScoreBoard from "./components/scoreboard/ScoreBoard.tsx";
import AdminPage from "./components/admin/AdminPage.tsx";
import React from "react";
import Revelator from "./components/scoreboard/Revelator.tsx";
import JudgePage from "./components/admin/JudgePage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ScoreBoard />
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
        path: '/judgee',
        element: <JudgePage />
    }
])

export default router;