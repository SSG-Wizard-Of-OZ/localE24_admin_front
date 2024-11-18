import back from "../../assets/img/icons/back.png";
import {Ievent} from "../../types/ievent.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getEventDetail} from "../../apis/event/eventAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";

const initialState: Ievent = {
    eventNo: 0,
    eventName: "",
    makerName: "",
    storeName: "",
    spaceRentStatus: false,
    productImages: { }
}

function EventManagementsReadComponent() {

    const { eventNo } = useParams();
    const [event, setEvent] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const queryString = location.search;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate({
            pathname: `/eventManagements/list`,
            search:`${queryString}`
        })
    };

    useEffect(() => {
        const eventNoNum = Number(eventNo)
        setLoading(true);
        getEventDetail(eventNoNum).then(res => {
            setEvent(res);
            setLoading(false);
        });
    }, [eventNo]);


    return (
        <div className="pt-20 pb-10 max-w-lg mx-auto">
            {loading && <LoadingComponent />}

            <div className="border rounded-2xl p-10 bg-white shadow-md space-y-6">
                <img
                    src={back}
                    alt="뒤로 가기"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleBack}
                />

                <div>
                    <label htmlFor="eventName" className="text-sm font-medium text-gray-700">이벤트명</label>
                    <input
                        type="text"
                        readOnly
                        value={event.eventName}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="makerName" className="text-sm font-medium text-gray-700">제작자 이름</label>
                    <input
                        type="text"
                        readOnly
                        value={event.makerName}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="storeName" className="text-sm font-medium text-gray-700">지점명</label>
                    <input
                        type="text"
                        readOnly
                        value={event.storeName}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="isRentAvailable" className="text-sm font-medium text-gray-700">공간 대여 여부</label>
                    <input
                        type="text"
                        value={event.spaceRentStatus ? "O" : "X"}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">진행기간</label>
                    <div className="flex space-x-2 mt-1">
                        <input
                            type="text"
                            value={event.eventStart?.toString()}
                            readOnly
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <span className="flex items-center">-</span>
                        <input
                            type="text"
                            value={event.eventEnd?.valueOf()}
                            readOnly
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">신청 날짜</label>
                    <input
                        type="text"
                        value={event.regDate?.toString()}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <span>상품 리스트</span>
                    <div>
                        {event.productImages && Object.entries(event.productImages).map(([productNo, images]) => (
                            <div key={productNo}>
                                <h3 className="text-sm font-medium text-gray-700">상품 {productNo}</h3>
                                {images.map((image, index) => {
                                    // 원본 파일 경로 생성
                                    const originalFilePath = `http://localhost/${image}`;
                                    // 썸네일 경로 생성 (썸네일 이미지가 별도 경로로 저장된 경우 사용)
                                    const thumbnailFilePath = `http://localhost/s_${image}`;
                                    // 이미지 이름 추출
                                    const actualFileName = image.split('_').pop() ?? '';

                                    return (
                                        <p key={index}>
                                            <a href={originalFilePath} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={thumbnailFilePath} // 썸네일 이미지 경로
                                                    alt={actualFileName}
                                                    style={{maxWidth: "200px", maxHeight: "200px", cursor: "pointer"}}
                                                    className="w-32 h-32 object-cover"
                                                />
                                            </a>
                                        </p>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EventManagementsReadComponent;
