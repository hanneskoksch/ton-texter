import React, { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";
import AuthButton from "./AuthButton";

function TonTexterNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          {/* <TonTexterLogo /> */}
          <p className="text-lg font-bold text-inherit ">Ton-Texter</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="gap-4 sm:flex" justify="center">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Suspense>
            <AuthButton />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default TonTexterNavbar;
