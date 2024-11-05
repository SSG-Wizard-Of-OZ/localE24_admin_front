import back from "../../assets/img/icons/back.png";
import { useNavigate } from "react-router-dom";

function AppliersReadComponent() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="pt-20 pb-10 max-w-lg mx-auto">
            <div className="border rounded-2xl p-10 bg-white shadow-md space-y-6">
                <img
                    src={back}
                    alt="뒤로 가기"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleBack}
                />

                <div>
                    <label htmlFor="creatorName" className="text-sm font-medium text-gray-700">제작자명</label>
                    <input
                        type="text"
                        defaultValue="김민주"
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="businessNumber" className="text-sm font-medium text-gray-700">사업자 등록번호</label>
                    <input
                        type="text"
                        defaultValue="101-01-23456"
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="border p-4 rounded-md">
                    <div>
                        <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">우편번호</label>
                        <input
                            type="text"
                            defaultValue="12345"
                            readOnly
                            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="address" className="text-sm font-medium text-gray-700">주소</label>
                        <input
                            type="text"
                            defaultValue="부산광역시 해운대구 좌동로 123"
                            readOnly
                            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="detailedAddress" className="text-sm font-medium text-gray-700">상세주소</label>
                        <input
                            type="text"
                            defaultValue="A동 101호"
                            readOnly
                            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">휴대전화</label>
                    <input
                        type="text"
                        defaultValue="010-1234-5678"
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">이메일</label>
                    <input
                        type="email"
                        defaultValue="min12@gmail.com"
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="portfolio" className="text-sm font-medium text-gray-700">포트폴리오 파일</label>
                    <input
                        type="file"
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        className="flex-1 max-w-xs px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        수정
                    </button>
                    <button
                        className="flex-1 max-w-xs px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AppliersReadComponent;
