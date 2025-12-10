import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";

export default function API() {
    const router = useRouter();
    const { name } = router.query;

    const [apiData, setApiData] = useState(null);

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

            <div className="p-10 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{apiData.name}</h1>

                <p className="text-gray-700 mb-4">{apiData.description}</p>

                <div className="text-sm text-gray-500">
                    <p><strong>Category:</strong> {apiData.category || "None"}</p>
                    <p><strong>Documentation:</strong> {apiData.documentationLink || "Not provided"}</p>
                    <p><strong>Official link:</strong> {apiData.officialLink || "Not provided"}</p>
                </div>

                <div className="mt-4">
                    <p className="text-lg">⭐ Notation: {apiData.notation ?? "No rating"}</p>
                </div>
            </div>
        </>
    );
}