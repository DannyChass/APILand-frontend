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
  const [activeMenu, setActiveMenu] = useState("Api");
  const [updateProfile, setUpdateProfile]= useState(false)
  const [user, setUser] = useState({});

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
      console.log(data);
      setUser(data.user);
    })();
  }, []);

  const toggleUpdateProfile = () => {
    setUpdateProfile(true)
  }

  return (
    <div className="w-full">
      <Header />
      <div className="relative flex flex-col justify-center items-center gap-10 w-full">
        <div className=" w-full justify-center items-center flex  h-70 px-10 gap-15">
          <div className="flex justify-center flex-col w-full h-full">
            <div className=" absolute top-0 -z-10 left-0 w-full h-20 sm:h-20 md:h-25 bg-slate-200">
              <img src="" alt="" />
            </div>
            <div className="flex flex-col sm:mt-20 md:flex-row justify-center mt-10 items-center md:items-end gap-3 md:gap-10">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="./homme.png"
                  className="h-full w-full object-cover rounded-full"
                  alt="avatar"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-2 justify-end px-6 md:px-10 border-t-2 md:border-t-0 md:border-l-2 border-slate-200 mt-6 md:mt-0">
                <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-base md:text-xl font-semibold">
                    {user.username}
                  </h3>
                  <h6 className="text-sm md:text-base text-gray-600">
                    {user.email}
                  </h6>
                  <h6 className="text-sm md:text-base text-gray-500">
                    Location
                  </h6>
                </div>

                <div className="gap-5 flex">
                  <Button className="bg-[#050F2A] rounded-[3] flex justify-between gap-3 items-center text-sm text-white p-2 hover:bg-slate-700 cursor-pointer">
                    Update Profile <FontAwesomeIcon icon={faPencil} />
                  </Button>
                  <Button className="bg-[#B8A9FF] justify-between flex items-center rounded-[3] text-[#F2FDFF] text-sm w-[150px] p-2 text-shadow-2xs hover:bg-[#9d90de] cursor-pointer">
                    Share Profile{" "}
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </Button>
                </div>
              </div>
              <div
                className="w-full md:w-1/3 flex  md:flex-row justify-center items-center md:items-end gap-6 md:gap-10 px-6 md:px-10 border-t-2 md:border-t-0 md:border-l-2 border-slate-200"
              >
                <div className="userStats text-center md:text-left">
                  <h5 className="text-base md:text-lg">Followers</h5>
                  <h4 className="text-2xl md:text-3xl font-bold">2454</h4>
                </div>
                <div className="userStats text-center md:text-left">
                  <h5 className="text-base md:text-lg">Following</h5>
                  <h4 className="text-2xl md:text-3xl font-bold">501</h4>
                </div>
                <div className="userStats text-center md:text-left">
                  <h5 className="text-base md:text-lg">Like</h5>
                  <h4 className="text-2xl md:text-3xl font-bold">501</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" gap-2 px-50 h-20 w-full flex flex-col justify-end items-start">
          <div className="flex gap-5">
            <ButtonMenu onClick={()=>setActiveMenu('Apis')} active={activeMenu=== 'Apis'} name="My Api" />
            <ButtonMenu onClick={()=>setActiveMenu('Favs')}active={activeMenu==='Favs'} name="My Fav" />
            <ButtonMenu onClick={()=>setActiveMenu('Girlfriends')}active={activeMenu==='Girlfriends'} name="My Girlfriends" />
          </div>

          <hr className="border-2 w-full border-slate-200" />
        </div>

        <div className="border border-slate-200 flex w-[80%] ">
          {user.createdApis?.length > 0 ? (
            <div className="w-full flex flex-wrap">
              <MyApiComponent />
            </div>
          ) : (
            <div className="w-full h-90">
              <MyApiComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
