import {
  Plus,
  Search,
  MessageSquare,
  Clock,
  Settings,
  LogOut,
} from "lucide-react";

import { useChatStore } from "../../stores/chatStore";

export default function Sidebar() {
  const chats = useChatStore((s) => s.chats);
  const activeChatId = useChatStore((s) => s.activeChatId);
  const createChat = useChatStore((s) => s.createChat);
  const selectChat = useChatStore((s) => s.selectChat);

  return (
    <aside
      className="
      w-[360px]
      h-[760px]
      bg-[#FBF7F1]
border border-[#E8D9C8]
      rounded-[30px]
      shadow-2xl
      flex
      flex-col
      overflow-hidden
    "
    >
      {/* Header */}

      <div className="px-7 pt-7 pb-5">

        <h1 className="text-3xl font-bold text-[#8B5A2B]">
          DrawMate
        </h1>

        <p className="text-gray-500 mt-1">
          Your AI Drawing Tutor
        </p>

      </div>

      {/* New Chat */}

      <div className="px-6">

        <button
          onClick={createChat}
          className="
          w-full
          h-14
          rounded-2xl
          bg-[#99632F]
          text-white
          text-lg
          font-semibold
          flex
          items-center
          justify-center
          gap-3
          hover:bg-[#7E4D24]
          transition
        "
        >
          <Plus size={20} />

          New Chat
        </button>

      </div>

      {/* Search */}

      <div className="px-6 mt-5">

        <div className="h-12 rounded-xl bg-white border flex items-center px-4 gap-3">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            placeholder="Search chats..."
            className="flex-1 bg-transparent outline-none"
          />

        </div>

      </div>

      {/* Chats */}

      <div className="flex-1 overflow-y-auto px-5 mt-6">

        <p className="text-sm font-semibold text-gray-500 mb-4">
          Recent Chats
        </p>

        <div className="space-y-2">

          {chats.map((chat) => (

            <button
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              transition
              ${
                activeChatId === chat.id
                  ? "bg-[#E7D1B3]"
                  : "hover:bg-[#F1E7D9]"
              }
            `}
            >

              <MessageSquare size={18} />

              <span className="truncate">
                {chat.title}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t p-5 space-y-2">

        <SidebarButton
          icon={<Clock size={18} />}
          text="History"
        />

        <SidebarButton
          icon={<Settings size={18} />}
          text="Settings"
        />

        <SidebarButton
          icon={<LogOut size={18} />}
          text="Logout"
        />

      </div>

    </aside>
  );
}

function SidebarButton({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <button
      className="
      w-full
      h-12
      rounded-xl
      flex
      items-center
      gap-4
      px-4
      hover:bg-[#F1E7D9]
      transition
    "
    >
      {icon}

      <span>{text}</span>

    </button>
  );
}