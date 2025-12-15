import { useEffect, useState } from "react";
import Button from "../ui/Button";

export default function CommentsSection({ apiId }) {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!apiId) return;
        fetchComments();
    }, [apiId]);

    async function fetchComments() {
        try {
            const res = await fetch(
                `http://localhost:3000/apis/${apiId}/comments`
            );
            const data = await res.json();

            if (data.result) {
                setComments(data.comments);
            }
        } catch (error) {
            console.error("Erreur fetching comments:", error);
        }
    }

    async function handleAddComment() {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("Vous devez être connecté pour commenter");
            return;
        }

        if (!comment.trim()) {
            alert("Le commentaire est vide");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `http://localhost:3000/apis/${apiId}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ content: comment }),
                }
            );

            const data = await res.json();

            if (data.result) {
                setComment("");
                fetchComments();
            } else {
                alert(data.error || "Erreur lors de l'ajout du commentaire");
            }
        } catch (error) {
            console.error("Erreur ajout commentaire:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-5xl w-full mt-10">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {/* Add comment */}
            <div className="flex gap-4 mb-8">
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment"
                    className="flex-1 px-4 py-2 bg-white border rounded-lg"
                />

                <Button
                    className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg"
                    onClick={handleAddComment}
                    disabled={loading}
                >
                    {loading ? "Sending..." : "Add"}
                </Button>
            </div>

            {/* Comments list */}
            <div className="flex flex-col gap-6">
                {comments.length === 0 && (
                    <p className="text-gray-500">No comments yet.</p>
                )}

                {comments.map((c) => (
                    <div key={c._id} className="flex items-start gap-4">
                        <img
                            src={c.author?.image || "https://i.pravatar.cc/80"}
                            className="w-12 h-12 rounded-full"
                            alt={c.author?.username}
                        />

                        <div>
                            <p className="font-semibold">{c.author?.username}</p>
                            <p className="text-gray-700">{c.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}