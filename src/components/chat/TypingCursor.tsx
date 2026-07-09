import { motion } from "framer-motion";

export default function TypingCursor() {
  return (
    <motion.span
      animate={{
        opacity: [0, 1, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 1,
      }}
      className="inline-block w-2 h-5 bg-[#8B5A2B] ml-1"
    />
  );
}