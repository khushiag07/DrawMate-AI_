import { useState } from "react";
import "./community.css";
import { useEffect } from "react";
import axios from "axios";

interface ArtItem {
    id: number;
    title: string;
    creator: string;
    avatar: string;
    style: "Line" | "Painting" | "Hybrid";
    medium: "Digital Pencil" | "Watercolor" | "Marker";
    likes: number;
    svgType: "dragon" | "castle" | "alleys" | "girl" | "nature";
}

export default function CommunityGallery() {
    const [activeStyle, setActiveStyle] = useState<string>("Line");
    const [activeMedium, setActiveMedium] = useState<string>("Digital Pencil");
    const [activeSort, setActiveSort] = useState<string>("Recent");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [artworks, setArtworks] = useState<any[]>([]);
    const API = "http://localhost:8000";

useEffect(() => {

    loadPosts();

}, []);

const loadPosts = async () => {

    try {

        const res = await axios.get(
            `${API}/community/posts`
        );

        setArtworks(res.data);

    } catch (err) {

        console.log(err);

    }

};

    const handleLike = (id: number) => {
        alert("Liked artwork!");
    };

    const renderArtSvg = (type: "dragon" | "castle" | "alleys" | "girl" | "nature") => {
        switch (type) {
            case "dragon":
                return (
                    <svg viewBox="0 0 160 120" className="item-svg-elem">
                        <path d="M40,55 C45,45 60,40 75,48 M75,48 C85,55 90,65 85,75 M85,75 Q70,80 50,75 Z" fill="none" stroke="#374151" strokeWidth="1.5" />
                        <path d="M75,48 Q85,30 95,25" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <path d="M68,52 Q72,42 80,38" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <circle cx="62" cy="55" r="1.5" fill="#111827" />
                        <path d="M48,77 Q40,90 44,95 Q52,90 56,77" fill="none" stroke="#374151" strokeWidth="1.2" />
                        <path d="M60,76 Q55,95 62,98 Q68,90 68,76" fill="none" stroke="#374151" strokeWidth="1.2" />
                    </svg>
                );
            case "alleys":
                return (
                    <svg viewBox="0 0 160 120" className="item-svg-elem">
                        <line x1="80" y1="40" x2="80" y2="120" stroke="#cdbbb0" strokeWidth="0.8" strokeDasharray="3 3" />
                        <polygon points="10,20 40,40 40,90 10,110" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <polygon points="150,20 120,40 120,90 150,110" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <rect x="74" y="60" width="12" height="15" fill="none" stroke="#4b5563" strokeWidth="1" />
                        <polygon points="70,60 80,52 90,60" fill="none" stroke="#4b5563" strokeWidth="1" />
                    </svg>
                );
            case "girl":
                return (
                    <svg viewBox="0 0 160 120" className="item-svg-elem">
                        <circle cx="80" cy="50" r="18" fill="none" stroke="#374151" strokeWidth="1.5" />
                        <path d="M68,64 C60,40 100,40 92,64" fill="none" stroke="#374151" strokeWidth="1.5" />
                        <path d="M72,78 L72,92 L62,105" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <path d="M88,78 L88,92 L98,105" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <path d="M74,60 Q80,63 86,60" fill="none" stroke="#374151" strokeWidth="1.2" />
                        <circle cx="76" cy="52" r="1" fill="#111" />
                        <circle cx="84" cy="52" r="1" fill="#111" />
                    </svg>
                );
            case "nature":
                return (
                    <svg viewBox="0 0 160 120" className="item-svg-elem">
                        <path d="M10,80 Q50,70 80,85 T150,75" fill="none" stroke="#4b5563" strokeWidth="1.2" />
                        <path d="M30,78 L35,50 L40,77" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                        <path d="M120,74 L125,40 L130,73" fill="none" stroke="#16a34a" strokeWidth="1.5" />
                        <circle cx="80" cy="45" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
                    </svg>
                );
            default:
                return null;
        }
    };

const filteredArtworks = artworks.filter((art) => {

    const caption = (art.caption || "").toLowerCase();
    const username = (art.username || "").toLowerCase();

    const matchesSearch =
        caption.includes(searchQuery.toLowerCase()) ||
        username.includes(searchQuery.toLowerCase());

    return matchesSearch;
});

    return (
        <div className="community-page-wrapper">

            <header className="community-header">
                <h1>User Creations: Infinite Digital Canvas</h1>
                <div className="cat-header-decoration">🐱</div>
            </header>

            {/* Filter and Top controls Wrapper */}
            <div className="corkboard-filter-rack">

                {/* Style selection */}
                <div className="filter-group">
                    <span className="filter-label">Filter by</span>
                    <div className="filter-pill-selector">
                        <span className="group-title">Style</span>
                        {["Line", "Painting", "Hybrid"].map((style) => (
                            <button
                                key={style}
                                className={`filter-btn ${activeStyle === style ? "active-filter" : ""}`}
                                onClick={() => setActiveStyle(style)}
                            >
                                {style}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Medium selection */}
                <div className="filter-group">
                    <div className="filter-pill-selector">
                        <span className="group-title">Filter by Medium</span>
                        {["Digital Pencil", "Watercolor", "Marker"].map((med) => (
                            <button
                                key={med}
                                className={`filter-btn ${activeMedium === med ? "active-filter text-orange-700" : ""}`}
                                onClick={() => setActiveMedium(med)}
                            >
                                {med}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sorting selection */}
                <div className="filter-group">
                    <div className="filter-pill-selector">
                        <span className="group-title">Sort by</span>
                        {["Recent", "Popular"].map((sort) => (
                            <button
                                key={sort}
                                className={`filter-btn ${activeSort === sort ? "active-filter" : ""}`}
                                onClick={() => setActiveSort(sort)}
                            >
                                {sort}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* Grid Layout of Community Board */}
            <div className="community-content-layout">

                {/* Left Side: Drawing Gallery Cards */}
                <div className="gallery-polaroid-grid">
                    {filteredArtworks.map((art) => (
                        <div key={art.id} className="gallery-polaroid-card">
                            <div className="corkboard-sticker-dot"></div>

                            <div className="polaroid-drawing-box">
                                <img
                                src={art.image_url}
                                alt={art.caption}
                                className="community-image"
                            />
                            </div>

                            <div className="polaroid-caption">
                                <div className="caption-creator-row">
                                    <span className="creator-avatar">👤</span>
                                    <span className="creator-handle">@{art.username}</span>
                                </div>
                                <div className="caption-details-row">
                                    <span className="artwork-title">{art.caption}</span>
                                    <button className="like-badge-btn" onClick={() => handleLike(art.id)}>
                                        ❤️  {art.likes ?? 0}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredArtworks.length === 0 && (
                        <div className="empty-gallery-state">
                            <p>No artworks match your search under the "{activeStyle}" style category.</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Sidebar Tools */}
                <div className="gallery-sidebar-panel">
                    <div className="push-pin red-pin-side"></div>

                    {/* Gallery Tools Card */}
                    <div className="sidebar-widget-card tools-card">
                        <h3>Gallery Tools</h3>

                        <button className="upload-sketch-btn-main" onClick={() => alert("Select a local sketch file (SVG/JSON/PNG) to upload!")}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                            UPLOAD YOUR SKETCH
                        </button>

                        <div className="search-bar-widget">
                            <input
                                type="text"
                                placeholder="Search community art"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-slider-icon"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 12h6" /></svg>
                        </div>
                    </div>

                    {/* Featured This Week Ranked Cards */}
                    <div className="sidebar-widget-card featured-rankings-card">
                        <div className="push-pin small-orange-pin-side"></div>

                        <h3>Featured This Week</h3>

                        <div className="featured-scroll-stack">

                            {/* Slot 1: 1st place */}
                            <div className="featured-winner-item ranking-gold">
                                <div className="rank-crown">👑</div>
                                <div className="wood-picture-frame">
                                    {renderArtSvg("girl")}
                                    <div className="winner-details">
                                        <span className="winner-user">High Voted</span>
                                        <span className="winner-likes">@HighVoted</span>
                                    </div>
                                </div>
                            </div>

                            {/* Slot 2: 2nd place */}
                            <div className="featured-winner-item ranking-silver">
                                <div className="rank-crown">♛</div>
                                <div className="wood-picture-frame">
                                    {renderArtSvg("nature")}
                                    <div className="winner-details">
                                        <span className="winner-user">Vote Voted</span>
                                        <span className="winner-likes">@VoteVoted</span>
                                    </div>
                                </div>
                            </div>

                            {/* Slot 3: 3rd place */}
                            <div className="featured-winner-item ranking-bronze">
                                <div className="rank-crown">♜</div>
                                <div className="wood-picture-frame">
                                    {renderArtSvg("dragon")}
                                    <div className="winner-details">
                                        <span className="winner-user">Vote Voted</span>
                                        <span className="winner-likes">@VoteVoted</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Expand list arrow */}
                        <div className="featured-expand-arrow">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M7 10l5 5 5-5" stroke="#7c6e61" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
