
export interface IMaker {
    makerBizNo: string;
    makerName?: string;
    makerEmail?: string;
    makerPhone?: string;
    makerPostnum?: string;
    makerAddr?: string;
    makerAddrDetail?: string;

    makerStatus?: string;

    attachFileNames?: string[];

    delFlag?: boolean;
    regDate?: Date;
    modDate?: Date;

    creator?: string;

    startDate ?: Date;
    endDate ?: Date;
}
