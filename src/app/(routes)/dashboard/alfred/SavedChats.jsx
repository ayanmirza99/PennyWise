import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/dbConfig";
import { chats } from "../../../../../utils/schema";
import { asc, eq } from "drizzle-orm";
import { useClerk } from "@clerk/nextjs";
import { Triangle } from "react-loader-spinner";
import { Bookmark, Sparkle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const SavedChats = () => {
  const [loading, setLoading] = useState(false);
  const [deleteLoadingMessageId, setDeleteLoadingMessageId] = useState(null);
  const [data, setData] = useState([]);
  const { user } = useClerk();

  const getData = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(chats)
        .where(eq(chats.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(asc(chats.createdAt));
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoadingMessageId(id);
    try {
      await db.delete(chats).where(eq(chats.id, id));
      setData((prev) => prev.filter((chat) => chat.id !== id));
      toast.success("Chat Deleted!");
    } catch (error) {
      toast.error("Error Deleting Chat!");
    } finally {
      setDeleteLoadingMessageId(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full p-2 pt-0 md:pt-0 md:py-6 md:px-10 h-full flex flex-col items-center overflow-hidden">
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Triangle
            height="80"
            width="80"
            color="#4845d2"
            ariaLabel="triangle-loading"
          />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <div className="text-2xl min-w-[280px] md:min-w-[350px] h-full flex flex-col items-center justify-center gap-2 font-semibold">
              <img
                src="/Empty.svg"
                alt=""
                className="w-full h-1/2 object-contain object-center"
              />
              <h1>You have no Saved Chats</h1>
            </div>
          ) : (
            <section className="h-full w-full md:w-[80%] overflow-y-auto flex flex-col p-4 mx-auto">
              {data?.map((message) => (
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
                    <Sparkle className={`text-primary w-6 h-6`} />
                    <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-[70%]">
                      <ReactMarkdown>{message.answer}</ReactMarkdown>
                    </div>
                  </div>
                  <div className="flex mt-1">
                    {deleteLoadingMessageId === message.id ? (
                      <Triangle height={24} width={24} color="#4845d2" />
                    ) : (
                      <Bookmark
                        onClick={() => handleDelete(message.id)}
                        fill="#4845d2"
                        color="#4845d2"
                      />
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default SavedChats;
