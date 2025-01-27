import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 w-[98%] md:w-[80%] mx-auto my-5">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-primary">PennyWise</h2>
        <p className="text-muted-foreground mt-2">Your Finance Buddy</p>
      </div>

      <Accordion type="single" collapsible className="w-full text-xl">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            What is the purpose of this app?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            The app helps you manage your personal finances with the assistance
            of Alfred, an AI-powered financial advisor. It provides tools for
            expense tracking, budgeting, and personalized financial advice.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="hover:no-underline">
            How can I track my expenses?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            To track your expenses, simply navigate to the expense page where
            you can input all your daily expenditures. The app will categorize
            them for you, providing insights into your spending habits.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="hover:no-underline">
            Can I set a budget?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            The budget page allows you to set financial limits for various
            categories. You can adjust these budgets anytime to reflect your
            changing financial goals.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left hover:no-underline">
            What kind of advice does Alfred provide?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            Alfred analyzes your financial data and offers personalized advice
            on budgeting, saving, and investing based on your unique financial
            situation.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="hover:no-underline">
            Is my data safe?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            Yes! We prioritize your privacy and security. All your data is
            encrypted and stored securely, ensuring that your financial
            information remains confidential.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="hover:no-underline">
            How do I interact with Alfred?
          </AccordionTrigger>
          <AccordionContent className="text-lg">
            Interacting with Alfred is easy. Just type your question in the chat
            interface, and Alfred will respond with helpful information and
            advice tailored to your financial needs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
