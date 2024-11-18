import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";


const Loading = <LoadingPage></LoadingPage>


const EventLocationsIndex = lazy(() => import("../pages/eventlocations/EventLocationsIndex.tsx"))
const EventLocationsListPage = lazy(() => import("../pages/eventlocations/EventLocationsListPage.tsx"))
const EventLocationsReadPage = lazy(() => import("../pages/eventlocations/EventLocationsReadPage.tsx"))

const eventLocationsRouter = {
    path: "/eventLocations",
    element: <Suspense fallback={Loading}><EventLocationsIndex /></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}></Navigate>
        },
        {
            path: "list" ,
            element: <Suspense fallback={Loading}><EventLocationsListPage /></Suspense>
        },
        {
            path: "read/:storeNo" ,
            element: <Suspense fallback={Loading}><EventLocationsReadPage /></Suspense>
        }
    ]

}

export default eventLocationsRouter;