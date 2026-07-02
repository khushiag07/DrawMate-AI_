import "./Navbar.css";

interface NavbarProps {
  currentTab: string;
  onChooseTab: (tab: string) => void;
}

export default function Navbar({ currentTab, onChooseTab }: NavbarProps) {
  const links = ["Home", "Community", "Profile"];

  return (
    <nav className="navbar">
      {/* Logo */}
      <div
        className="logo"
        onClick={() => onChooseTab("Home")}
        style={{ cursor: "pointer" }}
      >
        🎨 <span>DrawMate</span>
      </div>

      {/* Navigation Links */}
      <div className="navLinks">
        {links.map((item) => (
          <a
            key={item}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onChooseTab(item);
            }}
            className={item === currentTab ? "active" : ""}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="authButtons">
        <button className="loginBtn">Log in</button>
        <button className="signupBtn">Sign up</button>
        
      </div>
    </nav>
  );
}