import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import * as React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faArrowRightFromBracket,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

export default function UserHeader() {
  const [active, setActive] = useState(false)
  const [user, setUser] = useState({});
  const dropDownRef = useRef(null)

  const toggleDropdown = () => {
    setActive(!active)
  }

  useEffect(()=>{
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setActive(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])

  useEffect(() => {
    const stored = localStorage.getItem("user");
    
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div ref={dropDownRef} className="relative flex text-left  hover:bg-slate-100   ">
      <button onClick={toggleDropdown} className="flex justify-end items-end rounded-[3] border border-slate-200 px-3 py-1 gap-3 cursor-pointer">
        <div className="flex flex-col justify-end items-start text-left px-1">
          <h6 className="text-[12px] px-1 font-bold text-slate-400 -m-1">Bonjour</h6>
          <h5 className="text-sm  text-left font-bold text-slate-800">{user?.username} </h5>
        </div>
        <img className="w-10 h-10 rounded-full" src="./homme.png" alt="" />
      </button>


      {active && (
        <div className="absolute right-0 top-full w-full bg-white shadow-lg rounded-[3] z-50">
          {/* <div className="p-1 border-b">
            <div className="flex justify-end items-end rounded-lg border border-slate-200 px-3 py-1 gap-3">
              <div className="flex flex-col">
              <h5 className="font-bold text-sm">Glen</h5>
              <h6 className="text-sm text-gray-500">glen@gmail.com</h6>
              </div>
              <img src="./homme.png" className="w-10 h-10" alt="" />
            </div>
            <div>

            </div>
          </div> */}

          <ul className="py-2 text-sm text-gray-700">
          <li className="px-4 py-2 hover:bg-gray-100 flex  items-center gap-5 active:bg-slate-200 active:shadow "><Link className="flex gap-5 items-center" href='/ProfilePage' ><FontAwesomeIcon icon={faUser}/> Account </Link></li>
          <li className="px-4 py-2 hover:bg-gray-100 flex justify-end items-center gap-5 active:bg-slate-200 active:shadow">Setting <FontAwesomeIcon icon={faGear}/></li>
          <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-5 active:bg-slate-200 active:shadow">Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/></li>
          
          </ul>
        </div>
      )}
    </div>







    // <PopupState variant="popover" popupId="popup-User">
    //   {(popupState) => (
    //     <React.Fragment>
    //       <button
    //         className="  h-10  px-3 flex justify-end items-center gap-4 border-l-2 border-slate-200 rounded-lg shadow"
    //         variant="contained"
    //         {...bindTrigger(popupState)}
    //       >
    //         <div className="flex flex-col h-10 justify-center items-end">
    //           <h6 className="text-[12px] font-bold text-slate-500 pt-1 -m-1">
    //             Bonjour
    //           </h6>
    //           <h6 className="text-sm font-bold text-slate-800 p-0 m-0">
    //             {user?.username}
    //           </h6>
    //         </div>
    //         <img
    //           src="/default.avatar.png"
    //           alt="avatar"
    //           className="w-10 h-10 rounded-full"
    //         />
    //         <FontAwesomeIcon icon={faAngleDown} />
    //       </button>
    //       <Menu
    //         className="w-60 gap-1"
    //         {...bindMenu(popupState)}
    //         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //         transformOrigin={{ vertical: "top", horizontal: "right" }}
    //         PaperProps={{
    //           sx: {
    //             boxShadow: "none",
    //             border: "1px solid #e2e8f0",
    //             borderRadius: "0",
    //           },
    //         }}
    //       >
    //         <MenuItem className="flex justify-between px-1">
    //           <Link href='/ProfilePage'>
    //             <h6>Account</h6>
    //             <FontAwesomeIcon icon={faUser} />
    //           </Link>
    //         </MenuItem>
    //         <MenuItem className=" flex gap-5 justify-between px-1 border-t border-gray-200">
    //           <span>Setting</span>
    //           <FontAwesomeIcon icon={faGear} />
    //         </MenuItem>
    //         <MenuItem
    //           className="flex justify-between px-1"
    //           onClick={handleLogout}
    //         >
    //           <h6>Logout </h6>
    //           <FontAwesomeIcon icon={faArrowRightFromBracket} />
    //         </MenuItem>
    //       </Menu>
    //     </React.Fragment>
    //   )}
    // </PopupState>
  );
}
