import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Button from "../../../components/ui/Button";
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
    const [activeTab, setActiveTab] = useState("description");
    const [isOwner, setIsOwner] = useState(false);
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(false);

    useEffect(() => {
        if (!name) return

        async function fetchAPI() {
            try {

                const res = await fetch(`http://localhost:3000/apis/by-name/${name}`);
                const data = await res.json();

                if (data.result) {
                    console.log(data.api);
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

    useEffect(() => {
        async function checkOwnership() {
            const token = localStorage.getItem("accessToken");
            if (!token || !apiData?.user?._id) return;

            const res = await fetch("http://localhost:3000/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.result && data.user._id === apiData.user._id) {
                setIsOwner(true);
            }
        }

        checkOwnership();
    }, [apiData]);

    useEffect(() => {
        if (apiData?._id) {
            fetchNews();
        }
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

    async function fetchNews() {
        if (!apiData?._id) return;

        setNewsLoading(true);

        try {
            const res = await fetch(
                `http://localhost:3000/apis/${apiData._id}/news`
            );
            const data = await res.json();

            if (data.result) {
                setNews(data.news);
            }
        } catch (error) {
            console.error("Erreur fetching news:", error);
        } finally {
            setNewsLoading(false);
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

                    <div className="mt-10">
                        <div className="flex gap-6">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`pb-2 border-b-2 ${activeTab === "description"
                                    ? "border-purple-500 font-semibold"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                Description
                            </button>

                            <button
                                onClick={() => setActiveTab("example")}
                                className={`pb-2 border-b-2 ${activeTab === "example"
                                    ? "border-purple-500 font-semibold"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                Exemple
                            </button>

                            <button
                                onClick={() => setActiveTab("test")}
                                className={`pb-2 border-b-2 ${activeTab === "test"
                                    ? "border-purple-500 font-semibold"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                Test
                            </button>

                            <button
                                onClick={() => setActiveTab("news")}
                                className={`pb-2 border-b-2 ${activeTab === "news"
                                    ? "border-purple-500 font-semibold"
                                    : "border-transparent text-gray-500"
                                    }`}
                            >
                                News
                            </button>
                        </div>

                        <hr className="border-slate-200 mt-2" />
                    </div>

                    <div className="max-w-5xl w-full bg-white rounded-xl shadow p-10 mt-6 min-h-[250px]">

                        {activeTab === "description" && (
                            <p className="text-gray-700">
                                {apiData.description || "Aucune description disponible."}
                            </p>
                        )}

                        {activeTab === "example" && (
                            <div className="text-gray-400 flex items-center justify-center h-full">
                                Exemple
                            </div>
                        )}

                        {activeTab === "test" && (
                            <div className="text-gray-400 flex items-center justify-center h-full">
                                Test
                            </div>
                        )}

                        {activeTab === "news" && (
                            <div className="flex flex-col gap-6">

                                {isOwner && (
                                    <div className="flex justify-center">
                                        <Button
                                            className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg"
                                            onClick={() => router.push(`/apis/${apiData.name}/news/AddNew`)}
                                        >
                                            Add news
                                        </Button>
                                    </div>
                                )}

                                {newsLoading && (
                                    <div className="text-gray-400 text-center">Loading news...</div>
                                )}

                                {!newsLoading && news.length === 0 && (
                                    <div className="text-gray-500 text-center py-20">
                                        No news published yet.
                                    </div>
                                )}

                                {!newsLoading && news.length > 0 && (
                                    <div className="flex flex-col gap-6">
                                        {news.map((n) => (
                                            <div
                                                key={n._id}
                                                className="border rounded-lg p-6 bg-gray-50"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="text-lg font-semibold">{n.title}</h3>
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(n.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <p className="text-gray-700 mb-4">{n.content}</p>

                                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                                    <img
                                                        src={n.author?.image || "https://i.pravatar.cc/40"}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <span>{n.author?.username}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        )}

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