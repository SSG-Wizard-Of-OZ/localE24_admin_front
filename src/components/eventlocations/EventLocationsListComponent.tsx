import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { Istore } from "../../types/istore.ts";
import { IPageresponse } from "../../types/ipageresponse.ts";
import { useEffect, useState } from "react";
import {getStoreList, searchStoreList} from "../../apis/store/storeAPI.ts";
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

function EventLocationsListComponent() {
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageresponse<Istore>>(initialState);
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState<string>("");
    const [isRentAvailable, setIsRentAvailable] = useState<boolean>(false);
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    useEffect(() => {
        setLoading(true);
        getStoreList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const handleSearch = () => {
        setLoading(true);
        searchStoreList(page, size, storeName, isRentAvailable).then((data) => {
            setPageResponse(data);
            setLoading(false);
        });
    };

    const moveToRead = (storeNo: number | undefined) => {
        navigate({
            pathname: `/eventLocations/read/${storeNo}`,
            search: `${queryStr}`,
        });
    };

    const ListLI =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((store: Istore) => {
                const { storeNo, storeName, managerName, storeContact, isRentAvailable } = store;

                return (
                    <li
                        key={storeNo}
                        className="grid grid-cols-4 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => moveToRead(storeNo)}
                    >
                        <span className="text-gray-900 dark:text-gray-300">{storeName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{managerName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{storeContact}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                        {isRentAvailable ? "가능" : "불가능"}
                    </span></li>
                );
            })
        ) : (
            <div>데이터가 없습니다.</div>
        );

    return (
        <div className="py-8">
            {loading && <LoadingComponent/>}
            <div className="max-w-full mx-auto mb-6 p-4 rounded-lg flex justify-between">
                <div className="flex items-end space-x-4 p-4 rounded-lg">
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">지점명</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="지점명을 입력하세요"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">공간 대여 가능여부</label>
                        <input
                            type="checkbox"
                            checked={isRentAvailable}
                            onChange={(e) => setIsRentAvailable(e.target.checked)}
                            className="h-4 w-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        className="h-10 px-6 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 self-end"
                        onClick={handleSearch}
                    >
                        검색
                    </button>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-4 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                            <span>지점명</span>
                            <span>지역담당자 이름</span>
                            <span>지점 연락처</span>
                            <span>공간 대여 가능여부</span>
                        </div>
                        <ul>{ListLI}</ul>
                    </div>
                </div>
            </div>
            <PageComponent pageResponse={pageResponse}/>
        </div>
    );
}

export default EventLocationsListComponent;
