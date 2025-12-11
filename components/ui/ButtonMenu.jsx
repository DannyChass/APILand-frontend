import { useState } from "react"




export default function ButtonMenu({name, active, onClick}) {
    

    return( 
        <div onClick={onClick} ac className={`p-3  font-bold cursor-pointer ${active ? "text-slate-700 " : "text-slate-400"}`}>
            <h6>{name}</h6>
        </div>
    )
}