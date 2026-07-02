import { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import CommunityGallery from "./pages/community";
import Profile from "./pages/profile";

// Custom backup page placeholder for tabs like Lessons, AI Tutor, Profile
function ComingSoonPage({ tabName }: { tabName: string }) {
  return (
    <div className="coming-soon-container" style={{
      textAlign: "center",
      padding: "80px 20px",
      margin: "40px auto",
      maxWidth: "600px",
      background: "rgba(253, 250, 247, 0.9)",
      borderRadius: "24px",
      border: "1.5px dashed #b48551",
      boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      fontFamily: "'Georgia', serif"
    }}>
      <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎨</div>
      <h2 style={{ color: "#3b2a1a", fontSize: "30px", marginBottom: "10px" }}>{tabName} Stage</h2>
      <p style={{ color: "#7c6e61", fontSize: "16px", fontStyle: "italic" }}>
        This studio zone is draft-sketched and is being detailed. Trace back to Home, Canvas, or Community!
      </p>
    </div>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("Home");

  const renderActivePage = () => {
  switch (currentTab) {
    case "Home":
      return <Home />;

    case "Community":
      return <CommunityGallery />;

    case "Profile":
      return <Profile />;

    default:
      return <ComingSoonPage tabName={currentTab} />;
  }
};

  return (
    <div className="app-layout-wrapper">
      <Navbar currentTab={currentTab} onChooseTab={setCurrentTab} />
      <main className="main-content-wrapper">
        {renderActivePage()}
      </main>
    </div>
  );
}