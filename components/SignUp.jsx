import Link from "next/link";
import Button from "./ui/Button";
import InputText from "./ui/InputText";
import Header from "./Header";
import Backdrop from "@mui/material/Backdrop";
import { useState } from 'react'
import { useRouter } from "next/router";

export default function SignUp() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSignup = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passes ne correspondent pas");
      return
    }

    const response = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      })
    });

    const data = await response.json();

    console.log(data);

    if (!data.result) {
      setError(data.error);
      return
    }

    localStorage.setItem("token", data.token);

    router.push("/HomePage");
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />

      <div className="container">



        <div className="w-[50%] justify-end flex flex-col  h-full p-10">

          <div className=" items-center flex flex-col  h-[40%] ">
            <h1 className="font-extrabold text-4xl text-stone-500">APIHub,</h1>
            <h3 className="font-bold text-stone-400 text-2xl">
              La plateforme des développeurs
            </h3>
            <h5 className="text-stone-500 font-medium text-2xl p-10 text-center">
              Une seule clé, une communauté, des milliers de possibilités.
            </h5>
          </div>
        </div>
        <div className="flex flex-col bg-[#050F2A] w-[50%] h-full pt-10 items-center gap-[15] text-white">
          <div className="w-[70%] h-[10%]">
            <h3 className="text-2xl w-[60%] font-bold">Sign Up!</h3>

          <p className="text-red-400 font-semibold w-[60%]">
            {error}
          </p>
          </div>
          

          <div className="flex flex-col w-[60%]">
            <label htmlFor='Username' className="text-sm">Username</label>
            <InputText
              placeHolder="Username"
              label='email'
              Name='Username'
              Type="text"
              classname=" bg-[#ffffff] rounded-[5]  text-stone-400 text-sm h-10 pl-10 shadow w-full hover:bg-[#eeeeee]"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[60%]">
            <label htmlFor='password' className="text-sm">Password</label>
            <InputText
              placeHolder="Password"
              label='email'
              Name='password'
              Type="password"
              classname=" bg-[#ffffff] rounded-[5]   text-stone-400 text-sm h-10 pl-10 shadow w-full hover:bg-[#eeeeee]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[60%]">
            <label htmlFor='Password' className="text-sm">Confirm Password</label>
            <InputText
              placeHolder="Confirm Password"
              label='email'
              Name='Password'
              Type="password"
              classname=" bg-[#ffffff] rounded-[5]   text-stone-400 text-sm h-10 pl-10 shadow w-full hover:bg-[#eeeeee]"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[60%]">
            <label htmlFor='email' className="text-sm">Email</label>
            <InputText
              placeHolder="Email"
              label='email'
              Name='email'
              Type="email"
              classname=" bg-[#ffffff] rounded-[5]  text-stone-400 text-sm   h-10 pl-10 shadow w-full hover:bg-[#eeeeee]"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-[70%] justify-items-center items-center">
            <Link href="#" className="text-[14px] text-stone-300 hover:underline underline-offset-2">
              Already sign up ?
            </Link>
            <Button
              classname="w-full bg-[#B8A9FF] h-[50px] font-semibold text-lg rounded-[3] hover:bg-[#9d90de] cursor-pointer"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </div>
          <hr className="bg-white border-white border-2 w-[80%]"></hr>

          <div className="w-[60%] h-[20%] flex flex-col gap-[20] justify-center items-center">
            <Button classname="bg-white w-full justify-center rounded-[3] items-center gap-3 flex text-stone-400 h-10 hover:bg-stone-200">
              {" "}
              Sign up with <img className="h-6" src="../google.png" />{" "}
            </Button>
            <Button classname="bg-white w-full justify-center rounded-[3] items-center gap-3 flex text-stone-400 h-10 hover:bg-stone-200">
              {" "}
              Sign up with <img className="h-6" src="../github.png" />{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}