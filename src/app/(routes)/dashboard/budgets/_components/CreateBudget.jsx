"use client";
import LoaderButton from "@/app/_components/LoaderButton";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/context";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";
import { Budgets } from "../../../../../../utils/schema";
import { useClerk } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { Trash2 } from "lucide-react";

const CreateBudget = ({ data, close }) => {
  const { user } = useClerk();
  const { getBudgetList } = useGlobalContext();
  const [emojiIcon, setEmojiIcon] = useState(data ? data.Icon : "😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      ...data,
    },
  });

  const onSubmit = async (body) => {
    setLoading(true);
    try {
      data
        ? await db
            .update(Budgets)
            .set({
              name: body.name,
              amount: body.amount,
              createdBy: user.primaryEmailAddress.emailAddress,
              Icon: body.Icon,
            })
            .where(eq(Budgets.id, data.id))
        : await db.insert(Budgets).values({
            name: body.name,
            amount: body.amount,
            createdBy: user.primaryEmailAddress.emailAddress,
            Icon: body.Icon || emojiIcon,
          });
      getBudgetList();
      toast.success(data ? "Budget Updated" : "Budget Created!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      reset();
      close();
    }
  };

  const onDelete = async () => {
    try {
      await db.delete(Budgets).where(eq(Budgets.id, data.id));
      toast.success("Budget Deleted!");
      await getBudgetList();
    } catch (error) {
      toast.error("Error Deleting Budget!");
    } finally {
      close();
    }
  };

  return (
    <DialogHeader>
      <DialogTitle>{data ? "Edit Budget" : "Create Budget"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2">
          <p
            className="text-lg border-2 cursor-pointer w-max p-3 rounded-md"
            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
          >
            {emojiIcon}
          </p>
          <div className="absolute z-20">
            <EmojiPicker
              open={openEmojiPicker}
              onEmojiClick={(e) => {
                setValue("Icon", e.emoji, { shouldDirty: true });
                setEmojiIcon(e.emoji);
                setOpenEmojiPicker(false);
              }}
            />
          </div>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Budget Name</h2>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g., Home Decor"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Allot Amount</h2>
            <Input
              type="number"
              {...register("amount", { required: "Amount is required" })}
              placeholder="e.g., 5000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
          {data && (
            <div className="mt-2">
            <h2 className="text-black font-medium my-1">Total Spent</h2>
            <Input
              value={data.totalSpend}
              disabled
            />
          </div>
          )}
        </div>
        <div className="w-full flex justify-end mt-4">
          <LoaderButton
            loading={loading}
            buttonText={data ? "Edit Budget" : "Create"}
            type="submit"
            disabled={!isDirty}
          />
        </div>
      </form>
      {data && (
        <Button variant="destructive" onClick={onDelete} className="w-max">
          <Trash2 className="w-5 h-5" /> Delete Budget
        </Button>
      )}
    </DialogHeader>
  );
};

export default CreateBudget;
