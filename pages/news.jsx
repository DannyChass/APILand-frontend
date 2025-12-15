import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("http://localhost:3000/news");
                const data = await res.json();

                if (data.result) {
                    setNews(data.news);
                }


            } catch (error) {
                console.error("Fetch news error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [])

    return (
        <>
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold mb-6">API News</h1>

                {loading && (
                    <p className="text-zinc-400">Loading news...</p>
                )}

                {!loading && news.length === 0 && (
                    <p className="text-zinc-400">No news available.</p>
                )}

                <div className="space-y-6">
                    {news.map(item => (
                        <article
                            key={item._id}
                            className="bg-zinc-900 rounded-xl p-5 space-y-3"
                        >
                            <div className="flex items-center gap-3 text-sm text-zinc-400">
                                {item.api?.image && (
                                    <img
                                        src={item.api.image}
                                        alt={item.api.name}
                                        className="w-6 h-6 rounded"
                                    />
                                )}
                                <span className="font-medium text-zinc-300">
                                    {item.api?.name}
                                </span>
                                <span>•</span>
                                <span>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h2 className="text-lg font-semibold">
                                {item.title}
                            </h2>

                            <p className="text-zinc-300 whitespace-pre-line">
                                {item.content}
                            </p>
                        </article>
                    ))}
                </div>
            </main>
        </>
    )
}