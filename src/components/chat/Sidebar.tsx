import {
  Plus,
  MessageSquare,
  Compass,
  Image,
  BookOpen,
  Trophy,
  Users,
  Settings,
  History,
  Palette,
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
      w-[300px]
      h-[760px]
      bg-[#F5EFE7]
      rounded-[28px]
      border
      border-[#E6D8C9]
      shadow-[0_12px_35px_rgba(0,0,0,.08)]
      flex
      flex-col
      overflow-hidden
      "
    >
      {/* Logo */}

      <div className="px-7 pt-7 pb-6 border-b border-[#E5D7C8]">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-2xl bg-[#9C673B] flex items-center justify-center text-white">
            <Palette size={20} />
          </div>

          <div>
            <h2 className="font-bold text-xl text-[#2E2218]">
              DrawMate
            </h2>

            <p className="text-sm text-[#7E6D5C]">
              AI Studio
            </p>
          </div>

        </div>

      </div>

      {/* New Chat */}

      <div className="p-6">

        <button
          onClick={createChat}
          className="
          w-full
          h-12
          rounded-2xl
          bg-[#A16A3B]
          text-white
          flex
          items-center
          justify-center
          gap-3
          font-medium
          hover:bg-[#8B5A2B]
          transition
          "
        >
          <Plus size={18} />
          New Chat
        </button>

      </div>

      {/* Features */}

      <div className="px-5 space-y-2">

        <SidebarItem icon={<Compass size={18} />} text="Explore" />
        <SidebarItem icon={<BookOpen size={18} />} text="Learn Drawing" />
        <SidebarItem icon={<Image size={18} />} text="Generate Art" />
        <SidebarItem icon={<Trophy size={18} />} text="Challenges" />
        <SidebarItem icon={<Users size={18} />} text="Community" />

      </div>

      {/* History */}

      <div className="flex-1 overflow-y-auto mt-7 px-5">

        <p className="text-xs uppercase tracking-widest text-[#8C7B6B] mb-4">
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
              text-left
              transition
              ${
                activeChatId === chat.id
                  ? "bg-[#E6D4BF]"
                  : "hover:bg-[#EFE5D8]"
              }
              `}
            >

              <MessageSquare size={16} />

              <span className="truncate text-[15px]">
                {chat.title}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-[#E5D7C8] p-5 space-y-2">

        <SidebarItem icon={<History size={18} />} text="History" />
        <SidebarItem icon={<Settings size={18} />} text="Settings" />

      </div>

    </aside>
  );
}

interface Props {
  icon: React.ReactNode;
  text: string;
}

function SidebarItem({
  icon,
  text,
}: Props) {
  return (
    <button
      className="
      w-full
      h-12
      rounded-2xl
      flex
      items-center
      gap-4
      px-4
      text-[#3C3026]
      hover:bg-[#ECE2D5]
      transition-all
      duration-200
      "
    >
      {icon}

      <span>{text}</span>

    </button>
  );
}