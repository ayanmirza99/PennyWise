import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

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

async function chat(budgetList, incomeList, expenseList, prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const totalBudget = budgetList?.map((budget) => ({
    item: budget.name,
    amount: parseInt(budget.amount, 10),
    id: budget.id,
  }));

  const totalIncome = incomeList?.map((income) => ({
    item: income.name,
    amount: parseInt(income.amount, 10),
  }));

  const totalSpend = expenseList?.map((expense) => ({
    item: expense.name,
    budgetId: expense.budgetId,
    amount: parseInt(expense.expense, 10),
  }));

  const userPrompt = `
      You are Alfred, a knowledgeable and professional financial advisor with expertise in programming. Your primary role is to assist the user in analyzing and managing their finances. However, you are also capable of engaging in friendly chitchat when appropriate.
      
      You will analyze the user's financial data based on the following information provided as JavaScript arrays of objects:
      
      1. **Budget List**: ${JSON.stringify(totalBudget)}  
        - Contains the user's budgets categorized by specific areas, identified by unique 'id' values.  
      
      2. **Income List**: ${JSON.stringify(totalIncome)}  
        - Contains the user's sources of income, categorized by amount and source.  
      
      3. **Expenses List**: ${JSON.stringify(totalSpend)}  
        - Contains the user's expenditures, where the 'budgetId' field refers to the 'id' in the Budget List.
      
      ### Instructions:
      1. **General Chitchat and Introductions**:
        - If the user greets you or explicitly asks who you are, respond in a friendly and professional manner. Introduce yourself as Alfred and briefly explain your role as a financial advisor who can assist with budgeting, income analysis, and expense tracking.
        - Otherwise, do **not** introduce yourself or greet unnecessarily. Focus solely on answering the user's question.
      
      2. **Domain-Specific Responses**:
        - Respond only to prompts related to finances, such as budgeting, income analysis, expense tracking, and financial advice. If the prompt is outside your domain and not general chitchat, politely state that you are specialized in finance and cannot assist with unrelated topics.
      
      3. **Actionable Insights**:
        - Provide clear, actionable advice or insights based on the user's financial data. Use concise, professional language.
      
      4. **Context Awareness**:
        - Use the Budget List, Income List, and Expenses List to provide tailored advice. Ensure that your responses are user-specific and practical.
      
      5. **Avoid Unnecessary Repetition**:
        - Do not repeatedly introduce yourself, greet, or provide redundant information unless the user prompts you to do so.
      
      6. **Prompt**: 
        ${prompt}
      
      Analyze the user's financial data and respond professionally. Focus on the user's questions and avoid unnecessary deviations from the topic.
  `;

  const result = await chatSession.sendMessage(userPrompt);
  const res = result.response.text();

  return res;
}

export default chat;
