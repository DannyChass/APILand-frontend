import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApiCards from "./ui/ApiCard";
import ApiCardV2 from "./ui/ApiCardV2";

export default function MyApiComponent() {
  const user = useSelector((state) => state.user.data);
  const [apis, setApis] = useState([]);

  useEffect(() => {
    if (!user) return;
    if (!user.id && !user._id) return;

    const userId = user.id || user._id;

    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/apis/user/${userId}`
        );
        const data = await res.json();

        if (data.result && Array.isArray(data.apis)) {
          setApis(data.apis);
        }
      } catch (err) {
        console.error("Failed to fetch user APIs", err);
      }
    })();
  }, [user]);

  if (user === null) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Veuillez vous connecter</p>;
  }

  if (apis.length === 0) {
    return <p>Pas d'APIs créées</p>;
  }
  console.log("apis:" ,apis)

  return (
    <div className="w-full flex flex-wrap gap-10">
      {apis.map((api, i) => (
        <ApiCardV2
        key={i}
        {...api}
        author={user.username}
        user={user}
        />
      ))}
    </div>
  );
}