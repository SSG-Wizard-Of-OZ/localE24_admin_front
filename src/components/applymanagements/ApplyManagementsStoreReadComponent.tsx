import back from "../../assets/img/icons/back.png";
import {Istore} from "../../types/istore.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    getStoreApplyDetail,
    updateStoreApprovalStatus
} from "../../apis/applymanagements/store/applymanagementstoreAPI.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";

const initialState: Istore = {
    storeNo:0,
    managerName: "",
    storeName: "",
    storeContact: "",
    storeLatitude: "",
    storeLongitude: "",
    isRentAvailable: true,
    storeApprovalStatus: "PENDING"
}

function ApplyManagementsStoreReadComponent() {

    const { storeNo } = useParams();
    const [store, setStore] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    const queryString = location.search;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate({
            pathname: `/applyManagements/store/list`,
            search:`${queryString}`
        })
    };

    const handleStoreStatusChange = async (status: string) => {
        if (!storeNo) return;
        setLoading(true);
        try {
            console.log(`Changing product status for productNo: ${storeNo} to status: ${status}`);
            await updateStoreApprovalStatus(Number(storeNo), status);
            navigate(`/applyManagements/store/list`);
        } catch (error) {
            console.error("에러 발생하였습니다.", error);
            alert("상태 변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storeNoNum = Number(storeNo)
        setLoading(true);
        getStoreApplyDetail(storeNoNum).then(res => {
            setStore(res);
            setLoading(false);
        });
    }, [storeNo]);

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
                    <label htmlFor="managerName" className="text-sm font-medium text-gray-700">담당자명</label>
                    <input
                        type="text"
                        readOnly
                        value={store.managerName}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="storeName" className="text-sm font-medium text-gray-700">상점명</label>
                    <input
                        type="text"
                        readOnly
                        value={store.storeName}
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="storeContact" className="text-sm font-medium text-gray-700">연락처</label>
                    <input
                        type="text"
                        value={store.storeContact}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="storeLatitude" className="text-sm font-medium text-gray-700">위도</label>
                    <input
                        type="text"
                        value={store.storeLatitude.toString()}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="storeLongitude" className="text-sm font-medium text-gray-700">경도</label>
                    <input
                        type="text"
                        value={store.storeLongitude.toString()}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="isRentAvailable" className="text-sm font-medium text-gray-700">대여 가능 여부</label>
                    <input
                        type="text"
                        value={store.isRentAvailable ? "가능" : "불가능"}
                        readOnly
                        className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => handleStoreStatusChange("ACCEPTED")}
                        className="flex-1 max-w-xs px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        승인
                    </button>
                    <button
                        onClick={() => handleStoreStatusChange("REJECTED")}
                        className="flex-1 max-w-xs px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        거절
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyManagementsStoreReadComponent;