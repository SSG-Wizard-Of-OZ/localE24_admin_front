import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import localManagersRouter from "./localManagersRouter.tsx";
import eventManagementsRouter from "./eventManagementsRouter.tsx";
import eventLocationsRouter from "./eventLocationsRouter.tsx";
import applymanagementsRouter from "./applymanagementsRouter.tsx";
import productRouter from "./productRouter.tsx";
import makerRouter from "./makerRouter.tsx";

const LoadingPage = lazy(() => import("../pages/LoadingPage.tsx"))

const AdminMainPage = lazy(() => import("../pages/AdminMainPage.tsx"))
const AdminLoginPage = lazy(() => import("../pages/AdminLoginPage.tsx"))


export const Loading = <LoadingPage></LoadingPage>

const adminMainRouter = createBrowserRouter([
    {
        path: "/main",
        element: <Suspense fallback={Loading}><AdminMainPage /></Suspense>
    },
    {
        path: "/",
        element: <Navigate to="login" replace={true}></Navigate>
    },
    {
        path: "/login",
        element: <Suspense fallback={Loading}><AdminLoginPage/></Suspense>
    },
    localManagersRouter,
    eventManagementsRouter,
    makerRouter,
    eventLocationsRouter,
    applymanagementsRouter,
    productRouter

])

export default adminMainRouter