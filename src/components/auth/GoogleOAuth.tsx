import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

const GoogleOAuth = () => {
  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });

    if (error) {
      console.log(error);
      return;
    }

    console.log(data);
  }

  return (
    <div className="flex flex-col items-center m-2">
      <button
        onClick={signInWithGoogle}
        style={{ border: "none", background: "none", cursor: "pointer" }}
        className="flex flex-col items-center"
      >
        <Image
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Logo"
          width="32"
          height="32"
        />
        <span>Google</span>
      </button>
    </div>
  );
};

export default GoogleOAuth;
