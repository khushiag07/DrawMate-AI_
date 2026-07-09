import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  return (
    <div className="h-screen w-full bg-[#F6E8D5] flex overflow-hidden">
      <ChatSidebar />

      <main className="flex-1 flex">
        <ChatWindow />
      </main>
    </div>
  );
}