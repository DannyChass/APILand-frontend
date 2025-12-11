import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import * as React from "react";
import Link from "next/link";


function DropDownButton({ title, menu, className }) {
    const [active, setActive] = useState(false);


    const toggleDropdown = () => {
        setActive(!active)
    }
    
    const menuItems = menu.map((item, index) => {
        const itemUrl = '#'
        return (
            <li key={index} className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 active:bg-slate-200 active:shadow ">
                <Link className='flex gap-5 items-center w-full' href={itemUrl} >
                    {item}
                </Link>
            </li>
        );
    })
console.log(active)

    return (
        <main >
            <div className='bg-[#050F2A] h-20 flex relative'>
                <button className={`dropDownButton ${className}`} id={title}
                    onClick={toggleDropdown}>
                    {title} <FontAwesomeIcon icon={faAngleDown} />
                </button>
                {active && (
                    <div className="absolute right-0 top-full w-full bg-white shadow-lg rounded-[3] z-50">
                        <ul className="py-2 text-sm text-gray-700">
                            {menuItems}
                        </ul>
                    </div>)}
            </div>
        </main>
    );
}

export default DropDownButton;