"use client";

export default function Button({ className, children, onClick }) {

    if (className) {
        return (
            <button className={className} onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <button
            className="bg-[#B8A9FF] rounded text-[#F2FDFF] text-sm w-[150px] p-2 hover:bg-[#9d90de] cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}