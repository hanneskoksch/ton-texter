import React, { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
} from "@nextui-org/react";
import Link from "next/link";
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
          <Suspense>
            <AuthButton />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default TonTexterNavbar;
