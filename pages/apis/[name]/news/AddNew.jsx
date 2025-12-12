import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import Button from "../../../../components/ui/Button";

export default function AddNews() {
    const router = useRouter();
    const { name } = router.query;

    const [apiData, setApidData] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!name) return;

        async function fetchAPI() {
            const res = await fetch(`http://localhost:3000/apis/${name}`);
            const data = await res.json();

            if (data.result) {
                setApidData(data.api);
            } else {
                router.push("/");
            }
        }

        fetchAPI();

    }, [name]);

    useEffect(() => {
        async function checkOwnerShip() {
            const token = localStorage.getItem("accessToken");
            if (!token || !apiData) return

            const res = await fetch("http://localhost:3000/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await res.json();

            if (!data.result || data.user._id !== apiData.user._id) {
                router.push(`/apis/${name}`);
            }
        }

        checkOwnerShip();
    }, [apiData]);


    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !content) {
            alert("Title and content required");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("You must be logged in");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    image,
                    apiId: apiData._id
                }),
            });

            const data = await res.json();

            if (data.result) {
                alert("News publiée avec succès !");
                router.push(`/apis/${name}?tab=news`);
            } else {
                alert(data.error || "Erreur lors de la publication de la news");
                alert(data.error);
            }

        } catch (error) {
            console.error("Create news error :", error);
            alert("Servor error");
        } finally {
            setLoading(false);
        }
    }


    if (!apiData) return <div>Loading...</div>;

    return (
        <>
            <Header />

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-10 mt-10">
                <h1 className="text-2xl font-bold mb-6">
                    Add news for <span className="text-purple-500">{apiData.name}</span>
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="News title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    />

                    <textarea
                        placeholder="News content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        className="px-4 py-2 border rounded-lg resize-none"
                    />

                    <input
                        type="text"
                        placeholder="Image URL (optional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                    />

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            className="px-6 py-2 bg-gray-200 hover:bg-gray-300"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="px-6 py-2 bg-purple-300 hover:bg-purple-400"
                            disabled={loading}
                        >
                            {loading ? "Publishing..." : "Publish"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}