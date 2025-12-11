import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Button from "../components/ui/Button";
import MyApiComponent from "../components/MyApi";
import {
  faArrowRightFromBracket,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import ButtonMenu from "../components/ui/ButtonMenu";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [active, setActive] = useState('Api')
    const [user, setUser] = useState({})

    useEffect(()=>{
      (async () => {
        const response = await fetch('http://localhost:3000/users/me');
        const data = await response.json()
        setUser(data)
      })()
    },[])
 console.log(user)
    const handleApi= () => {
        setActive('Api')
    }

    const handleFav =  () => {
        setActive('Favs')
    }

    const handleGirlfriends = () => {
        setActive('Girlfriends')
    }


  return (
    <div className="w-full">
      <Header />
      <div className="relative flex flex-col justify-center items-center gap-10 w-full">
        <div className=" w-full justify-center items-center flex  h-70 px-10 gap-15">
          <div className="flex justify-center flex-col w-full h-full">
            <div className=" absolute top-0 -z-10 left-0  w-full h-30 bg-slate-200 ">
              <img src="" alt=""  />
            </div>
<div className="flex justify-center mt-10 items-end gap-10">
 <div className="w-[20%]  flex items-center justify-center h-full">
            <img src="" className="h-60 w-60 rounded-full bg-black" alt="" />
          </div>
          <div className="h-[40%] w-[30%] flex flex-col gap-2 justify-end px-10 border-l-2 border-slate-200">
            <div>
              <h3>Username</h3>
              <h6>Job</h6>
              <h6>Location</h6>
            </div>

            <div className="gap-5 flex">
              <Button classname="bg-[#050F2A] rounded-[3] text-sm text-white p-2 hover:bg-slate-700 cursor-pointer">
                Update Profile <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button className="bg-[#B8A9FF] justify-between rounded-[3] text-[#F2FDFF] text-sm w-[150px] p-2 text-shadow-2xs hover:bg-[#9d90de] cursor-pointer">
                Share Profile <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </Button>
            </div>
          </div>
          <div className="h-[40%] w-[30%] justify-center flex gap-10 px-10 border-l-2 border-slate-200">
            <div className="userStats">
              <h5 className="text-lg">Followers</h5>
              <h4 className="text-3xl font-bold">2454</h4>
            </div>
            <div className="userStats">
              <h5 className="text-lg">Following</h5>
              <h4 className="text-3xl font-bold">501</h4>
            </div>
            <div className="userStats">
              <h5 className="text-lg">Like</h5>
              <h4 className="text-3xl font-bold">501</h4>
            </div>
          </div>
        </div>


</div>

            
          </div>

         
        <div className=" gap-2 px-50 h-20 w-full flex flex-col justify-end items-start">
          <div className="flex gap-5">
            <ButtonMenu name="My Api" />
            <ButtonMenu name="My Fav" />
            <ButtonMenu name="My Girlfriends" />
          </div>

          <hr className="border-2 w-full border-slate-200" />
        </div>

        <div className="border border-slate-200 flex h-90 w-[80%]">
        {active === "Api" && <MyApiComponent />}
        </div>
      </div>
    </div>
  );
}
