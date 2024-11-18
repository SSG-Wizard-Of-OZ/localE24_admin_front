import {IPageResponse} from "../../types/ipageresponse.ts";
import {Ievent} from "../../types/ievent.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/event'

export const getEventList = async (page?:number, size?:number): Promise<IPageResponse<Ievent>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getEventDetail = async (eventNo:number): Promise<Ievent> => {
    const result = await jwtAxios.get(`${host}/read/${eventNo}`);
    return result.data;
}

export const searchEventList = async (page?:number, size?:number,
                                      eventName?:string,
                                      eventStart?: string,
                                      eventEnd?: string,
                                      eventStatus?: string,
                                      spaceRentStatus?: boolean) : Promise<IPageResponse<Ievent>> => {

    const params = {page: String(page), size: String(size), eventName, eventStart, eventEnd, eventStatus, spaceRentStatus}

    const res = await jwtAxios.get(`${host}/search`, {params})
    return res.data;
}
