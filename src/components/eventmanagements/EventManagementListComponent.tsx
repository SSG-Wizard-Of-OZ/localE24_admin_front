import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {IPageresponse} from "../../types/ipageresponse.ts";
import {Ievent} from "../../types/ievent.ts";
import {useEffect, useState} from "react";
import {getEventList, searchEventList} from "../../apis/event/eventAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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

function EventManagementListComponent() {
    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageresponse<Ievent>>(initialState);

    const [eventName, setEventName] = useState<string>("");
    const [eventStart, setEventStart] = useState<Date | null>(null);
    const [eventEnd, setEventEnd] = useState<Date | null>(null);
    const [eventStatus, setEventStatus] = useState<string>("");
    const [spaceRentStatus, setSpaceRentStatus] = useState<boolean>(false);

    const navigate = useNavigate();
    const queryStr = createSearchParams({ page: String(page), size: String(size) });

    useEffect(() => {
        setLoading(true);
        getEventList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const handleSearch = () => {
        // 시작 날짜가 선택된 경우, ISO 문자열로 변환하여 'Z'를 제거하고 formattedStartDate 저장
        const formattedEventStart = eventStart ? eventStart.toISOString().slice(0, -1) : undefined;

        // 종료 날짜가 선택된 경우, 하루를 추가한 후 ISO 문자열로 변환하여 'Z'를 제거하고 formattedEndDate 저장
        // 하루를 더하는 이유는 검색 시 종료 날짜를 포함하도록 하기 위함
        const formattedEventEnd = eventEnd ? new Date(eventEnd.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, -1) : undefined;

        setLoading(true);
        searchEventList(page, size,
            eventName, formattedEventStart, formattedEventEnd,
            eventStatus, spaceRentStatus).then((data) => {
                setPageResponse(data);
                setLoading(false);
        });
    };

    const moveToRead = (eventNo: number | undefined) => {
        navigate({
            pathname: `/eventManagements/read/${eventNo}`,
            search: `${queryStr}`,
        });
    };

    const ListLI =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((event: Ievent) => {
                const { eventNo, eventName, storeName, makerName, spaceRentStatus, eventStatus, eventStart, eventEnd } = event;

                const formattedStartDate = eventStart ? formatter.format(new Date(eventStart)) : "날짜 없음";
                const formattedEndDate = eventEnd ? formatter.format(new Date(eventEnd)) : "날짜 없음";


                return (
                    <li
                        key={eventNo}
                        className="grid grid-cols-7 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                        onClick={() => moveToRead(eventNo)}
                    >
                        <span className="text-gray-900 dark:text-gray-300">{eventName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{storeName}</span>
                        <span className="text-gray-900 dark:text-gray-300">{makerName}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                            {spaceRentStatus ? "O" : "X"}</span>
                        <span className="text-gray-900 dark:text-gray-300">{formattedStartDate}</span>
                        <span className="text-gray-900 dark:text-gray-300">{formattedEndDate}</span>
                        <span className="text-gray-900 dark:text-gray-300">
                            {eventStatus === "PENDING" ? "진행전" : eventStatus === "PROGRESSING" ? "진행중" : "종료"}
                            </span>

                    </li>
                );
            })
        ) : (
            <div>데이터가 없습니다.</div>
        );

    return (
        <div className="py-8">
            <div className="max-w-full mx-auto mb-6 p-4 rounded-lg flex justify-center">
                <div className="flex items-end space-x-4 p-4 rounded-lg">
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">이벤트 이름</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="이벤트 이름을 입력하세요"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">이벤트 상태</label>
                        <select
                            value={eventStatus}
                            onChange={(e) => setEventStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">전체</option>
                            <option value="PENDING">진행전</option>
                            <option value="PROGRESSING">진행중</option>
                            <option value="COMPLETED">종료</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">공간 대여 여부</label>
                        <select
                            value={spaceRentStatus ? "true" : "false"}
                            onChange={(e) => setSpaceRentStatus(e.target.value === "true")}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">전체</option>
                            <option value="true">O</option>
                            <option value="false">X</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">이벤트 기간</label>
                        <div className="flex items-center space-x-2">
                            <DatePicker
                                selected={eventStart || undefined}
                                onChange={(date) => setEventStart(date)}
                                selectsStart
                                startDate={eventStart || undefined}
                                endDate={eventEnd || undefined}
                                dateFormat="yyyy-MM-dd"
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="시작 날짜"
                            />
                            <span className="text-gray-500">-</span>
                            <DatePicker
                                selected={eventEnd || undefined}
                                onChange={(date) => setEventEnd(date)}
                                selectsEnd
                                startDate={eventStart || undefined}
                                endDate={eventEnd || undefined}
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
            {loading && <LoadingComponent/>}
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-7 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                            <span>이벤트 이름</span>
                            <span>지점명</span>
                            <span>제작자 이름</span>
                            <span>공간 대여 여부</span>
                            <span>이벤트 시작 날짜</span>
                            <span>이벤트 종료 날짜</span>
                            <span>이벤트 진행 상태</span>
                        </div>
                        <ul>{ListLI}</ul>
                    </div>
                </div>
            </div>
            <PageComponent pageResponse={pageResponse}/>
        </div>
    );
}

export default EventManagementListComponent;