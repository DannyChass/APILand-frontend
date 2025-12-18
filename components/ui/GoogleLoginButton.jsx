import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const router = useRouter();



  return (
    <GoogleOAuthProvider clientId="345080811696-7fmah26tmhv08u1qt4sereefmp6rr2pc.apps.googleusercontent.com">
      <div className="w-full font-bold text-slate-400">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            try {
              const response = await fetch("http://localhost:3000/users/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: credentialResponse.credential }),
              });

              const data = await response.json();

              if (!data.result) {
                console.error(data.error);
                return;
              }

              localStorage.setItem("accessToken", data.accessToken);

              const meRes = await fetch("http://localhost:3000/users/me", {
                headers: {
                  Authorization: `Bearer ${data.accessToken}`,
                },
              });

              const meData = await meRes.json();

              if (meData.result) {
                dispatch(setUser(meData.user));
              }

              router.push("/");
            } catch (err) {
              console.error("Google login error:", err);
            }
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
