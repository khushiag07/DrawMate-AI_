import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Message } from "../../types/chat";
import MessageActions from "./MessageActions";
import TypingIndicator from "./TypingIndicator";

interface Props {
  message: Message;
}

export default function ChatMessage({
  message,
}: Props) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`flex gap-5 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B5A2B] to-[#C99B63] flex items-center justify-center text-white shadow-lg shrink-0">
          <Bot size={20}/>
        </div>
      )}

      <div
        className={`
        max-w-4xl
        rounded-[26px]
        px-6
        py-5
        shadow-md
        transition
        ${
          isUser
            ? "bg-[#D7B287] text-black"
            : "bg-white border border-stone-200"
        }
        `}
      >
        {message.isStreaming ? (
          <TypingIndicator />
        ) : (
          <ReactMarkdown>
            {message.content}
          </ReactMarkdown>
        )}

        {message.images?.length ? (
          <div className="grid grid-cols-2 gap-4 mt-5">
            {message.images.map((img,index)=>(
              <img
                key={index}
                src={img}
                className="rounded-xl shadow hover:scale-[1.02] transition"
              />
            ))}
          </div>
        ) : null}

        {!message.isStreaming &&
          !isUser && (
            <MessageActions
              text={message.content}
            />
        )}
      </div>

      {isUser && (
        <div className="w-11 h-11 rounded-full bg-[#2F3136] text-white flex items-center justify-center shadow-lg shrink-0">
          <User size={20}/>
        </div>
      )}
    </motion.div>
  );
}