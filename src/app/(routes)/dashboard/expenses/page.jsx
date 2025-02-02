"use client";

import { useGlobalContext } from "@/context/context";
import { useEffect, useState } from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./tableConfig";
import { Button } from "@/components/ui/button";
import AddExpense from "./_components/AddExpense";
import { Pen, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoaderButton from "@/app/_components/LoaderButton";
import { db } from "../../../../../utils/dbConfig";
import { expenses } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpensesScreen() {
  const { getAllExpenses, expenseList, budgetList, getBudgetList } =
    useGlobalContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDelete = async (id) => {
    setLoading(true);
    try {
      await db.delete(expenses).where(eq(expenses.id, id));
      toast.success("Expense Deleted!");
      await getAllExpenses();
    } catch (error) {
      toast.error("Error Deleting Expense!");
    } finally {
      setLoading(false);
    }
  };

  const updatedColumns = [
    ...columns,
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Pen className="w-5 h-5 text-primary" />
          </DialogTrigger>
          <DialogContent>
            <AddExpense data={row.original} />
          </DialogContent>
        </Dialog>
      ),
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Trash className="w-5 h-5 text-destructive cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Confirm Deletion</h3>
              <p className="">
                Are you sure you want to delete this item? This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-2">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <LoaderButton
                    loading={loading}
                    className="bg-destructive hover:bg-destructive/90"
                    buttonText={"Delete"}
                    onClick={() => onDelete(row.original.id)}
                  />
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  const updateData = () => {
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
  };

  useEffect(() => {
    getAllExpenses();
    getBudgetList();
  }, []);

  useEffect(() => {
    updateData();
  }, [expenseList, budgetList]);

  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-3xl">My Expenses</h2>
        <Dialog>
          <DialogTrigger asChild>
            {Array.isArray(budgetList) && <Button>Add Expense</Button>}
          </DialogTrigger>
          <DialogContent>
            <AddExpense />
          </DialogContent>
        </Dialog>
      </div>
      {!Array.isArray(budgetList) && <h1 className="pt-2 blink">Add Budgets in order to add expenses.</h1>}
      <DataTable columns={updatedColumns} data={data} />
    </div>
  );
}

export default ExpensesScreen;
