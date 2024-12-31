import React, { useState } from "react";
import { Incomes } from "../../../../../../utils/schema";
import EditModal from "../../budgets/_components/EditModal";

function IncomeItem({ income }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditModal open={open} setOpen={setOpen} obj={income} Table={Incomes} />
      <div
        onClick={() => setOpen(true)}
        className="p-5 border rounded-2xl flex flex-col gap-4 hover:shadow-md duration-150 ease-in-out cursor-pointer h-[145px] min-w-[300px] md:min-w-[390px]"
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center justify-center">
            <h2
              className="text-2xl p-4
              bg-slate-100 rounded-full 
              "
            >
              {income.Icon}
            </h2>
            <div>
              <h2 className="font-bold text-xl">{income.name}</h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-xl">
            {" "}
            Rs. {income.amount}
          </h2>
        </div>
      </div>
    </>
  );
}

export default IncomeItem;
