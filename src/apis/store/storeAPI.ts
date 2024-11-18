import {Istore} from "../../types/istore.ts";
import {IPageResponse} from "../../types/ipageresponse.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/store'

export const getStoreList = async (page?:number, size?:number): Promise<IPageResponse<Istore>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const getStoreDetail = async (storeNo:number): Promise<Istore> => {
    const result = await jwtAxios.get(`${host}/read/${storeNo}`);
    return result.data;
}

export const searchStoreList = async (page?:number, size?:number, storeName ?: string, isRentAvailable ?: boolean) : Promise<IPageResponse<Istore>> => {

    const params = {page: String(page), size: String(size), storeName, isRentAvailable}

    const res = await jwtAxios.get(`${host}/search`, {params})
    return res.data;
}