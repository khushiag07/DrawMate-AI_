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

  return (
<main
className="
w-full
min-h-[760px]
rounded-[30px]
bg-[#FCF8F3]
shadow-2xl
flex
flex-col
overflow-hidden
"
>

      {/* Header */}

      <div className="
h-24
px-10
bg-[#FFF9F3]
border-b
border-[#e6d6c2]
flex
items-center
justify-between
">

        <div>

          <h2 className="text-3xl font-bold text-[#2D2217]">
            DrawMate AI
          </h2>

          <p className="text-base text-[#8b7d6d]">
            Your creative drawing assistant
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="
flex-1
overflow-y-auto
px-16
py-12
bg-[#FFF9F5]
">

        {!chat || chat.messages.length === 0 ? (

<div className="
min-h-[760px]
flex
flex-col
items-center
justify-center
max-w-6xl
mx-auto
">

    {/* Logo */}

    <div className="w-32
h-32 rounded-full bg-gradient-to-br from-[#8B5A2B] to-[#C79A63] shadow-2xl flex items-center justify-center">

        <Palette
            size={56}
            className="text-white"
        />

    </div>

    <h1 className="mt-8 text-6xl font-bold text-[#2B2B2B]">
        How can I help you draw today?
    </h1>

    <p className="text-gray-500 mt-4 text-xl
leading-8
max-w-3xl
text-center">
        Learn drawing, generate artwork, analyze sketches and improve faster.
    </p>

    {/* Suggestions */}

    <div className="grid
grid-cols-2
gap-8
mt-16
max-w-6xlmt-14 w-full max-w-5xl">

        <SuggestionCard
            title="✏️ Learn Perspective"
            text="Teach me one-point perspective."
        />

        <SuggestionCard
            title="🎨 Generate Landscape"
            text="Generate a fantasy landscape."
        />

        <SuggestionCard
            title="🖌 Improve My Sketch"
            text="Analyze my pencil sketch."
        />

        <SuggestionCard
            title="🔥 Daily Challenge"
            text="Give today's drawing challenge."
        />

    </div>

</div>

) : (
          <div className="
space-y-10
max-w-6xl
mx-auto
w-full
">

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

      {/* Bottom Input */}

      <div
className="
px-10
py-7
border-[#E8DACB]
border-t
border-[#E7D9C7]
">
<div className="max-w-6xl mx-auto">
    <ChatInput />
</div>

      </div>

    </main>
  );
}