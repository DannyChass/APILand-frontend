export default function InputText(props){

    if (props.classname) {
        return <input type={props.Type} name={props.Name} className={props.classname} placeholder={props.placeHolder} />
    }

    return(
        <div>
            <input className="inputText" name={props.Name} lab type={props.Type} placeholder={props.placeHolder} />
        </div>
    )
}