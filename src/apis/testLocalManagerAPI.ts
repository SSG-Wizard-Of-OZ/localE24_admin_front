import {IPageresponse} from "../types/ipageresponse.ts";
import  axios from "axios";
import {Ilocalmanager} from "../types/ilocalmanager.ts";


const host = 'http://10.10.10.31:8085/api/localmanager'

export const getLocalManagerList = async (page?:number, size?:number): Promise<IPageresponse<Ilocalmanager>> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const result = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return result.data
}

export const deleteLocalManager = async (managerNo: number): Promise<{result:string}> => {
    const result = await axios.delete(`${host}/${managerNo}`)

    return result.data
}