"use client";
import React, { useEffect, useState } from "react";
import CreateIncome from "./CreateIncome";
import { useUser } from "@clerk/nextjs";
import { useGlobalContext } from "@/context/context";
import IncomeItem from "./IncomeItem";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function BudgetList() {
  const { user } = useUser();
  const { incomeList, getIncomeList } = useGlobalContext();
  const [openDialogId, setOpenDialogId] = useState(null);

  useEffect(() => {
    user && getIncomeList();
  }, [user]);

  return (
    <div className="mt-7">
      <div className="flex justify-center md:justify-normal flex-wrap gap-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <div
                className="bg-slate-100 p-10 rounded-2xl min-w-[300px] md:min-w-[390px]
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md duration-150 ease-in-out"
              >
                <h2 className="text-3xl">+</h2>
                <h2>Add New Income</h2>
              </div>
            </DialogTrigger>
            <DialogContent>
              <CreateIncome />
            </DialogContent>
          </Dialog>
        </div>
        {incomeList.length > 0 &&
          incomeList.map((income) => (
            <Dialog key={income.id} open={openDialogId === income.id}>
              <DialogTrigger asChild>
                <div>
                  <IncomeItem
                    income={income}
                    onClick={() => setOpenDialogId(income.id)}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <CreateIncome
                  data={income}
                  close={() => setOpenDialogId(null)}
                />
              </DialogContent>
            </Dialog>
          ))}
        {incomeList.length === 0 &&
          incomeList !== "" &&
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[350px] bg-slate-200 rounded-lg 
                  h-[150px] animate-pulse"
            ></div>
          ))}
      </div>
      {incomeList === "" && (
        <div className="text-2xl min-w-[280px] md:min-w-[350px] h-[300px] flex flex-col items-center justify-center gap-2 font-semibold">
          <img
            src="/Empty.svg"
            alt=""
            className="w-full h-full object-contain object-center"
          />
          <h1>You have no Incomes</h1>
        </div>
      )}
    </div>
  );
}

export default BudgetList;
