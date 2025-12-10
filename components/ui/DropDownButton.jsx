import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import * as React from "react";


function DropDownButton({ title, menu, className }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);


    return (
        <main >
            <div className='bg-[#050F2A] h-20 flex'>
                <button className={`dropDownButton ${className}`} id= {title}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    {title} <FontAwesomeIcon icon={faAngleDown}/>
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
                > {menu.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
                </Menu>
            </div>
        </main>
    );
}

export default DropDownButton;