import React, { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarItem,
  Link as NextUILink,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Link from "next/link";
import AuthButton from "@/components/navbar/AuthButton";

function TonTexterNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          {/* <TonTexterLogo /> */}
          <p className="text-lg font-bold text-inherit ">Ton-Texter</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <NextUILink href="/blog">Blog</NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/pricing">Pricing</NextUILink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="gap-4 sm:flex" justify="end">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarItem className="hidden sm:flex gap-4">
          <Suspense>
            <AuthButton />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Suspense>
            <AuthButton />
          </Suspense>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <NextUILink className="w-full" size="lg" href="/pricing">
            Pricing
          </NextUILink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NextUILink className="w-full" size="lg" href="/blog">
            Blog
          </NextUILink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default TonTexterNavbar;
