
import Header from "../components/Header";
import Login from '../components/Login'
import { useState } from 'react'
import { useRouter } from "next/router";
import SignUp from "../components/SignUp";

export default function AuthPage(props) {
const [isSignUp, setIsSignUp]= useState(true)

  

  return (
    <div className="m-0 p-0 flex flex-col w-screen h-screen">
      <Header />
      <SignUp></SignUp>
    </div>
    
  );
}