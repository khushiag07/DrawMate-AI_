import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";

export default function ChatPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="flex gap-6 h-[88vh]">

        <ChatSidebar />

        <ChatWindow />

      </div>
    </div>
  );
}