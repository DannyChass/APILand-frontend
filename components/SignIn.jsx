import { useState } from "react";
import Button from "./ui/Button";
import InputText from "./ui/InputText";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./ui/GoogleLoginButton";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";


export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordForgetten, setPasswordForgetten] = useState(false)

  const handleLogin = () => {
    // Redirige vers ton backend qui lui-même redirige vers GitHub
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/github`;
  };


  const handleSignIn = async () => {
    setErrorMsg("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!data.result) {
      setErrorMsg(data.error || "Erreur lors de la connexion");
      return;
    }

    localStorage.setItem("accessToken", data.accessToken);

    // recharge le user complet
    const meRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
        credentials: "include",
      }
    );

    const meData = await meRes.json();

    if (meData.result) {
      dispatch(setUser(meData.user));
    }

    router.push("/");
  };

  return (
    <GoogleOAuthProvider clientId='345080811696-7fmah26tmhv08u1qt4sereefmp6rr2pc.apps.googleusercontent.com'>
      <div className="container">

        <div className="w-[50%] justify-end flex flex-col  h-full p-6">
          <div className=" items-center flex flex-col   h-[40%] ">
            <h1 className="font-extrabold text-4xl text-stone-500">APIHub,</h1>
            <h3 className="font-bold text-stone-400 text-2xl">
              La plateforme des développeurs
            </h3>
            <h5 className="text-stone-500 font-medium text-2xl p-10 text-center">
              Une seule clé, une communauté, des milliers de possibilités.
            </h5>
          </div>
        </div>
        <div className="flex flex-col bg-[#050F2A] w-[50%] h-full items-center pt-15 gap-[30] text-white">
          <div className="w-[70%] h-[10%]">
            <h3 className="text-2xl w-[60%] font-bold">Connectez-vous</h3>
            {errorMsg && (
              <p className="text-red-400 font-semibold">{errorMsg}</p>
            )}
          </div>

          <div className="w-[60%] justify-items-center flex flex-col text-left items-center">
            <label htmlFor="Email" className="text-sm w-full">Email</label>
            <InputText
              placeHolder="Email"
              Name='Email'
              classname=" bg-[#ffffff] rounded-[5] text-sm  text-stone-400  h-10 pl-10 shadow w-full hover:bg-[#eeeeee]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" w-[60%] gap-3 justify-items-center items-center">
            <label htmlFor="Password" className="text-sm">Password</label>
            <InputText
              placeHolder="Password"
              Name='Password'
              classname="w-full bg-[#ffffff] rounded-[5] text-sm text-stone-400 h-10 shadow pl-10 hover:bg-[#eeeeee] "
              value={password}
              Type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full flex items-center gap-3">
              <Link href="#" onClick={() => setPasswordForgetten(!passwordForgetten)} className="text-sm text-stone-300 hover:underline">
                {" "}
                Mot de passe oublié?
              </Link> {passwordForgetten && (<p className="text-red-400 font-bold text-sm ">in development</p>)}
            </div>

          </div>
          <div className="w-[70%] flex flex-col justify-start items-center">

            <Button
              className="w-[60%] bg-[#B8A9FF] h-[50px] font-semibold text-lg rounded-[3] hover:bg-[#9d90de] cursor-pointer"
              onClick={handleSignIn}
            >
              Connexion
            </Button>
          </div>
          <hr className="bg-white border-white border-2 w-[80%]"></hr>
          <div className="flex flex-col w-[60%] py-5 justify-between items-center h-[40%]">
            <Link href="/AuthPage?mode=signup" className="text-lg font-sans font-bold text-center w-[60%] text-slate-300 hover:underline">
              Vous n'avez pas de compte ?
            </Link>
            <div className="w-full h-[70%] flex flex-col gap-5 justify-center items-center ">

              <GoogleLoginButton />
              <Button onClick={handleLogin} className="loginButton">
                {" "}
                <img className="h-5" src="../github.png" />Se connecter avec Github <div></div> {" "}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
