import {Outlet} from "react-router-dom";
import BasicLayout from "../../layouts/MainLayout.tsx";

function ProductIndex() {
    return (
        <BasicLayout>
            <div>
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    );
}

export default ProductIndex;