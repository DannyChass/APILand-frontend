import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import * as React from "react";
import Link from "next/link";


function DropDownButton({ title, menu, className, onSelect }) {
    const [active, setActive] = useState(false);


    const toggleDropdown = () => {
        setActive(!active)
    }

    const handleItemClick = (itemValue) => {
        // 1. Appel de la fonction onSelect passée par le parent (ApiSearch)
        if (onSelect) {
            onSelect(itemValue);
        }
        // 2. Fermeture du menu déroulant
        setActive(false);}

        const menuItems = menu.map((item, index) => {
            
            return (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 active:bg-slate-200 active:shadow " onClick={()=>handleItemClick(item)}>
                    <span className='flex gap-5 items-center w-full'>
                        {item}
                    </span>
                </li>
            );
        })

        return (
            <div className='relative w-full' >
                <button className={`dropDownButton ${className}`} id={title}
                    onClick={toggleDropdown}>
                    {title} <FontAwesomeIcon icon={faAngleDown} />
                </button>
                {active && (
                    <div className="absolute left-0 top-full bg-white shadow-lg rounded-[3] z-50">
                        <ul className="py-2 text-sm text-gray-700">
                            {menuItems}
                        </ul>
                    </div>)}
            </div>
        );
    }

    export default DropDownButton;