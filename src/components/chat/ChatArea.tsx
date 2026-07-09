import { useEffect, useRef } from "react";
import { Palette } from "lucide-react";
import { useChatStore } from "../../stores/chatStore";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import SuggestionCard from "./Suggestioncard";

export default function ChatArea() {
  const chats = useChatStore((s) => s.chats);
  const activeChatId = useChatStore((s) => s.activeChatId);

  const chat = chats.find((c) => c.id === activeChatId);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat?.messages]);

  const hasMessages =
    chat && chat.messages.length > 0;

  return (
    <main
className="
w-full
h-[760px]
rounded-[32px]
bg-[#FCFAF7]
border
border-[#EEE2D5]
shadow-[0_20px_60px_rgba(40,25,15,.08)]
flex
flex-col
overflow-hidden
"
>

      {/* Header */}

<div
  className="
  h-[86px]
  px-10
  flex
  items-center
  justify-between
  bg-[#FAF6F1]
  border-b
  border-[#E8DDD0]
  "
>
  <div>
    <h2 className="text-[24px] font-semibold text-[#2B2118]">
      DrawMate AI
    </h2>

    <p className="text-[14px] text-[#887866] mt-1">
      Your creative drawing assistant
    </p>
  </div>

  <div
    className="
    px-4
    py-2
    rounded-full
    bg-[#F4ECE2]
    text-[#8B5A2B]
    text-sm
    font-medium
    "
  >
    DM-4o Drawing Model
  </div>
</div>

      {/* Messages */}

      <div
        className="
        flex-1
        overflow-y-auto
        bg-[#FDFBF8]
      "
      >
        {/* SAME WIDTH FOR BOTH STATES */}

        <div
          className="
          w-full
          max-w-[1400px]
          h-full
          mx-auto
          px-14
          py-10
        "
        >
          {!hasMessages ? (
            <div
              className="
              h-full
              flex
              flex-col
              items-center
              justify-center
            "
            >
              {/* Logo */}

              <div
                className="
                w-24
                h-24
                rounded-full
                bg-gradient-to-br
                from-[#8B5A2B]
                to-[#C69A63]
                flex
                items-center
                justify-center
                shadow-xl
              "
              >
                <Palette
                  size={42}
                  className="text-white"
                />
              </div>

              {/* Heading */}

              <h1
                className="
                mt-8
                text-5xl
                font-bold
                text-[#2B221B]
                text-center
              "
              >
                How can I help you draw today?
              </h1>

              <p
                className="
                mt-5
                max-w-2xl
                text-center
                text-lg
                text-[#7A6A59]
              "
              >
                Learn drawing, generate artwork, analyze sketches
                and improve faster.
              </p>

              {/* Suggestions */}

              <div
                className="
                mt-14
                grid
                grid-cols-2
                gap-6
                w-full
              "
              >
                <SuggestionCard
                  title="🎨 Generate Artwork"
                  text="Create a beautiful watercolor landscape."
                />

                <SuggestionCard
                  title="✏️ Learn Drawing"
                  text="Teach me anatomy from beginner to advanced."
                />

                <SuggestionCard
                  title="🖼 Analyze Sketch"
                  text="Upload my sketch and suggest improvements."
                />

                <SuggestionCard
                  title="🔥 Daily Challenge"
                  text="Give me today's creative drawing challenge."
                />
              </div>
            </div>
          ) : (
            <div
              className="
              w-full
              space-y-8
            "
            >
              {chat.messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                />
              ))}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}

      <div
        className="
        bg-[#FCFAF7]
        border-t
        border-[#E7DDD1]
        px-10
        py-5
      "
      >
        <div
          className="
          w-full
          max-w-[1400px]
          mx-auto
        "
        >
          <ChatInput />
        </div>
      </div>
    </main>
  );
}