import axios from "axios";
import {IPageResponse} from "../../types/ipageresponse.ts";
import {IProduct} from "../../types/iproduct.ts";

const host = 'http://localhost:8080/api/product';

export const getProductList = async (page?:number, size?:number): Promise<IPageResponse<IProduct>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)

    return res.data;
}

export const getProductOne = async (productNo:number): Promise<IProduct> => {

    const res = await axios.get(`${host}/read/${productNo}`);

    return res.data;
}

// 상품 검색
export const searchProduct = async (page?:number, size?:number, productName?: string, startDate ?:string, endDate ?: string ): Promise<IPageResponse<IProduct>> => {

    const params = {page: String(page), size: String(size), productName, startDate, endDate}

    const res = await axios.get(`${host}/search`, {params})
    return res.data;
}