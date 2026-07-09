import {
  MessageSquare,
  Trash2,
} from "lucide-react";

interface Props {
  chat: any;
  active: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function ChatHistoryItem({
  chat,
  active,
  onClick,
  onDelete,
}: Props) {
  return (
    <div
      className={`group rounded-xl p-3 cursor-pointer transition-all

      ${
        active
          ? "bg-[#d5ae80]"
          : "hover:bg-[#ead6bf]"
      }

      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3">

          <MessageSquare
            size={18}
            className="mt-1"
          />

          <div>

            <h4 className="font-medium truncate max-w-[180px]">
              {chat.title}
            </h4>

            <p className="text-xs opacity-60">
              {new Date(
                chat.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 transition"
        >
          <Trash2
            size={16}
            className="text-red-500"
          />
        </button>

      </div>
    </div>
  );
}