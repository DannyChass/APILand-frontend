import Link from "next/link"


export default function CategoryCard(props) {

    return (
        <div className="w-70 h-30 flex items-end gap-2 p-1  border border-slate-300 cursor-pointer rounded-lg hover:bg-slate-100">
            <img src={props.img} alt="logoCategory" className="h-[80%] object-cover" />
            <div className="flex flex-col gap-2  p-2">
                <h4 className="text-lg font-bold">{props.title}</h4>
                <p className="text-[12px]">Lorem ipsumitisdsd laborum.</p>
                <div className="text-[12px] text-blue-400 hover:underline hover:underline-offset-2 cursor-pointer">Explore Category</div>
            </div>
        </div>
    )
}