
export interface IProduct {
    productNo ?: number,
    productName ?: string,
    productDescription ?: string,
    productStatus ?:number,

    makerName ?: string,

    categoryNo ?: number,

    categoriesNo ?: number[],
    categoriesName ?: string[],

    attachFileNames ?: string[],

    delFlag?: boolean;
    regDate?: Date;
    modDate?: Date;

    creator?: string;


}