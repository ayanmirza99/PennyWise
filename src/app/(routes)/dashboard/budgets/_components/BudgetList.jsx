"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { useGlobalContext } from "@/context/context";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CreateBudget from "./CreateBudget";

function BudgetList() {
  const { user } = useUser();
  const { budgetList, getBudgetList } = useGlobalContext();
  const [openDialogId, setOpenDialogId] = useState(null);

  useEffect(() => {
    user && getBudgetList();
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
                <h2>Create New Budget</h2>
              </div>
            </DialogTrigger>
            <DialogContent>
              <CreateBudget />
            </DialogContent>
          </Dialog>
        </div>
        {budgetList.length > 0 &&
          budgetList.map((budget) => (
            <Dialog
              key={budget.id}
              open={openDialogId === budget.id}
              onOpenChange={(open) => setOpenDialogId(open ? budget.id : null)}
            >
              <DialogTrigger asChild>
                <div>
                  <BudgetItem
                    onClick={() => setOpenDialogId(budget.id)}
                    budget={budget}
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <CreateBudget
                  data={budget}
                  close={() => setOpenDialogId(null)}
                />
              </DialogContent>
            </Dialog>
          ))}
        {budgetList.length === 0 &&
          budgetList !== "" &&
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[350px] bg-slate-200 rounded-lg 
                  h-[150px] animate-pulse"
            ></div>
          ))}
      </div>
      {budgetList === "" && (
        <div className="text-2xl min-w-[280px] md:min-w-[350px] h-[300px] flex flex-col items-center justify-center gap-2 font-semibold">
          <img
            src="/Empty.svg"
            alt=""
            className="w-full h-full object-contain object-center"
          />
          <h1>You have no Budgets</h1>
        </div>
      )}
    </div>
  );
}

export default BudgetList;
