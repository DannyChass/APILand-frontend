import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function UpdateProfile() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(user.username || "");
  const [description, setDescription] = useState(user.description || "");
  const [githubLink, setGithubLink] = useState("");
  const [country, setCountry] = useState(user?.country || "");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUsername(user.username || "");
      setDescription(user.description || "");
      setGithubLink(user.githubLink || "");
      setCountry(user.country || "");
    }
  }, [user]);

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("link", githubLink);
    formData.append("image", file);
    // const infos = {description, link}
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/users/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const data = await response.json();

    if (data.result) {
      setShowModal(true);
    }
    console.log("Reponse du back", data);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      (async () => {
        const response = await fetch("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        setUser(data.user);
      })();
    }
  }, []);

  return (
    <div className="flex flex-col gap-20  w-150 py-20">
      <div className="flex flex-col ml-25">
        <h2 className="text-2xl font-bold text-slate-800">
          Update your Profile
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed, ex
          fuga doloribus aliquam, soluta explicabo voluptates temporibus
          molestiae ullam debitis quis aut tempore eum ipsa eos alias, ipsam
          sint.
        </p>
      </div>
      <div className=" flex flex-col w-full gap-5 ml-25    ">
        <h4 className="text-lg font-bold text-slate-700">Your Profile</h4>
        <div>
          <div className="flex gap-10 items-center">
            <img
              src={file ? URL.createObjectURL(file) : "/homme.png"}
              alt="avatar"
              className="h-30 w-30 border items-center justify-center object-cover border-slate-400 rounded-full"
            />
            <label
              htmlFor="fileAvatar"
              className=" flex items-center rounded-lg p-2 h-10 bg-slate-200 gap-5 hover:bg-slate-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={faUpload} />
              Upload Image
              <input
                id="fileAvatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="divSetting">
          <label htmlFor="inputUsername" className="label">
            email
          </label>
          <input
            type="email"
            placeholder="Email"
            name="inputUsername"
            className="inputSetting"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="divSetting">
          <label htmlFor="inputUsername" className="label">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            name="inputUsername"
            className="inputSetting"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full gap-5 mt-10 ">
          <h4 className="text-lg font-bold text-slate-700">More about you</h4>
          <div className="divSetting">
            <label htmlFor="inputDescription" className="label">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Description"
              name="inputDescription"
              className="w-100 h-30 border rounded-md px-5 py-1 border-slate-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="divSetting">
            <label htmlFor="inputUsername" className="label">
              Github Link
            </label>
            <input
              type="text"
              placeholder="Links"
              name="inputLink"
              className="inputSetting"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>

          <div className="divSetting">
            <label htmlFor="inputUsername" className="label">
              Pays/region
            </label>
            <input
              type="text"
              placeholder="Pays/région"
              name="inputCountry"
              className="inputSetting"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>
        </div>
      </div>
      <footer className=" flex h-20 bg-white fixed bottom-0 w-full shadow-[0_-4px_6px_rgba(0,0,0,0.1)] items-center justify-start ">
        <button
          onClick={() => updateProfile()}
          className="flex items-center rounded-lg p-2 h-10 -py bg-slate-200 gap-5 ml-45 cursor-pointer hover:bg-slate-300"
        >
          Enregistrer
        </button>
        <button className="flex items-center rounded-lg p-2 h-10 -py bg-slate-200 gap-5 ml-10 cursor-pointer hover:bg-slate-300">
          annuler
        </button>
      </footer>
    </div>
  );
}
