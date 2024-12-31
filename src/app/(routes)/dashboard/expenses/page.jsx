"use client";
import { useGlobalContext } from "@/context/context";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { DataTable } from "./_components/data-table";
import { columns } from "./tableConfig";
import { Button } from "@/components/ui/button";
import AddExpense from "./_components/AddExpense";

function ExpensesScreen() {
  const { getAllExpenses, expenseList, budgetList, getBudgetList } =
    useGlobalContext();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const { user } = useClerk();
  useEffect(() => {
    user && getAllExpenses();
    if (!budgetList) {
      getBudgetList();
    }
    if (expenseList && budgetList) {
      const filteredExpenses = expenseList
        .filter((expense) =>
          budgetList.some((budget) => budget.id === expense.budgetId)
        )
        .map((expense) => {
          const matchingBudget = budgetList.find(
            (budget) => budget.id === expense.budgetId
          );
          return {
            ...expense,
            Icon: matchingBudget?.Icon || null,
            budgetName: matchingBudget?.name || null,
          };
        });
      setData(filteredExpenses);
    }
  }, [user, expenseList]);

  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">My Expenses</h2>
        <Button onClick={() => setOpen(true)}>Add Expense</Button>
        <AddExpense open={open} setOpen={setOpen} />
      </div>
      <DataTable columns={columns} data={data || []} />
      <section className="w-full flex justify-center items-center"></section>
    </div>
  );
}

export default ExpensesScreen;
