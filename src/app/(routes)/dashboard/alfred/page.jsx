"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Chat from "./Chat";
import SavedChats from "./SavedChats";

const page = () => {
  return (
    <Tabs defaultValue="chat" className="w-full h-[calc(100vh-8rem)]">
      <TabsList className="w-full flex items-center bg-transparent">
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="savedChats">Saved Chats</TabsTrigger>
      </TabsList>
      <TabsContent className="h-full w-full" value="chat">
        <Chat />
      </TabsContent>
      <TabsContent className="h-full w-full" value="savedChats">
        <SavedChats />
      </TabsContent>
    </Tabs>
  );
};

export default page;
