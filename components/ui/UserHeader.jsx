import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import * as React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faArrowRightFromBracket,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function UserHeader() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("user");
    console.log(stored);
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  console.log(user);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <PopupState variant="popover" popupId="popup-User">
      {(popupState) => (
        <React.Fragment>
          <button
            className="  h-10  px-3 flex justify-end items-center gap-4 border-l-2 border-slate-200 rounded-lg shadow"
            variant="contained"
            {...bindTrigger(popupState)}
          >
            <div className="flex flex-col h-10 justify-center items-end">
              <h6 className="text-[12px] font-bold text-slate-500 pt-1 -m-1">
                Bonjour
              </h6>
              <h6 className="text-sm font-bold text-slate-800 p-0 m-0">
                {user?.username}
              </h6>
            </div>
            <img
              src="/default.avatar.png"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <FontAwesomeIcon icon={faAngleDown} />
          </button>
          <Menu
            className="w-60 gap-1"
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                boxShadow: "none",
                border: "1px solid #e2e8f0",
                borderRadius: "0",
              },
            }}
          >
            <MenuItem className="flex justify-between px-1">
              <Link href='/ProfilePage'>
                <h6>Account</h6>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </MenuItem>
            <MenuItem className=" flex gap-5 justify-between px-1 border-t border-gray-200">
              <span>Setting</span>
              <FontAwesomeIcon icon={faGear} />
            </MenuItem>
            <MenuItem
              className="flex justify-between px-1"
              onClick={handleLogout}
            >
              <h6>Logout </h6>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
