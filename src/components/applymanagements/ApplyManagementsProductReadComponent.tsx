import back from "../../assets/img/icons/back.png";
import {IProduct} from "../../types/product/product.ts";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoadingComponent from "../common/LoadingComponent.tsx";
import {getApplyProductOne, updateProductStatus} from "../../apis/applymanagements/product/applymanagementproductAPI.ts";

const initialState : IProduct = {
    productNo: 0,
    productName: "",
    productDescription : "",
    productStatus : "PENDING",
    makerName : "",
    categoriesNo: [],
    categoriesName : [],
    attachFileNames : []
}

function ApplyManagementsProductReadComponent() {
    const {productNo} = useParams();

    const [product, setProduct] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const location = useLocation()

    const queryString = location.search

    const navigate = useNavigate();

    const handleBack = () => {
        navigate({
            pathname: `/applyManagements/product/list`,
            search:`${queryString}`
        })
    };

    const handleProductStatusChange = async (status: string) => {
        if (!productNo) return;
        setLoading(true);
        try {
            console.log(`Changing product status for productNo: ${productNo} to status: ${status}`);
            await updateProductStatus(Number(productNo), status);
            navigate(`/applyManagements/product/list`);
        } catch (error) {
            console.error("에러 발생하였습니다.", error);
            alert("상태 변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const proNO = Number(productNo)
        setLoading(true)
        getApplyProductOne(proNO).then(res => {
            setProduct(res)
            setLoading(false)
        });
    }, [productNo]);

    return (
        <div className="pt-10 pb-10 max-w-screen-xl mx-auto">
            {loading && <LoadingComponent />}

            <div className="border rounded-2xl p-10 bg-white shadow-md space-y-6">
                <img
                    src={back}
                    alt="뒤로 가기"
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleBack}
                />

                <div>
                    <label className="text-sm font-medium text-gray-700">상품코드</label>
                    <span className="block mt-1 w-full px-3 py-2 border rounded-md">{product.productNo}</span>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">상품명</label>
                    <span className="block mt-1 w-full px-3 py-2 border rounded-md">{product.productName}</span>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">상품 내용</label>
                    <span className="block mt-1 w-full px-3 py-2 border rounded-md">{product.productDescription}</span>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">제작자명</label>
                    <span className="block mt-1 w-full px-3 py-2 border rounded-md">{product.makerName}</span>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">카테고리 번호</label>
                    <span className="block mt-1 w-full px-3 py-2 border rounded-md">
                        {product.categoriesNo ? product.categoriesNo.join(", ") : "없음"}
                    </span>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">카테고리 이름</label>
                    <span className="block mt-1 w-full px-3 py-2 border rounded-md">
                        {product.categoriesName ? product.categoriesName.join(", ") : "없음"}
                    </span>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">포트폴리오 파일</label>
                    <div className="mt-1 w-full px-3 py-2 border rounded-md">
                        {product.attachFileNames && product.attachFileNames.length > 0 ? (
                            product.attachFileNames.map((fileName, index) => {
                                // 파일 이름만 추출 (절대 경로의 경우 마지막 '/' 뒤 부분만 사용)
                                const actualFileName = fileName.split('_').pop() ?? '';
                                const linkFileName = fileName.split('/').pop() ?? '';

                                // 원본 파일 경로 생성
                                const originalFilePath = `http://localhost/${linkFileName}`;

                                // 이미지 확장자 체크
                                const isImage = linkFileName.match(/\.(jpg|jpeg|png|gif)$/i);

                                return (
                                    <p key={index}>
                                        {isImage ? (
                                            // 이미지 파일일 경우 <img> 태그로 썸네일 미리보기 표시, 클릭 시 원본 이미지로 이동
                                            <a href={originalFilePath} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={`http://localhost/s_${linkFileName}`} // 썸네일 이미지 경로
                                                    alt={actualFileName}
                                                    style={{maxWidth: "200px", maxHeight: "200px", cursor: "pointer"}}
                                                />
                                            </a>
                                        ) : (
                                            // 이미지가 아닐 경우 파일 이름만 표시
                                            <a href={originalFilePath} target="_blank" rel="noopener noreferrer">
                                                {actualFileName}
                                            </a>
                                        )}
                                    </p>
                                );
                            })
                        ) : (
                            <p>상품 사진이 없습니다.</p>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => handleProductStatusChange("ACCEPTED")}
                        className="flex-1 max-w-xs px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        승인
                    </button>
                    <button
                        onClick={() => handleProductStatusChange("REJECTED")}
                        className="flex-1 max-w-xs px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        거절
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyManagementsProductReadComponent;
