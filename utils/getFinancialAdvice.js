import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyD4rFgB8W9UN1P0cJB4MP2sas7BkVUNKKE");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function getFinancialAdvice(budgetList, incomeList, expenseList) {
  let budgetArray = Array.isArray(budgetList) ? budgetList : [];
  let incomeArray = Array.isArray(incomeList) ? incomeList : [];
  let expenseArray = Array.isArray(expenseList) ? expenseList : [];

  const totalBudget = budgetArray?.map((budget) => ({
    item: budget.name,
    amount: parseInt(budget.amount, 10),
    id: budget.id,
  }));

  const totalIncome = incomeArray?.map((income) => ({
    item: income.name,
    amount: parseInt(income.amount, 10),
  }));

  const totalSpend = expenseArray?.map((expense) => ({
    item: expense.name,
    budgetId: expense.budgetId,
    amount: parseInt(expense.expense, 10),
  }));

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const userPrompt = `
        You are a finance expert/advisor/assistant with knowledge of programming.

        Analyze the user's finances based on the following data (provided as JavaScript arrays of objects):

        - Budget List: ${JSON.stringify(totalBudget)}
        - Income List: ${JSON.stringify(totalIncome)}
        - Expenses List: ${JSON.stringify(totalSpend)}

        The 'budgetId' in the Expenses List refers to the 'id' in the Budget List.

        Instructions:

        1.  If all of the lists are empty, respond with: "No financial data provided. Please input your income, budget, and expenses for analysis."
        2. All data is in Pakistani rupees.
        3.  Otherwise:
            a. Calculate total budget, income, and expenses.
            b. Analyze the user's financial situation based on these totals, including cash flow, budget adherence, and any potential issues or warnings like budget overflow.
            c. Provide two concise, actionable pieces of financial advice.

        Respond in two or three lines in a clear and professional tone.
    `;

  const result = await chatSession.sendMessage(userPrompt);
  const res = result.response.text();

  return res;
}

export default getFinancialAdvice;
