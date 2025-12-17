import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as regularThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as solidThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function Comments({ comment, apiId }) {
  const [replyContent, setReplyContent] = useState("");
  const [showReply, setShowReply] = useState(false)
  const [allReply, setAllReply] = useState(false);
  const [comments, setComments] = useState(null);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const isReply = !!comment.parentComment;


  useEffect(() => {
    if (!apiId) return;
    showAnswer();
  }, [apiId]);

  const handleReply = async () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(comment._id);

    if (!replyContent) return;

    const response = await fetch(
      `http://localhost:3000/comments/${comment._id}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: replyContent }),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.result) {
      console.log("reply", data.reply);
    }
    setReplyContent("");
    setShowReply(false);
  };

  const fetchReplies = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/comments/${comment._id}/replies`
      );
      const data = await res.json();
      if (data.result) {
        setReplies(data.replies);
      }
    } catch (error) {
      console.error("Erreur fetching replies:", error);
    }
  };

  const toggleReplies = () => {
    if (!showReplies) {
        fetchReplies()
    }
    setShowReplies(!showReplies)
  }

  return (
    <div
      key={comment._id}
      className={`flex flex-col justify-between items-start gap-4 py-4 border-y  border-slate-200 ${isReply ? "ml-6 border-l-2 border-y-0 pl-4 py-2  gap-2 text-sm" : 'text-md'}`}

    >
      <div className={`flex w-full px-5 justify-between gap-3 ${isReply ? "" : "py-3"}`}>
        <div className="flex w-full gap-3">
          <img
            src={comment.author?.image || "https://i.pravatar.cc/80"}
            className={` rounded-full ${isReply ? "w-8 h-8": "w-12 h-12"}`}
            alt={comment.author?.username}
          />
          <div className="w-full">
            <p className={`font-semibold ${isReply ? "text-xs":""}`}>{comment.author?.username}</p>
            <p className={`text-gray-700 ${isReply ? "text-xs m-0 p-0":""}`}>{comment.content}</p>
          </div>{" "}
        </div>
      </div>
      <div className={`flex items-center px-5  ${isReply ? "gap-3 text-xs   " : "gap-5"}`}>
        <div className={`flex items-center  ${isReply ? "gap-1":"gap-2"}`}>
          <button
            onClick={() => setShowReply(!showReply)}
            className={`"text-sm text-[#7763da] hover:underline hover:underline-offset-2 hover:font-bold cursor-pointer" ${isReply ? "text-xs" :""}`}
          >
            Answer
          </button>
          <div className="flex gap-1 items-center">
            <span className="text-[#7763da]">(8)</span>
            {allReply === true ? (
              <FontAwesomeIcon
                icon={faAngleUp}
                onClick={toggleReplies}
                className="cursor-pointer"
                color="#7763da"
                width={10}
              />
            ) : (
              <FontAwesomeIcon
                icon={faAngleDown}
                onClick={toggleReplies  }
                className="cursor-pointer"
                color="#7763da"
                width={10}
              />
            )}
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={regularThumbsUp} />
          <span>8</span>
        </div>
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={regularThumbsDown} />
          <span>7</span>
        </div>
      </div>
      {showReply && (
        <div className="flex flex-col gap-2 items-end w-full mx-5">
          <input
            onChange={(e) => setReplyContent(e.target.value)}
            type="text"
            placeholder="Write your answer"
            className=" w-full h-10 border px-2 border-slate-200"
          />
          <Button onClick={() => handleReply()}> Add your answer</Button>
        </div>
      )}

      {showReplies && replies?.length > 0 && (
        <div>
          {replies.map((reply) => {
           return <Comments key={reply._id} comment={reply} />;
          })}
        </div>
      )}
    </div>
  );
}
