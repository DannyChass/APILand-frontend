import { useEffect, useState } from "react";

export default function useApiDetails(name) {
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!name) return;

        let isMounted = true;
        setLoading(true);
        setError(null);

        async function fetchApi() {
            try {
                const res = await fetch(
                    `http://localhost:3000/apis/by-name/${name}`
                );

                const data = await res.json();

                if (!data.result) {
                    throw new Error(data.error || "API not found");
                }

                if (isMounted) {
                    setApiData(data.api);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setApiData(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchApi();

        return () => {
            isMounted = false;
        };
    }, [name]);

    return {
        apiData,
        loading,
        error,
    };
}