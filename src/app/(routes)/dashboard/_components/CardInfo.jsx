import { CircleDollarSign, PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import formatNumber from "../../../../../utils";

const CardInfo = ({ budgetList, incomeList, expenseList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    if (
      budgetList.length > 0 ||
      incomeList.length > 0 ||
      expenseList.length > 0
    ) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList, expenseList]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((elem) => {
      totalBudget_ = totalBudget_ + Number(elem.amount);
    });

    incomeList !== "" &&
      incomeList.forEach((elem) => {
        totalIncome_ = totalIncome_ + Number(elem.amount);
      });

    expenseList.forEach((elem) => {
      totalSpend_ = totalSpend_ + Number(elem.expense);
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <>
      {budgetList?.length > 0 ? (
        <>
          <div className="p-7 min-w-[300px] border shadow-md rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-md">Total Budget</h2>
              <h2 className="font-bold text-2xl">
                Rs. {formatNumber(totalBudget)}
              </h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 min-w-[300px] border shadow-md rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-md">Total Expense</h2>
              <h2 className="font-bold text-2xl">
                Rs. {formatNumber(totalSpend)}
              </h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 min-w-[300px] border shadow-md rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-md">No. Of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 min-w-[300px] border shadow-md rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-md">Sum of Income Streams</h2>
              <h2 className="font-bold text-2xl">
                Rs. {formatNumber(totalIncome)}
              </h2>
            </div>
            <CircleDollarSign className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </>
      ) : (
        Array.from({ length: 4 }).map((_, index) => (
          <div
            className="h-[110px] w-[300px] bg-slate-200 animate-pulse rounded-lg"
            key={index}
          ></div>
        ))
      )}
    </>
  );
};

export default CardInfo;
