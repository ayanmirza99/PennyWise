"use client";
import { useGlobalContext } from "@/context/context";
import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { DataTable } from "./_components/data-table";
import { columns } from "./tableConfig";
import { Button } from "@/components/ui/button";

function ExpensesScreen() {
  const { getAllExpenses, expenseList } = useGlobalContext();
  const { user } = useClerk();
  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <Button>Add Expense</Button>
      </div>
        <DataTable columns={columns} data={expenseList} />
      <section className="w-full flex justify-center items-center">
      </section>
    </div>
  );
}

export default ExpensesScreen;
