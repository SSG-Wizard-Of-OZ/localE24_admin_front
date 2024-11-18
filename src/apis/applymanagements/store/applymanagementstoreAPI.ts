import {IPageResponse} from "../../../types/ipageresponse.ts";
import {Istore} from "../../../types/istore.ts";
import jwtAxios from "../../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/applyManagements/store'

export const getStoreApplyList = async (page?:number, size?:number): Promise<IPageResponse<Istore>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getStoreApplyDetail = async (storeNo:number): Promise<Istore> => {
    const result = await jwtAxios.get(`${host}/read/${storeNo}`);
    return result.data;
}

export const updateStoreApprovalStatus = async (storeNo: number, storeApprovalStatus:string): Promise<void> => {
    await jwtAxios.put(`${host}/modify`, {
        storeNo,
        storeApprovalStatus,
    });
}