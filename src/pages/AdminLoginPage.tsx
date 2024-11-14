import SigninComponent from "../components/adminlogin/SigninComponent.tsx"
import useSignin from "../hooks/useSignin.ts";
import {Navigate} from "react-router-dom";

function AdminLoginPage() {

    const {adminlogin} = useSignin()

    if(adminlogin){
        return <Navigate to={'/main'} replace={true}></Navigate>
    }

    return (
        <div className='justify-center h-full'>
            <SigninComponent></SigninComponent>
        </div>

)
    ;
}

export default AdminLoginPage;