import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex gap-2 py-2">
      {[0,1,2].map(i=>(
        <motion.div
          key={i}
          animate={{
            y:[0,-5,0]
          }}
          transition={{
            duration:0.5,
            repeat:Infinity,
            delay:i*0.2
          }}
          className="w-2.5 h-2.5 rounded-full bg-[#8B5A2B]"
        />
      ))}
    </div>
  );
}