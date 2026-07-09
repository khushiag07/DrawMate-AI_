import { Sparkles } from "lucide-react";
import SuggestedPrompts from "./SuggestedPrompts";

interface Props {
  onPrompt: (text: string) => void;
}

export default function EmptyState({
  onPrompt,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full">

      <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
        <Sparkles
          size={40}
          className="text-[#8B5A2B]"
        />
      </div>

      <h1 className="mt-8 text-5xl font-bold text-stone-800">
        Hello, Artist 👋
      </h1>

      <p className="mt-4 text-lg text-stone-500 text-center max-w-xl">
        Learn drawing, painting, anatomy,
        perspective, digital art,
        shading and much more with DrawMate AI.
      </p>

      <SuggestedPrompts
        onSelect={onPrompt}
      />

    </div>
  );
}