import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Button from "../../components/ui/Button";

export default function API() {
    const router = useRouter();
    const { name } = router.query;

    const [apiData, setApiData] = useState(null);
    const [comment, setComment] = useState("");

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

    if (!apiData) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className="max-w-5max-w-5xl w-full bg-white rounded-xl shadow p-10 flex gap-12">

                <div className="w-60 h-60 bg-gray-300 rounded-xl flex items-center justify-center">
                    <span className="text-gray-600 text-3xl"></span>
                </div>

                <div className="flex flex-col justify-between flex-1">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{apiData.name}</h1>
                        <img
                            src=""
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    </div>

                    <p className="text-gray-600 mt-2">{apiData.description}</p>

                    <div className="flex gap-4 mt-6">
                        <Button className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg">
                            Suivre
                        </Button>

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

                    <div className="max-w-5xl w-full bg-white rounded-xl shadow p-10 mt-10 h-64 flex items-center justify-center text-gray-400">
                        Exemple
                    </div>

                    <div className="max-w-5xl w-full mt-10">
                        <h2 className="text-xl font-semibold mb-4">Comments</h2>

                        <div className="flex gap-4 mb-8">
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add comment"
                                className="flex-1 px-4 py-2 bg-white border rounded-lg"
                            />

                            <Button className="px-6 py-2 bg-purple-300 hover:bg-purple-400 transition rounded-lg">
                                Add
                            </Button>
                        </div>

                        <div className="flex items-start gap-4">
                            <img
                                src="https://i.pravatar.cc/80"
                                className="w-12 h-12 rounded-full"
                            />

                            <p className="mt-2 text-gray-700">Comment</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}