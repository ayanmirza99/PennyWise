"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const { isSignedIn } = useUser();
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <section
        className={`w-full absolute top-0 left-0 bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out z-30 ${
          showNav ? "h-[300px] py-4" : "h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 mt-[20%]">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full text-lg rounded-md text-center"
            >
              Dashboard
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Link href="/sign-up">
                <Button className="w-full text-lg rounded-md text-center">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
      <section className="w-full px-3 md:p-3 flex items-center justify-between border-b shadow-sm">
        <div className="flex items-center text-primary font-bold text-2xl md:text-3xl">
          <div className="h-12 w-20 md:h-16 md:w-24 flex items-center -ml-6 md:-ml-0 justify-center overflow-hidden">
            <img src="/logo.png" alt="logo" />
          </div>
          <h1 className="-ml-4">PennyWise</h1>
        </div>
        <div className="hidden md:flex gap-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-xl text-lg md:text-xl md:p-6"
            >
              Dashboard
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Link href="/sign-up">
                <Button className="rounded-xl text-lg md:text-xl md:p-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
        <Menu
          className="flex z-40 md:hidden"
          onClick={() => setShowNav(!showNav)}
        />
      </section>
    </>
  );
};

export default Header;
