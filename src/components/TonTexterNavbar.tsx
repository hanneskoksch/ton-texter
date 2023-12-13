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

function TonTexterNavbar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          {/* <TonTexterLogo /> */}
          <p className="font-bold text-lg text-inherit ">Ton-Texter</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            as={LinkNextUI}
            color="primary"
            href="/"
            target="_blank"
            variant="bordered"
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={LinkNextUI}
            color="primary"
            href="/"
            target="_blank"
            variant="solid"
          >
            Registrieren
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default TonTexterNavbar;
