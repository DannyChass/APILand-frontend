import { useEffect, useState } from "react";
import Header from "../components/Header";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import AddAnAPI from "../components/AddAnApi";
import MyApiComponent from "../components/MyApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faAdd, faBook, faChartLine } from "@fortawesome/free-solid-svg-icons";

export default function AddAPI() {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('addApi')

  

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
        <div className="flex">
          <div className="flex justify-start bg-slate-100  w-70 pl-3 ">
                        <ul className="flex flex-col gap-3 px-3 py-5 w-full border-r-2 border-slate-200">
                            <li onClick={() => setActiveMenu('addApi')} className="listeSetting">Create an API <FontAwesomeIcon icon={faAdd}/></li>
                            <li onClick={() => setActiveMenu('myApi')} className="listeSetting">My API <FontAwesomeIcon icon={faBook}/></li>
                        </ul>
                        </div>
        <div className="w-full">
          {activeMenu === 'addApi' && (
           <AddAnAPI/>
          )}

          {activeMenu ===  'myApi' && user?.createdApis.length > 0 && (

            <div>
              <div className="flex  text-xl pl-20 font-bold text-slate-800  items-center h-20">
                <h5 >My API</h5>
              </div>
              <div className="mx-20 flex flex-wrap border border-slate-200">
                    <MyApiComponent />
                </div>
            </div>
                
                )}
            
        </div>
        </div>

    </div>
  )
}
