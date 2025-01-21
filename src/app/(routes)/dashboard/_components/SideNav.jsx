"use client";
import {
  CircleDollarSign,
  LayoutDashboard,
  MenuIcon,
  PiggyBank,
  ReceiptText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideNav = ({ expand, mobileScreen, setExpand }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const path = usePathname();

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={mobileScreen ? 24 : 32} />,
      path: "/dashboard",
    },
    {
      name: "Incomes",
      icon: <CircleDollarSign size={mobileScreen ? 24 : 32} />,
      path: "/dashboard/incomes",
    },
    {
      name: "Budgets",
      icon: <PiggyBank size={mobileScreen ? 24 : 32} />,
      path: "/dashboard/budgets",
    },
    {
      name: "Expenses",
      icon: <ReceiptText size={mobileScreen ? 24 : 32} />,
      path: "/dashboard/expenses",
    },
    {
      name: "Alfred",
      icon: <Sparkles size={mobileScreen ? 24 : 32} />,
      path: "/dashboard/alfred",
    },
  ];

  return (
    <>
      {mobileScreen ? (
        <div
          className={`absolute z-40 h-screen w-full sm:w-[300px] ${
            expand ? "left-0" : `-left-[700px] sm:-left-[300px]`
          } top-0 px-4 pt-28 border-r transition-all ease-in-out duration-200 bg-[#f0f4f9]`}
        >
          <div
            className={`flex flex-col items-start xs:items-center gap-12 text-lg font-semibold cursor-pointer transition-all`}
          >
            {menu.map((item, index) => {
              return (
                <Link
                  onClick={() => setExpand(false)}
                  href={path == item.path ? "" : item.path}
                >
                  <button
                    className={`flex items-center gap-4 rounded-full w-full py-3 pr-14 pl-4 ${
                      path == item.path
                        ? "bg-primary text-white hover:bg-primary"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                    key={index}
                  >
                    {item.icon}
                    <h1>{item.name}</h1>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className={`h-screen flex flex-col gap-12 ${
            isCollapsed ? "w-[60px] lg:w-[80px] items-center px-0" : "w-[350px]"
          } p-4 border-r dark:border-[#1e1f20] transition-all ease-in duration-200 shadow-md`}
        >
          <div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-primary hover:bg-blue-50 dark:hover:bg-[#393b3d] rounded-full p-2 transition-all ease-in"
            >
              <MenuIcon className="size-8" />
            </button>
          </div>
          <div
            className={`${
              isCollapsed ? "w-max" : "w-full"
            } flex flex-col gap-12 text-xl font-semibold cursor-pointer transition-all`}
          >
            {menu.map((item, index) => {
              return (
                <Link href={path == item.path ? "" : item.path}>
                  <button
                    className={`flex items-center gap-4 rounded-full w-full p-4 
                                        ${
                                          path == item.path
                                            ? "bg-primary text-white hover:bg-primary"
                                            : "hover:bg-blue-50 text-gray-700"
                                        }
                                        `}
                    key={index}
                  >
                    {item.icon}
                    {!isCollapsed && <h1>{item.name}</h1>}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
