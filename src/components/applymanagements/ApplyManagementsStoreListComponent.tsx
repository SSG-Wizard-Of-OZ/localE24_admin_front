import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {IPageresponse} from "../../types/ipageresponse.ts";
import {Istore} from "../../types/istore.ts";
import {useEffect, useState} from "react";
import {getStoreApplyList} from "../../apis/applymanagements/store/applymanagementstoreAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";

const initialState: IPageresponse<Istore> = {
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

function ApplyManagementsStoreListComponent() {
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageresponse<Istore>>(initialState);
    const navigate = useNavigate();
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    useEffect(() => {
        setLoading(true);
        getStoreApplyList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const moveToRead = (storeNo: number | undefined) => {
        navigate({
            pathname: `/applyManagements/store/read/${storeNo}`,
            search: `${queryStr}`,
        });
    };

    const ListLI =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((store: Istore) => {
                const { storeNo, storeName, managerName, storeContact, isRentAvailable, storeApprovalStatus } = store;
                // storeApprovalStatus에 따른 배경 색상 설정
                const statusBgColor =
                    storeApprovalStatus === "PENDING" ? "bg-purple-200" :
                        storeApprovalStatus === "ACCEPTED" ? "bg-green-200" :
                            "bg-red-200";
                return (
                    <li
                        key={storeNo}
                        className="grid grid-cols-5 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => moveToRead(storeNo)}
                    >
                        <span className="text-gray-900 dark:text-gray-300">{storeName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{managerName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{storeContact}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                        {isRentAvailable ? "가능" : "불가능"}</span>
                        <span className="flex-1 flex justify-center">
                <button
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight transition ease-in-out duration-200 rounded-full ${statusBgColor}`}
                >
                    <span className="relative">{storeApprovalStatus}</span>
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
                        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                            <span>지점명</span>
                            <span>지역담당자 이름</span>
                            <span>지점 연락처</span>
                            <span>공간 대여 가능여부</span>
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

export default ApplyManagementsStoreListComponent;