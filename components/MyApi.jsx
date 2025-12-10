import { useEffect, useState } from "react";
import ApiCards from "./ui/ApiCard";

export default function MyApiComponent() {
  const [user, setUser] = useState({});
  const [apis, setApis] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    console.log(stored);

    if (!stored) return;

    const object = JSON.parse(stored);
    

    (async () => {
      const res = await fetch(`http://localhost:3000/apis/user/${object.id}`);
      const userApi = await res.json();

      setApis(userApi.apis)
    })();
  }, []);
  
  let myApis = <p>Pas d'Apis crées</p>;
  if (apis.length > 0) {
    myApis = apis.map((data, i) => {
      return (
        <ApiCards
          key={i}
          apiName={data.name}
          theme={data.category}
          price={data.price}
        />
      );
    });
  }

  return <div className=" w-full flex flex-wrap justify-start">{myApis}</div>;
}
