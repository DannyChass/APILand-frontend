import { useState } from "react"




export default function ButtonMenu(props) {
    const [active, setActive] =useState(false)

    const handleClick = () => {
        setActive(true)
    }

    return( 
        <div className={`p-3  font-bold cursor-pointer ${active ? "text-slate-700 " : "text-slate-400"}`} onClick={handleClick}>
            <h6>{props.name}</h6>
        </div>
    )
}