import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

export default function API() {
    const router = useRouter();
    const { name } = router.query;

    const [apiData, setApiData] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!name) return

        async function fetchAPI() {
            try {

                const res = await fetch(`http://localhost:3000/apis/${name}`);
                const data = await res.json();

                if (data.result) {
                    setApiData(data.api);
                }
            } catch (error) {
                console.error("Error fetching API:", error);
            }
        }

        fetchAPI();
    }, [name]);

    useEffect(() => {
        if (apiData?._id) {
            fetchComments();
        }
    }, [apiData]);

    useEffect(() => {
        if (!apiData?._id) return;

        async function checkFollow() {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            const res = await fetch(`http://localhost:3000/apis/follow/${apiData._id}/status`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            if (data.result) {
                setIsFollowed(data.isFollowed);
            }
        }

        checkFollow();
    }, [apiData]);

    if (!apiData) return <div>Loading...</div>;

    async function handleFollow() {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Vous devez être connecté");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/apis/follow/${apiData._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (data.result) {
                setIsFollowed(data.isFollowed);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Erreur follow", error);
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

        try {
            const res = await fetch(`http://localhost:3000/apis/${apiData._id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ content: comment })
            })

            const data = await res.json();

            if (data.result) {
                alert("Commentaire ajouté");

                setComment("");

                fetchComments();

            } else {
                alert(data.error || "Erreur lors de l'ajout du commentaire");
            }

        } catch (error) {
            console.error("Erreur ajout commentaire:", error);
        }
    }

    async function fetchComments() {
        try {
            const res = await fetch(`http://localhost:3000/apis/${apiData._id}/comments`);
            const data = await res.json();

            if (data.result) {
                setComments(data.comments);
            }

        } catch (error) {
            console.error("Erreur fetching comments", error);
        }
    }

    return (
        <>
            <Header />
            <div className="max-w-5xl w-full bg-white rounded-xl shadow p-10 flex gap-12">

                <div className="w-60 h-60 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600 text-3xl"></span>
                </div>

                <div className="flex flex-col justify-between flex-1">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-bold">{apiData.name}</h1>

                            <FontAwesomeIcon
                                icon={isFollowed ? solidBookmark : regularBookmark}
                                className="text-purple-500 text-2xl cursor-pointer"
                                onClick={handleFollow}
                            />
                        </div>

                        <img
                            src="https://i.pravatar.cc/160"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    </div>

                    <p className="text-gray-600 mt-2">
                        Created by : <span className="font-semibold">{apiData.user?.username}</span>
                    </p>

                    <div className="flex gap-4 mt-6">
                        <a href={apiData.officialLink} target="_blank">
                            <Button className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg">
                                Site officiel
                            </Button>
                        </a>

                        <a href={apiData.documentationLink} target="_blank">
                            <Button className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg">
                                Documentation
                            </Button>
                        </a>
                    </div>

                    {/* Zone d'exemple */}
                    <div className="max-w-5xl w-full bg-white rounded-xl shadow p-10 mt-10 h-64 flex items-center justify-center text-gray-400">
                        Exemple
                    </div>

                    {/* COMMENTAIRES */}
                    <div className="max-w-5xl w-full mt-10">
                        <h2 className="text-xl font-semibold mb-4">Comments</h2>

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
                            >
                                Add
                            </Button>
                        </div>

                        <div className="mt-6 flex flex-col gap-6">
                            {comments.map((c) => (
                                <div key={c._id} className="flex items-start gap-4">
                                    <img
                                        src={c.author?.image || "https://i.pravatar.cc/80"}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">{c.author?.username}</p>
                                        <p className="text-gray-700">{c.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}