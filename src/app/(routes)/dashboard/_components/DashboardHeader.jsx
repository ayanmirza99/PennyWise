import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import React from "react";

const DashboardHeader = ({ expand, setExpand, mobileScreen }) => {
  return (
    <section className="w-full flex p-5 items-center justify-between border-b shadow-md">
      <div className="flex items-center gap-4 z-40 text-xl lg:text-3xl text-primary font-bold">
        {mobileScreen && (
          <Menu
            onClick={() => {
              setExpand(!expand);
            }}
          />
        )}
        <div className="ml-2 flex z-40 items-center text-primary font-bold text-2xl md:text-3xl">
          <div className="h-6 w-20 md:h-9 md:w-24 flex items-center -ml-6 md:-ml-0 justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
          <h1>PennyWise</h1>
        </div>
      </div>
      <div>
        <UserButton afterSignOutURL="/" />
      </div>
    </section>
  );
};

export default DashboardHeader;
