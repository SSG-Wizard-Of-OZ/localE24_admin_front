import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const AppliersIndex = lazy(() => import("../pages/appliers/AppliersIndex.tsx"))
const AppliersListPage = lazy(() => import("../pages/appliers/AppliersListPage.tsx"))
const AppliersReadPage = lazy(() => import("../pages/appliers/AppliersReadPage.tsx"))

const appliersRouter = {
    path: "/appliers",
    element: <Suspense fallback={Loading}><AppliersIndex /></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}></Navigate>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><AppliersListPage /></Suspense>
        },
        {
            path: "read",
            element: <Suspense fallback={Loading}><AppliersReadPage /></Suspense>
        }
    ]
}

export default appliersRouter;