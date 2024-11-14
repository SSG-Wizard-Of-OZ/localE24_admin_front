import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {Cookies} from "react-cookie";
import {refreshRequest} from "../apis/adminlogin/adminloginAPI.ts";

const cookies = new Cookies();

const jwtAxios = axios.create()

// 요청 보내기 전에 accessToken을 쿠키에서 꺼내서 헤더에 추가
const beforeReq = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig=> {

    const adminLoginCookie = cookies.get("adminlogin")

    if(!adminLoginCookie ) {
        throw new Error('AdminLogin Cookies are not founded.')
    }

    const cookieObject = adminLoginCookie;

    const accessToken = cookieObject.accessToken

    console.log("accessToken", accessToken)

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
}

const failReq = (error:any) => {
    console.log("fail request")
    return Promise.reject(error)
}

// 응답 처리 전에 accessToken 만료 여부를 확인
const beforeRes = async (res: AxiosResponse): Promise<AxiosResponse> => {
    console.log("before response")
    const data = res.data

    // accessToken 만료 여부 체크
    if (data.error && data.error === 'ERROR_ACCESS_TOKEN') {
        console.log("Access token has expired, trying to refresh...")

        const adminCookie = cookies.get("adminlogin")
        if (!adminCookie) {
            console.log("Admin login cookie is missing!")
            throw new Error("Admin login cookie is missing.")
        }

        const { accessToken, refreshToken } = adminCookie
        console.log("Current accessToken:", accessToken)
        console.log("Current refreshToken:", refreshToken)

        try {
            // refreshRequest를 통해 새로운 accessToken을 받아오는 부분
            const refreshResult = await refreshRequest(accessToken, refreshToken)

            if (refreshResult?.accessToken) {
                // 새로운 accessToken 및 refreshToken을 쿠키에 저장
                adminCookie.accessToken = refreshResult.accessToken
                adminCookie.refreshToken = refreshResult.refreshToken

                cookies.set("adminlogin", JSON.stringify(adminCookie), { path: "/", maxAge: (60 * 60 * 24 * 7) })
                console.log("Updated adminLogin Cookie:", adminCookie)

                // 원래 요청을 재시도
                const originalRequest = res.config
                originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`
                return await axios(originalRequest)
            } else {
                throw new Error("Failed to refresh tokens - no new accessToken received.")
            }
        } catch (error) {
            console.error("Failed to refresh tokens.", error)
            throw new Error("Failed to refresh access token.")
        }
    }

    return res
}

const failRes = (error: any) => {
    console.log("fail response", error);  // 에러 객체를 그대로 출력하여 디버깅

    if (error.response) {
        console.log("Error response:", JSON.stringify(error.response, null, 2));
    }
    if (error.message) {
        console.log("Error message:", error.message);
    }

    return Promise.reject({ response: { msg: error.message || JSON.stringify(error) } });
}



jwtAxios.interceptors.request.use(beforeReq, failReq)

jwtAxios.interceptors.response.use(beforeRes, failRes)


export default jwtAxios