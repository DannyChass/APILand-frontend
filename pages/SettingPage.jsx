import { useState } from "react"
import Header from "../components/Header"
import AccountSetting from "../components/AccountSetting"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faPencil,faBell,faCircleHalfStroke, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"



export default function SettingPage() {
    const [pageSetting, setPageSetting] = useState('accountSetting')

    return(
        <div className="overflow-hidden">
            <Header />
            <div className="flex pt-20 ">
                <div className="flex justify-center w-100 pl-25 ">
                <ul className="flex flex-col gap-5  px-5 py-5 w-full border-r-2 border-slate-200">
                    <li className="listeSetting">Account Setting <FontAwesomeIcon icon={faGear}/></li>
                    <li className="listeSetting">Update Account <FontAwesomeIcon icon={faPencil}/></li>
                    <li className="listeSetting">Notifications <FontAwesomeIcon icon={faBell}/></li>
                    <li className="listeSetting">Private and security <FontAwesomeIcon icon={faGear}/></li>
                    <li className="listeSetting">Theme <FontAwesomeIcon icon={faCircleHalfStroke}/></li>
                    <li className="listeSetting">Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/>    </li>
                </ul>
                </div>
                <div className="">
                    <AccountSetting />
                </div>
            </div>
        </div>
    )
}