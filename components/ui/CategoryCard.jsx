import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"


export default function CategoryCard(props) {

    return (
        <Link
  href={{ pathname: `/ApiSearch`, query: { category: props.category } }}
  className="
    flex items-center gap-3 p-3
    border border-slate-300 cursor-pointer rounded-lg hover:bg-slate-100
    w-full
    min-h-[100px] sm:min-h-[120px] md:min-h-[140px]
    overflow-hidden active:scale-95
  "
>
  <img
    src={props.img}
    alt="logoCategory"
    className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-cover rounded"
  />
  <div className="flex flex-col justify-center gap-1 sm:gap-2 p-1 sm:p-2">
    <h4 className="text-xs sm:text-sm md:text-lg font-bold">{props.title}</h4>
    <p className="text-[10px] sm:text-xs md:text-sm text-slate-600">
      Lorem ipsumitisdsd laborum.
    </p>
    <div className="text-[11px] sm:text-[12px] md:text-sm font-bold hover:underline hover:underline-offset-2 text-right cursor-pointer">
      Go to Category <FontAwesomeIcon icon={faArrowRight}/>
    </div>
  </div>
</Link>
    )
}