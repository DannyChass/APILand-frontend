import styles from "../styles/Home.module.css";
import Button from "../components/ui/Button";
import InputText from "../components/ui/InputText";
import ThemeButton from "../components/ui/ThemeButton";
import ApiCarousel from "../components/ui/ApiCarousel";
import CategoryCard from "../components/ui/CategoryCard";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import Link  from 'next/link';




function Home() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
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
    setQuery(text)

    if (text.length >= 3) {
      try {
        const response = await fetch(`http://localhost:3000/apis/allApi/${text}`);
        const data = await response.json()

        const result = data.map((api) => api.name)
console.log(data)
        setSuggestions(result)

      } catch (error) {
        console.log(error)
        setSuggestions([])
      }
    } else {
      setSuggestions([])
    }
  }


  // const searchAPI = () => {

  //   navigate("#")
  // }

  const handleSelect = (title) => {
    setQuery(title);
    setSuggestions([])
  }

  const suggests = suggestions.map((data, i) => {
    return <li key={i} className="p-2 text-sm   hover:bg-gray-200 cursor-pointer" onClick={() => handleSelect(data)} >{data}</li>

  }
  )


  const theme = ["Business", "Weather", "Jobs", "Maps"];

  const popSearch = theme.map((data, i) => {
    return <ThemeButton key={i} theme={data} />;
  });

  return (
    <div >
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
              <Link href={{ pathname: `/ApiSearch`, query: { query: query }, }}>
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
        <div className="w-[90%] flex justify-center gap-15">
          <CategoryCard title='Movies' img='./icon.cinema.png'/>
          <CategoryCard title='Business'/>
          <CategoryCard title='Geography'/>
          <CategoryCard title='Fashion'/>
         


        </div>
      </main>
    </div>
  );
}

export default Home;
