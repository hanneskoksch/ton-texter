"use client";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col">
      <form action="/auth/signup" method="post">
        <Input
          name="email"
          type="email"
          placeholder="E-Mail"
          label="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          label="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4"
        />
        <Button type="submit" color="default">
          Registrieren
        </Button>
      </form>
    </div>
  );
}
