import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as solidThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as regularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as regularThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as solidThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "./Button";

export default function Comments({ comment }) {
    const [replyContent, setReplyContent] = useState('')
    const [showReply, setShowReply] = useState(false)

    const handleReply = async () => {
        const accessToken = localStorage.getItem('accessToken')
        console.log(comment._id)
        
        if (!replyContent) return;

        const response = await fetch(`http://localhost:3000/comments/${comment._id}/reply`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({content:replyContent})

        })
        const data = await response.json()
        console.log(data)

        if(data.result){
            console.log("reply", data.reply)
        }
        setReplyContent('')
        setShowReply(false)
    }

  return (
    <div
      key={comment._id}
      className="flex flex-col justify-between items-start gap-4 py-4 border-y border-slate-200"
    >
      <div className="flex w-full py-3 px-5 justify-between gap-3">
        <div className="flex w-full gap-3">
          <img
            src={comment.author?.image || "https://i.pravatar.cc/80"}
            className="w-12 h-12 rounded-full"
            alt={comment.author?.username}
          />
          <div className="w-full">
            <p className="font-semibold">{comment.author?.username}</p>
            <p className="text-gray-700 text-sm ">
              {comment.content}
            </p>
          </div>{" "}
        </div>
      </div>
      <div className="flex items-center px-5 gap-5">
        <div className="flex items-center gap-2">
          <button onClick={()=>setShowReply(!showReply)} className="text-sm text-[#7763da] hover:underline hover:underline-offset-2 hover:font-bold cursor-pointer">
            Answer
          </button>
          <div className="flex gap-1 items-center">
                      <span className="text-[#7763da]">(8)</span>
          <FontAwesomeIcon icon={faAngleDown} className="cursor-pointer" color="#7763da" width={10}/>

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
            <input onChange={(e) => setReplyContent(e.target.value)} type="text" placeholder="Write your answer" className=" w-full h-10 border px-2 border-slate-200" />
        <Button onClick={() => handleReply()}> Add your answer</Button>
        </div>
        
        
      )}
    </div>
  );
}
