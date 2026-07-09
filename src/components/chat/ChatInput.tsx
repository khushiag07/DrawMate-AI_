import { useState } from "react";
import {
  Send,
  Loader2,
  PenTool,
} from "lucide-react";

import FileUploader from "./FileUploader";
import VoiceInput from "./VoiceInput";

import { useChatStore } from "../../stores/chatStore";
import { sendMessage } from "../../services/ai";

export default function ChatInput() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const addUserMessage = useChatStore(
    (s) => s.addUserMessage
  );

  const createAssistantMessage = useChatStore(
    (s) => s.createAssistantMessage
  );

  const updateAssistantMessage = useChatStore(
    (s) => s.updateAssistantMessage
  );

  const handleFiles = (list: FileList) => {
    setFiles(Array.from(list));
  };

  const send = async () => {
    if (!text.trim() || loading) return;

    const prompt = text;

    addUserMessage(prompt);

    setText("");
    setLoading(true);

    const assistantId = createAssistantMessage();

    try {
      const response = await sendMessage(
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
    <div
      className="
      w-full
      bg-[#FFFDF9]
      border
      border-[#E8DACB]
      rounded-[30px]
      shadow-[0_12px_35px_rgba(0,0,0,.08)]
      px-6
      py-5
      "
    >
      {/* Uploaded Files */}

      {files.length > 0 && (
        <div className="flex gap-3 mb-5 overflow-x-auto">
          {files.map((file) => (
            <div
              key={file.name}
              className="
              bg-[#F6EEE4]
              border
              border-[#E5D5C5]
              rounded-2xl
              px-4
              py-3
              min-w-fit
              "
            >
              <p className="text-sm font-semibold text-[#3A2B20]">
                {file.name}
              </p>

              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Input Row */}

      <div className="flex items-center gap-4">

        {/* Upload */}

        <FileUploader
          onFiles={handleFiles}
        />

        {/* Voice */}

        <VoiceInput
          onResult={(result) =>
            setText(result)
          }
        />

        {/* Input */}

        <input
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send();
            }
          }}
          placeholder="Ask DrawMate anything..."
          className="
          flex-1
          h-12
          bg-transparent
          outline-none
          text-[17px]
          text-[#2F241A]
          placeholder:text-[#998878]
          "
        />

        {/* Canvas */}

        <button
          type="button"
          className="
          w-12
          h-12
          rounded-full
          bg-[#9B683A]
          hover:bg-[#87552D]
          transition-all
          duration-200
          hover:scale-105
          flex
          items-center
          justify-center
          text-white
          "
        >
          <PenTool size={18} />
        </button>

        {/* Send */}

        <button
          type="button"
          onClick={send}
          disabled={loading}
          className="
          w-12
          h-12
          rounded-full
          bg-[#2F3137]
          hover:bg-black
          transition-all
          duration-200
          hover:scale-105
          flex
          items-center
          justify-center
          text-white
          disabled:opacity-50
          "
        >
          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <Send size={20} />
          )}
        </button>

      </div>
    </div>
  );
}