import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const MakerIndex = lazy(() => import("../pages/maker/MakerIndex.tsx"))
const MakerListPage = lazy(() => import("../pages/maker/MakerListPage.tsx"))
const MakerReadPage = lazy(() => import("../pages/maker/MakerReadPage.tsx"))

const appliersRouter = {
    path: "/maker",
    element: <Suspense fallback={Loading}><MakerIndex /></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}></Navigate>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><MakerListPage /></Suspense>
        },
        {
            path: "read/:makerBizNo",
            element: <Suspense fallback={Loading}><MakerReadPage /></Suspense>
        }
    ]
}

export default appliersRouter;