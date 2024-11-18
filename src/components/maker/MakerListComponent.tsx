import { useEffect, useState } from "react";
import { IPageResponse } from "../../types/ipageresponse.ts";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import { getMakerList, searchMakerList } from "../../apis/maker/makerAPI.ts";
import { IMaker } from "../../types/maker/maker.ts";
import PageComponent from "../common/PageComponent.tsx";
import LoadingComponent from "../common/LoadingComponent.tsx";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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

const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

function MakerListComponent() {
    const [query] = useSearchParams();
    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse<IMaker>>(initialState);
    const [makerName, setMakerName] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const navigate = useNavigate();

    const queryStr = createSearchParams({page:String(page),size:String(size)})

    const moveToRead = (makerBizNo: string | undefined) => {
        navigate({
            pathname: `/maker/read/${makerBizNo}`,
            search:`${queryStr}`
        })
    }

    useEffect(() => {
        setLoading(true);
        getMakerList(page, size).then((data) => {
            setPageResponse(data);
            setLoading(false);
        });
    }, [page, size]);

    const handleSearch = () => {
        // 시작 날짜가 선택된 경우, ISO 문자열로 변환하여 'Z'를 제거하고 formattedStartDate 저장
        const formattedStartDate = startDate ? startDate.toISOString().slice(0, -1) : undefined;

        // 종료 날짜가 선택된 경우, 하루를 추가한 후 ISO 문자열로 변환하여 'Z'를 제거하고 formattedEndDate 저장
        // 하루를 더하는 이유는 검색 시 종료 날짜를 포함하도록 하기 위함
        const formattedEndDate = endDate ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, -1) : undefined;

        setLoading(true);

        // 검색 API 호출: 페이지, 사이즈, 제작자명, 시작 날짜, 종료 날짜를 파라미터로 전달
        searchMakerList(page, size, makerName, formattedStartDate, formattedEndDate).then((data) => {
            setPageResponse(data);
            setLoading(false);
        });
    };


    const makerListLI = pageResponse.dtoList.map((maker: IMaker) => {
        const { makerBizNo, makerName, regDate, modDate } = maker;
        const formatRegDate = regDate ? formatter.format(new Date(regDate)) : "날짜 없음";

        const formatModDate = modDate ? formatter.format(new Date(modDate)) : "날짜 없음";


        return (
            <li
                key={makerBizNo}
                className="grid grid-cols-4 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={() => moveToRead(makerBizNo)}
            >
                <span>{makerBizNo}</span>
                <span>{makerName}</span>
                <span>{formatRegDate}</span>
                <span>{formatModDate}</span>
            </li>
        );
    });

    return (
        <div className="py-8 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-full mx-auto mb-6 p-4 rounded-lg flex justify-center">
                <div className="flex items-end space-x-4 p-4 rounded-lg">
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">제작자명</label>
                        <input
                            type="text"
                            value={makerName}
                            onChange={(e) => setMakerName(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="제작자명을 입력하세요"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">등록일</label>
                        <div className="flex items-center space-x-2">
                            <DatePicker
                                selected={startDate || undefined}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate || undefined}
                                endDate={endDate || undefined}
                                dateFormat="yyyy-MM-dd"
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="시작 날짜"
                            />
                            <span className="text-gray-500">-</span>
                            <DatePicker
                                selected={endDate || undefined}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate || undefined}
                                endDate={endDate || undefined}
                                dateFormat="yyyy-MM-dd"
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="끝 날짜"
                            />
                        </div>
                    </div>
                    <button
                        className="h-10 px-6 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 self-end"
                        onClick={handleSearch}
                    >
                        검색
                    </button>
                </div>
            </div>

            {loading ? <LoadingComponent /> : (
                <div className="max-w-full mx-auto bg-white shadow rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                        <span>사업자 번호</span>
                        <span>제작자명</span>
                        <span>신청 날짜</span>
                        <span>등록 날짜</span>
                    </div>
                    <ul>{makerListLI}</ul>
                </div>
            )}

            <div className="mt-6 max-w-full mx-auto">
                <PageComponent pageResponse={pageResponse} />
            </div>
        </div>
    );
}

export default MakerListComponent;
