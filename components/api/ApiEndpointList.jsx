import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import Button from "../ui/Button";

export default function ApiEndpointsList({
    apiId,
    isOwner,
    refreshKey,
    onDeleted,
}) {
    const [endpoints, setEndpoints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openId, setOpenId] = useState(null)
    const [method, setMethod] = useState('get')

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

    const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };


    async function handleDelete(endpointId) {
        const confirm = window.confirm(
            "Are you sure you want to delete this endpoint?"
        );
        if (!confirm) return;

        try {
            const token = localStorage.getItem("accessToken");

            const res = await fetch(
                `http://localhost:3000/api/${apiId}/endpoints/${endpointId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok || !data.result) {
                console.error(data.error || "Delete failed");
                return;
            }

            onDeleted?.();

        } catch (error) {
            console.error("Error deleting endpoint:", error);
        }
    }

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
                    className="relative border rounded-lg p-4 border-slate-200 bg-gray-50"
                >
                    


                    <div className="flex justify-between items-center gap-3 mb-2">
                        <div className="flex items-center gap-5">
                            <span className={`px-2 py-1 text-md font-bold rounded 
                                ${endpoint.method === 'GET' ? 'text-green-500 bg-lime-100' : ""}
                                ${endpoint.method === 'POST' ? 'text-blue-500 bg-blue-100' : ""}
                                ${endpoint.method === 'PATCH' ? 'text-fuchsia-500 bg-fuchsia-100' : ""}
                                ${endpoint.method === 'PUT' ? 'text-orange-500 bg-orange-100' : ""}
                                ${endpoint.method === 'DELETE' ? 'text-red-500 bg-red-100' : ""}`}>
                            {endpoint.method}
                        </span>
                        <span className=" label">
                            {endpoint.path}
                        </span>
                        </div>
                        {openId === endpoint._id ? (
                            <FontAwesomeIcon onClick={()=> toggleOpen(endpoint._id)} icon={faXmark}/>
                        ) : (
                            <FontAwesomeIcon onClick={()=> toggleOpen(endpoint._id)} icon={faAngleDown}/>
                        )}
                        
                        
                    </div>
                        <div className="flex flex-col gap-4 items-end w-full">
                            { openId === endpoint._id && endpoint.responseExamples?.length > 0 && (
                        <pre className="bg-white border w-full border-slate-300 rounded p-3 text-sm font-mono overflow-x-auto">
                            {JSON.stringify(
                                endpoint.responseExamples[0].example,
                                null,
                                2
                            )}
                        </pre>
                    )}
                    {openId === endpoint._id && isOwner && (
                        <Button
                            onClick={() => handleDelete(endpoint._id)}
                            title="Delete endpoint"
                        >
                            delete
                        </Button>
                    )}
                        </div>
                    
                </div>
            ))}
        </div>
    );
}