"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function Hero() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-bold text-black dark:text-white cursor-pointer">
                Manage your Money with AI-Driven Personal
                <br />
                <span className="text-6xl text-primary md:text-[6rem] font-extrabold mt-8 md:mt-4 leading-none">
                  Finance Advisor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={isMobile ? "/image-mobile.png" :"/image.png"}
            alt="hero"
            height={720}
            width={900}
            className="rounded-2xl object-cover h-full w-full object-top md:object-left-bottom"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
}
