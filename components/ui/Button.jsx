"use client"
import Link from "next/link";

export default function Button(props) {
    const { classname, children, onClick } = props;

    if (classname !== undefined) {
        return (
            <button className={classname} onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button
            className="bg-[#B8A9FF] rounded-[3] text-[#F2FDFF] text-sm w-[150px] p-3 text-shadow-2xs hover:bg-[#9d90de] cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}