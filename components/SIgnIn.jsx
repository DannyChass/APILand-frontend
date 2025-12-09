import Button from "./ui/Button";
import InputText from "./ui/InputText";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="container">

      <div className="w-[50%] justify-between flex flex-col  h-full p-6">
        <Link href="#" className="logo"> APIhub</Link>
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
      <div className="flex flex-col bg-[#050F2A] w-[50%] h-full justify-center items-center pt-15 gap-[30] text-white">
        <h3 className="text-3xl font-bold">Connectez-vous</h3>
        <InputText
          placeHolder="Username"
          classname=" bg-[#ffffff] rounded-[5] text-lg  text-stone-400 h-[50px] pl-10 shadow w-[70%] hover:bg-[#eeeeee]"
        />
        <div className=" w-[70%] justify-items-center items-center">
          <InputText
            placeHolder="Mot de Passe"
            classname="w-full bg-[#ffffff] rounded-[5] text-lg text-stone-400 h-[50px] shadow pl-10 hover:bg-[#eeeeee] "
          />
          <Link href="#" className="text-sm text-stone-300 hover:underline">
            {" "}
            Mot de passe oublié?
          </Link>
        </div>
        <div className="w-[70%] justify-items-center items-center">
          <Link href="#" className="text-sm text-stone-300 hover:underline">
            Vous n'avez pas de compte ?
          </Link>
          <Button classname="w-full bg-[#B8A9FF] h-[50px] font-semibold text-lg rounded-[3] hover:bg-[#9d90de] cursor-pointer">
            Connexion
          </Button>
        </div>
        <hr className="bg-white border-white border-2 w-[80%]"></hr>

        <div className="w-[70%] h-[30%] flex flex-col gap-[30] justify-center items-center pt-20">
          <Button classname="bg-white w-full justify-center rounded-[3] items-center gap-3 flex text-stone-300 h-[50px]">
            {" "}
            Connectez-vous avec <img className="h-6" src="../google.png" />{" "}
          </Button>
          <Button classname="bg-white w-full justify-center rounded-[3] items-center gap-3 flex text-stone-300 h-[50px]">
            {" "}
            Connectez-vous avec <img className="h-6" src="../github.png" />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
