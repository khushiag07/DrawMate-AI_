import { useState } from "react";
import "./Navbar.css";
import { supabase } from ".././lib/supabase";
interface NavbarProps {
  currentTab: string;
  onChooseTab: (tab: string) => void;
}

export default function Navbar({ currentTab, onChooseTab }: NavbarProps) {
  const links = ["Home", "Community", "Profile"];
  
  // Track visibility and mode ('login' or 'signup') based on your uploaded layouts 
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [signupUsername, setSignupUsername] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
async function handleSignup(e: React.FormEvent) {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
     .upsert({
  id: data.user.id,
  display_name: fullName,
  username: signupUsername,
})

    if (profileError) {
      alert(profileError.message);
      return;
    }
  }

  alert("Account created successfully!");

  setShowAuth(false);
}

async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  console.log("Login Email:", loginEmail);
  console.log("Login Password:", loginPassword);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: loginPassword,
  });

  console.log("Data:", data);
  console.log("Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login Successful!");
}
  return (
    <>
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
          <button className="loginBtn" onClick={() => { setAuthMode("login"); setShowAuth(true); }}>Log in</button>
          <button className="signupBtn" onClick={() => { setAuthMode("signup"); setShowAuth(true); }}>Sign up</button>
        </div>
      </nav>

      {/* Sketchbook Overlay Area */}
      {showAuth && (
        <div 
          className="auth-overlay" 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowAuth(false)}
        >
          {/* Main Desktop Canvas Workspace Wrap */}
          <div 
            className="sketchbook-workspace"
            style={{
              position: "relative",
              padding: "60px 50px",
              width: "100%",
              maxWidth: "500px",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Cross Button */}
            <button 
              onClick={() => setShowAuth(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "#bd9b7d",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                color: "#fff",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                zIndex: 10
              }}
            >
              ✕
            </button>

            {/* Background Paper Shadow Layer (Creates stacked sheet depth effect) */}
            <div style={{
              position: "absolute",
              top: "68px",
              left: "56px",
              right: "44px",
              bottom: "52px",
              backgroundColor: "#ece5d8",
              borderRadius: "4px",
              transform: "rotate(-1.5deg)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              zIndex: 1
            }} />

            {/* Foreground Main Sketchbook Torn Paper Sheet */}
            <div 
              className="auth-sheet" 
              style={{
                backgroundColor: "#f7f4eb",
                padding: authMode === "login" ? "45px 35px 40px 35px" : "30px 35px 25px 35px",
                borderRadius: "3px",
                boxShadow: "3px 8px 25px rgba(60, 45, 35, 0.2)",
                position: "relative",
                fontFamily: "'Times New Roman', Times, serif",
                color: "#2b1f17",
                border: "1px solid #e2dacb",
                zIndex: 2,
                transform: "rotate(0.5deg)",
                transition: "all 0.25s ease-in-out"
              }}
            >
              {/* Top Left Red Board Pin */}
              <div style={{
                position: "absolute",
                top: "12px",
                left: "15px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#cc5a43",
                boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.4), 2px 4px 5px rgba(0,0,0,0.3)"
              }} />

              {/* Top Right Red Board Pin */}
              <div style={{
                position: "absolute",
                top: "15px",
                right: "35px",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                backgroundColor: "#cc5a43",
                boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.4), 2px 4px 5px rgba(0,0,0,0.3)"
              }} />

              {/* Vector Orange Cat Decorative Asset - Safely Positioned INSIDE Layout context */}
              <div style={{ position: "absolute", top: "15px", right: "60px", width: "42px", height: "42px", zIndex: 5 }}>
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 44C49 44 52 40 52 34C52 24 45 22 41 22C38 15 28 15 24 22C18 22 14 26 14 34C14 42 19 46 25 46" stroke="#4e3d30" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M20 22L17 12L25 17.5M40 17.5L48 12L45 22" stroke="#4e3d30" strokeWidth="2.5" strokeLinejoin="round"/>
                  <circle cx="27" cy="27" r="2.5" fill="#4e3d30"/>
                  <circle cx="37" cy="27" r="2.5" fill="#4e3d30"/>
                  <path d="M30 31L32 33L34 31" stroke="#4e3d30" strokeWidth="2"/>
                  <path d="M48 38C54 38 57 32 58 28C59 24 57 22 55 24C53 26 51 31 48 33" stroke="#e09653" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M22 46C22 52 26 56 32 56C38 56 42 52 42 46" stroke="#4e3d30" strokeWidth="2.5"/>
                </svg>
              </div>

              {/* Anatomy Study Hand Graphic Asset on right perimeter */}
              <div style={{ position: "absolute", right: "-10px", top: "85px", width: "45px", opacity: 0.65 }}>
                <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 80C10 75 12 60 10 50C8 40 5 25 12 10M12 45C14 35 15 20 22 8M20 48C22 38 25 22 32 12M27 52C30 44 35 30 42 22M32 60C36 55 42 48 48 42" stroke="#8a7360" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M10 50L15 65L22 75M20 52L24 68L30 76M28 55L31 70L36 78" stroke="#8a7360" strokeWidth="1"/>
                </svg>
              </div>

              {/* Artistic Ink Droplet Splat Bottom Left */}
              <div style={{ position: "absolute", left: "-15px", bottom: "-5px", width: "45px", opacity: 0.95 }}>
                <svg viewBox="0 0 100 100" fill="#1c1816" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 50C40 40 20 45 25 60C30 75 45 65 50 75C55 85 70 80 65 65C60 50 80 40 70 35C60 30 55 15 45 25C35 35 60 40 50 50Z"/>
                  <circle cx="20" cy="30" r="4"/><circle cx="75" cy="70" r="3"/><circle cx="35" cy="85" r="5"/>
                </svg>
              </div>

              {/* Render dynamic layouts using authMode switcher  */}
              {authMode === "login" ? (
                <>
                  {/* LOGIN VARIANT */}
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "24px", margin: "0 0 16px 0", fontWeight: "bold", letterSpacing: "3px", color: "#2b1f17", display: "inline-block", borderBottom: "1.5px solid #2b1f17", paddingBottom: "1px" }}>LOGIN</h2>
                    <h3 style={{ fontSize: "24px", margin: "0 0 4px 0", fontWeight: "bold", fontFamily: "sans-serif", color: "#2b1f17" }}>Welcome Back, DrawMate</h3>
                    <p style={{ fontStyle: "italic", margin: 0, color: "#665547", fontSize: "14px", fontFamily: "sans-serif" }}>Continue your creative journey.</p>
                  </div>

                  <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px", fontFamily: "sans-serif" }}>
                    <div style={{ position: "relative" }}>
                      <input
  type="email"
  placeholder="Email Address"
  required
  value={loginEmail}
  onChange={(e) => setLoginEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "13px 24px",
    borderRadius: "25px",
    border: "1px solid #c2b4a2",
    backgroundColor: "#e6dcce",
    color: "#2b1f17",
    fontSize: "15px",
    fontStyle: "italic",
    outline: "none",
    boxSizing: "border-box",
  }}
/>
                      <div style={{ position: "absolute", right: "12px", top: "15px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#c59f84", border: "1px solid #a4836b" }} />
                    </div>
<input
  type="password"
  placeholder="Password"
  required
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
  style={{
    width: "100%",
    padding: "13px 24px",
    borderRadius: "25px",
    border: "1px solid #c2b4a2",
    backgroundColor: "#e6dcce",
    color: "#2b1f17",
    fontSize: "15px",
    fontStyle: "italic",
    outline: "none",
    boxSizing: "border-box",
  }}
/>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "#2b1f17", padding: "0 4px", fontWeight: "500" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                        <input type="checkbox" style={{ transform: "scale(1.1)", accentColor: "#bd9b7d" }} />
                        Remember Me
                      </label>
                      <a href="#" style={{ color: "#2b1f17", textDecoration: "underline", fontWeight: "500" }} onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                    </div>

                    <div style={{ position: "relative", marginTop: "8px" }}>
                      <button 
                        type="submit"
                        style={{ width: "100%", padding: "14px", borderRadius: "25px", border: "none", backgroundColor: "#cbb399", color: "#2b1f17", fontWeight: "bold", fontSize: "16px", cursor: "pointer", boxShadow: "0 3px 8px rgba(90, 70, 55, 0.15)" }}
                      >
                        LOGIN (to continue study)
                      </button>
                      <div style={{ position: "absolute", right: "12px", top: "16px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#c59f84", border: "1px solid #a4836b" }} />
                    </div>

                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      <p style={{ fontSize: "13px", color: "#554437", margin: "0 0 10px 0", fontWeight: "500" }}>Or login with:</p>
                      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                        <button type="button" style={{ width: "32px", height: "32px", borderRadius: "6px", border: "none", backgroundColor: "#0057ff", color: "white", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>Bē</button>
                        <button type="button" style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid #c2b4a2", backgroundColor: "white", color: "#2b1f17", fontWeight: "bold", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.32-.176-1.886H12.24z"/></svg>
                        </button>
                      </div>
                    </div>

                    <p style={{ textTransform: "none", fontSize: "13px", color: "#665547", marginTop: "15px", textAlign: "center" }}>
                      New to DrawMate? <span onClick={() => setAuthMode("signup")} style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "bold", color: "#2b1f17" }}>[cite:Sign Up here!]</span>
                    </p>
                  </form>
                </>
              ) : (
                <>
                  {/* SIGN UP VARIANT (Optimized Smaller Footprint Container Structure) */}
                  <div style={{ textAlign: "center", marginBottom: "16px" }}>
                    <h2 style={{ fontSize: "22px", margin: "0 0 10px 0", fontWeight: "bold", letterSpacing: "3px", color: "#2b1f17", display: "inline-block", borderBottom: "1.5px solid #2b1f17", paddingBottom: "1px" }}>SIGN UP HUB</h2>
                    <h3 style={{ fontSize: "21px", margin: "0 0 2px 0", fontWeight: "bold", fontFamily: "sans-serif", color: "#2b1f17" }}>Join DrawMate AI</h3>
                    <p style={{ fontStyle: "italic", margin: 0, color: "#665547", fontSize: "13px", fontFamily: "sans-serif" }}>Start your artistic anatomy adventure.</p>
                  </div>

                  <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "sans-serif" }}>
                    <input
type="text"
placeholder="Full Name"
value={fullName}
onChange={(e)=>setFullName(e.target.value)}
/>
                    <input
 
  type="email"
  placeholder="Email Address"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "13px 24px",
    borderRadius: "25px",
    border: "1px solid #c2b4a2",
    backgroundColor: "#e6dcce",
    color: "#2b1f17",
    fontSize: "15px",
    fontStyle: "italic",
    outline: "none",
    boxSizing: "border-box",
  }}
/>
<input
  type="text"
  placeholder="Create Username"
  required
  value={signupUsername}
  onChange={(e) => setSignupUsername(e.target.value)}
  style={{ width: "100%", padding: "10px 20px", borderRadius: "25px", border: "1px solid #c2b4a2", backgroundColor: "#e6dcce", color: "#2b1f17", fontSize: "14px", fontStyle: "italic", outline: "none", boxSizing: "border-box" }}
                    />
                    
                    <input

  type="password"
  placeholder="Password"
  required
  value={password}
onChange={(e) => setPassword(e.target.value)}
  style={{
    width: "100%",
    padding: "13px 24px",
    borderRadius: "25px",
    border: "1px solid #c2b4a2",
    backgroundColor: "#e6dcce",
    color: "#2b1f17",
    fontSize: "15px",
    fontStyle: "italic",
    outline: "none",
    boxSizing: "border-box",
  }}
/>
                   <input
  type="password"
  placeholder="Confirm Password"
  required
  value={confirmPassword}
  onChange={(e)=>setConfirmPassword(e.target.value)}
 
                      style={{ width: "100%", padding: "10px 20px", borderRadius: "25px", border: "1px solid #c2b4a2", backgroundColor: "#e6dcce", color: "#2b1f17", fontSize: "14px", fontStyle: "italic", outline: "none", boxSizing: "border-box" }}
                    />

                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#2b1f17", padding: "0 4px", cursor: "pointer", fontWeight: "500" }}>
                      <input type="checkbox" required style={{ transform: "scale(1.0)", accentColor: "#bd9b7d" }} />
                      I agree to <span style={{ textDecoration: "underline" }}>Terms & Conditions</span>
                    </label>

                    <div style={{ position: "relative", marginTop: "4px" }}>
                      <button 
                        type="submit"
                        style={{ width: "100%", padding: "12px", borderRadius: "25px", border: "none", backgroundColor: "#cbb399", color: "#2b1f17", fontWeight: "bold", fontSize: "14px", cursor: "pointer", boxShadow: "0 3px 8px rgba(90, 70, 55, 0.15)" }}
                      >
                        SIGN UP & BEGIN ADVENTURE
                      </button>
                      <div style={{ position: "absolute", right: "12px", top: "13px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#c59f84", border: "1px solid #a4836b" }} />
                    </div>

                    <div style={{ textAlign: "center", marginTop: "4px" }}>
                      <p style={{ fontSize: "12px", color: "#554437", margin: "0 0 6px 0", fontWeight: "500" }}>Or sign up with:</p>
                      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                        <button type="button" style={{ width: "28px", height: "28px", borderRadius: "5px", border: "none", backgroundColor: "#0057ff", color: "white", fontWeight: "bold", fontSize: "13px", cursor: "pointer" }}>Bē</button>
                        <button type="button" style={{ width: "28px", height: "28px", borderRadius: "5px", border: "1px solid #c2b4a2", backgroundColor: "white", color: "#2b1f17", fontWeight: "bold", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.746-.08-1.32-.176-1.886H12.24z"/></svg>
                        </button>
                      </div>
                    </div>

                    <p style={{ textTransform: "none", fontSize: "12px", color: "#665547", marginTop: "6px", textAlign: "center" }}>
                      Already have an account? <span onClick={() => setAuthMode("login")} style={{ textDecoration: "underline", cursor: "pointer", fontWeight: "bold", color: "#2b1f17" }}>Login</span>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}