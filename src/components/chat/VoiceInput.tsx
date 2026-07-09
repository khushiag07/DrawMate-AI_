import { Mic } from "lucide-react";

interface Props {
  onResult: (text: string) => void;
}

export default function VoiceInput({
  onResult,
}: Props) {
  const start = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (
      event: any
    ) => {
      onResult(
        event.results[0][0].transcript
      );
    };
  };

  return (
    <button
      onClick={start}
      className="p-2 rounded-xl hover:bg-stone-100"
    >
      <Mic />
    </button>
  );
}