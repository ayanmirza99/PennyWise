"use client";
import LoaderButton from "@/app/_components/LoaderButton";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/context";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "../../../../../../utils/dbConfig";
import { useClerk } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import EmojiPicker from "emoji-picker-react";
import { Trash2 } from "lucide-react";
import { Incomes } from "../../../../../../utils/schema";

const CreateIncome = ({ data, close }) => {
  const { user } = useClerk();
  const { getIncomeList } = useGlobalContext();
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
            .update(Incomes)
            .set({
              name: body.name,
              amount: body.amount,
              createdBy: user.primaryEmailAddress.emailAddress,
              Icon: body.Icon,
            })
            .where(eq(Incomes.id, data.id))
        : await db.insert(Incomes).values({
            name: body.name,
            amount: body.amount,
            createdBy: user.primaryEmailAddress.emailAddress,
            Icon: body.Icon || emojiIcon,
          });
      await getIncomeList();
      toast.success(data ? "Income Updated" : "Income Added!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      reset();
      data && close();
    }
  };

  const onDelete = async () => {
    try {
      await db.delete(Incomes).where(eq(Incomes.id, data.id));
      toast.success("Income Deleted!");
      await getIncomeList();
    } catch (error) {
      toast.error("Error Deleting Income!");
    } finally {
      close();
    }
  };

  return (
    <DialogHeader>
      <DialogTitle>{data ? "Edit Income" : "Add Income"}</DialogTitle>
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
            <h2 className="text-black font-medium my-1">Income Name</h2>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="e.g., Marketing"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-2">
            <h2 className="text-black font-medium my-1">Amount</h2>
            <Input
              type="number"
              {...register("amount", { required: "Amount is required" })}
              placeholder="e.g., 5000"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end mt-4">
          <LoaderButton
            loading={loading}
            buttonText={data ? "Edit Income" : "Add Income"}
            type="submit"
            disabled={!isDirty}
          />
        </div>
      </form>
      {data && (
        <Button variant="destructive" onClick={onDelete} className="w-max">
          <Trash2 className="w-5 h-5" /> Delete Income
        </Button>
      )}
    </DialogHeader>
  );
};

export default CreateIncome;
