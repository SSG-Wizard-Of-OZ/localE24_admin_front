import {IPageResponse} from "../../../types/ipageresponse.ts";
import {Ievent} from "../../../types/ievent.ts";
import jwtAxios from "../../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/applyManagements/event'

export const getEventApplyList = async (page?:number, size?:number): Promise<IPageResponse<Ievent>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getEventApplyDetail = async (eventNo:number): Promise<Ievent> => {
    const result = await jwtAxios.get(`${host}/read/${eventNo}`);
    return result.data;
}

export const updateEventApprovalStatus = async (eventNo: number, approvalStatus:string): Promise<void> => {
    await jwtAxios.put(`${host}/modify`, {
        eventNo,
        approvalStatus,
    });
}