import "./Profile.css";
import { useEffect, useState } from "react";
import { supabase } from ".././lib/supabase";
import {
  Pencil,
  Brush,
  Palette,
  Bell,
  Users,
  Flame,
  Star,
  Eye,
} from "lucide-react";

export default function Profile() {
  const [editing, setEditing] = useState(false);
const [displayName, setDisplayName] = useState("");
const [username, setUsername] = useState("");
const [bio, setBio] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  loadProfile();
}, []);

async function loadProfile() {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    setLoading(false);
    return;
  }

console.log("User:", user);

const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user?.id)
  .single();

console.log("Profile:", data);
console.log("Error:", error);

  if (!error) {
    setProfile(data);
    setDisplayName(data.display_name);
setUsername(data.username);
setBio(data.bio || "");
  }

  setLoading(false);

}
async function saveProfile() {

const {
data:{user}
}=await supabase.auth.getUser();

if(!user) return;

const {error}=await supabase

.from("profiles")

.update({

display_name:displayName,

username:username,

bio:bio,

updated_at:new Date()

})

.eq("id",user.id);

if(error){

alert(error.message);

return;

}

setEditing(false);

loadProfile();

}
if (loading) {
  return <h2>Loading profile...</h2>;
}

if (!profile) {
  return <h2>No profile found.</h2>;
}
  return (
    
    
    <div className="profile-page">

      <h1 className="profile-title">
        My Artist Profile
      </h1>

      <div className="profile-grid">

        {/* ===========================
            PERSONAL INFORMATION
        =========================== */}

        <section className="profile-card personal-card">

          <div className="pin red"></div>

          <h2>Personal Information</h2>

          <div className="profile-user">

            <img
              src={
  profile?.avatar_url ||
  "https://i.pravatar.cc/300"
}
              alt="profile"
              className="profile-avatar"
            />

            <h3>{profile?.display_name}</h3>

            <p>@{profile?.username}</p>

          </div>

<p className="profile-description">
  {profile?.bio || "No bio yet"}
</p>

          <p className="joined">
            <p className="joined">
  Joined{" "}
  {profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString()
    : ""}
</p>
          </p>

          <hr />

          <h2>Statistics</h2>

          <div className="stats-grid">

            <div>
              <h4>Followers</h4>
              <span>{profile?.followers ?? 0}</span>
            </div>

            <div>
              <h4>Following</h4>
              <span>{profile?.following ?? 0}</span>
            </div>

            <div>
              <h4>Art Uploads</h4>
              <span>56</span>
            </div>

            <div>
              <h4>Badges</h4>
              <span>5</span>
            </div>

          </div>

        </section>
                {/* ===========================
            FEATURED PROJECTS
        =========================== */}

        <section className="profile-card featured-card">

          <div className="pin red"></div>

          <h2>@ArtisticSoul_01's Featured Projects</h2>

          <div className="featured-grid">

            <div className="project">
              <span>High Voted</span>
              <img
                src="https://picsum.photos/400/500?random=1"
                alt="Artwork 1"
              />
            </div>

            <div className="project">
              <span>High Voted</span>
              <img
                src="https://picsum.photos/400/500?random=2"
                alt="Artwork 2"
              />
            </div>

            <div className="project">
              <span>Editor's Pick</span>
              <img
                src="https://picsum.photos/400/500?random=3"
                alt="Artwork 3"
              />
            </div>

            <div className="project">
              <span>Trending</span>
              <img
                src="https://picsum.photos/400/500?random=4"
                alt="Artwork 4"
              />
            </div>

            <div className="project">
              <span>Community Favorite</span>
              <img
                src="https://picsum.photos/400/500?random=5"
                alt="Artwork 5"
              />
            </div>

            <div className="project">
              <span>Featured</span>
              <img
                src="https://picsum.photos/400/500?random=6"
                alt="Artwork 6"
              />
            </div>
<button
  className="edit-profile-btn"
  onClick={() => setEditing(true)}
>
  Edit Profile
</button>
          </div>

        </section>
                {/* ===========================
            SKILL CARD
        =========================== */}

        <section className="profile-card skill-card">

          <div className="pin red"></div>

          <h2>Personal Skill Meter</h2>

          <div className="skill-item">

            <span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Pencil size={18} />
                Digital Line Art
              </div>
              82%
            </span>

            <div className="progress">
              <div style={{ width: "82%" }}></div>
            </div>

          </div>

          <div className="skill-item">

            <span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Brush size={18} />
                Watercolor Blending
              </div>
              72%
            </span>

            <div className="progress">
              <div style={{ width: "72%" }}></div>
            </div>

          </div>

          <div className="skill-item">

            <span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Palette size={18} />
                Character Design
              </div>
              65%
            </span>

            <div className="progress">
              <div style={{ width: "65%" }}></div>
            </div>

          </div>

          <div className="skill-item">

            <span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Bell size={18} />
                AI Feedback Usage
              </div>
              30%
            </span>

            <div className="progress">
              <div style={{ width: "30%" }}></div>
            </div>

          </div>

        </section>
                {/* ===========================
            RECENT ACTIVITY
        =========================== */}

        <section className="profile-card activity-card">

          <div className="pin red"></div>

          <h2>Recent Activity</h2>

          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-icon">🎨</div>

              <div className="activity-info">
                <h4>Perspective Sketch</h4>
                <span>Completed today's practice</span>
              </div>

              <div className="activity-time">
                2h ago
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">🤖</div>

              <div className="activity-info">
                <h4>AI Feedback Received</h4>
                <span>Portrait improvement suggestions</span>
              </div>

              <div className="activity-time">
                Yesterday
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">🏆</div>

              <div className="activity-info">
                <h4>Daily Challenge</h4>
                <span>Perspective Drawing completed</span>
              </div>

              <div className="activity-time">
                3 days ago
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">❤️</div>

              <div className="activity-info">
                <h4>Community Like</h4>
                <span>Your artwork reached 120 likes</span>
              </div>

              <div className="activity-time">
                1 week ago
              </div>

            </div>

            <div className="activity-item">

              <div className="activity-icon">⭐</div>

              <div className="activity-info">
                <h4>Featured Artwork</h4>
                <span>Selected for the weekly showcase</span>
              </div>

              <div className="activity-time">
                2 weeks ago
              </div>

            </div>

          </div>

        </section>
        {
editing && (

<div className="edit-profile">

<input
value={displayName}
onChange={(e)=>setDisplayName(e.target.value)}
placeholder="Display Name"
/>

<input
value={username}
onChange={(e)=>setUsername(e.target.value)}
placeholder="Username"
/>

<textarea
value={bio}
onChange={(e)=>setBio(e.target.value)}
placeholder="Bio"
/>

<button onClick={saveProfile}>
Save
</button>

</div>

)
}
                {/* ===========================
            ACHIEVEMENTS
        =========================== */}

        <section className="profile-card achievement-card">

          <div className="pin red"></div>

          <h2>Achievements</h2>

          <div className="badge-grid">

            <div className="badge">
              <Pencil />
              <p>Early Sketcher</p>
            </div>

            <div className="badge">
              <Users />
              <p>Community Helper</p>
            </div>

            <div className="badge">
              <Flame />
              <p>Consistent Creator</p>
            </div>

            <div className="badge">
              <Star />
              <p>Rising Artist</p>
            </div>

            <div className="badge">
              <Eye />
              <p>Detail Master</p>
            </div>

            <div className="badge">
              ✨
              <p>AI Explorer</p>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}