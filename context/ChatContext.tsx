"use client";

import { Message } from "@aws-sdk/client-bedrock-runtime";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the context shape
interface ChatContextType {
  messages: Message[];
  updateMessages: (messages: Message[]) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create a provider component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessages = (messages: Message[]) => {
    setMessages(messages);
  };

  useEffect(() => {
    const systemPrompt = `
You are a rate my professor agent to help students find classes, that takes in user questions and answers them.
If the users question requires a list of professors, then list the top 3 professors that match the users question.
`;
    const initialChat: Message[] = [
      {
        role: "user",
        content: [
          {
            text: systemPrompt,
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "Hi there! I'm here to help with any questions you have about professors or classes you're interested in. Don't hesitate to ask!",
          },
        ],
      },
    ];

    setMessages(initialChat);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, updateMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
