"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "../../../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/context";
import { Trash } from "lucide-react";
import LoaderButton from "@/app/_components/LoaderButton";

const EditModal = ({ open, setOpen, obj, Table }) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getBudgetList, getIncomeList } = useGlobalContext();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: obj,
    mode: "onChange",
  });

  useEffect(() => {
    if (open) {
      reset(obj);
    }
  }, [open, obj, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await db
        .update(Table)
        .set({
          name: data.name,
          amount: data.amount,
          createdBy: data.createdBy,
          Icon: data.Icon,
        })
        .where(eq(Table.id, data.id));

      toast.success(`${Table === "Budgets" ? "Budget" : "Income"} Updated!`);
      if (Table === "Budgets") {
        await getBudgetList();
      } else {
        await getIncomeList();
      }
    } catch (error) {
      toast.error(
        `Error Updating ${Table === "Budgets" ? "Budget" : "Income"}!`
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const habdleDelete = async () => {
    try {
      await db.delete(Table).where(eq(Table.id, obj.id));
      toast.success(`${Table === "Budgets" ? "Budget" : "Income"} Deleted!`);
      if (Table === "Budgets") {
        await getBudgetList();
      } else {
        await getIncomeList();
      }
    } catch (error) {
      toast.error(
        `Error Deleting ${Table === "Budgets" ? "Budget" : "Income"}!`
      );
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit {Table === "Budgets" ? "Budget" : "Income"}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div>
              <Controller
                name={"Icon"}
                control={control}
                rules={{ required: "Icon is required" }}
                render={({ field }) => (
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="text-lg"
                      onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    >
                      {field.value || "Select Icon"}
                    </Button>
                    {openEmojiPicker && (
                      <div className="absolute z-20">
                        <EmojiPicker
                          onEmojiClick={(emojiObject) => {
                            field.onChange(emojiObject.emoji);
                            setOpenEmojiPicker(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              />
              {errors.Icon && (
                <p className="text-red-500 pt-1 text-sm">
                  {errors.Icon.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {Table === "Budgets" ? "Budget" : "Income"} Name
              </label>
              <Input
                id="name"
                {...register("name", { required: "Budget name is required" })}
                placeholder="e.g., Home Decor"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                {Table === "Budgets" ? "Budget" : "Income"} Amount
              </label>
              <Input
                id="amount"
                type="number"
                {...register("amount", {
                  required: "Budget amount is required",
                  valueAsNumber: true,
                  validate: (value) =>
                    value > 0 || "Budget amount must be greater than 0",
                })}
                placeholder="e.g. 5000"
              />
              {errors.amount && (
                <p className="text-red-500 pt-1 text-sm">
                  {errors.amount.message}
                </p>
              )}
            </div>
            <LoaderButton
              type="submit"
              disabled={!isValid || !isDirty}
              className="w-max float-right"
              buttonText={"Save Changes"}
              loading={loading}
            />
          </form>
        </DialogHeader>
        <Button
          variant={"destructive"}
          className="w-max"
          onClick={() => habdleDelete()}
        >
          <Trash /> Delete {Table === "Budgets" ? "Budget" : "Income"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
