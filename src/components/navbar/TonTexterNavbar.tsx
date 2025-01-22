"use client";

import AuthButton from "@/components/navbar/AuthButton";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link as NextUILink,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

function TonTexterNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-3">
          <Image
            priority={true}
            src="/tontexter_logo_small.svg"
            alt="TonTexter Logo"
            width={30}
            height={30}
          />
          <p className="text-lg font-bold text-inherit">Ton-Texter</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="start">
        <NavbarItem>
          <NextUILink href="/blog">Blog</NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink href="/pricing">Pricing</NextUILink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="gap-4 sm:flex" justify="end">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarItem className="hidden gap-4 sm:flex">
          <Suspense>
            <AuthButton />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="mt-4 space-y-4">
        <NavbarMenuItem>
          <Suspense>
            <AuthButton isMobile />
          </Suspense>
        </NavbarMenuItem>

        {/* Mobile burger menu */}
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
