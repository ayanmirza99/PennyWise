"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <>
      <section className="w-full p-5 flex items-center justify-between border-b shadow-sm">
        <div className="flex gap-4 text-2xl">
          <h1>Logo</h1>
          <h1>PennyWise</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full text-xl p-6">
              Dashboard
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton />
          ) : (
            <>
              <Link href="/dashboard">
                <Button className="rounded-full text-xl p-6">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
