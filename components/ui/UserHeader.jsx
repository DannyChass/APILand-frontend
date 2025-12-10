import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { binTrigger, bindMenu } from "material-ui-popup-state";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function UserHeader() {

    const [user, setUser] = useState(null);
    
      useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
          setUser(JSON.parse(stored));
        }
      }, []);

  return (
    <PopupState variant="popover" popupId="popup-User">
      {(popupState) => (
        <React.Fragment>
          <button variant="contained" {...binTrigger(popupState)}>
            <div>
              <h6>Bonjour</h6>
              {user.username}
            </div>
            <img
              src="/default.avatar.png"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem className="flex justify-between px-1">Account <FontAwesomeIcon icon={faUser}/></MenuItem>
            <MenuItem className="flex justify-between px-1">Setting <FontAwesomeIcon icon={faGear}/></MenuItem>
            <MenuItem className="flex justify-between px-1">Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
