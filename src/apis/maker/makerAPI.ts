import {IPageResponse} from "../../types/ipageresponse.ts";
import {IMaker} from "../../types/maker/maker.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/maker';

// 제작자 리스트
export const getMakerList = async ( page?:number, size?:number ):Promise<IPageResponse<IMaker>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)

    return res.data;
}

// 제작자 상세조회
export const getMakerOne = async (makerBizNo : string): Promise<IMaker> => {

    const res = await jwtAxios.get(`${host}/read/${makerBizNo}`);

    return res.data;
}

// 제작자 검색
export const searchMakerList = async (page?:number, size?:number, makerName ?: string, startDate ?: string, endDate ?: string) : Promise<IPageResponse<IMaker>> => {

    const params = {page: String(page), size: String(size), makerName, startDate, endDate}

    const res = await jwtAxios.get(`${host}/search`, {params})
    return res.data;
}

