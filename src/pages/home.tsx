import "./home.css";
import {
  Search,
  Send,
  Palette,
  Box,
  PersonStanding,
  Droplets,
  Circle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../stores/chatStore";
import Sidebar from "../components/chat/Sidebar";
import ChatArea from "../components/chat/ChatArea";
import {
  MessageSquare,
  GraduationCap,
  Image,
  Heart,
} from "lucide-react";

export default function Home() {
const [question, setQuestion] = useState("");
const [chatMode, setChatMode] = useState(false);
const startChat = useChatStore(
  (s) => s.startChat
);
const askDrawMate = () => {
  if (!question.trim()) return;

  startChat(question);

  setChatMode(true);

  setQuestion("");
};
  if (chatMode) {
  return (
    <div
      className="
      w-full
      max-w-[1500px]
      mx-auto
      px-6
      pt-6
      flex
      gap-8
      items-start
      "
    >
      {/* Sidebar */}
      <div className="w-[320px] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Chat */}
      <div className="flex-1">
        <ChatArea />
      </div>
    </div>
  );
}
  return (
    <div className="home-page">

      {/* Hero */}
      <section
  className={chatMode ? "chat-section" : "hero-section"}
>
        {!chatMode ? (
          <>

        {/* Logo */}
        <div className="hero-logo">

          <div className="logo-icon">
            <Palette size={72} strokeWidth={1.8} />
          </div>

          <h1>DRAW-MATE AI</h1>

          <p>
            Your AI drawing assistant.
            <br />
            Ask anything about drawing, learn new techniques,
            <br />
            and get instant artistic feedback.
          </p>

        </div>

        {/* Search Card */}
        <div className="hero-content">

        <div className="search-card">

          <Search className="search-icon" />

         <input
          type="text"
          placeholder="Ask anything about drawing..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") askDrawMate();
          }}
        />

          <button className="canvas-btn">

            <Palette size={18} />

            Canvas

          </button>

          <button
  className="send-btn"
  onClick={askDrawMate}
>
            <Send size={22} />
          </button>

        </div>
        


        {/* Suggestion Chips */}

        <div className="chip-container">

          <button className="chip">
            <Box size={18} />
            Perspective
          </button>

          <button className="chip">
            <PersonStanding size={18} />
            Anatomy
          </button>

          <button className="chip">
            <Droplets size={18} />
            Watercolor
          </button>

          <button className="chip">
            <Circle size={18} />
            Shading
          </button>

          <button className="chip">
            <Sparkles size={18} />
            AI Feedback
          </button>

        </div>
        </div>
        </>
        ) : (
          

     <div className="flex gap-8 items-start">
       <div className="w-[360px] flex-shrink-0">
      <Sidebar />
    </div>

    <div className="flex-1 max-w-[1040px]">
      <ChatArea />
    </div>




    </div>

  )}
      


      </section>
    </div>
  );
}