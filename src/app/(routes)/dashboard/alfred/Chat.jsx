"use client";
import React, { useEffect, useRef, useState } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { useGlobalContext } from "@/context/context";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, Send, Sparkle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useClerk } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import chat from "./chatConfig";
import { Triangle } from "react-loader-spinner";
import { db } from "../../../../../utils/dbConfig";
import { chats } from "../../../../../utils/schema";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

const Chat = () => {
  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [saveLoadingMessageId, setSaveLoadingMessageId] = useState(null);
  const [prompt, setPrompt] = useState("");
  const chatContainerRef = useRef(null);
  const [data, setData] = useState([]);
  const { user } = useClerk();

  const {
    budgetList,
    incomeList,
    expenseList,
    getAllExpenses,
    getBudgetList,
    getIncomeList,
  } = useGlobalContext();

  useEffect(() => {
    getBudgetList();
    getAllExpenses();
    getIncomeList();
  }, []);

  const onSent = () => {
    const newMessage = {
      id: uuidv4(),
      question: prompt,
      answer: "",
      isSaved: false,
    };
    setData([...data, newMessage]);
    setPrompt("");
    return newMessage.id;
  };

  const saveChat = async (id) => {
    const chat = data.find((message) => message.id === id);
    setSaveLoadingMessageId(id);
    try {
      await db.insert(chats).values({
        ...chat,
        createdBy: user.primaryEmailAddress.emailAddress,
        createdAt: new Date(),
      });
      toast.success("Chat saved!");
    } catch (error) {
      toast.error("Error saving chat!");
    } finally {
      setData((prevData) =>
        prevData.map((message) =>
          message.id === id ? { ...message, isSaved: true } : message
        )
      );
      setSaveLoadingMessageId(null);
    }
  };

  const deleteChat = async (id) => {
    setSaveLoadingMessageId(id);
    try {
      await db.delete(chats).where(eq(chats.id, id));
      toast.success("Chat Deleted!");
    } catch (error) {
      toast.error("Error deleting chat!");
    } finally {
      setData((prevData) =>
        prevData.map((message) =>
          message.id === id ? { ...message, isSaved: false } : message
        )
      );
      setSaveLoadingMessageId(null);
    }
  };

  const useChat = async () => {
    const messageId = onSent();
    setLoadingMessageId(messageId);
    try {
      console.log(budgetList, incomeList, expenseList);
      const resp = await chat(budgetList, incomeList, expenseList, prompt);
      setData((prevData) =>
        prevData.map((message) =>
          message.id === messageId ? { ...message, answer: resp } : message
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessageId(null);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className="w-full p-2 pt-0 md:pt-0 md:py-6 md:px-10 h-full flex flex-col items-center overflow-hidden">
      {budgetList === "" || incomeList === "" || expenseList === "" ? (
        <Triangle
          height="80"
          width="80"
          color="#4845d2"
          ariaLabel="triangle-loading"
        />
      ) : (
        <>
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
            <section
              ref={chatContainerRef}
              className="h-[90%] w-full md:w-[80%] overflow-y-auto flex flex-col p-4 mx-auto"
            >
              {data.map((message) => (
                <div key={message.id} className="mb-4 text-xl">
                  <div className="flex justify-end items-start w-full gap-2 mb-4">
                    <div className="bg-primary/90 text-white rounded-lg py-2 px-4 max-w-[70%]">
                      {message.question}
                    </div>
                    <img
                      alt=""
                      src={user.imageUrl}
                      className="w-8 h-8 rounded-full object-contain"
                    />
                  </div>
                  <div className="flex justify-start gap-2">
                    <Sparkle
                      className={`text-primary w-6 h-6 ${
                        loadingMessageId === message.id ? "rotate" : ""
                      }`}
                    />
                    {loadingMessageId === message.id ? (
                      <div className="space-y-3 w-[200px] md:w-[500px] lg:w-[700px]">
                        <Skeleton className="h-8 w-[90%]" />
                        <Skeleton className="h-8 w-[60%]" />
                      </div>
                    ) : (
                      <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-[70%]">
                        <ReactMarkdown>{message.answer}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                  {loadingMessageId !== message.id && (
                    <div className="flex mt-1">
                      {saveLoadingMessageId === message.id ? (
                        <Triangle height={24} width={24} color="#4845d2" />
                      ) : message.isSaved ? (
                        <Bookmark
                          onClick={() => deleteChat(message.id)}
                          fill="#4845d2"
                          color="#4845d2"
                        />
                      ) : (
                        <Bookmark onClick={() => saveChat(message.id)} />
                      )}
                    </div>
                  )}
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
        </>
      )}
    </div>
  );
};

export default Chat;
