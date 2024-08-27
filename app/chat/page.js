"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { marked } from "marked";
import { BeatLoader } from "react-spinners";

export default function ChatInterface() {
  const { messages, updateMessages } = useChat();

  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    console.log(input)
    setInput("");
    setIsLoading(true);

    updateMessages([
      ...messages,
      {
        role: "user",
        content: [
          {
            text: input.trim(),
          },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            text: "",
          },
        ],
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            {
              role: "user",
              content: [
                {
                  text: input.trim(),
                },
              ],
            },
          ],
        }),
      });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      const { history } = await response.json();

      updateMessages(history);

      // const reader = response.body?.getReader();
      // const decoder = new TextDecoder();

      // if (reader) {
      //   while (true) {
      //     const result = await reader.read();
      //     if (result.done) break;
      //     const text = decoder.decode(result.value, { stream: true });
      //     updateMessages((messages) => {
      //       let lastMessage = messages[messages.length - 1];
      //       let otherMessages = messages.slice(0, messages.length - 1);
      //       return [
      //         ...otherMessages,
      //         { ...lastMessage, content: lastMessage.content + text },
      //       ];
      //     });
      //   }
      // }
    } catch (error) {
      console.error("Error:", error);
      updateMessages([
        ...messages,
        {
          role: "assistant",
          content: [
            {
              text: "I'm sorry, I can't respond at the moment. Please try again later.",
            },
          ],
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) sendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-black text-white p-4 flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Chat with RateMyProfessor AI</h1>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col p-4 border max-w-2xl w-full mx-auto">
        <div 
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto mb-4 space-y-4"
        >
          {messages.slice(1).map((message, index) => {
            return message.content[0].text ? (
              <div
                key={crypto.randomUUID()}
                dangerouslySetInnerHTML={{
                  __html: marked.parse(message.content[0].text),
                }}
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-black text-white ms-auto max-w-lg w-min whitespace-nowrap"
                    : "bg-gray-300 text-gray-800 max-w-lg"
                } max-w-[80%] break-words`}
              />
            ) : (
              <div>
                <BeatLoader size={10} />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Chat message input"
            onKeyUp={handleKeyPress}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" onClick={sendMessage} />
          </button>
        </div>
      </main>
    </div>
  );
}
