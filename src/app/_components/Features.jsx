import { Button } from "@/components/ui/button";
import { Zap, Plus, Lock, Heart } from "lucide-react";
import Link from "next/link";

export default function Features() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto md:mb-8">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-8">
          Unlock Your Financial Potential Today!
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href={"/sign-up"}>
            <Button className="bg-primary text-lg hover:bg-primary/90">
              Start Tracking Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex gap-4 items-start">
          <div className="p-2 rounded-lg bg-blue-100">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Intuitive Dashboard</h3>
            <p className="text-muted-foreground">
              Get a clear overview of your finances at a glance, with all vital
              stats displayed prominently for quick insights.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 rounded-lg bg-blue-100">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Budget Management</h3>
            <p className="text-muted-foreground">
              Set your budgets effortlessly and track your spending to stay
              within limits, ensuring better financial health.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 rounded-lg bg-blue-100">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Expense Tracking</h3>
            <p className="text-muted-foreground">
              Easily log and categorize your expenses, helping you identify
              trends and make informed decisions.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-2 rounded-lg bg-blue-100">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Income Insights</h3>
            <p className="text-muted-foreground">
              Monitor your income streams in real-time, giving you a
              comprehensive view of your earnings and financial growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
