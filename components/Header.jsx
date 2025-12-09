import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import Button from "./ui/Button";
import * as React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import Fade from "@mui/material/Fade";


export default function Header() {
  const [select, setSelect] = useState("API");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClick = () => {

    router.push()
  }

  return (
    <header className="px-10 bg-white w-full h-20 items-center flex justify-between">
      <div className="flex gap-10">
        <Link href="#" className="logo">
          {" "}
          APIhub
        </Link>
        <button className="flex gap-3 p-3 pr-6 justify-center font-bold text-stone-500 items-center border-0 border-r-2 border-stone-300" id="apiMenu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          API <FontAwesomeIcon icon={faAngleDown} color="#757575" />
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
        <button className="flex gap-3 p-3 pr-6 justify-center font-bold text-stone-500 items-center border-0 border-r-2 border-stone-300" id="apiMenu"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}>
          News <FontAwesomeIcon icon={faAngleDown} color="#757575" />
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
          <MenuItem value="mySub">My Subs</MenuItem>
          <MenuItem value="explorer">Explorer</MenuItem>
          <MenuItem value="community">Community</MenuItem>
        </Menu>
      </div>


      <div className="gap-5 justify-between flex">
        <Link href="/AddAPI">
          <Button>Add an API</Button>
        </Link>
        <Link href="/AuthPage?mode=signup">
          <Button>Sign Up</Button>
        </Link>
        <Link href="/AuthPage?mode=login">
          <Button>Sign In</Button>
        </Link>
      </div>
    </header>
  );
}
