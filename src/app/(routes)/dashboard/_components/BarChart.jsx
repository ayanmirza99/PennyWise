import React from "react";
import { Triangle } from "react-loader-spinner";
import {
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const BarChart = ({ budgetList }) => {
  return (
    <div className="w-full flex flex-col md:p-4">
      <div className="p-2 md:p-0">
        <h1 className="text-2xl font-semibold">Activity</h1>
      </div>
      <ResponsiveContainer width={"100%"} height={350}>
        {!Array.isArray(budgetList) || budgetList.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
            {budgetList.length === 0 ? (
              "No Activity as of now."
            ) : (
              <Triangle
                height="80"
                width="80"
                color="#4845d2"
                ariaLabel="triangle-loading"
              />
            )}
          </div>
        ) : (
          <RechartsBarChart data={budgetList} margin={{ top: 14 }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: "Amount in Rs.",
                position: "insideLeft",
                angle: -90,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" stackId="b" fill="#45d248">
              {budgetList?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.amount - entry.totalSpend < 0 ? "#d24545" : "#45d248"
                  }
                />
              ))}
            </Bar>
            <Bar dataKey="amount" stackId="a" fill="#4845d2" />
          </RechartsBarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
