import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteLocalManager, getLocalManagerList} from "../../apis/testLocalManagerAPI.ts";
import {Ilocalmanager} from "../../types/ilocalmanager.ts";
import PageComponent from "../common/PageComponent.tsx";
import LoadingComponent from "../common/LoadingComponent.tsx";
import {IPageresponse} from "../../types/ipageresponse.ts";

const initialState: IPageresponse<Ilocalmanager> = {
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
}

function LocalManagerListComponent() {

    const [query] = useSearchParams()

    const page: number = Number(query.get("page")) || 1
    const size: number = Number(query.get("size")) || 10

    const [result, setResult] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)
    const [pageResponse, setPageResponse] = useState<IPageresponse<Ilocalmanager>>(initialState)


    useEffect (() => {
        setLoading(true)
        getLocalManagerList(page,size).then(data => {
            setPageResponse(data)
            setTimeout(() => {
                setLoading(false)
            }, 400)
        })
    }, [page, size])


    const ListLI = Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? pageResponse.dtoList.map((localManager:Ilocalmanager) => {
        const {managerNo, areaName, managerName, managerContact} = localManager

            const handleClickDelete = () => {

                setLoading(true)
                deleteLocalManager(managerNo).then(data => {

                    console.log(data.result)
                    if(data.result === 'success'){
                        setResult(managerNo +' 삭제되었습니다.')
                    }

                    setTimeout(() => {
                        setLoading(false)
                    }, 600)
                })
            }

        return(
            <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-gray-300">{managerNo}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-gray-300">{managerName}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-gray-300">{areaName}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-gray-900 whitespace-no-wrap dark:text-gray-300">{managerContact}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                        <button type="button"
                            className="relative inline-block px-3 py-1 font-semibold text-txt-grey leading-tight transition ease-in-out duration-200 focus:outline-none">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-red-400 opacity-50 rounded-full"></span>
                            <span className="relative" onClick={handleClickDelete}>삭제</span>
                        </button>
                    </div>
                </td>
            </tr>
        )
        })
        : (
            <tr>
                <td colSpan={3} className="px-5 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
                    데이터가 없습니다.
                </td>
            </tr>
        );


    return (
        <div className="py-8">
            {loading && <LoadingComponent></LoadingComponent>}
            <div className="flex justify-end">
                <div className="flex items-center space-x-4"></div>
            </div>


            <div className="my-2 flex sm:flex-row flex-col">
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                담당자 회원 번호
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                담당자 이름
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                담당 지역
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                연락처
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {ListLI}
                        </tbody>
                    </table>
                    <PageComponent pageResponse={pageResponse}  ></PageComponent>
                </div>
            </div>
        </div>
    );
}

export default LocalManagerListComponent;