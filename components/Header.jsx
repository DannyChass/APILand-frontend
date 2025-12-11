import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import Button from "./ui/Button";
import UserHeader from "./ui/UserHeader";
import * as React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import Fade from "@mui/material/Fade";


export default function Header() {
  const [select, setSelect] = useState("API");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [user, setUser] = useState(null);

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
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);


  return (
    <header className="px-10 bg-white w-full h-14 items-center flex justify-between">
      <div className="flex gap-10 items-center">
        <Link href="/HomePage" className="logo">
          {" "}
          APIhub
        </Link>
        <button className="flex gap-3 pl-3 pr-6 justify-center font-bold text-sm text-slate-400 items-center border-0 border-r-2 border-slate-200 cursor-pointer" id="apiMenu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          API <FontAwesomeIcon icon={faAngleDown} color="#90a1b9" />
        </button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
          className="w-40 border-0"
        >
          <MenuItem value="api">API</MenuItem>
          <MenuItem value="Docs">Docs</MenuItem>
          <MenuItem value="community">Community</MenuItem>
        </Menu>
        <button className="flex  gap-3 pl-3 pr-6 justify-center font-bold text-sm text-slate-400 items-center border-0 border-r-2 border-slate-200 cursor-pointer" id="apiMenu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          News <FontAwesomeIcon icon={faAngleDown} color="#90a1b9" />
        </button>
        <Menu
          slot={{ transition: Fade }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
          className="w-40 border-0"
        >
          <MenuItem value="mySub" className="border-b-2 border-slate-200">My Subs</MenuItem>
          <MenuItem value="explorer">Explorer</MenuItem>
          <MenuItem value="community">Community</MenuItem>
        </Menu>
      </div>


      <div className="flex gap-5 items-center">
        {user ? (
          <>
            <Link href="/AddAPI">
              <Button>Add an API</Button>
            </Link>
            <UserHeader />
          </>
        ) : (
          <>
            <Link href="/AddAPI">
              <Button>Add an API</Button>
            </Link>
            <Link href="/AuthPage?mode=signup">
              <Button className="font-sans text-white font-normal text-sm border-2 border-[#050f2a] p-2 bg-[#050F2A] rounded-lg hover:bg-slate-800 cursor-pointer">
                Sign Up
              </Button>
            </Link>
            <Link href="/AuthPage?mode=login">
              <Button className="font-sans text-black font-normal text-sm border-2 p-2 border-slate-400 rounded-lg hover:bg-slate-200 transition cursor-pointer">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
