import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
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
      <NavbarContent className="gap-4 sm:flex" justify="start">
        <NavbarItem>
          <NextUILink href="/blog">Blog</NextUILink>
        </NavbarItem>
     
      </NavbarContent>
      <NavbarContent className="gap-4 sm:flex" justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <AuthButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default TonTexterNavbar;
