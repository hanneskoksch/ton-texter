import { Divider, Link } from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
  return (
    <footer className="py-6 mt-auto bottom-0 left-0 w-full">
      <Divider className="my-6" />
      <div className="flex justify-center text-sm mb-4">
        &copy; 2024 Ton-Texter
      </div>
      <div className="flex justify-center items-center mb-4">
        <ThemeSwitcher />
      </div>
      <nav className="flex justify-center mb-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/legal/imprint" className="text-sm">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/legal/data-privacy" className="text-sm">
              Datenschutz
            </Link>
          </li>
          <li>
            <Link href="/legal/terms-of-use" className="text-sm">
              Nutzungsbedingungen
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
