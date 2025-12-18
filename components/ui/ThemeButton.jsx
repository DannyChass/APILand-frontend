import Link from "next/link"


export default function ThemeButton(props) {

    return (
        <Link href={{ pathname: `/ApiSearch`, query: { category: props.category } }}>
            <button className=" bg-white rounded-3xl w-24 text-sm font-medium font-sans  text-slate-400 hover:bg-[#F2FDFF] cursor-pointer" >
                {props.category}
            </button >
        </Link >
    )
}