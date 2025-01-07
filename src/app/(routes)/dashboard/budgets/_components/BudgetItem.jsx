"use client";
function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div
      className={`p-5 border rounded-2xl hover:shadow-md duration-150 ease-in-out cursor-pointer h-[170px] min-w-[300px] md:min-w-[390px]`}
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2
            className="text-xl p-3
              bg-slate-100 rounded-full 
              "
          >
            {budget?.Icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg"> Rs. {budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">
            Rs. {budget.totalSpend ? budget.totalSpend : 0} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            Rs.{" "}
            {budget.amount - budget.totalSpend < 0
              ? 0
              : budget.amount - budget.totalSpend}{" "}
            Remaining
          </h2>
        </div>
        <div
          className="w-full
              bg-slate-300 h-2 rounded-full"
        >
          <div
            className={`${
              budget.amount - budget.totalSpend < 0
                ? "bg-red-600"
                : "bg-primary"
            } h-2 rounded-full`}
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
        {budget.amount - budget.totalSpend < 0 && (
          <div className="flex justify-center mt-1">
            <p className="blink">Budget Exceeded</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BudgetItem;
