import Button from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

export default function ApiHeader({ api, isFollowed, onFollow }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{api.name}</h1>

          <FontAwesomeIcon
            icon={isFollowed ? solidBookmark : regularBookmark}
            className="text-purple-500 text-2xl cursor-pointer"
            onClick={onFollow}
          />
        </div>

        <img
          src="https://i.pravatar.cc/160"
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      <p className="text-gray-600 mt-2">
        Created by : <span className="font-semibold">{api.user?.username}</span>
      </p>

      <div className="flex gap-4 mt-6">
        <a href={api.officialLink} target="_blank">
          <Button className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg">
            Site officiel
          </Button>
        </a>

        <a href={api.documentationLink} target="_blank">
          <Button className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg">
            Documentation
          </Button>
        </a>
      </div>
    </>
  );
}