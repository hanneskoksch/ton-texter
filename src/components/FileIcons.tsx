"use client";

import React, { useRef } from "react";
import { Image } from "@nextui-org/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function FileIcons() {
  const main = useRef();

  useGSAP(
    () => {
      // .docx
      const iconDocx = document.getElementById("iconDocx");
      gsap.to(iconDocx, {
        opacity: 1,
        rotate: -10,
        scale: 1.9,
        filter: "blur(0px)",
        x: -30,
        y: -150,
        scrollTrigger: {
          trigger: iconDocx,
          start: "bottom bottom",
          end: "top 50%",
          scrub: true,
        },
      });

      // .txt
      const iconTxt = document.getElementById("iconTxt");
      gsap.to(iconTxt, {
        opacity: 1,
        rotate: -2,
        scale: 1.4,
        filter: "blur(0px)",
        y: -40,
        scrollTrigger: {
          trigger: iconDocx,
          start: "bottom bottom",
          end: "top 50%",
          scrub: true,
        },
      });

      // .srt
      const iconSrt = document.getElementById("iconSrt");
      gsap.to(iconSrt, {
        opacity: 1,
        rotate: 5,
        scale: 1.8,
        filter: "blur(0px)",
        y: -40,
        x: 50,
        scrollTrigger: {
          trigger: iconDocx,
          start: "bottom bottom",
          end: "top 50%",
          scrub: true,
        },
      });
    },
    { scope: main },
  );

  return (
    // scaling on small screens provides readability
    <div className="relative flex justify-around">
      <Image
        id="iconDocx"
        radius="none"
        src="/images/file_type_docx.svg"
        alt="docx file icon"
        className="box h-20 inset-6 -inset-y-36 lg:-inset-y-24 opacity-o blur-md"
      />
      <Image
        id="iconTxt"
        radius="none"
        src="/images/file_type_txt.svg"
        alt="txt file icon"
        className="h-20 opacity-o blur-md inset-y-32 -inset-x-20 lg:inset-y-24 lg:inset-x-0"
      />
      <Image
        id="iconSrt"
        radius="none"
        src="/images/file_type_srt.svg"
        alt="srt file icon"
        className="h-20 -inset-x-10 lg:inset-x-10 inset-y-24 lg:inset-y-3 opacity-o blur-md "
      />
    </div>
  );
}

export default FileIcons;
