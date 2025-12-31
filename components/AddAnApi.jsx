import { useState } from "react";
import Header from "./Header";
import InputText from "./ui/InputText";
import Button from "./ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faDeleteLeft,
  faUpload,
  faXmark,
  faBasketball,
} from "@fortawesome/free-solid-svg-icons";

export default function AddAnAPI() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [officialLink, setOfficialLink] = useState("");
  const [docLink, setDocLink] = useState("");
  const [example, setExample] = useState([]);
  const [category, setCategory] = useState("Business");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setOfficialLink("");
    setDocLink("");
    setExample("");
    setTags([]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (file && file instanceof File) {
      formData.append("image", file);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("officialLink", officialLink);
    formData.append("documentationLink", docLink);
    formData.append("category", category);
    tags.forEach((tag) => formData.append("tags[]", tag));
    // const apiData = {
    //   name,
    //   description,
    //   officialLink,
    //   documentationLink: docLink,
    //   category: "",
    //   image: null,
    //   tags: tags,
    // };

    const accessToken = localStorage.getItem("accessToken");

    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/apis/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      let data = await response.json();

      if (data.error === "Invalid or expired access token") {
        console.log("Access token expired, refreshing...");

        const refresh = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/refresh`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        const refreshData = await refresh.json();

        console.log("REFRESH DATA:", refreshData);

        if (!refreshData.result) {
          alert("Session expired, please log in again");
          return;
        }

        localStorage.setItem("accessToken", refreshData.accessToken);

        response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/apis/create`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshData.accessToken}`,
            },
            body: formData,
          }
        );


        data = await response.json();
      }

      if (data.result) {
        alert("API added successfully!");
        handleCancel();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="flex  text-xl pl-20 font-bold text-slate-800  items-center h-20">
        <h5>Create an API</h5>
      </div>

      <div className="flex flex-col  gap-10 rounded-xl border border-slate-300 bg-slate-100    ml-20 mr-20">
        <h5 className=" h-20 mx-20 border-b flex items-end text-xl font-bold text-slate-500 border-b-slate-300">
          Informations
        </h5>

        <div className=" w-full flex gap-20  justify-center">
          <div className="w-70 h-40  gap-4 flex items-center justify-center">
            <img
              src={file ? URL.createObjectURL(file) : "./homme.png"}
              className="h-30 w-30 border "
            ></img>
            <label
              htmlFor="fileInput"
              className=" flex items-center h-10 cursor-pointer bg-slate-300 rounded-lg text-sm px-3 hover:bg-slate-400"
            >
              <FontAwesomeIcon icon={faUpload} />
              Upload Icon
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="label">
                Description
              </label>
              <textarea
                placeholder="Add description"
                value={description}
                className="border bg-white border-slate-300 w-100 h-[140px] rounded-md p-3"
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
                  value={officialLink}
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
                  value={docLink}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="inputSetting relative z-50"
              >
                <option value="Business">Business</option>
                <option value="Fashion">Fashion</option>
                <option value="Geography">Geography</option>
                <option value="Movies">Movies</option>
                <option value="Jobs">Jobs</option>
                <option value="Security">Security</option>
                <option value="Sport">Sport</option>
                <option value="Transport">Transport</option>
                <option value="Data">Data</option>
                <option value="Sciences">Sciences</option>
                <option value="Music">Music</option>
              </select>
            </div>
          </div>
        </div>
        <h5 className=" h-20 mx-20 border-b flex items-end text-xl font-bold text-slate-500 border-b-slate-300">
          Add a documentation on your API
        </h5>
        <div className="w-full  justify-center items-center flex flex-col gap-2 ">
          <label htmlFor="" className="label w-[80%] text-left ">
            Documentation
          </label>
          <textarea
            placeholder="Add documentation"
            value={example}
            className="w-[80%] bg-white h-[200px] rounded-xl border border-slate-300  p-4"
            onChange={(e) => setExample(e.target.value)}
          />
        </div>
        <h5 className=" h-20 mx-20 border-b flex items-end text-xl font-bold text-slate-500 border-b-slate-300">
          tags
        </h5>
        <div className="w-full * h-30 justify-center items-center flex flex-col gap-10">
          <div className="flex h-full items-center justify-center gap-10 w-full">
            <div className="flex gap-5 items-center">
              <input
                Type="text"
                placeHolder="New tag"
                className="inputSetting"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>

            <Button
              className="bg-[#B8A9FF] text-white px-6 py-2 h-10 rounded-md hover:bg-[#9d90de]"
              onClick={handleAddTag}
            >
              Add tag
            </Button>
          </div>

          <div className="flex gap-4 mx-20 px-20 w-full justify-start ">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="px-5 py-2 bg-white border-2 border-[#B8A9FF] gap-5 text-stone-500 rounded-md flex justify-between items-center shadow"
              >
                <div>
                  <span className="font-bold text-[#B8A9FF]">#</span>
                  {tag}
                </div>
                <FontAwesomeIcon
                  onClick={() => setTags(tags.filter((e) => e !== tag))}
                  className="cursor-pointer"
                  icon={faXmark}
                />
              </div>
            ))}
          </div>
        </div>
        <div className=" flex items-center border-t py-10 mx-20 border-slate-200 justify-center gap-20 ">
          <Button
            className="bg-[#B8A9FF] text-white font-bold px-10 py-3 active:scale-95 rounded-md hover:bg-[#9d90de]"
            onClick={handleSubmit}
          >
            Add
          </Button>
          <button
            onClick={() => handleCancel()}
            className="bg-slate-500 text-white font-bold active:scale-95 px-10 py-3 rounded-md hover:bg-slate-600"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
