import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export default function BootstrapUser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        fetch("http://localhost:3000/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    dispatch(setUser(data.user));
                }
            })
            .catch(() => {
                localStorage.removeItem("accessToken");
            });
    }, []);

    return null;
}