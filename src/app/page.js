"use client";
import AIFeature from "./_components/AIFeature";
import FAQSection from "./_components/FAQSection";
import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Hero } from "./_components/Hero";
import Waves from "./_components/Waves";

export default function page() {
  return (
    <>
      <Header />
      <Hero />
      <div className="relative">
        <Features />
      </div>
      <div className="relative min-h-screen w-full flex justify-end items-center">
        <div className="absolute bottom-0 left-0 h-full w-full md:w-1/2 overflow-hidden">
          <Waves className="w-full h-full" />
        </div>
        <div className="w-full h-full md:w-1/2">
          <AIFeature />
        </div>
      </div>
      <FAQSection />
      <Footer />
    </>
  );
}
