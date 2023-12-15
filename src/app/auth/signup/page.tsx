"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button, Input } from "@nextui-org/react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      // Handle successful signup, e.g., redirect user to a new page
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <form
        onSubmit={handleSignup}
        className="flex items-center justify-center"
      >
        <div className="flex flex-col">
          <Input
            type="email"
            placeholder="E-Mail"
            label="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4"
          />
          <Input
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
          {error && <p>{error}</p>}
        </div>
      </form>
    </MaxWidthWrapper>
  );
}
