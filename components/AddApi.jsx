import { useState } from "react";
import Header from "../components/Header";
import InputText from "../components/ui/InputText";
import Button from "../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function AddAPI() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [officialLink, setOfficialLink] = useState("");
  const [docLink, setDocLink] = useState("");
  const [example, setExample] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleSubmit = async () => {
    const apiData = {
      name,
      description,
      officialLink,
      documentationLink: docLink,
      category: "",
      image: null,
      tags: tags,
    };

    const accessToken = sessionStorage.getItem("accessToken");

    try {
      let response = await fetch("http://localhost:3000/apis/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(apiData),
      });

      let data = await response.json();

      if (data.error === "Invalid or expired access token") {
        console.log("Access token expired, refreshing...");

        const refresh = await fetch("http://localhost:3000/users/refresh", {
          method: "POST",
          credentials: "include",
        });

        const refreshData = await refresh.json();

        console.log("REFRESH DATA:", refreshData);

        if (!refreshData.result) {
          alert("Session expired, please log in again");
          return;
        }

        sessionStorage.setItem("accessToken", refreshData.accessToken);

        response = await fetch("http://localhost:3000/apis/create", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + refreshData.accessToken,
          },
          body: JSON.stringify(apiData),
        });

        data = await response.json();
      }

      if (data.result) {
        alert("API added successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />*
      <div className="flex flex-col gap-10">
        <div className="h-20 ml-30 flex items-end text-lg font-bold  ">
          {" "}
          <p>Post a new API</p>
          <div>
            <button>Infos</button>
            <button>Docs</button>
            <button>Community</button>
            <button></button>
          </div>
        </div>

        <div className="w-[60%] flex ml-30 px-2 border-x-2 border-slate-300 justify-around  ">
          <div className="w-70 h-40 bg-stone-200 gap-4 rounded-x1 flex items-center justify-center">
            <img src="" className="h-30 w-30 bg-black opacity-60"></img>
            <button className="h-15 bg-slate-300 rounded-lg text-sm px-3 hover:bg-slate-400">
              <FontAwesomeIcon icon={faUpload} />
              Upload Icon
            </button>
          </div>

          <div className="flex flex-col w-[50%] gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="apiName" className="label">
                API Name
              </label>
              <input
                Type="text"
                Name="apiName"
                placeHolder="Add name"
                className="inputSetting"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Description
              </label>
              <textarea
                placeholder="Add description"
                className="border border-slate-400 w-100 h-[140px] rounded-md p-3"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="label">
                  Url Website
                </label>
                <input
                  Type="text"
                  Name="officialLink"
                  placeHolder="Ajouter lien officiel"
                  className="inputSetting"
                  onChange={(e) => setOfficialLink(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="label">
                  Documentation Url
                </label>
                <input
                  Type="text"
                  Name="docLink"
                  placeHolder="Ajouter lien documentation"
                  className="inputSetting"
                  onChange={(e) => setDocLink(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Category
              </label>
              <select
                name="category"
                id="category"
                className="inputSetting relative z-50"
              >
                <option value="Business">Business</option>
                <option value="Fashion">Fashion</option>
                <option value="Geography">Geography</option>
                <option value="Movies">Movies</option>
                <option value="Jobs">Jobs</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-[60%] ml-30 items-center flex flex-col gap-2 ">
          <label htmlFor="" className="label w-[80%] text-left ">
            Example
          </label>
          <textarea
            placeholder="Add example"
            className="w-[80%] bg-white h-[200px] rounded-xl border border-gray-300 shadow-md p-4"
            onChange={(e) => setExample(e.target.value)}
          />
        </div>

        <div className="w-[80%] mt-10">
          <div className="flex gap-5 items-center">
            <InputText
              Type="text"
              placeHolder="New tag"
              classname="w-[200px]"
              onChange={(e) => setNewTag(e.target.value)}
            />
          </div>

          <Button
            className="bg-[#B8A9FF] text-white px-6 py-2 rounded-md hover:bg-[#9d90de]"
            onClick={handleAddTag}
          >
            Add tag
          </Button>

          <div className="flex gap-4 mt-6">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="px-5 py-2 bg-[#F5F0FF] text-stone-500 rounded-md shadow"
              >
                {tag}
              </div>
            ))}
          </div>

          <div className="w-[80%] mt-16">
            <Button
              className="bg-[#B8A9FF] text-white px-10 py-3 rounded-md hover:bg-[#9d90de]"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}