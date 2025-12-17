"use client"; // si tu es en app router

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {Atom} from 'react-loading-indicators'

export default function GitHubCallback() {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const res = await fetch(`http://localhost:3000/users/auth/github/callback?code=${code}`);
          const data = await res.json();

          if (data.result) {
            // 👉 Stocke les infos
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));

            // 👉 Redirige vers Home
            router.push("/");
          } else {
            console.error("Erreur login GitHub:", data.error);
          }
        } catch (err) {
          console.error("Erreur réseau:", err);
        }
      }
    };

    fetchUser();
  }, [router]);

  return <div className="h-screen w-full flex justify-center items-center">
    <Atom color="#B8A9FF" size="medium" text="" textColor="" />;
    </div>
}