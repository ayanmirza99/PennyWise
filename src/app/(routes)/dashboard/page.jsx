"use client";
import getFinancialAdvice from "../../../../utils/getFinancialAdvice";
import BudgetItem from "./budgets/_components/BudgetItem";
import { useGlobalContext } from "@/context/context";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChart from "./_components/BarChart";
import { useUser } from "@clerk/nextjs";
import { Sparkle } from "lucide-react";
import Link from "next/link";

const page = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

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

  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      if (budgetList.length > 0) {
        setLoading(true);
        try {
          const result = await getFinancialAdvice(
            budgetList,
            incomeList,
            expenseList
          );
          setAdvice(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAdvice();
  }, [budgetList, incomeList, expenseList, getFinancialAdvice]);

  return (
    <>
      <div className="w-full h-full p-4 md:p-8 flex flex-col gap-8 overflow-y-auto">
        <section className="w-full flex flex-col gap-4">
          <h1 className="text-5xl font-semibold">
            Hi, <span className="text-primary">{user?.fullName}</span> 👋
          </h1>
          <p className="text-gray-500 font-semibold text-lg">
            Here's what is happenning with your money, Lets Manage your
            finances.
          </p>
        </section>
        <section className="w-full md:max-w-[90%] h-max flex flex-col gap-6 border shadow-md rounded-xl p-4">
          <div className="flex gap-4 items-center">
            <Sparkle className={`text-primary ${loading && "rotate"}`} />
            <h1 className="font-semibold text-2xl">Alfred</h1>
          </div>
          <div className="min-h-[8rem] text-[16px] md:text-xl text-gray-700 cursor-pointer leading-8">
            {loading && (
              <div className="space-y-3">
                <Skeleton className="h-8 w-[90%]" />
                <Skeleton className="h-8 w-[60%]" />
              </div>
            )}
            {advice}
          </div>
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
            <Link
              href="/dashboard/budgets"
              className="w-full lg:w-1/3 min-w-[350px] flex flex-wrap gap-6 p-4"
            >
              <h1 className="text-2xl font-semibold">Latest Budgets</h1>
              <div className="flex flex-wrap gap-4">
                {budgetList.slice(0, 2).map((budget, index) => (
                  <BudgetItem budget={budget} key={index} />
                ))}
              </div>
              {budgetList.length > 2 ? (
                <div className="text-slate-500 mt-[-1rem]">See all Budgets</div>
              ) : null}
            </Link>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};

export default page;
