import { useEffect, useState } from "react";
import Header from "../components/Header";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import MyApiComponent from "../components/MyApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faAdd } from "@fortawesome/free-solid-svg-icons";

export default function AddAPI() {
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUser(data.user);
    })();
  }, []);

useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
        <Header />
        <div className="h-30 border-b-2 border-slate-300 flex justify-start items-end mx-20 gap-10 px-20 py-5">
            <button className=" flex gap-2 items-center px-8 py-3 rounded-lg bg-[#B8A9FF] text-white font-bold cursor-pointer hover:bg-[#9d89ff]"><FontAwesomeIcon icon={faAdd}/>Add an Api</button>
            <p className="text-lg font-normal text-slate-600">nombres d'API publiées : <span className="font-bold text-[#B8A9FF]">{user?.createdApis.length}</span></p>
        </div>

        <div>
            {user?.createdApis.length > 0 && (
                <div>
                    <MyApiComponent />
                </div>
                )}
        </div>
    </div>
  )
}
