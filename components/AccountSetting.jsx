import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function AccountSetting() {
  
const [showModal, setShowModal] = useState(false);



  const [user, setUser] = useState({});
  const [email, setEmail] = useState(user.email || "");
  const [gender, setGender] = useState(user.gender || "");
  const [telephoneNumber, setTelephoneNumber] = useState(user?.telephoneNumber ||"");
  const [birthDate, setBirthDate] = useState( user?.birthDate || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleCancel = () => {
  setEmail(user.email || "");
  setTelephoneNumber(user.telephoneNumber || "");
  setBirthDate(user.birthDate || "");
  setGender(user.gender || "");
  setCountry(user.country || "");
};


  useEffect(() => {
  if (user) {
    setEmail(user.email || "");
    setGender(user.gender || "");
    setTelephoneNumber(user.telephoneNumber || "");
    setBirthDate(user.birthDate || "");
    setCountry(user.country || "");
  }
}, [user]);

const deletedProfile = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const response = await fetch('http://localhost:3000/users/me', {
    method: 'DELETE', 
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${accessToken}`
    }
  })
  const data = await response.json()

  if(data){
    console.log('utilisateur supprimé');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = "/HomePage";
  }else {
    console.log('erreur de suppression', dataerror)
  }
}

  const updateProfile = async () => {

  const infos = {email, telephoneNumber, birthDate, gender, country}
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:3000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(infos)
    });
    const data = await response.json();

    if(data.result) {
      setShowModal(true)
    }

    console.log("reponse du back", data)
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

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col gap-20  w-150 py-20">
      <div className="flex flex-col ml-25">
        <h2 className="text-2xl font-bold text-slate-800">
          Gestion de votre compte
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed, ex
          fuga doloribus aliquam, soluta explicabo voluptates temporibus
          molestiae ullam debitis quis aut tempore eum ipsa eos alias, ipsam
          sint.
        </p>
      </div>
      <div className=" flex flex-col w-full gap-5 ml-25    ">
        <h4 className="text-lg font-bold text-slate-700">Votre compte</h4>

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
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="inputUsername"
            className="inputSetting"
          />
        </div>

        <div className="flex flex-col w-full gap-5 mt-10 ">
          <h4 className="text-lg font-bold text-slate-700">
            Informations personnelles
          </h4>
          <div className="divSetting">
            <label htmlFor="inputUsername" className="label">
              téléphone
            </label>
            <input
              type="text"
              placeholder="Téléphone por. (optional)"
              name="inputUsername"
              className="inputSetting"
              value={telephoneNumber}
              onChange={(e) => setTelephoneNumber(e.target.value)}
            />
          </div>
          <div className="divSetting">
            <label htmlFor="inputUsername" className="label">
              Date de Naissance
            </label>
            <input
              type="date"
              placeholder="Date de naissance (optional)"
              name="inputUsername"
              className="inputSetting"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="divSetting">
            <label htmlFor="" className="label">
              Identité de genre
            </label>
            <div className="flex gap-20">
              <div className="flex gap-5 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="homme"
                  checked={gender === "homme"}
                  onChange={handleChange}
                  id=""
                  className="accent-blue-500 h-5 w-5 border-slate-400"
                />
                <p>Homme</p>
              </div>

              <div className="flex gap-5 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="femme"
                  checked={gender === "femme"}
                  onChange={handleChange}
                  id=""
                  className="accent-blue-500 h-5 w-5 border-slate-400"
                />
                <p>Femme</p>
              </div>
            </div>
          </div>
          <div className="divSetting">
            <label
              htmlFor="inputUsername"
              onChange={(e) => setCountry(e.target.value)}
              className="label"
            >
              Pays/region
            </label>
            <input
              type="text"
              placeholder="Pays/région"
              name="inputUsername"
              className="inputSetting"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>
        </div>

        <div className="flex items-center gap-10 mt-10">
          <button className="flex items-center rounded-lg p-2 h-10 cursor-pointer hover:bg-slate-300 bg-slate-200 gap-5">
            Desactiver le compte
          </button>
          <div className="w-70">
            <h4 className="font-bold text-slate-700">Désactiver le compte</h4>
            <p>
              Masquez temporairement votre profil, vos Épingles et vos tableaux
            </p>
          </div>
        </div>
        <div className="flex items-center gap-10 mt-10">
          <button onClick={() => deletedProfile()} className="flex items-center rounded-lg p-2 h-10 cursor-pointer hover:bg-slate-300 bg-slate-200 gap-5">
            Supprimer le compte
          </button>
          <div className="w-70">
            <h4 className="font-bold text-slate-700">Supprimer le compte</h4>
            <p className="text-sm">
              Supprimer définitivement vos données et tout ce qui est associé à
              votre compte
            </p>
          </div>
        </div>
      </div>
      {showModal && (
  <div className="fixed z-100 inset-0 bg-slate-400/80 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-xl font-bold text-green-600 mb-4">
        ✅ Informations mises à jour
      </h2>
      <p className="text-gray-700 mb-6">
        Vos informations de compte ont bien été modifiées.
      </p>
      <button
        onClick={() => setShowModal(false)}
        className="px-4 py-2 bg-slate-200  rounded hover:bg-slate-300 cursor-pointer"
      >
        Fermer
      </button>
    </div>
  </div>
)}

      <footer className=" flex h-20 bg-white fixed bottom-0 w-full shadow-[0_-4px_6px_rgba(0,0,0,0.1)] items-center justify-start ">
        <button onClick={updateProfile} className="flex items-center rounded-lg p-2 h-10 -py bg-slate-200 gap-5 ml-45 cursor-pointer hover:bg-slate-300">
          Enregistrer
        </button>
        
        <button onClick={handleCancel} className="flex items-center rounded-lg p-2 h-10 -py bg-slate-200 gap-5 ml-10 cursor-pointer hover:bg-slate-300">
          annuler
        </button>
      </footer>
    </div>
  );
}
