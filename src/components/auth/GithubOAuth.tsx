import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

const GithubOAuth = () => {
  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
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
        onClick={signInWithGithub}
        style={{ border: "none", background: "none", cursor: "pointer" }}
        className="flex flex-col items-center"
      >
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub Logo"
          width="32"
          height="32"
        />
        <span>Github</span>
      </button>
    </div>
  );
};

export default GithubOAuth;
