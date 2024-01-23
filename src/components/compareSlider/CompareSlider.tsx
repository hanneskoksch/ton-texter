"use client";

import { ReactCompareSlider } from "react-compare-slider";
import CompareSliderSvg from "./CompareSliderSvg";

export const CompareSlider = () => {
  return (
    <ReactCompareSlider
      className="pb-8"
      itemOne={
        <div className="flex h-[286.72px] w-full items-center justify-center bg-background px-5 pt-5 md:px-10">
          <p className="line-clamp-1 animate-gradient bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] bg-clip-text pt-2 text-center font-mono font-semibold italic tracking-tighter text-transparent shadow-default-200 drop-shadow-md md:text-lg">
            Ask not what your country can do for you, ask what you can do for
            your country.
          </p>
        </div>
      }
      itemTwo={
        <div className="bg-background">
          <CompareSliderSvg />
        </div>
      }
    />
  );
};
