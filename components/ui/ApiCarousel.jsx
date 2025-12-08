import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"



export default function ApiCarousel(props) {

    return (
        <div>
            <div className="title">{props.title}</div>
            <div>{props.carousel}</div>
            <div className="w-full justify-center items-center">
                <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faCircle}></FontAwesomeIcon>
            </div>
        </div>
    )
}