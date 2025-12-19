import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export default function Footer() {
    const [error, setError] = useState(false)
  return (
    <footer className="mt-20">
      <div className=" flex w-full justify-between bg-[#050F2A] p-10 gap-25">
        <div className="ml-20">
          <Link href="/HomePage" className="logoFooter">
            {" "}
            APIhub
          </Link>
          <div className="flex flex-col gap-3 ">
            <p className="text-white hover:underline hover:underline-offset-2 cursor-pointer">
              {" "}
              35 rue de Marseille, Lyon 69007
            </p>
            <div className="flex gap-5">
              <FontAwesomeIcon onClick={() => setError(!error)} icon={faInstagram} color="white" size="lg" />
              <FontAwesomeIcon onClick={() => setError(!error)} icon={faLinkedin} color="white" size="lg" />
              <FontAwesomeIcon onClick={() => setError(!error)} icon={faGithub} color="white" size="lg" />
              <FontAwesomeIcon onClick={() => setError(!error)} icon={faXTwitter} color="white" size="lg" />
              <FontAwesomeIcon onClick={() => setError(!error)} icon={faYoutube} color="white" size="lg" />
            </div>
            {error && (<p className="text-red-500 text-sm">no network yet</p>)}
          </div>
        </div>
        <div className=" flex gap-20 mr-20">
            <div className="flex flex-col gap-5">
          <h5 className="text-white font-bold">Pages</h5>
          <div className="flex flex-col">
            <Link
              href="/HomePage"
              className="text-white text-sm hover:underline"
            >
              Home Page
            </Link>
            <Link
              href="/HomePage"
              className="text-white text-sm hover:underline"
            >
              Home Page
            </Link>
            <Link
              href="/AuthPage?mode=signup"
              className="text-white text-sm hover:underline"
            >
              Sign Up
            </Link>
            <Link
              href="/AuthPage?mode=login"
              className="text-white text-sm hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="text-white font-bold">Lorem Ipsum</h5>
          <div className="flex flex-col">
            <Link href="#" className="text-white text-sm hover:underline">
              Lorem ipsum dolor
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Sit amet consectetur
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Adipiscing elit
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Sed do eiusmod
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="text-white font-bold">Lorem Ipsum</h5>
          <div className="flex flex-col">
            <Link href="#" className="text-white text-sm hover:underline">
              Lorem ipsum dolor
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Sit amet consectetur
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Adipiscing elit
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Sed do eiusmod
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h5 className="text-white font-bold">Lorem Ipsum</h5>
          <div className="flex flex-col">
            <Link href="#" className="text-white text-sm hover:underline">
              Lorem ipsum dolor
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Sit amet consectetur
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Adipiscing elit
            </Link>
            <Link href="#" className="text-white text-sm hover:underline">
              Sed do eiusmod
            </Link>
          </div>
        </div>
        </div>
        
        
      </div>
      <div className=" flex items-center justify-center px-20 text-sm text-slate-600 h-15 bg-white ">
        <p>2025 - Teams APIHub - Matthieu - Daniel - Geoffrey</p>
      </div>
    </footer>
  );
}
