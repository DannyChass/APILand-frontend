
import Header from "../components/Header";
import SignIn from "../components/SIgnIn";
import { useState } from 'react'
import { useRouter } from "next/router";
import SignUp from "../components/SignUp";

export default function AuthPage(props) {
  const router = useRouter();

  const mode = router.query.mode;

  const isSignUp = mode === 'signup';

  return (
    <div className="m-0 p-0 flex flex-col w-screen h-screen">
      <Header />
      {isSignUp ? <SignUp /> : <SignIn />}
    </div>
  );
}