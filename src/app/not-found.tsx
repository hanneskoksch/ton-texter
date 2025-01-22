"use client";

import { Button, Link } from "@nextui-org/react";
import Image from "next/legacy/image";

function NotFound() {
  return (
    <div className="overflow-clip">
      <div className="relative -mt-[4rem] h-screen w-screen">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 p-12 pt-32 md:pt-44">
          <div className="text-center text-white">
            <h1 className="mb-6 text-9xl font-bold text-white">404</h1>
            <p className="mb-3 text-3xl">
              You&lsquo;ve come a long way, cowboy.
            </p>
            <p className="mb-6">
              There is nothing else anymore, you reached the end.
            </p>
            <Button
              color="default"
              variant="bordered"
              className="border-white text-white"
              as={Link}
              href="/"
            >
              Go back home
            </Button>
          </div>
        </div>

        <Image
          src="/images/space_cowboy_404.avif"
          alt="404"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-30 md:opacity-100"
          objectPosition="left"
        />
      </div>
    </div>
  );
}

export default NotFound;
