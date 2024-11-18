import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const EventManagementIndex = lazy(() => import("../pages/eventmanagements/EventManagementIndex"))
const EventManagementListPage = lazy(() => import("../pages/eventmanagements/EventManagementListPage"))
const EventManagementReadPage = lazy(() => import("../pages/eventmanagements/EventManagementReadPage"))

const eventManagementsRouter = {
    path: "/eventManagements",
    element: <Suspense fallback={Loading}><EventManagementIndex/></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}></Navigate>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><EventManagementListPage/></Suspense>
        },
        {
            path: "read/:eventNo",
            element: <Suspense fallback={Loading}><EventManagementReadPage/></Suspense>
        }
    ]
}

export default eventManagementsRouter;