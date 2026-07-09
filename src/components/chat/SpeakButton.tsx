import { Volume2 } from "lucide-react";

interface Props {
  text: string;
}

export default function SpeakButton({ text }: Props) {
  const speak = () => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className="hover:text-[#8B5A2B]"
    >
      <Volume2 size={18} />
    </button>
  );
}