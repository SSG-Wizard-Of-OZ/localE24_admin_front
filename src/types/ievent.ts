export interface Ievent {
    eventNo?: number;
    makerBizNo?: string;
    storeNo?: number;
    makerName?: string;
    storeName?: string;
    eventName?: string;
    eventStart?: Date;
    eventEnd?: Date;
    eventStatus?: string;
    spaceRentStatus?: boolean;
    approvalStatus?: string;

    delFlag?: boolean;
    regDate?: Date;
    modDate?: Date;
    creator?: string;

    productImages?: { [productNo: string]: string[] }; // productNo를 키로 하는 이미지 배열
}