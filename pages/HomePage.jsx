import styles from "../styles/Home.module.css";
import Button from "../components/ui/Button";
import InputText from "../components/ui/InputText";
import ThemeButton from "../components/ui/ThemeButton";
import ApiCarousel from "../components/ui/ApiCarousel";
import CategoryCard from "../components/ui/CategoryCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [topRatedApis, setTopRatedApis] = useState([]);

  useEffect(() => {
    async function loadTopRated() {
      try {
        const response = await fetch("http://localhost:3000/apis/top");
        const data = await response.json();

        console.log(data);

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
          `http://localhost:3000/apis/allApi/${text}`
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

  // const searchAPI = () => {

  //   navigate("#")
  // }

  const handleSelect = (title) => {
    setQuery(title);
    setSuggestions([]);
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

  const theme = ["Business", "Weather", "Jobs", "Maps"];

  const popSearch = theme.map((data, i) => {
    return <ThemeButton key={i} theme={data} />;
  });

  return (
    <div>
      <Header />
      <main className="w-full flex flex-col gap-5 items-center ">
        <div className="flex flex-col justify-around gap-10 items-center bg-[#050F2A] w-screen h-[30%] py-5">
          <h2 className="text-white text-4xl font-bold">Welcome on APIHub</h2>
          <div className="bg-white relative justify-between items-center flex w-[50%] rounded-xl ">
            <input
              type="search"
              placeholder="Search API"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              className="pl-10 w-[70%] h-11 rounded-l-xl text-slate-700"
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0  top-11 text-slate-500 z-10 border rounded shadow bg-white">
                {suggests}
              </ul>
            )}
            <div className="h-11 w-40 rounded-xl bg-[#B8A9FF] text-white font-bold shadow hover:bg-[#9d90de] cursor-pointer flex items-center justify-center">
              <Link href={{ pathname: `/ApiSearch`, query: { query: query } }}>
                Search
              </Link>
            </div>
          </div>
          <div className="flex gap-10 justify-center items-center ">
            <h5 className="text-white font-bold">Recherches populaires:</h5>
            <div className="flex gap-10">{popSearch}</div>
          </div>
        </div>

        <ApiCarousel title="Top Rated APIs" items={topRatedApis} />
        <div className="w-[90%] flex flex-col justify-center gap-5">
          <div className=" flex justify-end w-full px-10 text-left text-sm text-blue-400  ">
            <p className="hover:underline hover:underline-offset-2 cursor-pointer">
              View All Category
            </p>
          </div>
          <div className="flex justify-center w-full gap-15">
            <CategoryCard title="Movies" img="./icon.cinema.png" />
            <CategoryCard title="Business" img="./icon.business.png" />
            <CategoryCard title="Geography" img="./icon.geography.png" />
            <CategoryCard title="Fashion" img="./icon.fashion.png" />
          </div>
          <div>
            <div className="bg-white shadow rounded-lg p-4 w-80 flex cursor-pointer flex-col gap-3 hover:bg-slate-100">
              <div className="w-full flex justify-between items-center px-2">
                <img src="#" alt="logo" className="w-10 h-10" />
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faBookmark}/>
                  <div className=" bg-green-400 w-3 h-3 rounded-full"></div>
                </div>
                
              </div>
              <div className="w-full flex flex-col gap-2">
                <p className="text-sm">Category</p>
                <h4 className="text-lg font-bold">title</h4>
              </div>
              <div className="flex justify-around gap-2">
                <div className="flex flex-col items-center">
                  <p className="text-[12px]">Requêtes</p>
                  <h6>152</h6>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[12px]">Latence</p>
                  <h6>152ms</h6>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[12px]">Quotas utilisé</p>
                  <h6>152</h6>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 w-72">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img
                    src="/logos/stripe.png"
                    alt="Stripe"
                    className="w-6 h-6"
                  />
                  <h3 className="font-semibold">Stripe API</h3>
                </div>
                <span className="text-green-500 font-bold">🟢 OK</span>
              </div>

              {/* Stats */}
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  Requêtes : <span className="font-medium">12,500</span>
                </p>
                <p>
                  Latence moyenne : <span className="font-medium">120 ms</span>
                </p>
                <p>
                  Erreurs : <span className="font-medium">0.5%</span>
                </p>
                <p>
                  Quota utilisé : <span className="font-medium">70%</span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                  Détails
                </button>
                <button className="px-3 py-1 bg-slate-200 rounded text-sm">
                  Docs
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
