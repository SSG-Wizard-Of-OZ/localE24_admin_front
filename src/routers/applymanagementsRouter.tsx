import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";
import {Navigate} from "react-router-dom";


const Loading = <LoadingPage></LoadingPage>

const ApplyManagementsIndex = lazy(() => import("../pages/applymanagements/ApplyManagementsIndex"));
const ApplyManagementsEventListPage = lazy(() => import("../pages/applymanagements/ApplyManagementsEventListPage.tsx"));
const ApplyManagementsEventReadPage = lazy(() => import("../pages/applymanagements/ApplyManagementsEventReadPage.tsx"));
const ApplyManagementsProductListPage = lazy(() => import("../pages/applymanagements/ApplyManagementsProductListPage"));
const ApplyManagementsProductReadPage = lazy(() => import("../pages/applymanagements/ApplyManagementsProductReadPage"));
const ApplyManagementsProducerListPage = lazy(() => import("../pages/applymanagements/ApplyManagementsProducerListPage"));
const ApplyManagementsProducerReadPage = lazy(() => import("../pages/applymanagements/ApplyManagementsProducerReadPage"));
const ApplyManagementsStoreListPage = lazy(() => import("../pages/applymanagements/ApplyManagementsStoreListPage"));
const ApplyManagementsStoreReadPage = lazy(() => import("../pages/applymanagements/ApplyManagementsStoreReadPage"));


const applymanagementsRouter ={
    path: '/applyManagements',
    element: <Suspense fallback={Loading}><ApplyManagementsIndex/></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="/applyManagements/event/list" replace={true}></Navigate>
        },
        {
            path: "event/list",
            element: <Suspense fallback={Loading}><ApplyManagementsEventListPage/></Suspense>
        },
        {
            path: "event/read/:eventNo",
            element: <Suspense fallback={Loading}><ApplyManagementsEventReadPage/></Suspense>
        },
        {
            path: "product/list",
            element: <Suspense fallback={Loading}><ApplyManagementsProductListPage/></Suspense>
        },
        {
            path: "product/read",
            element: <Suspense fallback={Loading}><ApplyManagementsProductReadPage/></Suspense>
        },
        {
            path: "producer/list",
            element: <Suspense fallback={Loading}><ApplyManagementsProducerListPage/></Suspense>
        },
        {
            path: "producer/read",
            element: <Suspense fallback={Loading}><ApplyManagementsProducerReadPage/></Suspense>
        },
        {
            path: "store/list",
            element: <Suspense fallback={Loading}><ApplyManagementsStoreListPage/></Suspense>
        },
        {
            path: "store/read/:storeNo",
            element: <Suspense fallback={Loading}><ApplyManagementsStoreReadPage/></Suspense>
        }

    ]
}


export default applymanagementsRouter