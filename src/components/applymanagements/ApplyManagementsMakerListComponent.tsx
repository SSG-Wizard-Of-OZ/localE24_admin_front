import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageResponse } from "../../types/ipageresponse.ts";
import { IMaker } from "../../types/maker/maker.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";
import {getApplyMakerList} from "../../apis/applymanagements/maker/applymanagementmakerAPI.ts";

const initialState: IPageResponse<IMaker> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    current: 1,
    totalPage: 0,
};

const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

function ApplyManagementsMakerListComponent() {
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse<IMaker>>(initialState);

    const navigate = useNavigate();

    const queryStr = createSearchParams({page:String(page),size:String(size)})

    const moveToRead = (makerBizNo: string | undefined) => {
        navigate({
            pathname: `/applyManagements/maker/read/${makerBizNo}`,
            search: `${queryStr}`,
        });
    };

    useEffect(() => {
        setLoading(true);
        getApplyMakerList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 600);
        });
    }, [page, size]);

    const listLI = pageResponse.dtoList.map((maker: IMaker) => {
        const { makerBizNo, makerName, modDate, makerStatus } = maker;

        const formattedDate = modDate ? formatter.format(new Date(modDate)) : "날짜 없음";

        // makerStatus 따른 배경 색상 설정
        const statusBgColor =
            makerStatus === "PENDING" ? "bg-purple-200" :
                makerStatus === "ACCEPTED" ? "bg-green-200" :
                    "bg-red-200";

        return (
            <li
                key={makerBizNo}
                className="grid grid-cols-4 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={() => moveToRead(makerBizNo)}
            >
                <span className="text-gray-900 dark:text-gray-300">{makerBizNo}</span>
                <span className="text-gray-900 dark:text-gray-300">{makerName}</span>
                <span className="text-gray-900 dark:text-gray-300">{formattedDate}</span>
                <span className="flex justify-center">
                <button
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight transition ease-in-out duration-200 rounded-full ${statusBgColor}`}
                >
                    <span className="relative">{makerStatus}</span>
                </button>
            </span>
            </li>
        );
    });



    return (
        <div className="py-8">
            {loading && <LoadingComponent></LoadingComponent>}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-4 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >
                            <span>사업자 번호</span>
                            <span>제작자명</span>
                            <span>등록 날짜</span>
                            <span className="text-center">Status</span>
                        </div>
                        <ul>
                            {listLI}
                        </ul>
                    </div>
                </div>
            </div>
            <PageComponent pageResponse={pageResponse}></PageComponent>
        </div>
    );
}

export default ApplyManagementsMakerListComponent;
