import  axios from "axios";
import {IPageresponse} from "../../../types/ipageresponse.ts";
import {Ievent} from "../../../types/ievent.ts";

const host = 'http://localhost:8080/api/applyManagements/event'

export const getEventApplyList = async (page?:number, size?:number): Promise<IPageresponse<Ievent>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getEventApplyDetail = async (eventNo:number): Promise<Ievent> => {
    const result = await axios.get(`${host}/read/${eventNo}`);
    return result.data;
}

export const updateEventApprovalStatus = async (eventNo: number, approvalStatus:string): Promise<void> => {
    await axios.put(`${host}/modify`, {
        eventNo,
        approvalStatus,
    });
}