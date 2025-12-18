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
      const data = await res.json();
      console.log(data)

      if(data.result){

        setApis(data.apis)
      }

      

      
    })();
  }, []);
  
  let myApis;
  if (apis.length > 0) {
    myApis = apis.map((data, i) => {
      console.log(data)
      return (
        <ApiCards
          key={i}
          image={data.image}
          apiName={data.name}
          theme={data.category}
          price={data.price}
        />
      );
    });
  } else {
    myApis = <p>Pas d'Apis crées</p>
  }

  return <div className=" w-full flex flex-wrap ">{myApis}</div>;
}
