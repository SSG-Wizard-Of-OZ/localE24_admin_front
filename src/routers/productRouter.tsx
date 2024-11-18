import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";
import LoadingPage from "../pages/LoadingPage.tsx";

const Loading = <LoadingPage></LoadingPage>

const ProductIndex = lazy(() => import("../pages/product/ProductIndex.tsx"))
const ProductistPage = lazy(() => import("../pages/product/ProductListPage.tsx"))
const ProductReadPage = lazy(() => import("../pages/product/ProductReadPage.tsx"))

const productRouter = {
    path: "/product",
    element: <Suspense fallback={Loading}><ProductIndex /></Suspense>,
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}></Navigate>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductistPage /></Suspense>
        },
        {
            path: "read/:productNo",
            element: <Suspense fallback={Loading}><ProductReadPage /></Suspense>
        }
    ]
}

export default productRouter;