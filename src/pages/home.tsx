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

export default function Home() {
  return (
    <div className="home-page">

      {/* Hero */}
      <section className="hero-section">

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

        <div className="search-card">

          <Search className="search-icon" />

          <input
            type="text"
            placeholder="Ask anything about drawing, anatomy, perspective..."
          />

          <button className="canvas-btn">

            <Palette size={18} />

            Canvas

          </button>

          <button className="send-btn">
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

      </section>

    </div>
  );
}