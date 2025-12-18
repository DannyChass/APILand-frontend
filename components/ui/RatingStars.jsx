import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

export default function RatingStars({ average = 0, count = 0 }) {
    const rounded = Math.round(average);

    return (
        <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                    <FontAwesomeIcon
                        key={i}
                        icon={i <= rounded ? solidStar : regularStar}
                    />
                ))}
            </div>

            <span className="text-sm text-gray-500">
                {average > 0 ? average.toFixed(1) : "No rating"} ({count})
            </span>
        </div>
    );
}