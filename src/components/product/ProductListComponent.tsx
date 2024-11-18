import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPageResponse} from "../../types/ipageresponse.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";
import {IProduct} from "../../types/iproduct.ts";
import {getProductList, searchProduct} from "../../apis/product/productAPI.ts";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const initialState: IPageResponse<IProduct> = {
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

function ProductListComponent() {
    const [query] = useSearchParams()

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    const [loading, setLoading] = useState<boolean>(false)
    const [pageResponse, setPageResponse] = useState<IPageResponse<IProduct>>(initialState)
    const [productName, setProductName] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const navigate = useNavigate();

    const queryStr = createSearchParams({page:String(page),size:String(size)})

    const moveToRead = (productNo: number | undefined) => {
        navigate({
            pathname: `/product/read/${productNo}`,
            search:`${queryStr}`
        })
    }

    useEffect(() => {
        setLoading(true)
        getProductList(page, size).then(data => {
            setPageResponse(data)

            setTimeout(() => {
                setLoading(false)
            }, 600)
        })
    }, [page, size])

    const handleSearch = () => {
        // 시작 날짜가 선택된 경우, ISO 문자열로 변환하여 'Z'를 제거하고 formattedStartDate 저장
        const formattedStartDate = startDate ? startDate.toISOString().slice(0, -1) : undefined;

        // 종료 날짜가 선택된 경우, 하루를 추가한 후 ISO 문자열로 변환하여 'Z'를 제거하고 formattedEndDate 저장
        // 하루를 더하는 이유는 검색 시 종료 날짜를 포함하도록 하기 위함
        const formattedEndDate = endDate ? new Date(endDate.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, -1) : undefined;

        setLoading(true);

        // 검색 API 호출: 페이지, 사이즈, 상품명, 시작 날짜, 종료 날짜를 파라미터로 전달
        searchProduct(page, size, productName, formattedStartDate, formattedEndDate).then((data) => {
            setPageResponse(data);
            setLoading(false);
        });
    };

    const productListLI = pageResponse.dtoList.map((product: IProduct) => {
        const { productNo, categoryNo, productName, regDate, modDate } = product

        const formatRegDate = regDate ? formatter.format(new Date(regDate)) : "날짜 없음";

        const formatModDate = modDate ? formatter.format(new Date(modDate)) : "날짜 없음";

        return (
            <li
                key={productNo}
                className="grid grid-cols-5 gap-4 px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700"
                onClick={() => moveToRead(productNo)}
            >
                <span className="text-gray-900 dark:text-gray-300">{productNo}</span>
                <span className="text-gray-900 dark:text-gray-300">{categoryNo}</span>
                <span className="text-gray-900 dark:text-gray-300">{productName}</span>
                <span className="text-gray-900 dark:text-gray-300">{formatRegDate}</span>
                <span className="text-gray-900 dark:text-gray-300">{formatModDate}</span>
            </li>
        )
    })

    return (
        <div className="py-8">
            <div className="max-w-full mx-auto mb-6 p-4 rounded-lg flex justify-center">
                <div className="flex items-end space-x-4 p-4 rounded-lg">
                    <div className="flex flex-col">
                        <label className="text-gray-700 text-sm font-bold mb-1">상품명</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="상품명을 입력하세요"
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

            {loading && <LoadingComponent></LoadingComponent>}

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-5 gap-4 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        >
                            <span>상품코드</span>
                            <span>카테고리 번호</span>
                            <span>상품명</span>
                            <span>신청 날짜</span>
                            <span>등록 날짜</span>
                        </div>
                        <ul>
                            {productListLI}
                        </ul>
                    </div>
                </div>
            </div>


            <PageComponent pageResponse={pageResponse}></PageComponent>
        </div>
    );
}

export default ProductListComponent;