import { useState } from "react";
import Button from "../ui/Button";

export default function AddEndpointForm({ apiId }) {
    const [method, setMethod] = useState("GET");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState(200);
    const [jsonExample, setJsonExample] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        let parsedJson;
        try {
            parsedJson = JSON.parse(jsonExample);
        } catch {
            setError("Response example must be valid JSON");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(
                `http://localhost:3000/api/${apiId}/endpoints`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        method,
                        path,
                        responseExamples: [
                            {
                                status,
                                example: parsedJson,
                            },
                        ],
                    }),
                }
            );

            const data = await res.json();

            if (!data.result) {
                setError(data.error || "Failed to create endpoint");
            } else {
                setPath("");
                setJsonExample("");
                setSuccess(true);
            }
        } catch {
            setError("Server error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full sticky top-24 border rounded-xl p-6 bg-gray-50 shadow flex flex-col gap-4"
        >
            <h3 className="text-lg font-semibold">
                Add API endpoint
            </h3>

            <div>
                <label className="text-sm font-medium">Method</label>
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                </select>
            </div>

            <div>
                <label className="text-sm font-medium">Path</label>
                <input
                    type="text"
                    placeholder="/weather"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    required
                />
            </div>

            <div>
                <label className="text-sm font-medium">HTTP status</label>
                <input
                    type="number"
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                    className="border rounded px-3 py-2 w-full"
                />
            </div>

            <div>
                <label className="text-sm font-medium">
                    Response example (JSON)
                </label>
                <textarea
                    placeholder={`{\n  "temp": 18,\n  "humidity": 70\n}`}
                    value={jsonExample}
                    onChange={(e) => setJsonExample(e.target.value)}
                    className="border rounded px-3 py-2 w-full font-mono text-sm"
                    rows={6}
                    required
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Endpoint created</p>}

            <Button disabled={loading}>
                {loading ? "Creating..." : "Add endpoint"}
            </Button>
        </form>
    );
}