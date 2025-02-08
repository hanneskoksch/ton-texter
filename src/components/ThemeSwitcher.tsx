"use client";

import { Button } from "@nextui-org/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex space-x-1">
      <Button
        isIconOnly
        size="sm"
        variant={theme === "light" ? "flat" : "light"}
        onPress={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        isIconOnly
        size="sm"
        variant={theme === "dark" ? "flat" : "light"}
        onPress={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  );
}
