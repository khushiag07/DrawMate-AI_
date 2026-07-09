import { useState } from "react";
import {
  Send,
  Loader2,
  PenTool,
} from "lucide-react";
import FileUploader from "./FileUploader";
import { useChatStore } from "../../stores/chatStore";
import { sendMessage } from "../../services/ai";
import VoiceInput from "./VoiceInput";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const addUserMessage = useChatStore(
    (s) => s.addUserMessage
  );
  const createAssistantMessage =
    useChatStore(
      (s) => s.createAssistantMessage
    );
  const updateAssistantMessage =
    useChatStore(
      (s) => s.updateAssistantMessage
    );

  const handleFiles = (
    list: FileList
  ) => {
    setFiles(Array.from(list));
  };

  const send = async () => {
    if (!text.trim() || loading) return;

    const prompt = text;

    addUserMessage(prompt);

    setText("");
    setLoading(true);

    const assistantId =
      createAssistantMessage();

    try {
      const response =
        await sendMessage(
          prompt,
          files
        );

      updateAssistantMessage(
        assistantId,
        response.reply
      );

      setFiles([]);
} catch (error) {
  console.error(error);

  updateAssistantMessage(
    assistantId,
    error instanceof Error
      ? `⚠️ ${error.message}`
      : "⚠️ Unable to connect to DrawMate AI."
  );
}

    setLoading(false);
  };

  return (
    <div className="
bg-[#FFFCF8]
border-[#E5D5C5]
rounded-[26px]
border

shadow-xl
px-6
py-5
">

      <FileUploader
        onFiles={handleFiles}
      />
      <VoiceInput
  onResult={(text) =>
    setText(text)
  }
/>

      <input
className="
flex-1
bg-transparent
outline-none
text-lg
placeholder:text-gray-400
"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter")
            send();
        }}
        placeholder="Ask DrawMate anything..."
        
      />
      {files.length > 0 && (

<div className="flex gap-3 mt-4 overflow-x-auto">

{files.map(file=>(

<div
key={file.name}
className="bg-stone-100 rounded-xl px-4 py-3 min-w-fit"
>

<p className="font-medium">
{file.name}
</p>

<p className="text-xs text-gray-500">
{(file.size/1024).toFixed(1)} KB
</p>

</div>

))}

</div>

)}

      <button
onClick={send}
disabled={loading}
className="
w-12
h-12
rounded-full
bg-[#966236]
hover:scale-110
transition
text-white
flex
items-center
justify-center
"
>
        <PenTool size={18} />
      </button>

      <button
        onClick={send}
        disabled={loading}
        className="w-12 h-12 rounded-full bg-[#2F3136] text-white flex items-center justify-center"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Send />
        )}
      </button>

    </div>
  );
}