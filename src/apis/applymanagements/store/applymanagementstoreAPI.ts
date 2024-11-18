import  axios from "axios";
import {IPageresponse} from "../../../types/ipageresponse.ts";
import {Istore} from "../../../types/istore.ts";

const host = 'http://localhost:8080/api/applyManagements/store'

export const getStoreApplyList = async (page?:number, size?:number): Promise<IPageresponse<Istore>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getStoreApplyDetail = async (storeNo:number): Promise<Istore> => {
    const result = await axios.get(`${host}/read/${storeNo}`);
    return result.data;
}

export const updateStoreApprovalStatus = async (storeNo: number, storeApprovalStatus:string): Promise<void> => {
    await axios.put(`${host}/modify`, {
        storeNo,
        storeApprovalStatus,
    });
}