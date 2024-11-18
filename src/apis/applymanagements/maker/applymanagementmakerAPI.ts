import {IPageResponse} from "../../../types/ipageresponse.ts";
import {IMaker} from "../../../types/maker/maker.ts";
import jwtAxios from "../../../util/jwtUtil.ts";


const host = 'http://10.10.10.177:8080/api/applyManagements/maker';

export const getApplyMakerList = async ( page?:number, size?:number):Promise<IPageResponse<IMaker>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`);

    return res.data;
}

// 제작자 상세조회
export const getApplyMakerOne = async (makerBizNo : string): Promise<IMaker> => {

    const res = await jwtAxios.get(`${host}/read/${makerBizNo}`);

    return res.data;
}


// 제작자 상태 변경
export const updateMakerStatus = async (makerBizNo: string, makerStatus:string): Promise<void> => {
    await jwtAxios.put(`${host}/modify`, {
        makerBizNo,
        makerStatus,
    });
}
