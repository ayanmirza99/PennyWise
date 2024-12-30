"use client";
import { useUser } from "@clerk/nextjs";
import { Sparkle } from "lucide-react";
import React, { useEffect } from "react";
import CardInfo from "./_components/CardInfo";
import BarChart from "./_components/BarChart";
import BudgetItem from "./budgets/_components/BudgetItem";
import Link from "next/link";
import { useGlobalContext } from "@/context/context";

const page = () => {
  const { user } = useUser();
  let financialAdvice;

  const {
    budgetList,
    incomeList,
    expenseList,
    getAllExpenses,
    getBudgetList,
    getIncomeList,
  } = useGlobalContext();

  useEffect(() => {
    user && (getBudgetList(), getAllExpenses(), getIncomeList());
  }, [user]);

  return (
    <>
      <div
        className="w-full h-full p-4 md:p-8 flex flex-col gap-8 overflow-y-auto"
      >
        <section className="w-full flex flex-col gap-4">
          <h1 className="text-5xl font-semibold">
            Hi, <span className="text-primary">{user?.fullName}</span> 👋
          </h1>
          <p className="text-gray-500 font-semibold text-lg">
            Here's what is happenning with your money, Lets Manage your
            expenses.
          </p>
        </section>
        <section className="w-full md:max-w-[90%] h-max flex flex-col gap-6 border shadow-md rounded-xl p-4">
          <div className="flex gap-4 items-center">
            <Sparkle />
            <h1 className="font-semibold text-2xl">Alfred</h1>
          </div>
          <div className="min-h-[8rem]">{financialAdvice || "Loading"}</div>
        </section>

        <section className="w-full flex flex-wrap gap-4">
          <CardInfo
            budgetList={budgetList}
            incomeList={incomeList}
            expenseList={expenseList}
          />
        </section>

        <section className="w-full flex flex-wrap">
          <div className="w-full lg:w-2/3 rounded-2xl border shadow-md">
            <BarChart budgetList={budgetList} />
          </div>
          {budgetList.length > 0 ? (
            <div className="w-full lg:w-1/3 min-w-[350px] flex flex-wrap gap-6 p-4">
              <h1 className="text-2xl font-semibold">Latest Budgets</h1>
              <div className="flex flex-wrap gap-4">
                {budgetList.slice(0,2).map((budget, index) => (
                  <BudgetItem budget={budget} key={index} />
                ))}
              </div>
              {budgetList.length > 2 ? (
                <Link href="/dashboard/budgets">
                  <div className="text-slate-500 mt-[-1rem]">
                    See all Budgets
                  </div>
                </Link>
              ) : null}
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};

export default page;
