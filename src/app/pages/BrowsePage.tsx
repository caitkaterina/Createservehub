import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark, Search,
  Music2, Star, ChevronRight, Volume2, VolumeX,
} from "lucide-react";

/* ─── Palette ───────────────────────────────────────────────────── */
const GREEN = "#2D7A3E";

/* ─── Helpers ───────────────────────────────────────────────────── */
function fmt(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

/* ─── Feed Data ─────────────────────────────────────────────────── */
export interface FeedEntry {
  id: number;
  providerId: number;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  song: string;
}

export const FEED: FeedEntry[] = [
  {
    id: 1, providerId: 1,
    videoUrl:  "https://videos.pexels.com/video-files/4107122/4107122-hd_1920_1080_25fps.mp4",
    posterUrl: "https://images.unsplash.com/photo-1652829069968-4ded3e30f411?w=800",
    caption:   "Watch us transform this Joburg home in under 2 hours 🧹✨ Every corner, every surface — spotless.",
    hashtags:  ["#DeepClean", "#JoburgCleaning", "#HomeTransformation"],
    likes: 12_400, comments: 342, shares: 891, bookmarks: 2_100,
    song: "Clean Sweep — ServeHub Originals",
  },
  {
    id: 2, providerId: 2,
    videoUrl:  "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
    posterUrl: "https://images.unsplash.com/photo-1529836349180-223cd77d8cb6?w=800",
    caption:   "Burst pipe at 2am? We fix it fast 🔧 Same-day plumbing across Johannesburg.",
    hashtags:  ["#Plumbing", "#EmergencyRepair", "#Joburg"],
    likes: 8_700, comments: 215, shares: 467, bookmarks: 980,
    song: "Fix It Fast — ServeHub Beats",
  },
  {
    id: 3, providerId: 3,
    videoUrl:  "https://videos.pexels.com/video-files/4513268/4513268-hd_1920_1080_25fps.mp4",
    posterUrl: "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?w=800",
    caption:   "Full DB board upgrade + solar inverter in one day ⚡ SANS 10142 compliant, COC issued on the spot.",
    hashtags:  ["#Electrical", "#SolarEnergy", "#Sandton"],
    likes: 15_600, comments: 498, shares: 1_203, bookmarks: 3_400,
    song: "Power Up — ServeHub Originals",
  },
  {
    id: 4, providerId: 4,
    videoUrl:  "https://videos.pexels.com/video-files/856423/856423-hd_1920_1080_30fps.mp4",
    posterUrl: "https://images.unsplash.com/photo-1761330440311-16e160cad236?w=800",
    caption:   "Daikin split unit installed, silent and ice cold ❄️ Perfect for Joburg summers.",
    hashtags:  ["#HVAC", "#AirCon", "#Cooling"],
    likes: 9_300, comments: 187, shares: 334, bookmarks: 1_250,
    song: "Chill Zone — ServeHub Beats",
  },
  {
    id: 5, providerId: 5,
    videoUrl:  "https://videos.pexels.com/video-files/4792481/4792481-hd_1920_1080_25fps.mp4",
    posterUrl: "https://images.unsplash.com/photo-1632320668827-1f2cc4713b9f?w=800",
    caption:   "Complete garden makeover — before & after 🌿🌸 Rock path, irrigation, new flower beds.",
    hashtags:  ["#Landscaping", "#GardenGoals", "#Boksburg"],
    likes: 21_000, comments: 673, shares: 2_150, bookmarks: 5_600,
    song: "Garden Vibes — Chill Acoustics",
  },
  {
    id: 6, providerId: 6,
    videoUrl:  "https://videos.pexels.com/video-files/3764155/3764155-hd_1920_1080_30fps.mp4",
    posterUrl: "https://images.unsplash.com/photo-1711274091943-5aae912e6985?w=800",
    caption:   "Bridal lash set that made her cry happy tears 💖 Cruelty-free, vegan, mobile studio.",
    hashtags:  ["#GlowUp", "#BridalBeauty", "#Rosebank"],
    likes: 34_800, comments: 1_204, shares: 5_670, bookmarks: 8_900,
    song: "Glow Glow Glow — ServeHub Originals",
  },
];

/* ─── Provider & profile lookup types (passed from HomePage) ─────── */
export interface SlimProvider {
  id: number; name: string; type: string;
  rating: number; reviews: number; price: string; bgImg: string;
}

/* ─── Single video slide ─────────────────────────────────────────── */
function VideoSlide({
  entry,
  provider,
  containerRef,
  savedMap,
  onToggleSave,
  onViewProfile,
  globalMuted,
  onToggleMute,
}: {
  entry: FeedEntry;
  provider: SlimProvider;
  containerRef: React.RefObject<HTMLDivElement | null>;
  savedMap: Record<number, boolean>;
  onToggleSave: (id: number) => void;
  onViewProfile: (id: number) => void;
  globalMuted: boolean;
  onToggleMute: () => void;
}) {
  const slideRef  = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [liked,    setLiked]    = useState(false);
  const [likeCount, setLikeCount] = useState(entry.likes);
  const [paused,   setPaused]   = useState(false);

  /* ── IntersectionObserver: autoplay when slide enters view ── */
  useEffect(() => {
    const slide = slideRef.current;
    const video = videoRef.current;
    if (!slide || !video) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          video.play().catch(() => {});
          setPaused(false);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { root: containerRef.current, threshold: 0.65 }
    );
    obs.observe(slide);
    return () => obs.disconnect();
  }, [containerRef]);

  /* ── Sync muted state ── */
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = globalMuted;
  }, [globalMuted]);

  /* ── Tap to pause/play ── */
  const handleVideoTap = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else          { v.pause(); setPaused(true);  }
  }, []);

  /* ── Like ── */
  const handleLike = useCallback(() => {
    setLiked((l) => {
      setLikeCount((c) => l ? c - 1 : c + 1);
      return !l;
    });
  }, []);

  const initial = provider.name.charAt(0).toUpperCase();

  return (
    <div
      ref={slideRef}
      style={{
        position:        "relative",
        height:          "100dvh",
        flexShrink:      0,
        scrollSnapAlign: "start",
        background:      "#000",
        overflow:        "hidden",
      }}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={entry.videoUrl}
        poster={entry.posterUrl}
        muted={globalMuted}
        loop
        playsInline
        onClick={handleVideoTap}
        style={{
          position:   "absolute",
          inset:      0,
          width:      "100%",
          height:     "100%",
          objectFit:  "cover",
          cursor:     "pointer",
        }}
      />

      {/* ── Pause indicator ── */}
      {paused && (
        <div
          style={{
            position:       "absolute",
            inset:          0,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            pointerEvents:  "none",
            zIndex:         10,
          }}
        >
          <div
            style={{
              width:          72,
              height:         72,
              borderRadius:   "50%",
              background:     "rgba(0,0,0,0.55)",
              backdropFilter: "blur(12px)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
            }}
          >
            {/* Play triangle */}
            <div
              style={{
                width:       0, height: 0,
                marginLeft:  5,
                borderTop:   "14px solid transparent",
                borderBottom:"14px solid transparent",
                borderLeft:  "22px solid #fff",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Gradient overlays ── */}
      {/* Top — header readability */}
      <div
        style={{
          position:   "absolute",
          top: 0, left: 0, right: 0,
          height:     140,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex:     2,
        }}
      />
      {/* Bottom — text readability */}
      <div
        style={{
          position:   "absolute",
          bottom: 0, left: 0, right: 0,
          height:     360,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.50) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex:     2,
        }}
      />

      {/* ── Mute toggle (top-right) ── */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
        style={{
          position:       "absolute",
          top:            52,
          right:          16,
          zIndex:         20,
          width:          36,
          height:         36,
          borderRadius:   "50%",
          background:     "rgba(0,0,0,0.45)",
          backdropFilter: "blur(10px)",
          border:         "1px solid rgba(255,255,255,0.20)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          cursor:         "pointer",
        }}
      >
        {globalMuted
          ? <VolumeX size={16} color="#fff" />
          : <Volume2 size={16} color="#fff" />}
      </button>

      {/* ── Right sidebar (TikTok actions) ── */}
      <div
        style={{
          position:      "absolute",
          right:         12,
          bottom:        110,
          zIndex:        10,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           22,
          fontFamily:    "'Inter', sans-serif",
        }}
      >
        {/* Business avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
          <div
            onClick={() => onViewProfile(provider.id)}
            style={{
              width:        48,
              height:       48,
              borderRadius: "50%",
              overflow:     "hidden",
              border:       "2.5px solid #fff",
              cursor:       "pointer",
              flexShrink:   0,
              background:   "#333",
            }}
          >
            <img
              src={provider.bgImg}
              alt={provider.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Follow + button */}
          <div
            onClick={() => onViewProfile(provider.id)}
            style={{
              marginTop:      -10,
              width:          20,
              height:         20,
              borderRadius:   "50%",
              background:     GREEN,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              cursor:         "pointer",
              boxShadow:      "0 2px 6px rgba(0,0,0,0.4)",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 900, color: "#fff", lineHeight: 1, marginTop: -1 }}>+</span>
          </div>
        </div>

        {/* Like */}
        <ActionBtn
          icon={
            <Heart
              size={30}
              fill={liked ? "#FF4060" : "none"}
              color={liked ? "#FF4060" : "#fff"}
              strokeWidth={liked ? 0 : 1.8}
            />
          }
          label={fmt(likeCount)}
          onClick={handleLike}
          active={liked}
        />

        {/* Comment */}
        <ActionBtn
          icon={<MessageCircle size={30} color="#fff" strokeWidth={1.8} />}
          label={fmt(entry.comments)}
          onClick={() => {}}
        />

        {/* Share */}
        <ActionBtn
          icon={<Share2 size={28} color="#fff" strokeWidth={1.8} />}
          label={fmt(entry.shares)}
          onClick={() => {}}
        />

        {/* Save / Bookmark */}
        <ActionBtn
          icon={
            <Bookmark
              size={28}
              fill={savedMap[provider.id] ? GREEN : "none"}
              color={savedMap[provider.id] ? GREEN : "#fff"}
              strokeWidth={savedMap[provider.id] ? 0 : 1.8}
            />
          }
          label={fmt(entry.bookmarks)}
          onClick={() => onToggleSave(provider.id)}
          active={savedMap[provider.id]}
        />

        {/* Spinning record */}
        <SpinningRecord />
      </div>

      {/* ── Bottom-left info ── */}
      <div
        style={{
          position:   "absolute",
          bottom:     100,
          left:       16,
          right:      80,
          zIndex:     10,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Name + type badge */}
        <div className="flex items-center gap-2 mb-2">
          <div
            style={{
              width:        32,
              height:       32,
              borderRadius: "50%",
              background:   GREEN,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              flexShrink:   0,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{initial}</span>
          </div>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}>
            {provider.name}
          </p>
          <span
            style={{
              padding:       "2px 8px",
              borderRadius:  20,
              background:    "rgba(255,255,255,0.16)",
              backdropFilter:"blur(8px)",
              border:        "1px solid rgba(255,255,255,0.22)",
              fontSize:      10,
              fontWeight:    700,
              color:         "#fff",
              flexShrink:    0,
            }}
          >
            {provider.type}
          </span>
        </div>

        {/* Caption */}
        <p
          style={{
            fontSize:    14,
            color:       "rgba(255,255,255,0.93)",
            lineHeight:  1.55,
            marginBottom: 10,
            textShadow:  "0 1px 4px rgba(0,0,0,0.35)",
          }}
        >
          {entry.caption}
        </p>

        {/* Hashtags */}
        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.65)", marginBottom: 14 }}>
          {entry.hashtags.join("  ")}
        </p>

        {/* Rating + price + Book CTA */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Star size={13} fill="#FFC700" stroke="none" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{provider.rating}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.50)" }}>({provider.reviews})</span>
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>·</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: GREEN }}>from {provider.price}</span>
          <button
            onClick={() => onViewProfile(provider.id)}
            className="flex items-center gap-1 ml-auto px-4 py-2 rounded-full"
            style={{
              background: GREEN,
              fontSize:   13,
              fontWeight: 700,
              color:      "#fff",
              border:     "none",
              cursor:     "pointer",
              boxShadow:  `0 4px 16px rgba(45,122,62,0.55)`,
              flexShrink: 0,
            }}
          >
            Book now
            <ChevronRight size={14} color="#fff" />
          </button>
        </div>

        {/* Marquee song name */}
        <div className="flex items-center gap-2 mt-3">
          <Music2 size={12} color="rgba(255,255,255,0.65)" />
          <div style={{ overflow: "hidden", flex: 1 }}>
            <p
              style={{
                fontSize:    12,
                color:       "rgba(255,255,255,0.65)",
                whiteSpace:  "nowrap",
                animation:   "marquee 10s linear infinite",
              }}
            >
              {entry.song}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable action button ─────────────────────────────────────── */
function ActionBtn({
  icon,
  label,
  onClick,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  const [bump, setBump] = useState(false);

  function handleClick() {
    setBump(true);
    setTimeout(() => setBump(false), 300);
    onClick();
  }

  return (
    <div
      role="button"
      onClick={handleClick}
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            4,
        cursor:         "pointer",
        transform:      bump ? "scale(1.28)" : "scale(1)",
        transition:     "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
        WebkitUserSelect: "none",
      }}
    >
      {icon}
      <span
        style={{
          fontSize:   12,
          fontWeight: 700,
          color:      active ? GREEN : "#fff",
          fontFamily: "'Inter', sans-serif",
          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Spinning vinyl record disc ─────────────────────────────────── */
function SpinningRecord() {
  return (
    <div
      style={{
        width:        46,
        height:       46,
        borderRadius: "50%",
        background:   "linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)",
        border:       "3px solid rgba(255,255,255,0.20)",
        display:      "flex",
        alignItems:   "center",
        justifyContent:"center",
        animation:    "spin 3s linear infinite",
        boxShadow:    "0 4px 16px rgba(0,0,0,0.50)",
        flexShrink:   0,
      }}
    >
      <div
        style={{
          width:        16,
          height:       16,
          borderRadius: "50%",
          background:   "linear-gradient(135deg, #555, #222)",
          border:       "2px solid rgba(255,255,255,0.15)",
        }}
      />
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg);  } }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
      `}</style>
    </div>
  );
}

/* ─── BrowsePage ─────────────────────────────────────────────────── */
export function BrowsePage({
  providers,
  savedMap,
  onToggleSave,
  onViewProfile,
}: {
  providers: SlimProvider[];
  savedMap: Record<number, boolean>;
  onToggleSave: (id: number) => void;
  onViewProfile: (id: number) => void;
}) {
  const containerRef               = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab]  = useState<"foryou" | "explore">("foryou");
  const [globalMuted, setGlobalMuted] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const providerMap: Record<number, SlimProvider> =
    Object.fromEntries(providers.map((p) => [p.id, p]));

  return (
    <div
      style={{
        position: "relative",
        height:   "100%",
        background: "#000",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Fixed top header (overlays video) ── */}
      <div
        style={{
          position: "absolute",
          top:      0,
          left:     0,
          right:    0,
          zIndex:   30,
          paddingTop: 12,
          paddingBottom: 8,
          display:  "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Tabs */}
        {(["foryou", "explore"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border:     "none",
              cursor:     "pointer",
              fontSize:   16,
              fontWeight: activeTab === tab ? 800 : 500,
              color:      activeTab === tab ? "#fff" : "rgba(255,255,255,0.48)",
              letterSpacing: "-0.01em",
              paddingBottom: 4,
              borderBottom:  activeTab === tab ? "2.5px solid #fff" : "2.5px solid transparent",
              transition:    "all 0.18s ease",
            }}
          >
            {tab === "foryou" ? "For You" : "Explore"}
          </button>
        ))}

        {/* Search icon */}
        <button
          onClick={() => setShowSearch((s) => !s)}
          style={{
            position:  "absolute",
            right:     16,
            background: "none",
            border:     "none",
            cursor:     "pointer",
          }}
        >
          <Search size={22} color="#fff" />
        </button>
      </div>

      {/* ── Snap-scroll feed ── */}
      <div
        ref={containerRef}
        style={{
          height:          "100%",
          overflowY:       "scroll",
          scrollSnapType:  "y mandatory",
          scrollbarWidth:  "none",
          /* hide webkit scrollbar */
          msOverflowStyle: "none",
        }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {FEED.map((entry) => {
          const prov = providerMap[entry.providerId];
          if (!prov) return null;
          return (
            <VideoSlide
              key={entry.id}
              entry={entry}
              provider={prov}
              containerRef={containerRef}
              savedMap={savedMap}
              onToggleSave={onToggleSave}
              onViewProfile={onViewProfile}
              globalMuted={globalMuted}
              onToggleMute={() => setGlobalMuted((m) => !m)}
            />
          );
        })}
      </div>

      {/* ── Search overlay ── */}
      {showSearch && (
        <div
          style={{
            position:       "absolute",
            inset:          0,
            zIndex:         50,
            background:     "rgba(0,0,0,0.92)",
            backdropFilter: "blur(20px)",
            display:        "flex",
            flexDirection:  "column",
            padding:        "60px 20px 40px",
          }}
        >
          <div
            className="flex items-center gap-3 mb-6 px-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", height: 48 }}
          >
            <Search size={18} color="rgba(255,255,255,0.50)" />
            <input
              autoFocus
              placeholder="Search services, businesses…"
              style={{
                flex:       1,
                background: "none",
                border:     "none",
                outline:    "none",
                fontSize:   15,
                color:      "#fff",
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>

          <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.50)", letterSpacing: "0.08em", marginBottom: 14 }}>
            TRENDING SEARCHES
          </p>
          {["House cleaning Sandton", "Emergency plumber Joburg", "Solar installer Midrand", "Mobile beauty Rosebank"].map((t) => (
            <button
              key={t}
              style={{
                display:        "flex",
                alignItems:     "center",
                gap:            12,
                padding:        "13px 0",
                background:     "none",
                border:         "none",
                borderBottom:   "1px solid rgba(255,255,255,0.07)",
                cursor:         "pointer",
                textAlign:      "left",
              }}
            >
              <Search size={15} color="rgba(255,255,255,0.30)" />
              <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif" }}>{t}</span>
            </button>
          ))}

          <button
            onClick={() => setShowSearch(false)}
            style={{
              marginTop:    "auto",
              padding:      "14px",
              borderRadius: 18,
              background:   "rgba(255,255,255,0.10)",
              border:       "1px solid rgba(255,255,255,0.18)",
              fontSize:     15,
              fontWeight:   600,
              color:        "#fff",
              cursor:       "pointer",
              fontFamily:   "'Inter', sans-serif",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
