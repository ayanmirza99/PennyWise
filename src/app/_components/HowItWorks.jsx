import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Import your data",
    description:
      "Add your data sources and train the AI to understand your content.",
    image: "/step1.png",
  },
  {
    number: "02",
    title: "Customize behavior & appearance",
    description: "Customize the AI to match your brand and requirements.",
    image: "/step2.png",
  },
  {
    number: "03",
    title: "Embed on your website",
    description: "Add the AI chatbot to your website with a simple embed code.",
    image: "/step3.png",
  },
  {
    number: "04",
    title: "Integrate with your tools",
    description: "Connect your chatbot to your favorite tools.",
    image: "/step4.png",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = React.useState("01");

  return (
    <div className="min-h-screen md:h-screen my-10 md:my-0 md:mt-40 flex flex-col justify-center mx-auto px-4">
      <div className="text-center mb-10 ">
        <h2 className="text-sm font-medium text-pink-500 mb-2">HOW IT WORKS</h2>
        <p className="text-2xl font-semibold">
          Add your data sources, train the AI, customize it to your liking, and
          add it to your website.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Accordion
          type="single"
          defaultValue="01"
          onValueChange={setActiveStep}
          className="md:ml-auto min-h-screen min-w-full max-w-full md:min-w-[340px] md:max-w-[340px] lg:min-w-[550px] lg:max-w-[550px]"
        >
          {steps.map((step) => (
            <AccordionItem key={step.number} value={step.number}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-start text-left">
                  <span className="text-sm font-medium text-muted-foreground mr-4">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 lg:hidden">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground hidden lg:block">
                  {step.description}
                </p>
                <div className="mt-4 lg:hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-lg w-full h-full"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="hidden h-full w-full overflow-hidden lg:block sticky top-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                activeStep === step.number
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              )}
            >
              <img
                src={step.image}
                alt={step.title}
                className="rounded-lg w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
