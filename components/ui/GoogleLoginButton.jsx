import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  


  return (
    <GoogleOAuthProvider clientId="345080811696-7fmah26tmhv08u1qt4sereefmp6rr2pc.apps.googleusercontent.com">
      <div className="w-full font-bold text-slate-400">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log("Token Google:", credentialResponse.credential);

            const response = await fetch("http://localhost:3000/users/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: credentialResponse.credential }),
            });
            const data = await response.json();

            console.log("Réponse backend:", data);

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/");
          }}
          render={renderProps => (
      <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
    )}
          onError={() => {
            console.log("Échec de la connexion Google");
          }}
          
        />
      </div>
    </GoogleOAuthProvider>
  );
}
