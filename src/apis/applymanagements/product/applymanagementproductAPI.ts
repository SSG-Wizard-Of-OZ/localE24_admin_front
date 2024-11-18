import {IPageResponse} from "../../../types/ipageresponse.ts";
import {IProduct} from "../../../types/iproduct.ts";
import jwtAxios from "../../../util/jwtUtil.ts";

const host = 'http://10.10.10.177:8080/api/applyManagements/product';

// 상품 리스트
export const getApplyProductList = async ( page?:number, size?:number):Promise<IPageResponse<IProduct>> => {

    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await jwtAxios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`);

    return res.data;
}

// 상품 상세 조회
export const getApplyProductOne = async (productNo : number): Promise<IProduct> => {

    const res = await jwtAxios.get(`${host}/read/${productNo}`);

    return res.data;
}

// 상품 승인 상태 변경
export const updateProductStatus = async (productNo: number, productStatus:string): Promise<void> => {
    await jwtAxios.put(`${host}/modify`, {
        productNo,
        productStatus,
    });
}
