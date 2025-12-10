import { useEffect, useState } from "react";
import ApiCards from "./ui/ApiCard";

export default function MyApiComponent() {
  const [user, setUser] = useState(null);
  const [apis, setApis] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    async () => {
      const response = await fetch("http://localhost:3000/user/me");
      const data = await response.json();

      const res = await fetch(`http://localhost:3000/api/${data.user._id}`);
      const userApi = await res.json();

        setApis(userApi.apis)
    };
  }, []);

  const myApis = apis.map((data,i) => {
    return <ApiCards key={i} apiName={data.name} theme={data.category} price={data.price}   />
  })
  

  return <div className="">

  </div>;
}
