import "./community.css";
import { useEffect } from "react";
import axios from "axios";
import { useRef, useState } from "react";

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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<any | null>(null);
    const API = "http://127.0.0.1:8000";

    // --- Modal Popup & Interaction States ---
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
    const [uploadTitle, setUploadTitle] = useState("");
    const [uploadDescription, setUploadDescription] = useState("");
    const [likedArtworks, setLikedArtworks] = useState<number[]>([]); 

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const res = await axios.get(`${API}/community/posts`);
            console.log("Posts:", res.data);   
            setArtworks(res.data);
            console.log("Posts from API:", res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Triggered when a file is chosen via sidebar button
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        
        // Fixed index accessor preventing compilation crashes
        setUploadTitle(file.name.split('.')[0]); 
        
        const previewUrl = URL.createObjectURL(file);
        setImagePreviewUrl(previewUrl);
        setShowUploadModal(true);
    };

    // Submits the newly constructed form payload 
    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("username", "Khushi");
        formData.append("caption", uploadTitle); 
        formData.append("description", uploadDescription);

        try {
            setUploading(true);
            await axios.post(`${API}/community/upload`, formData);

            // Automatic clean refresh cycle sequence execution
            await loadPosts();
            
            alert("Upload Successful!");
            closeModal();
        } catch (err) {
            console.error(err);
            alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    const closeModal = () => {
        setShowUploadModal(false);
        setSelectedFile(null);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        setImagePreviewUrl("");
        setUploadTitle("");
        setUploadDescription("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // One-click local interactive like restriction route
    const handleLikeClick = async (id: number) => {
        if (likedArtworks.includes(id)) {
            alert("You have already liked this artwork!");
            return;
        }

        try {
            setArtworks(prev => 
                prev.map(art => art.id === id ? { ...art, likes: (art.likes ?? 0) + 1 } : art)
            );
            setLikedArtworks(prev => [...prev, id]);
            await axios.post(`${API}/community/posts/${id}/like`);
        } catch (err) {
            console.error("Failed to sync like action to backend server:", err);
        }
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

        return caption.includes(searchQuery.toLowerCase()) || username.includes(searchQuery.toLowerCase());
    });

    return (

        <div className="community-page-wrapper">

            <header className="community-header">
                <h1>User Creations: Infinite Digital Canvas</h1>
                <div className="cat-header-decoration">🐱</div>
            </header>

            {/* Filter controls rack */}
            <div className="corkboard-filter-rack">
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
            

            {/* Board Layout Grid */}
            <div className="community-content-layout">
                {/* Polaroid Cards Grid Display */}
                <div className="gallery-polaroid-grid">
                    {filteredArtworks.map((art) => (
                        <div key={art.id} className="gallery-polaroid-card">
                            <div className="corkboard-sticker-dot"></div>

                            <div
    className="polaroid-drawing-box"
    onClick={() => setSelectedArtwork(art)}
    style={{ cursor: "pointer" }}
>
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
                                    <button 
                                        className={`like-badge-btn ${likedArtworks.includes(art.id) ? "liked" : ""}`}
                                        onClick={() => handleLikeClick(art.id)}
                                    >
                                        ❤️ {art.likes ?? 0}
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

                {/* Gallery Sidebar Panel */}
                <div className="gallery-sidebar-panel">
                    <div className="push-pin red-pin-side"></div>

                    <div className="sidebar-widget-card tools-card">
                        <h3>Gallery Tools</h3>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />

                        <button
                            className="upload-sketch-btn-main"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                style={{ marginRight: "6px" }}
                            >
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                            {uploading ? "Uploading..." : "UPLOAD YOUR SKETCH"}
                        </button>

                        <div className="search-bar-widget">
                            <input
                                type="text"
                                placeholder="Search community art"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sidebar-widget-card featured-rankings-card">
                        <div className="push-pin small-orange-pin-side"></div>
                        <h3>Featured This Week</h3>
                        <div className="featured-scroll-stack">
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

                        <div className="featured-expand-arrow">
                            <svg viewBox="0 0 24 24" width="20" height="20">
                                <path d="M7 10l5 5 5-5" stroke="#7c6e61" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* --- Exact Split-Screen Community Upload Modal Popup Overlay --- */}
            {showUploadModal && (
                <div 
                    className="modal-overlay" 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(30, 25, 20, 0.5)',
                        backdropFilter: 'blur(3px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999
                    }}
                    onClick={closeModal}
                >
                    {/* Main Workspace Frame Container */}
                    <div 
                        className="sketchbook-modal-container"
                        style={{
                            position: 'relative',
                            padding: '40px 20px',
                            width: '100%',
                            maxWidth: '920px',
                            boxSizing: 'border-box'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Toggle Button */}
                        <button 
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '42px',
                                background: '#a69076',
                                border: 'none',
                                fontSize: '15px',
                                cursor: 'pointer',
                                color: '#fff',
                                borderRadius: '50%',
                                width: '26px',
                                height: '26px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'sans-serif',
                                zIndex: 20,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                        >
                            ✕
                        </button>

                        {/* Background Paper Shadow Layer */}
                        <div style={{
                            position: 'absolute',
                            top: '48px',
                            left: '26px',
                            right: '26px',
                            bottom: '36px',
                            backgroundColor: '#ebdcc9',
                            borderRadius: '4px',
                            transform: 'rotate(-0.8deg)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                            zIndex: 1
                        }} />

                        {/* Main Foreground Sketch Paper Sheet */}
                        <div 
                            className="modal-paper-sheet" 
                            style={{
                                backgroundColor: '#f7f4eb',
                                padding: '35px 40px 40px 40px',
                                borderRadius: '4px',
                                boxShadow: '0 12px 36px rgba(50, 40, 30, 0.25)',
                                position: 'relative',
                                fontFamily: "'Times New Roman', Times, serif",
                                color: '#2b1f17',
                                border: '1px solid #e2dacb',
                                zIndex: 2,
                                transform: 'rotate(0.4deg)'
                            }}
                        >
                            {/* Decorative Pins */}
                            <div style={{ position: 'absolute', top: '15px', left: '20px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#cc5a43', boxShadow: 'inset -2px -2px 3px rgba(0,0,0,0.4), 1px 3px 4px rgba(0,0,0,0.3)' }} />
                            <div style={{ position: 'absolute', top: '15px', right: '20px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#cc5a43', boxShadow: 'inset -2px -2px 3px rgba(0,0,0,0.4), 1px 3px 4px rgba(0,0,0,0.3)' }} />

                            {/* Decorative Orange Cat sitting on upper card rim */}
                            <div style={{ position: 'absolute', top: '-18px', right: '180px', width: '55px', height: '55px', zIndex: 5 }}>
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

                            {/* Header Section Titles */}
                            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                                <h2 style={{ fontSize: '26px', margin: '0 0 6px 0', fontWeight: 'bold', letterSpacing: '1px', color: '#3d2e24' }}>Community Upload</h2>
                                <p style={{ fontStyle: 'italic', margin: 0, color: '#6e5e50', fontSize: '15px', fontFamily: 'sans-serif' }}>Share Your Art with the Community — Inspire and connect with other creators</p>
                            </div>

                            {/* Split Layout Frame Matrix */}
                            <form onSubmit={handleModalSubmit} style={{ display: 'flex', gap: '35px', fontFamily: 'sans-serif' }}>
                                
                                {/* LEFT HALF: Polaroid Showcase Preview Panel */}
                                <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#4d3c31', textAlign: 'center', marginBottom: '-5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Image Preview</div>
                                    
                                    <div style={{ position: 'relative', backgroundColor: '#fff', border: '1px solid #dcd1be', borderRadius: '18px', padding: '15px', boxShadow: '0 4px 15px rgba(90,75,60,0.06)' }}>
                                        <div style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c59f84' }} />
                                        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c59f84' }} />
                                        
                                        <div style={{ width: '100%', height: '260px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {imagePreviewUrl && (
                                                <img 
                                                    src={imagePreviewUrl} 
                                                    alt="Uploaded Sketch Preview" 
                                                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }} 
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Selected File Label */}
                                    <div style={{ fontStyle: 'italic', fontSize: '14px', color: '#4d3c31', marginTop: '2px', paddingLeft: '5px' }}>
                                        Previewing: <span style={{ fontWeight: 'bold' }}>{selectedFile ? selectedFile.name : "canvas_drawing.png"}</span>
                                    </div>

                                    {/* Action Modifiers Footer Row */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '10px' }}>
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#dcd0bf', color: '#2b1f17', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                                        >
                                            Upload New Image
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={closeModal}
                                            style={{ padding: '10px 24px', borderRadius: '20px', border: 'none', backgroundColor: '#dcd0bf', color: '#2b1f17', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT HALF: Workspace Profile Configuration Parameter Inputs */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4d3c31' }}>Title</label>
                                        <input 
                                            type="text" 
                                            value={uploadTitle} 
                                            onChange={(e) => setUploadTitle(e.target.value)} 
                                            required 
                                            style={{ padding: '10px 16px', borderRadius: '20px', border: '1px solid #c2b4a2', backgroundColor: '#eadcc9', color: '#2b1f17', fontSize: '14px', outline: 'none' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4d3c31' }}>Description</label>
                                        <textarea 
                                            value={uploadDescription} 
                                            onChange={(e) => setUploadDescription(e.target.value)} 
                                            rows={3}
                                            style={{ padding: '10px 16px', borderRadius: '16px', border: '1px solid #c2b4a2', backgroundColor: '#eadcc9', color: '#2b1f17', fontSize: '14px', outline: 'none', resize: 'none', lineHeight: '1.4' }}
                                        />
                                    </div>

                                    <input 
                                        type="text" 
                                        placeholder="Username" 
                                        disabled
                                        value="Khushi"
                                        style={{ padding: '10px 16px', borderRadius: '20px', border: '1px solid #c2b4a2', backgroundColor: '#eadcc9', color: '#5a4a40', fontSize: '14px', outline: 'none', fontStyle: 'italic' }}
                                    />

                                    <div style={{ position: 'relative', marginTop: '4px' }}>
                                        <button 
                                            type="submit" 
                                            disabled={uploading}
                                            style={{ width: '100%', padding: '13px', borderRadius: '25px', border: 'none', backgroundColor: '#cbb399', color: '#2b1f17', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', boxShadow: '0 3px 8px rgba(90, 70, 55, 0.12)' }}
                                        >
                                            {uploading ? "UPLOADING SKETCH..." : "UPLOAD & BEGIN PRACTICE"}
                                        </button>
                                        <div style={{ position: 'absolute', right: '12px', top: '15px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#c59f84', border: '1px solid #a4836b' }} />
                                    </div>
                                    

        
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}

    {selectedArtwork && (
    <div
        className="image-modal-overlay"
        onClick={() => setSelectedArtwork(null)}
    >
        <div
            className="image-modal"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="close-modal"
                onClick={() => setSelectedArtwork(null)}
            >
                ✕
            </button>

            <div className="image-modal-left">
                <img
                    src={selectedArtwork.image_url}
                    alt={selectedArtwork.caption}
                />
            </div>

            <div className="image-modal-right">
                <h2>{selectedArtwork.caption}</h2>

                <h4>@{selectedArtwork.username}</h4>

                <p>
                    {selectedArtwork.description ||
                        "No description provided."}
                </p>

                <div className="modal-info">
                    ❤️ {selectedArtwork.likes ?? 0} Likes
                </div>

                <div className="modal-date">
                    {selectedArtwork.created_at &&
                        new Date(
                            selectedArtwork.created_at
                        ).toLocaleDateString()}
                </div>
            </div>
        </div>
    </div>
    
)}
</div>
    );
}