import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {IPageresponse} from "../../types/ipageresponse.ts";
import {Ievent} from "../../types/ievent.ts";
import {useEffect, useState} from "react";
import {getEventApplyList} from "../../apis/applymanagements/event/applymanagementeventAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";

const initialState: IPageresponse<Ievent> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    current: 1,
    totalPage: 0
};

const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

function ApplyManagementsEventListComponent() {
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageresponse<Ievent>>(initialState);
    const navigate = useNavigate();
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    useEffect(() => {
        setLoading(true);
        getEventApplyList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const moveToRead = (eventNo: number | undefined) => {
        navigate({
            pathname: `/applyManagements/event/read/${eventNo}`,
            search: `${queryStr}`,
        });
    };

    const ListLI =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((event: Ievent) => {
                const { eventNo, eventName, makerName, storeName, spaceRentStatus, regDate, approvalStatus } = event;
                // eventApprovalStatus에 따른 배경 색상 설정
                const statusBgColor =
                    approvalStatus === "PENDING" ? "bg-purple-200" :
                        approvalStatus === "ACCEPTED" ? "bg-green-200" :
                            "bg-red-200";
                const formattedDate = regDate ? formatter.format(new Date(regDate)) : "날짜 없음";
                return (
                    <li
                        key={eventNo}
                        className="grid grid-cols-6 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => moveToRead(eventNo)}
                    >
                        <span className="text-gray-900 dark:text-gray-300">{eventName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{makerName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{storeName}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                        {spaceRentStatus ? "대여" : "미대여"}</span>
                        <span className="text-gray-900 dark:text-gray-300">{formattedDate}</span>
                        <span className="flex-1 flex justify-center">
                <button
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight transition ease-in-out duration-200 rounded-full ${statusBgColor}`}
                >
                    <span className="relative">{approvalStatus}</span>
                </button>
            </span>
                    </li>
                );
            })
        ) : (
            <div>데이터가 없습니다.</div>
        );

    return (
        <div className="py-8">
            {loading && <LoadingComponent/>}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div className="grid grid-cols-6 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                            <span>이벤트 이름</span>
                            <span>제작자 이름</span>
                            <span>지점 이름</span>
                            <span>공간 대여 여부</span>
                            <span>신청 날짜</span>
                            <span>승인 여부</span>
                        </div>
                        <ul>{ListLI}</ul>
                    </div>
                </div>
            </div>
            <PageComponent pageResponse={pageResponse} />
        </div>
    );
}

export default ApplyManagementsEventListComponent;