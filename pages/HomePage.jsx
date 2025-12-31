import ThemeButton from "../components/ui/ThemeButton";
import ApiCarousel from "../components/ui/ApiCarousel";
import CategoryCard from "../components/ui/CategoryCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import useFollowApi from "../hooks/useFollowApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

function Home() {
  const [query, setQuery] = useState("");
  const [userFollow, setUserFollow] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [topRatedApis, setTopRatedApis] = useState([]);
  const [cat, setCat] = useState([]);
  const [allApis, setAllApis] = useState([]);
  const user = useSelector((state) => state.user.data);
  const [allCategory, setAllCategory] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!user?._id) return;

    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/follow/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data.data);
      setUserFollow(data.data);
    })();
  }, [user]);

  useEffect(() => {
    async function loadAllApis() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/apis/allApi?limit=20`
        );

        const data = await res.json();

        if (data.result) {
          console.log(data.allAPI);
          setAllApis(data.allAPI);
        }
      } catch (err) {
        console.log(err);
      }
    }

    loadAllApis();
  }, []);

  useEffect(() => {
    async function loadTopRated() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/apis/top`
        );

        const data = await response.json();

        if (data.result) {
          setTopRatedApis(data.apis);
        }
      } catch (error) {
        console.log("Error fetching top rated APIs:", error);
      }
    }

    loadTopRated();
  }, []);

  const handleChange = async (text) => {
    setQuery(text);

    if (text.length >= 3) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/apis/allApi/${text}`
        );

        const data = await response.json();

        const result = data.map((api) => api.name);
        console.log(data);
        setSuggestions(result);
      } catch (error) {
        console.log(error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (title) => {
    setQuery(title);
    setSuggestions([]);
  };

  const truncate = (text, maxLength = 120) => {
    if (!text) return "";

    if (text.length <= maxLength) return text;

    return text.slice(0, text.lastIndexOf(" ", maxLength)) + "…";
  };

  const suggests = suggestions.map((data, i) => {
    return (
      <li
        key={i}
        className="p-2 text-sm   hover:bg-gray-200 cursor-pointer"
        onClick={() => handleSelect(data)}
      >
        {data}
      </li>
    );
  });

  useEffect(() => {
    const thematique = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/apis/filters`
      );
      const data = await response.json();
      console.log(data);

      if (data.result) {
        const cleanCat = data.filters.categories.filter(
          (c) => c && c.trim() !== ""
        );
        setCat(cleanCat.slice(0, 6));
      }
    };
    thematique();
  }, []);

  const apiFollowed = allApis.map((api) => {
    const isFollowed = userFollow.some((f) => f.api?._id === api._id);

    return (
      <Link key={api._id} href={`/apis/${api.name}`} className=" active:scale-95">
        <div className="bg-slate-50 flex flex-col justify-between rounded-xl border border-slate-300 h-80 w-90 shadow p-5 hover:shadow-lg transition cursor-pointer">
          <div className="flex justify-between items-center gap-3">
            <div className="flex gap-3 items-center">
              <img className="h-15 w-15 fa-lg rounded-full" src={api.image} />
              {/* <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} size="md" /> (5)
              </div> */}
            </div>
            <FontAwesomeIcon
              icon={isFollowed ? solidBookmark : regularBookmark}
              size="lg"
            />
          </div>

          <div>
            <div className="flex flex-col justify-between">
              <h4 className="font-bold text-xl text-slate-500">{api.name}</h4>
              <p className="text-sm text-blue-500 font-medium mt-1">
                {api.category}
              </p>
            </div>
            <p className="text-xs text-slate-500 h-15 mt-2">
              {truncate(api.description, 150)}
            </p>
          </div>

          {api.user && (
            <div className="flex w-full justify-end items-center gap-2 mt-4">
              <img
                src={api.user.image}
                alt={api.user.username}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs text-slate-600">
                by {api.user.username}
              </span>
            </div>
          )}
        </div>
      </Link>
    );
  });

  const popSearch = cat.map((catName, i) => {
    return <ThemeButton key={i} theme={catName} category={catName} />;
  });

  // const theme = ["Business", "Weather", "Jobs", "Maps"];

  // const popSearch = theme.map((data, i) => {
  //   return <ThemeButton key={i} theme={data} category={data} />;
  // });

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <main className="w-full flex flex-col gap-5 items-center ">
        <div className="flex flex-col justify-around gap-10 items-center bg-[#050F2A] w-full h-[30%] py-5">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold text-center">Welcome on APIHub</h2>
          <div className="
      bg-white relative flex items-center 
      w-full sm:w-[80%] md:w-[60%] lg:w-[50%]
      rounded-xl px-3 py-2
    ">
            <input
              type="search"
              placeholder="Search API"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              className="
          pl-10 w-full h-11 rounded-l-xl text-slate-700
          text-sm sm:text-base
        "

            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0  top-11 text-slate-500 z-10 border rounded shadow bg-white">
                {suggests}
              </ul>
            )}
            <div className="
        h-11 px-5 sm:px-8 rounded-xl bg-[#B8A9FF] text-white font-bold 
        shadow hover:bg-[#9d90de] cursor-pointer flex items-center justify-center
        ml-2 whitespace-nowrap
      ">
              <Link href={{ pathname: `/ApiSearch`, query: { query: query } }}>
                Search
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center text-center">
            <h5 className="text-white font-bold text-sm sm:text-base">
              Popular searches:
            </h5>
            <div className="
      flex flex-wrap justify-center gap-3 sm:gap-5 
      w-full sm:w-auto
    ">{popSearch}</div>
          </div>
        </div>

        <ApiCarousel title="Top Rated APIs" items={topRatedApis} />
        <div className="w-full max-w-[90%] flex flex-col justify-center gap-5 mx-auto">
          <div className="flex justify-end w-full px-4 sm:px-6 md:px-10">
            <p
              onClick={() => setAllCategory(!allCategory)}
              className="
        text-blue-400 text-sm sm:text-base 
        hover:underline hover:underline-offset-2 
        cursor-pointer active:scale-95
      "
            >
              {allCategory ? 'Hide All Categor' : 'View All Categories'}
            </p>
          </div>
          <div className="w-full flex flex-col gap-10">
            {/* Première ligne de catégories */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <CategoryCard title="Movies" img="/icon/icon.cinema.png" category="Movies" />
              <CategoryCard title="Business" img="/icon/icon.business.png" category="Business" />
              <CategoryCard title="Geography" img="/icon/icon.geography.png" category="Geography" />
              <CategoryCard title="Fashion" img="/icon/icon.fashion.png" category="Fashion" />
              {allCategory && (
                <>
                  <CategoryCard title="Sciences" img="/icon/icon.sciences.png" category="Sciences" />
                  <CategoryCard title="Sport" img="/icon/icon.sport.png" category="Sport" />
                  <CategoryCard title="Music" img="/icon/icon.music.png" category="Music" />
                  <CategoryCard title="Data" img="/icon/icon.data.png" category="Data" />
                  <CategoryCard title="Transport" img="/icon/icon.transport.png" category="Transport" />
                </>
              )}
            </div>

          </div>
        </div>

        <div className="w-full max-w-[95%] mx-auto flex flex-col gap-6 mt-10">
          <h3 className="text-2xl font-bold text-slate-800 px-4 sm:px-10">All APIs</h3>
          <hr className="border-slate-100 border-2 mx-4 sm:mx-10" />

          <div className="
      flex flex-wrap gap-6 sm:gap-8 md:gap-10 
      justify-start items-start 
      px-0.1 sm:px-6 sm:ml-30 md:px-10 md:ml-25
    "
          >
            {apiFollowed}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
