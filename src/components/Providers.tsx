"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default Providers;
