import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Button from "../components/ui/Button";
import MyApiComponent from "../components/MyApi";
import Footer from "../components/Footer";
import {
  faArrowRightFromBracket,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import ButtonMenu from "../components/ui/ButtonMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ApiCards from "../components/ui/ApiCard";
import ApiCardV2 from "../components/ui/ApiCardV2";

export default function ProfilePage() {
  const router = useRouter();
  const { name } = router.query;
  const [activeMenu, setActiveMenu] = useState("Apis");
  const [updateProfile, setUpdateProfile] = useState(false);
  const [user, setUser] = useState({});
  const [description, setDescription] = useState(user.description || "");
  const [expanded, setExpanded] = useState(false);
  const [apiFollow, setApiFollow] = useState([]);
  const [apiData, setApiData] = useState(null);
  

  useEffect(() => {
    if (!name) return;

    async function fetchAPI() {
      try {
        const res = await fetch(`http://localhost:3000/apis/by-name/${name}`);
        const data = await res.json();

        if (data.result) {
          setApiData(data.api);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    }

    fetchAPI();
  }, [name]);

  // const handleUpdateProfile = () => {
  //   navigate('/SettingPage', {state: {activeSection: 'updateProfile'}})
  // }

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

  const isLong = user.description && user.description.length > 30;

  const displayText =
    expanded || !isLong
      ? user.description
      : user.description.slice(0, 30) + "...";

  const handleClick = async () => {
    setActiveMenu("Favs");
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch(
      `http://localhost:3000/users/follow/${user._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    console.log(data.data);
    setApiFollow(data.data);

    //console.log(apiFollow);
  };
console.log(apiFollow)
  const favorites = apiFollow.map((data, i) => {
    return (
      <ApiCardV2
        key={i}
        {...data.api}
        author={data.api.user.username}
        user={data.api.user}
        isFollwed ={true}
      />
    );
  });

  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col justify-center items-center gap-10 w-full">
        <div className=" w-full justify-center items-center flex  h-70 px-10 gap-15">
          <div className="flex justify-center flex-col w-full h-full">
            <div className="relative w-full h-64 sm:h-25 md:h-64 bg-slate-200">
              <img src="" alt="" />
            </div>
            <div className="flex flex-col h-64 sm:mt-3 md:flex-row justify-center mt-6 items-start md:items-start gap-3 md:gap-10">
              <div className=" w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex ">
                <img
                  src={user.image}
                  className="h-full w-full object-cover rounded-full"
                  alt="avatar"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-10 items-start justify-start px-3 md:px-3 border-t-2 md:border-t-0 md:border-l-2 border-slate-200 ">
                <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-base md:text-xl font-semibold">
                    {user.username}
                  </h3>
                  <h6 className="text-sm md:text-base text-gray-600">
                    {user.email}
                  </h6>
                  <h6 className="text-sm md:text-base text-gray-500">
                    {user.country ? `${user.country}` : ""}
                  </h6>
                  <div className="mt-2 w-full">
                    <p className="flex flex-wrap text-sm wrap-break-word whitespace-normal">
                      {displayText}
                    </p>
                    {isLong && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-500 block hover:underline text-sm mt-1"
                      >
                        {expanded ? "moins" : "plus"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="gap-5 flex">
                  {/* <Button  className="bg-[#050F2A] rounded-[3] flex justify-between gap-3 items-center text-sm text-white p-2 hover:bg-slate-700 cursor-pointer">
                    Update Profile <FontAwesomeIcon icon={faPencil} />
                  </Button>
                  <Button className="bg-[#B8A9FF] justify-between flex items-center rounded-[3] text-[#F2FDFF] text-sm w-[150px] p-2 text-shadow-2xs hover:bg-[#9d90de] cursor-pointer">
                    Share Profile{" "}
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  </Button> */}
                </div>
              </div>
              <div className="w-full md:w-1/3 flex  md:flex-row justify-center items-center md:items-end gap-6 md:gap-10 px-6 md:px-10 border-t-2 md:border-t-0 md:border-l-2 border-slate-200">
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
            <ButtonMenu
              onClick={() => setActiveMenu("Apis")}
              active={activeMenu === "Apis"}
              name="My Api"
            />
            <ButtonMenu
              onClick={() => handleClick()}
              active={activeMenu === "Favs"}
              name="My Fav"
            />
          </div>

          <hr className="border-2 w-full border-slate-200" />
        </div>
                    
        <div className="w-full max-w-[95%] mx-auto flex flex-col gap-6 mt-10">
          {activeMenu === "Apis" && (
            <div className='flex flex-wrap gap-6 sm:gap-8 md:gap-10 
      justify-start items-start 
      px-0.1 sm:px-6 sm:ml-30 md:px-10 md:ml-25'>{<MyApiComponent />}</div>
          )}

          {activeMenu === "Favs" &&
            (<div className='flex flex-wrap gap-6 sm:gap-8 md:gap-10 
      justify-start items-start 
      px-0.1 sm:px-6 sm:ml-30 md:px-10 md:ml-25 '>{favorites}</div> || (
              <div className='flex flex-wrap gap-6 sm:gap-8 md:gap-10 
      justify-start items-start 
      px-0.1 sm:px-6 sm:ml-30 md:px-10 md:ml-30 '>pas d'apis follow</div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
