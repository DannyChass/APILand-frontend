export default function Button(props) {
    console.log(props.classname!==undefined);
    if(props.classname!==undefined){
        return <button className={props.classname}>{props.children}</button>
    }
    return (
        <button className= "bg-[#B8A9FF] rounded-[3] text-[#F2FDFF] text-sm w-[150px]   p-3 text-shadow-2xs hover:bg-[#9d90de] cursor-pointer ">{props.children}</button>
        
    )
}