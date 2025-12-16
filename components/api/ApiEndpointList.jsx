import { useEffect, useState } from "react";

export default function ApiEndpointsList({ apiId, refreshKey }) {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!apiId) return;

        async function fetchEndpoints() {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:3000/api/${apiId}/endpoints`
                );

                const data = await res.json();

                if (data.result) {
                    setEndpoints(data.endpoints);
                }
            } catch (error) {
                console.error("Error fetching endpoints", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEndpoints();
    }, [apiId, refreshKey]);

    if (loading) {
        return <p className="text-gray-400">Loading endpoints ...</p>;
    }

    if (endpoints.length === 0) {
        return (
            <p className="text-gray-500 text-sm">
                No endpoint documented yet.
            </p>
        )
    }

    return (
        <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-lg font-semibold">Endpoints</h3>

            {endpoints.map((endpoint) => (
                <div
                    key={endpoint._id}
                    className="border rounded-lg p-4 bg-gray-50"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700 font-mono">
                            {endpoint.method}
                        </span>
                        <span className="font-mono text-sm">
                            {endpoint.path}
                        </span>
                    </div>

                    {endpoint.responseExamples?.length > 0 && (
                        <pre className="bg-white border rounded p-3 text-sm overflow-x-auto">
                            {JSON.stringify(
                                endpoint.responseExamples[0].example,
                                null,
                                2
                            )}
                        </pre>
                    )}
                </div>
            ))}
        </div>
    );
}