# PennyWise

PennyWise is a comprehensive finance management application built with modern web technologies. It helps users manage their budgets, incomes, and expenses with an interactive dashboard and provides personalized financial advice through Alfred, a smart chatbot powered by Gemini AI.

---

## Features

- **Financial Management:**
  - Create, track, and manage budgets, incomes, and expenses.
  - Interactive dashboard to visualize financial data and trends.

- **Alfred - Personal Finance Advisor:**
  - Chatbot built using Gemini API to provide personalized financial advice.

- **Secure Authentication:**
  - User authentication powered by Clerk for seamless and secure sign-in.

- **Cloud-based Database:**
  - Neon DB with Drizzle ORM for efficient and scalable PostgreSQL management.

- **Modern UI:**
  - Built with Next.js, Tailwind CSS, and ShadCN UI for a clean, responsive, and user-friendly interface.

---

## Tech Stack

- **Frontend:**
  - Next.js
  - Tailwind CSS
  - ShadCN UI

- **Authentication:**
  - Clerk

- **Backend and Database:**
  - Drizzle ORM
  - Neon DB (PostgreSQL on the cloud)

- **AI Integration:**
  - Gemini API for chatbot functionalities

---

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)

### Clone the Repository
```bash
git clone https://github.com/yourusername/PennyWise.git
cd PennyWise
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_GEMINI_KEY=<your-gemini-api-key>
NEXT_PUBLIC_DATABASE_URL=<your-neon-db-connection-url>
```

### Run the Application
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

---

## Usage
1. **Authentication:**
   - Register or sign in using Clerk authentication.

2. **Dashboard:**
   - View and interact with your financial overview.

3. **Budget and Expense Management:**
   - Add, update, and manage your financial transactions.

4. **Alfred Chatbot:**
   - Seek financial advice from Alfred, your AI-powered financial advisor.


---

## Contributing
If you'd like to contribute, please fork the repository and create a pull request.

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License
This project is licensed under the MIT License.

---

## Acknowledgements
- [Next.js](https://nextjs.org/) for the powerful React framework.
- [Tailwind CSS](https://tailwindcss.com/) for beautiful and responsive design.
- [Clerk](https://clerk.dev/) for seamless authentication.
- [Neon DB](https://neon.tech/) for cloud PostgreSQL.
- [Drizzle ORM](https://orm.drizzle.team/) for database abstraction.
- [Gemini API](https://www.google.com) for AI chatbot integration.

