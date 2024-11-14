import BasicLayout from "../layouts/MainLayout.tsx";
import CheckAuth from "../components/common/CheckAuth.tsx";

function AdminMainPage() {
    return (
        <CheckAuth>
            <BasicLayout>
                <div>

                </div>
            </BasicLayout>
        </CheckAuth>
    );
}

export default AdminMainPage;