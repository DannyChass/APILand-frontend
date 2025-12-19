import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import Button from "./ui/Button";
import UserHeader from "./ui/UserHeader";
import * as React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faBell, faBookmark, faCommentDots, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Fade from "@mui/material/Fade";
import { useSelector } from "react-redux";


export default function Header() {
  const router = useRouter();
  const user = useSelector(state => state.user.data);

  const [select, setSelect] = useState("API");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [unreadCount, setUnreadCount] = useState(0);

  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const notifOpen = Boolean(notifAnchorEl);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3000/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setNotifications(data.notifications);
          const unread = data.notifications.filter(n => !n.read).length;
          setUnreadCount(unread);
        }
      })
      .catch(err => console.error("Notifications error:", err));
  }, [user]);

  const deleteNotification = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) {
        console.error("HTTP error:", res.status);
        return;
      }

      const data = await res.json();

      if (!data.result) {
        console.error("Delete failed:", data.error);
        return;
      }

      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Delete notification error:", err);
    }
  };

  const handleAddApiClick = () => {
    if (!user) {
      router.push("/AuthPage?mode=login&redirect=/AddAPI");
    } else {
      router.push("/AddAPI");
    }
  };

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

  const handleNotifClick = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleClose = () => setAnchorEl(null);


  return (
    <header className="px-10 bg-white w-full h-14 items-center flex justify-between">
      <div className="flex gap-5   items-center">
        <Link href="/HomePage" className="logo">
          {" "}
          APIhub
        </Link>
        {/* <button className="flex gap-3 pl-2 pr-2 justify-center font-bold text-sm text-slate-400 items-center border-0 border-r-2 border-slate-200 cursor-pointer" id="apiMenu"
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
        </Menu> */}
        <Link
          href="/news"
          className="flex gap-3 pl-2 pr-2 justify-center font-bold text-sm text-slate-400 items-center border-0 border-r-2 border-slate-200 cursor-pointer"
        >
          News <FontAwesomeIcon icon={faNewspaper} color="#90a1b9" />
        </Link>
        {/* <Menu
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
        </Menu> */}
      </div>


      <div className="flex gap-5 items-center">
        {user ? (
          <>
            <Link href="/AddAPI">
              <Button>Add an API</Button>
            </Link>
            <div className="flex gap-5 border-x-2 border-slate-200 px-5 ">
              <div
                className="relative cursor-pointer"
                onClick={handleNotifClick}
              >
                <FontAwesomeIcon icon={faBell} color="#050f2a" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-4 h-4 flex items-center justify-center rounded-full px-1">
                    {unreadCount}
                  </span>
                )}
              </div>
              <Menu
                anchorEl={notifAnchorEl}
                open={notifOpen}
                onClose={handleNotifClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                className="mt-2"
              >
                {notifications.length === 0 && (
                  <MenuItem>Aucune notification</MenuItem>
                )}

                {notifications.map((notif) => (
                  <MenuItem
                    key={notif._id}
                    className={`flex justify-between items-center gap-4 ${!notif.read ? "bg-slate-100 font-semibold" : ""
                      }`}
                  >
                    <span className="text-sm">{notif.message}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif._id);
                      }}
                      className="text-slate-400 hover:text-red-500 transition"
                      title="Supprimer la notification"
                    >
                      <FontAwesomeIcon icon={faXmark} size="sm" />
                    </button>
                  </MenuItem>

                ))}
              </Menu>
              {/* <div><FontAwesomeIcon icon={faCommentDots} /></div>
              <div><FontAwesomeIcon icon={faBookmark} /></div> */}
            </div>

            <UserHeader />
          </>
        ) : (
          <>
            <Button onClick={handleAddApiClick}>
              Add an API
            </Button>
            <Link href="/AuthPage?mode=signup">
              <Button className="font-sans text-white font-normal text-sm border-2 border-[#050f2a] p-2 bg-[#050F2A] rounded-lg hover:bg-slate-800 active:scale-95 cursor-pointer">
                Sign Up
              </Button>
            </Link>
            <Link href="/AuthPage?mode=login">
              <Button className="font-sans text-black font-normal text-sm border-2 p-2 border-slate-400 rounded-lg hover:bg-slate-200 active:scale-95 transition cursor-pointer">
                Sign In
              </Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
