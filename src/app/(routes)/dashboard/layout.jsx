"use client";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import { useGlobalContext } from "@/context/context";
import NextTopLoader from "nextjs-toploader";

const DashboardLayout = ({ children }) => {
  const { expand, setExpand, mobileScreen } = useGlobalContext();

  const { user } = useUser();

  return (
    <>
      {user ? (
        <div className="h-full w-full flex">
          <section className="">
            <SideNav
              expand={expand}
              setExpand={setExpand}
              mobileScreen={mobileScreen}
            />
          </section>
          <section className="w-full h-[100dvh] flex flex-col">
            <DashboardHeader
              expand={expand}
              setExpand={setExpand}
              mobileScreen={mobileScreen}
            />
            <NextTopLoader
              color="#4845D2"
              showAtBottom
              showSpinner={false}
              shadow={false}
              height={5}
            />
            {children}
          </section>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default DashboardLayout;
