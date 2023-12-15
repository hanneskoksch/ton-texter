import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link as LinkNextUI,
} from "@nextui-org/react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";

async function TonTexterNavbar() {
  // check if we have a user session (logged in) with supabase
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userIsLoggedIn = session !== null;

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-lg text-inherit ">Ton-Texter</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        {userIsLoggedIn ? (
          <NavbarItem>
            <form action="/auth/signout" method="post">
              <Button type="submit" color="danger">
                Sign out
              </Button>
            </form>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={LinkNextUI}
                color="primary"
                href="/login"
                variant="bordered"
                size="sm"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={LinkNextUI}
                color="primary"
                href="/signup"
                variant="solid"
                size="sm"
              >
                Registrieren
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default TonTexterNavbar;
