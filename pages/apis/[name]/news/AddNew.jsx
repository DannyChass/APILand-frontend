import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import Button from "../../../../components/ui/Button";

export default function AddNews() {
    const router = useRouter();
    const { name } = router.query;

    const [apiData, setApiData] = useState(null);
    const [checking, setChecking] = useState(true);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (!router.isReady || !name) return;

        async function fetchAPI() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/apis/by-name/${encodeURIComponent(name)}`
                );

                const data = await res.json();

                if (!data.result) {
                    router.replace("/");
                    return;
                }

                setApiData(data.api);
            } catch (err) {
                console.error("Fetch API error:", err);
                router.replace("/");
            } finally {
                setChecking(false);
            }
        }

        fetchAPI();
    }, [router.isReady, name]);

    useEffect(() => {
        if (!apiData) return;

        async function checkOwnership() {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                router.replace(`/apis/${name}`);
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        credentials: "include",
                    }
                );

                const data = await res.json();

                if (!data.result || data.user._id !== apiData.user._id) {
                    router.replace(`/apis/${name}`);
                }
            } catch (err) {
                console.error("Ownership check error:", err);
                router.replace(`/apis/${name}`);
            }
        }

        checkOwnership();
    }, [apiData]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !content) {
            alert("Title and content are required");
            return;
        }

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("You must be logged in");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/news`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        image,
                        apiId: apiData._id,
                    }),
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (!data.result) {
                alert(data.error || "Erreur lors de la publication");
                return;
            }

            router.push(`/apis/${name}?tab=news`);
        } catch (err) {
            console.error("Create news error:", err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    }

    if (checking || !apiData) {
        return <div className="p-10 text-center">Loading...</div>;
    }

    return (
        <>
            <Header />

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-10 mt-10">
                <h1 className="text-2xl font-bold mb-6">
                    Add news for{" "}
                    <span className="text-purple-500">{apiData.name}</span>
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