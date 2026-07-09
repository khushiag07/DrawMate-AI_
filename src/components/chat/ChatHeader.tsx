import { Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 px-8 py-5 bg-[#F6E8D5]">
      <div>
        <h1 className="text-2xl font-bold text-stone-800">
          DrawMate AI
        </h1>

        <p className="text-sm text-stone-500">
          Your AI Drawing Tutor
        </p>
      </div>

      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow">
        <Sparkles
          size={18}
          className="text-amber-500"
        />

        <span className="font-medium">
          AI Ready
        </span>
      </div>
    </header>
  );
}