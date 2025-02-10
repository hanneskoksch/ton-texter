"use client";

import { Divider, Link } from "@heroui/react";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 w-full pb-6">
      <Divider className="mb-6" />
      <div className="mb-4 flex justify-center text-sm">
        &copy; 2024 Ton-Texter
      </div>
      <div className="mb-4 flex items-center justify-center">
        <ThemeSwitcher />
      </div>
      <nav className="mb-4 flex justify-center">
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
