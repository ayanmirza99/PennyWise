"use client";
import Header from "./_components/Header";
import { Hero } from "./_components/Hero";
import { HowItWorks } from "./_components/HowItWorks";
import Waves from "./_components/Waves";

export default function page() {
  return (
    <>
      <Header />
      <div className="relative">
        <Waves />
        <Hero />
      </div>
      <HowItWorks />
      {/* <div className="h-screen w-full"></div> */}
    </>
  );
}
