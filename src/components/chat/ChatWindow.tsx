import { useEffect, useRef } from "react";
import { useChatStore } from "../../stores/chatStore";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";

export default function ChatWindow() {
  const { chats, activeChatId } =
    useChatStore();

  const chat =
    chats.find(
      (c) => c.id === activeChatId
    ) || chats[0];

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat.messages]);

  return (
    <section className="flex flex-col flex-1 bg-[#F7EAD7]">

      <ChatHeader />

      <div className="flex-1 overflow-y-auto pb-8
px-8">

        {chat.messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">

            {chat.messages.map(
              (message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              )
            )}

            <div ref={bottomRef} />

          </div>
        )}

      </div>

      <div className="p-6">

        <ChatInput />

      </div>

    </section>
  );
}