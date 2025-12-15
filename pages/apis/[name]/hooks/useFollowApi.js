import { useEffect, useState } from "react";

export default function useFollowApi(apiId) {
    const [isFollowed, setIsFollowed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!apiId) return;

        const token = localStorage.getItem("accessToken");
        if (!token) return;

        async function checkFollow() {
            try {
                const res = await fetch(
                    `http://localhost:3000/apis/follow/${apiId}/status`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await res.json();
                if (data.result) {
                    setIsFollowed(data.isFollowed);
                }
            } catch (error) {
                console.error("Erreur check follow:", error);
            }
        }

        checkFollow();
    }, [apiId]);

    async function toggleFollow() {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Vous devez être connecté");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `http://localhost:3000/apis/follow/${apiId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.result) {
                setIsFollowed(data.isFollowed);
            } else {
                alert(data.error || "Erreur lors du follow");
            }
        } catch (error) {
            console.error("Erreur toggle follow:", error);
        } finally {
            setLoading(false);
        }
    }

    return {
        isFollowed,
        toggleFollow,
        loading,
    };
}