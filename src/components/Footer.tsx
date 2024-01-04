import { Divider, Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="py-4 mt-auto bottom-0 left-0 w-full">
      <Divider className="my-4" />
      <div className="flex justify-center text-sm mb-2">
        &copy; 2024 Ton-Texter
      </div>
      <nav className="flex justify-center">
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
