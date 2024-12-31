"use client";

import LoaderButton from "@/app/_components/LoaderButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from "@/context/context";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";
import { expenses } from "../../../../../../utils/schema";
import { useClerk } from "@clerk/nextjs";

const AddExpense = ({ open, setOpen }) => {
  const { user } = useClerk();
  const { budgetList, getBudgetList, getAllExpenses } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getBudgetList();
  }, []);

  const addExpense = async (data) => {
    setLoading(true);
    try {
      await db.insert(expenses).values({
        name: data.name,
        amount: data.amount,
        budgetId: parseFloat(data.budgetId),
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: new Date(),
      });
      getAllExpenses();
      toast.success("Expense Added!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <form onSubmit={handleSubmit(addExpense)}>
            <div className="mt-5">
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Expense Name</h2>
                <Input {...register("name")} placeholder="e.g., Home Decor" />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Amount</h2>
                <Input
                  type="number"
                  {...register("amount", { required: "Amount is required" })}
                  placeholder="e.g., 5000"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Spent on</h2>
                <Controller
                  name="budgetId"
                  control={control}
                  rules={{ required: "Please select a budget" }}
                  render={({ field, fieldState }) => (
                    <div className="space-y-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {budgetList.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                                className="flex items-center my-1 data-[state=checked]:bg-[#4845d2]/20 hover:bg-[#d9d9d9] justify-between"
                              >
                                {item.Icon}{" "}
                                <span className="ml-2">{item.name}</span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red-500 text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="w-full flex justify-end mt-4">
              <LoaderButton
                loading={loading}
                buttonText={"Add Expense"}
                type="submit"
              />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpense;
