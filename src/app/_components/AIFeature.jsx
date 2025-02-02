import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AIFeature = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Meet Alfred - <span className="text-primary">Your AI Assistant</span>
        </h1>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Alfred is not just a chatbot; he&apos;s your personal finance guru.
            Ask him questions related to your financial habits and receive
            tailored advice right at your fingertips.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Available Anytime, Anywhere
            </h2>
            <p className="text-muted-foreground text-lg">
              Alfred can be accessed directly from your dashboard, ensuring that
              help is always just a click away. Whether you need to adjust your
              budget or seek advice on expenses, he&apos;s ready to assist you.
            </p>
          </div>

          <p className="text-lg text-muted-foreground">
            With seamless integration across devices, you can consult Alfred
            whether you&apos;re at home, in the office, or on the go. Your
            personal assistant is always with you, providing real-time updates
            and insights.
          </p>

          <div className="pt-4">
            <Link href={"/sign-up"}>
              <Button className="bg-primary text-lg hover:bg-primary/90">
                Get Started with Alfred
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeature;
