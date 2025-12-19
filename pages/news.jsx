import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:3000/news");
        const data = await res.json();

        if (data.result) {
          setNews(data.news);
        }
      } catch (error) {
        console.error("Fetch news error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">API News</h1>

        {loading && <p className="text-zinc-400">Loading news...</p>}

        {!loading && news.length === 0 && (
          <p className="text-zinc-400 h-screen border border-slate-200 p-10 rounded-2xlxl">No news available.</p>
        )}

        <div className="space-y-6">
          {news.map((item) => (
            <article
              key={item._id}
              className="bg-slate-100 border border-slate-300 rounded-xl p-3 flex gap-5"
            >
            
                <div className="w-50 h-40 rounded-lg border border-slate-300">
                  {item.api?.image && (
                    <img
                      src={item.api.image}
                      alt={item.api.name}
                      className="w-full h-full  "
                    />
                  )}
                </div>
                
              <div className="flex flex-col w-full  gap-3">
                <div className="flex  w-ful items-centerl justify-between gap-3 text-sm ">
                    <div>
                        <p>Created by <span className="font-bold text-slate-600 underline underline-offset-2">{item.author?.username}</span></p></div> 
                    <div className="flex gap-2"><span className="font-bold text-slate-500 ">
                    {item.api?.name}
                  </span>
                  <span>•</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span></div>
                  
                </div>
                <hr className="border-slate-300  mx-5"/>
                <div className="w-full">
                  <h2 className="text-lg font-bold text-slate-500 ">{item.title}</h2>

                  <p className="text-slate-800 whitespace-pre-line">
                    {item.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
