"use client";

import { ReactCompareSlider } from "react-compare-slider";
import CompareSliderSvg from "./CompareSliderSvg";

export const CompareSlider = () => {
  return (
    <ReactCompareSlider
      itemOne={<CompareSliderSvg />}
      itemTwo={
        <div className="bg-background w-full h-full flex justify-center items-center px-5 md:px-10 ">
          <p className="text-center line-clamp-1 md:text-lg font-semibold font-mono tracking-tighter pt-2 italic drop-shadow-md shadow-default-200 bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
            Ask not what your country can do for you, ask what you can do for
            your country.
          </p>
        </div>
      }
    />
  );
};
