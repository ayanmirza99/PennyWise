"use client";
import React, { useEffect, useState } from "react";
import chat from "./chatConfig";
import { Send, Sparkle } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { useClerk } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";

const page = () => {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useClerk();

  const onSent = () => {
    setData([...data, { id: uuidv4(), question: prompt, answer: "" }]);
    setPrompt("");
  };

  const useChat = async () => {
    onSent();
    setLoading(true);
    try {
      let resp = await chat();
      setData((prevData) => {
        const updatedData = [...prevData];
        const lastIndex = updatedData.length - 1;
        if (lastIndex >= 0) {
          updatedData[lastIndex].answer = resp;
        }
        return updatedData;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-2 md:py:6 md:px-10 h-full flex flex-col items-center">
      {data.length === 0 ? (
        <section className="text-6xl md:text-8xl h-full flex flex-col justify-center w-full md:w-[80%] text-[#a3a6ab] font-semibold">
          <h1 className="ml-2">
            Ask <span className="text-primary">Alfred</span>
          </h1>
          <FlipWords
            words={[
              "What's up with your finances?",
              "How are your budgets looking?",
              "How is your cash flow?",
            ]}
            className={"text-primary/80 text-3xl md:text-5xl"}
          />
        </section>
      ) : (
        <section className="h-[90%] w-full md:w-[80%] overflow-y-auto flex flex-col justify-end p-4 mx-auto">
          {data.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="flex justify-end items-start gap-2 mb-2">
                <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-[70%]">
                  {message.question}
                </div>
                <img
                  alt=""
                  src={user.imageUrl}
                  className="w-8 h-8 rounded-full object-contain"
                />
              </div>
              <div className="flex justify-start gap-2">
                <Sparkle className="w-6 h-6 text-primary" />
                <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-[70%]">
                  {message.answer}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      <section className="h-[10%] w-full md:w-[80%]">
        <div className="flex justify-between items-center gap-6 py-2 md:py-4 px-6 bg-[#f0f4f9] w-full text-[1.2rem] sm:text-[1.5rem] rounded-xl shadow-md">
          <textarea
            className="bg-transparent h-[2.2rem] sm:h-11 w-full outline-none overflow-y-scroll resize-none"
            placeholder="Enter a prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button disabled={prompt === ""} onClick={useChat}>
            <Send className="text-primary" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default page;
