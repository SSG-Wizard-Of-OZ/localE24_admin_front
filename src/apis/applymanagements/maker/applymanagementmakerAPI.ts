import {IPageResponse} from "../../../types/ipageresponse.ts";
import {IMaker} from "../../../types/maker/maker.ts";
import axios from "axios";

const host = 'http://localhost:8080/api/applyManagements/maker';

export const getApplyMakerList = async ( page?:number, size?:number):Promise<IPageResponse<IMaker>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`);

    return res.data;
}

// 제작자 상세조회
export const getApplyMakerOne = async (makerBizNo : string): Promise<IMaker> => {

    const res = await axios.get(`${host}/read/${makerBizNo}`);

    return res.data;
}


// 제작자 상태 변경
export const updateMakerStatus = async (makerBizNo: string, makerStatus:string): Promise<void> => {
    await axios.put(`${host}/modify`, {
        makerBizNo,
        makerStatus,
    });
}
