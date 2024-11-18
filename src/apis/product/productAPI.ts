import {IPageResponse} from "../../types/ipageresponse.ts";
import {IProduct} from "../../types/iproduct.ts";
import jwtAxios from "../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/product';

export const getProductList = async (page?:number, size?:number): Promise<IPageResponse<IProduct>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)

    return res.data;
}

export const getProductOne = async (productNo:number): Promise<IProduct> => {

    const res = await jwtAxios.get(`${host}/read/${productNo}`);

    return res.data;
}

// 상품 검색
export const searchProduct = async (page?:number, size?:number, productName?: string, startDate ?:string, endDate ?: string ): Promise<IPageResponse<IProduct>> => {

    const params = {page: String(page), size: String(size), productName, startDate, endDate}

    const res = await jwtAxios.get(`${host}/search`, {params})
    return res.data;
}