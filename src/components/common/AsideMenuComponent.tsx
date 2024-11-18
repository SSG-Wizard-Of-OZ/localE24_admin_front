import {Link} from "react-router-dom";
import Depth1Menu from "./Depth1Menu.tsx";

import logo from "../../assets/img/logo.png"

interface subMenusProps{
    name: string,
    toPath:string
}

interface Depth1MenuProps {
    mainName:string,
    subMenus:subMenusProps[],
    basicPath:string,
    iconName:string
}

function AsideMenuComponent() {

    const m1:Depth1MenuProps = {
        mainName:"지역 담당자 관리",
        subMenus:[
            {name:"지역 담당자 리스트",toPath:"/list"}
        ],
        basicPath:"/localManagers",
        iconName: "users.png"
    }

    const m2:Depth1MenuProps = {
        mainName:"제작자 관리",
        subMenus:[
            {name:"제작자 리스트",toPath:""}
        ],
        basicPath:"/appliers",
        iconName: "edit.png"
    }

    const m3:Depth1MenuProps = {
        mainName:"지점 관리",
        subMenus:[
            {name:"지점 리스트",toPath:""}
        ],
        basicPath:"/eventLocations",
        iconName: "home.png"
    }

    const m4:Depth1MenuProps = {
        mainName:"이벤트 관리",
        subMenus:[
            {name:"이벤트 리스트",toPath:"/list"}
        ],
        basicPath:"/eventManagements",
        iconName: "calendar.png"
    }

    const m5:Depth1MenuProps = {
        mainName:"통계",
        subMenus:[{name:"",toPath:""}],
        basicPath:"/",
        iconName: "stats.png"
    }

    const m6:Depth1MenuProps = {
        mainName:"문의",
        subMenus:[{name:"",toPath:""}],
        basicPath:"/",
        iconName: "headset.png"
    }

    const m7:Depth1MenuProps = {
        mainName:"상품관리",
        subMenus:[
            {name:"상품 리스트",toPath:""}

        ],
        basicPath:"/",
        iconName: "product.png"
    }

    const m8:Depth1MenuProps = {
        mainName:"이벤트 신청 관리",
        subMenus:[
            {name:"이벤트 신청 리스트",toPath:"/event/list"},
            {name:"제작자 신청 리스트",toPath:"/producer/list"},
            {name:"상품 신청 리스트",toPath:"/product/list"},
            {name:"지점 신청 리스트",toPath:"/store/list"}
        ],
        basicPath:"/applyManagements",
        iconName: "product.png"
    }

    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-side-navy md:block flex-shrink-0">
            <div className="py-4 text-neutral-800">

                {/* 로고 부분 */}
                <Link to="/main" className="flex items-center justify-center mb-4 p-2">
                       <img src={logo} alt='/logo' className='px-16'/>
                </Link>

                {/* 1Depth 메뉴 */}
                <ul className="mt-6 space-y-2 text-txt-grey">
                    <Depth1Menu {...m1}></Depth1Menu>
                    <Depth1Menu {...m2} ></Depth1Menu>
                    <Depth1Menu {...m3} ></Depth1Menu>
                    <Depth1Menu {...m7} ></Depth1Menu>
                    <Depth1Menu {...m4} ></Depth1Menu>
                    <Depth1Menu {...m8} ></Depth1Menu>
                    <Depth1Menu {...m5} ></Depth1Menu>
                    <Depth1Menu {...m6} ></Depth1Menu>
                </ul>
            </div>
        </aside>
    );
}

export default AsideMenuComponent;