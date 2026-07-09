import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { Message } from "../../types/chat";
import MessageActions from "./MessageActions";
import TypingIndicator from "./TypingIndicator";

interface Props {
  message: Message;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex gap-5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}

      {!isUser && (
        <div
          className="
          w-11
          h-11
          rounded-full
          bg-gradient-to-br
          from-[#A46D3D]
          to-[#7A4C26]
          text-white
          flex
          items-center
          justify-center
          shrink-0
          shadow-lg
          "
        >
          <Bot size={20} />
        </div>
      )}

      {/* Bubble */}

      <div
        className={`
        max-w-[95%] lg:max-w-[85%]
        rounded-[24px]
        px-6
        py-4
        shadow-sm
        ${
          isUser
            ? "bg-[#B57A47] text-white rounded-br-md"
            : "bg-white border border-[#E8DACB] rounded-bl-md"
        }
      `}
      >
        {message.isStreaming ? (
          <TypingIndicator />
        ) : (
          <div
  className="
  prose
  prose-stone
  max-w-none
  leading-7
  text-[14px]
  text-[#3D342C]
  "
>
  <ReactMarkdown>{message.content}</ReactMarkdown>
</div>
        )}

        {message.images?.length ? (
          <div className="grid grid-cols-2 gap-4 mt-5">
            {message.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="
                rounded-xl
                border
                border-[#E5D6C6]
                "
              />
            ))}
          </div>
        ) : null}

        {!isUser && !message.isStreaming && (
          <div className="mt-5">
            <MessageActions text={message.content} />
          </div>
        )}
      </div>

      {/* User Avatar */}

      {isUser && (
        <div
          className="
          w-11
          h-11
          rounded-full
          bg-[#2F3137]
          text-white
          flex
          items-center
          justify-center
          shrink-0
          shadow-lg
          "
        >
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
}