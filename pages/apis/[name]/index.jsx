import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";
import Button from "../../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import useApiDetails from "./hooks/useApiDetails";
import useFollowApi from "./hooks/useFollowApi";
import ApiTabs from "../../../components/ui/ApiTabs";
import CommentsSection from "../../../components/api/CommentsSection";
import ApiHeader from "../../../components/api/ApiHeader";

export default function API() {
    const router = useRouter();
    const { name } = router.query;
    const { apiData, loading, error } = useApiDetails(name);
    const { isFollowed, toggleFollow } = useFollowApi(apiData?._id);

    const [activeTab, setActiveTab] = useState("description");
    const [isOwner, setIsOwner] = useState(false);
    const [news, setNews] = useState([]);
    const [newsLoading, setNewsLoading] = useState(false);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

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

    return (
        <>
            <Header />
            <div className="max-w-5xl w-full bg-white rounded-xl shadow p-10 flex gap-12">

                <div className="w-60 h-60 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600 text-3xl"></span>
                </div>

                <div className="flex flex-col justify-between flex-1">

                    <ApiHeader
                        api={apiData}
                        isFollowed={isFollowed}
                        onFollow={toggleFollow}
                    />

                    <ApiTabs activeTab={activeTab} onChange={setActiveTab} />

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

                    <CommentsSection apiId={apiData._id} />

                </div>

            </div>
        </>
    );
}