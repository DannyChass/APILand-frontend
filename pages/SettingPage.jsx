import { useState } from "react"
import Header from "../components/Header"
import AccountSettings from "../components/AccountSetting"
import UpdateProfile from "../components/UpdateProfile"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGear,
  faPencil,
  faBell,
  faCircleHalfStroke,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account")

  return (
    <div className="overflow-hidden">
      <Header />

      <div className="flex pt-20">
        <div className="fixed flex justify-center w-100 pl-25">
          <ul className="flex flex-col gap-5 px-5 py-5 w-full border-r-2 border-slate-200">
            <li
              onClick={() => setActiveSection("account")}
              className="listeSetting"
            >
              Account Settings <FontAwesomeIcon icon={faGear} />
            </li>

            <li
              onClick={() => setActiveSection("profile")}
              className="listeSetting"
            >
              Update Profile <FontAwesomeIcon icon={faPencil} />
            </li>

            <li className="listeSetting">
              Notifications <FontAwesomeIcon icon={faBell} />
            </li>

            <li className="listeSetting">
              Privacy & Security <FontAwesomeIcon icon={faGear} />
            </li>

            <li className="listeSetting">
              Appearance <FontAwesomeIcon icon={faCircleHalfStroke} />
            </li>

            <li className="listeSetting">
              Logout <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </li>
          </ul>
        </div>

        <div className="ml-[400px] pb-60 h-screen w-200 overflow-y-scroll">
          {activeSection === "account" && <AccountSettings />}
          {activeSection === "profile" && <UpdateProfile />}
        </div>
      </div>
    </div>
  )
}