"use client";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import { useGlobalContext } from "@/context/context";

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
