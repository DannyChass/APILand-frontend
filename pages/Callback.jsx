import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { useRouter } from "next/router";

export default function Callback() {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) return;

        console.log("CODE:", code);

        const login = async () => {
            const res = await fetch(
                `http://localhost:3000/users/auth/github/callback?code=${code}`
            );
            const data = await res.json();

            console.log("BACK RESPONSE:", data);

            if (!data.result) {
                router.push("/");
                return;
            }

            localStorage.setItem("accessToken", data.accessToken);

            const meRes = await fetch("http://localhost:3000/users/me", {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
            });
            const meData = await meRes.json();

            console.log(meData);

            if (meData.result) {
                dispatch(setUser(meData.user));
                router.push("/");
            }
        };

        login();
    }, []);

    return <p>Connexion GitHub en cours…</p>;
}