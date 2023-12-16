import GithubOAuth from "./GithubOAuth";
import GoogleOAuth from "./GoogleOAuth";

const OAuthButtons = () => {
  return (
    <div className="flex justify-between max-w-xs mx-auto">
      <GithubOAuth />
      <GoogleOAuth />
    </div>
  );
};

export default OAuthButtons;