import {createBrowserRouter} from "react-router-dom";
import AdminPage from "./components/admin/AdminPage.tsx";
import React from "react";
import Revelator from "./components/scoreboard/Revelator.tsx";
import Landing from "./components/landing/Landing.tsx";
import ScoreBoard from "./components/scoreboard/ScoreBoard.tsx";
import JudgePage from "./components/admin/JudgePage.tsx";
import CreateContest from "./components/contest/CreateContest.tsx";
import RoutesGuard from "./utils/middleware/RoutesGuard.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Landing />
    },
    {
        path: '/revelator',
        element: <RoutesGuard outlet={<Revelator />}/>
    },
    {
        path: '/scoreboard',
        element: <RoutesGuard outlet={<ScoreBoard />} />
    },
    {
        path: '/create',
        element: <CreateContest />
    },
    {
        path: '/judge',
        element: <RoutesGuard outlet={<JudgePage />} />
    }
])

export default router;