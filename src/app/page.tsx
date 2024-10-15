"use client";

import React from "react";
import clsx from "clsx";
import { title, subtitle } from "@/components/primitives";
import { FloatingDock } from "@/components/floating-dock";
import links from "@/conf/links";
import { variable } from "@/components/font/fontProvider";
import Link from "next/link";
import { Compare } from "@/components/compare";
export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <FloatingDock
        desktopClassName="fixed bottom-5"
        mobileClassName="fixed bottom-5 left-5"
        items={links}
      />
      <div className="inline-block text-center justify-center ">
        <span className={clsx(title(), variable.className, "font-medium")}>Get Ready for the </span>
        <span className={clsx(title({ color: "halloween", size: "lg" }), "font-black", variable.className)}>Spooky </span>
        <span className={clsx(title(), variable.className, "font-medium")}>Season </span>
        <br />
        <div className={clsx(subtitle({ class: "mt-4 mb-12" }), variable.className, "font-medium")}>
          With AI Powered Photo Manipulation Tools
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link href={"/undead"} className={clsx(title({ color: "halloween", size: "sm" }), "font-black text-sm w-[70%] text-start", variable.className)}>Undead Me </Link>
          <hr className="rounded-xl my-1 h-1 w-[70%] border-0 bg-gradient-to-l from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747]" />
          <div className="flex  mt-3 gap-5 w-[70%] justify-center">
            <Compare
              firstImage="https://githubreadme.s3.eu-north-1.amazonaws.com/rr_4.avif"
              secondImage="https://githubreadme.s3.eu-north-1.amazonaws.com/rr_4+(1).avif"
              firstImageClassName="object-cover object-center-top"
              secondImageClassname="object-cover object-center-top"
              className="h-[250px] drop-shadow-2xl"
              slideMode="hover"
            />
            <span className={clsx(variable.className, "font-medium text-xl max-w-[70%] text-start")}>
              Turn yourself into a monster born from the darkest nightmares, choose between our predefined prompts or customize the effect with your own description
            </span>

          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <Link href={"/horrorland"} className={clsx(title({ color: "halloween", size: "sm" }), "font-black text-sm w-[70%] text-start", variable.className)}>Horror Lands </Link>
          <hr className="rounded-xl my-1 h-1 w-[70%] border-0 bg-gradient-to-l from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747]" />
          <div className="flex mt-3 gap-5 w-[70%] justify-center">
            <Compare
              firstImage="https://githubreadme.s3.eu-north-1.amazonaws.com/nks7nr2pa24fluujp8dq.jpeg"
              secondImage="https://githubreadme.s3.eu-north-1.amazonaws.com/horrorland+(2).png"
              firstImageClassName="object-cover object-center-top"
              secondImageClassname="object-cover object-center-top"
              className="h-[250px] drop-shadow-2xl"
              slideMode="hover"
            />
            <span className={clsx(variable.className, "font-medium text-xl max-w-[70%] text-start")}>
              Teleport into worlds of horror and mystery with the power of AI, choose our selected destinations or let your imagination fly with a custom prompt 
            </span>

          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-4">
          <Link href={"/spookyAdjust"} className={clsx(title({ color: "halloween", size: "sm" }), "font-black text-sm w-[70%] text-start", variable.className)}>Spookify</Link>
          <hr className="rounded-xl my-1 h-1 w-[70%] border-0 bg-gradient-to-l from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747]" />
          <div className="flex mt-3 gap-5 w-[70%] justify-center">
            <Compare
              firstImage="https://githubreadme.s3.eu-north-1.amazonaws.com/Warframe0000.jpg"
              secondImage="https://githubreadme.s3.eu-north-1.amazonaws.com/spooky+(5).png"
              firstImageClassName="object-cover object-center-top"
              secondImageClassname="object-cover object-center-top"
              className="h-[250px] drop-shadow-2xl"
              slideMode="hover"
            />
            <span className={clsx(variable.className, "font-medium text-xl max-w-[70%] text-start")}>
              With slight modifications in color, brightness and saturation plus carefully chosen overlays you can give an horror ambient to any picture
            </span>

          </div>
        </div>
      </div>
    </section>
  );
}
