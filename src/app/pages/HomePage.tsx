import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Bell, MapPin, ChevronRight, ChevronLeft,
  Home, Grid2x2, ShoppingBag, Heart, User, Share2,
  Star, ScanLine, Check, Clock, Calendar, ExternalLink,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { MapSection, BUSINESS_COORDS } from "../components/MapSection";
import type { MapBusiness } from "../components/MapSection";
import { BrowsePage } from "./BrowsePage";
import type { SlimProvider } from "./BrowsePage";
import { BookingsPage } from "./BookingsPage";
import { ProfilePage } from "./ProfilePage";

/* ─── Palette ──────────────────────────────────────────────────── */
const GREEN     = "#2D7A3E";
const BANNER_BG = "#121812";
const TEXT      = "#111111";
const TEXT2     = "#767676";
const BORDER    = "#EBEBEB";
const CREAM     = "#EDE8DF";
const LIGHT     = "#F5F5F5";

/* ─── Images ───────────────────────────────────────────────────── */
const IMG = {
  cleaning:    "https://images.unsplash.com/photo-1652829069968-4ded3e30f411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  plumbing:    "https://images.unsplash.com/photo-1529836349180-223cd77d8cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  electrical:  "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  beauty:      "https://images.unsplash.com/photo-1711274091943-5aae912e6985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  landscaping: "https://images.unsplash.com/photo-1632320668827-1f2cc4713b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  moving:      "https://images.unsplash.com/photo-1700165644892-3dd6b67b25bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  hvac:        "https://images.unsplash.com/photo-1761330440311-16e160cad236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  brand1:      "https://images.unsplash.com/photo-1614555199894-d1df9b97d301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  brand2:      "https://images.unsplash.com/photo-1505798577917-a65157d3320a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
};

/* ─── Static Data ──────────────────────────────────────────────── */
const SCROLL_CATS = [
  { id: "all",      label: "All",        img: IMG.cleaning },
  { id: "cleaning", label: "Cleaning",   img: IMG.cleaning },
  { id: "plumbing", label: "Plumbing",   img: IMG.plumbing },
  { id: "electric", label: "Electrical", img: IMG.electrical },
  { id: "hvac",     label: "HVAC",       img: IMG.hvac },
  { id: "beauty",   label: "Beauty",     img: IMG.beauty },
];

const GRID_CATS = [
  { id: "cleaning",    label: "Cleaning",    img: IMG.cleaning },
  { id: "plumbing",    label: "Plumbing",    img: IMG.plumbing },
  { id: "electrical",  label: "Electrical",  img: IMG.electrical },
  { id: "hvac",        label: "HVAC",        img: IMG.hvac },
  { id: "landscaping", label: "Landscaping", img: IMG.landscaping },
  { id: "moving",      label: "Moving",      img: IMG.moving },
  { id: "beauty",      label: "Beauty",      img: IMG.beauty },
  { id: "security",    label: "Security",    img: IMG.electrical },
];

const PROVIDERS = [
  { id: 1, name: "Deep Clean Pro",    type: "Cleaning",    rating: 4.9, reviews: 281, price: "R49", img: IMG.cleaning,    saved: false },
  { id: 2, name: "AquaFix Plumbing",  type: "Plumbing",    rating: 4.8, reviews: 143, price: "R65", img: IMG.plumbing,    saved: false },
  { id: 3, name: "BrightSpark Elec.", type: "Electrical",  rating: 5.0, reviews: 97,  price: "R75", img: IMG.electrical,  saved: true  },
  { id: 4, name: "CoolAir HVAC",      type: "HVAC",        rating: 4.7, reviews: 188, price: "R90", img: IMG.hvac,        saved: false },
  { id: 5, name: "GreenThumb Garden", type: "Landscaping", rating: 4.9, reviews: 64,  price: "R55", img: IMG.landscaping, saved: false },
  { id: 6, name: "GlowUp Beauty",     type: "Beauty",      rating: 4.8, reviews: 312, price: "R40", img: IMG.beauty,      saved: true  },
];

const HERO_SLIDES = [
  { id: 0, headline: ["First Booking", "Free"],         sub: "New users · valid through 30 April", pill: "#2D7A3E", img: "https://images.unsplash.com/photo-1758273238564-806f750a2cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 1, headline: ["Premium Home", "Services"],      sub: "Vetted pros, at your doorstep",       pill: "#4A8FE8", img: "https://images.unsplash.com/photo-1613545325268-9265e1609167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
  { id: 2, headline: ["Book in", "60 Seconds"],         sub: "Fast, easy scheduling — anytime",      pill: "#E05A4A", img: "https://images.unsplash.com/photo-1606676539940-12768ce0e762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" },
];

/* ─── Provider Profile Data ─────────────────────────────────────── */
interface ReviewItem { id: number; name: string; initials: string; color: string; rating: number; date: string; text: string; }
interface SocialLink  { platform: string; handle: string; color: string; bg: string; url: string; }
interface ProviderProfile { description: string; quoteRange: string; responseTime: string; hours: string; experience: string; completedJobs: number; reviews: ReviewItem[]; social: SocialLink[]; bgImg: string; }

const PROFILES: Record<number, ProviderProfile> = {
  1: {
    description: "South Africa's top-rated residential cleaning service. We use 100% eco-certified products and our team undergoes rigorous background checks. From studio apartments to large family homes — we do it all.",
    quoteRange: "R49 – R350", responseTime: "~25 min", hours: "Mon–Sat  07:00–19:00", experience: "8 yrs", completedJobs: 1840,
    reviews: [
      { id: 1, name: "Thandi M.", initials: "TM", color: "#E8A87C", rating: 5, date: "2 days ago",  text: "Absolutely spotless. The team arrived early and finished ahead of schedule. My apartment has never looked this clean!" },
      { id: 2, name: "James T.",  initials: "JT", color: "#7CB9E8", rating: 5, date: "1 week ago",  text: "Used them three times now. Consistent quality every single visit. Highly recommend for deep cleans." },
      { id: 3, name: "Priya K.", initials: "PK", color: "#A87CE8", rating: 4, date: "2 weeks ago", text: "Great service, very professional. They ran 10 minutes late but totally made up for it with the result." },
    ],
    social: [
      { platform: "Instagram", handle: "@deepcleanpro",   color: "#fff", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "https://www.instagram.com/deepcleanpro/" },
      { platform: "Facebook",  handle: "Deep Clean Pro",  color: "#fff", bg: "#1877F2", url: "https://www.facebook.com/DeepCleanPro/" },
      { platform: "TikTok",    handle: "@deepclean",      color: "#fff", bg: "#010101", url: "https://www.tiktok.com/@deepclean" },
      { platform: "WhatsApp",  handle: "+27 81 234 5678", color: "#fff", bg: "#25D366", url: "https://wa.me/27812345678" },
    ],
    bgImg: "https://images.unsplash.com/photo-1652829069968-4ded3e30f411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  },
  2: {
    description: "Licensed master plumbers serving Johannesburg and surrounds. Available 24/7 for emergencies. We specialise in leak detection, geyser installation, drain clearing, and full bathroom refits.",
    quoteRange: "R65 – R800", responseTime: "~45 min", hours: "24 / 7 Emergency", experience: "12 yrs", completedJobs: 3210,
    reviews: [
      { id: 1, name: "Sipho D.",   initials: "SD", color: "#7CE8A8", rating: 5, date: "3 days ago",  text: "Fixed our burst pipe at 2am without hesitation. Affordable, quick, and left zero mess. A lifesaver!" },
      { id: 2, name: "Karen L.",   initials: "KL", color: "#E87C7C", rating: 5, date: "5 days ago",  text: "Replaced our geyser in under 3 hours. Very fair pricing and excellent workmanship." },
      { id: 3, name: "Michael B.", initials: "MB", color: "#E8D07C", rating: 5, date: "2 weeks ago", text: "Finally found a reliable plumber! The drain was cleared the same day I called. Will definitely use again." },
    ],
    social: [
      { platform: "Instagram", handle: "@aquafixsa",      color: "#fff", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "https://www.instagram.com/aquafixsa/" },
      { platform: "Facebook",  handle: "AquaFix SA",      color: "#fff", bg: "#1877F2", url: "https://www.facebook.com/AquaFixSA/" },
      { platform: "WhatsApp",  handle: "+27 72 345 6789", color: "#fff", bg: "#25D366", url: "https://wa.me/27723456789" },
      { platform: "X",         handle: "@aquafix",        color: "#fff", bg: "#000",    url: "https://x.com/aquafix" },
    ],
    bgImg: "https://images.unsplash.com/photo-1529836349180-223cd77d8cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  },
  3: {
    description: "Certified electricians for residential and commercial installations. We handle DB board upgrades, solar connections, smart-home wiring, and all SANS 10142 compliance certificates.",
    quoteRange: "R75 – R1 200", responseTime: "~1 hr", hours: "Mon–Fri  07:30–17:30", experience: "15 yrs", completedJobs: 4870,
    reviews: [
      { id: 1, name: "Anele N.", initials: "AN", color: "#FFD580", rating: 5, date: "1 day ago",   text: "Upgraded our DB board and installed outdoor lights. Flawless execution. COC certificate issued on the spot." },
      { id: 2, name: "Ruan V.",  initials: "RV", color: "#80CFFF", rating: 5, date: "1 week ago",  text: "Very knowledgeable team. Sorted our load-shedding bypass and solar inverter setup. Highly recommend." },
      { id: 3, name: "Fatima A.",initials: "FA", color: "#FFA07A", rating: 4, date: "3 weeks ago", text: "Prompt and professional. Did a full rewire of our cottage. Neat cabling and great value for money." },
    ],
    social: [
      { platform: "Instagram", handle: "@brightsparkec",         color: "#fff", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "https://www.instagram.com/brightsparkec/" },
      { platform: "Facebook",  handle: "BrightSpark Electrical", color: "#fff", bg: "#1877F2", url: "https://www.facebook.com/BrightSparkElectrical/" },
      { platform: "WhatsApp",  handle: "+27 83 456 7890",        color: "#fff", bg: "#25D366", url: "https://wa.me/27834567890" },
      { platform: "LinkedIn",  handle: "BrightSpark EC",         color: "#fff", bg: "#0A66C2", url: "https://www.linkedin.com/company/brightspark-ec/" },
    ],
    bgImg: "https://images.unsplash.com/photo-1610056494052-6a4f83a8368c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  },
  4: {
    description: "HVAC specialists covering installation, servicing, and repairs of all major air-conditioning brands. We offer annual maintenance plans that extend your unit's lifespan by up to 40%.",
    quoteRange: "R90 – R2 500", responseTime: "~2 hrs", hours: "Mon–Sat  08:00–17:00", experience: "10 yrs", completedJobs: 2130,
    reviews: [
      { id: 1, name: "Lungelo M.", initials: "LM", color: "#90EE90", rating: 5, date: "4 days ago",  text: "Installed two Daikin units in a single day. Clean install, cables neatly routed, and explained everything." },
      { id: 2, name: "Yolanda P.", initials: "YP", color: "#DDA0DD", rating: 5, date: "2 weeks ago", text: "Our aircon was making a horrible noise. They diagnosed and fixed it in under an hour. Super efficient!" },
      { id: 3, name: "Trevor S.",  initials: "TS", color: "#87CEEB", rating: 4, date: "1 month ago", text: "Annual service done on all 4 units. Very thorough and reasonably priced for the level of work." },
    ],
    social: [
      { platform: "Instagram", handle: "@coolair_hvac",   color: "#fff", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "https://www.instagram.com/coolair_hvac/" },
      { platform: "Facebook",  handle: "CoolAir HVAC",    color: "#fff", bg: "#1877F2", url: "https://www.facebook.com/CoolAirHVAC/" },
      { platform: "WhatsApp",  handle: "+27 74 567 8901", color: "#fff", bg: "#25D366", url: "https://wa.me/27745678901" },
      { platform: "TikTok",    handle: "@coolair",        color: "#fff", bg: "#010101", url: "https://www.tiktok.com/@coolair" },
    ],
    bgImg: "https://images.unsplash.com/photo-1761330440311-16e160cad236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  },
  5: {
    description: "Passionate gardeners and landscape designers transforming outdoor spaces across Gauteng. Services include lawn care, hedge trimming, irrigation systems, and full landscape redesigns.",
    quoteRange: "R55 – R500", responseTime: "~3 hrs", hours: "Mon–Sat  07:00–16:00", experience: "6 yrs", completedJobs: 920,
    reviews: [
      { id: 1, name: "Nomsa K.", initials: "NK", color: "#98FB98", rating: 5, date: "3 days ago",  text: "Completely transformed our back garden. They added a rock pathway and new flower beds — stunning result!" },
      { id: 2, name: "Johan V.", initials: "JV", color: "#F0E68C", rating: 5, date: "1 week ago",  text: "Regular lawn cutting and hedge trimming. Always on time, always neat. Been with them 18 months." },
      { id: 3, name: "Cindy A.", initials: "CA", color: "#FFB6C1", rating: 4, date: "3 weeks ago", text: "Laid new turf and installed an irrigation system. Garden has never looked better. Highly recommend!" },
    ],
    social: [
      { platform: "Instagram", handle: "@greenthumbgarden", color: "#fff", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "https://www.instagram.com/greenthumbgarden/" },
      { platform: "Facebook",  handle: "GreenThumb Garden", color: "#fff", bg: "#1877F2", url: "https://www.facebook.com/GreenThumbGarden/" },
      { platform: "WhatsApp",  handle: "+27 65 678 9012",   color: "#fff", bg: "#25D366", url: "https://wa.me/27656789012" },
      { platform: "Pinterest", handle: "GreenThumb",        color: "#fff", bg: "#E60023", url: "https://www.pinterest.com/greenthumb/" },
    ],
    bgImg: "https://images.unsplash.com/photo-1632320668827-1f2cc4713b9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  },
  6: {
    description: "Mobile beauty studio bringing salon-quality treatments to your door. Specialising in hair, nails, lash extensions, facials, and bridal packages. All products are cruelty-free and vegan-certified.",
    quoteRange: "R40 – R600", responseTime: "~1 hr", hours: "Tue–Sun  09:00–20:00", experience: "5 yrs", completedJobs: 2750,
    reviews: [
      { id: 1, name: "Zanele N.",  initials: "ZN", color: "#FFB6C1", rating: 5, date: "1 day ago",  text: "Got lash extensions done for my wedding — absolutely perfect. I cried happy tears. Thank you GlowUp!" },
      { id: 2, name: "Bianca M.", initials: "BM", color: "#E8A0BF", rating: 5, date: "4 days ago", text: "Regular mani/pedi customer. The convenience of home service is unbeatable and quality is top salon." },
      { id: 3, name: "Kefilwe T.",initials: "KT", color: "#C9A0DC", rating: 5, date: "2 weeks ago",text: "Facial treatment was deeply relaxing. My skin felt amazing for days. Will definitely book again." },
    ],
    social: [
      { platform: "Instagram", handle: "@glowupbeautysa",  color: "#fff", bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", url: "https://www.instagram.com/glowupbeautysa/" },
      { platform: "TikTok",    handle: "@glowupbeauty",    color: "#fff", bg: "#010101", url: "https://www.tiktok.com/@glowupbeauty" },
      { platform: "Facebook",  handle: "GlowUp Beauty SA", color: "#fff", bg: "#1877F2", url: "https://www.facebook.com/GlowUpBeautySA/" },
      { platform: "WhatsApp",  handle: "+27 61 789 0123",  color: "#fff", bg: "#25D366", url: "https://wa.me/27617890123" },
    ],
    bgImg: "https://images.unsplash.com/photo-1711274091943-5aae912e6985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200",
  },
};

/* ─── Social icon resolver ──────────────────────────────────────── */
function SocialIcon({ platform, size = 20 }: { platform: string; size?: number }) {
  const p = { size, color: "#fff" };
  switch (platform) {
    case "Instagram": return <FaInstagram {...p} />;
    case "Facebook":  return <FaFacebook  {...p} />;
    case "TikTok":    return <FaTiktok    {...p} />;
    case "WhatsApp":  return <FaWhatsapp  {...p} />;
    case "LinkedIn":  return <FaLinkedin  {...p} />;
    case "Pinterest": return <FaPinterest {...p} />;
    case "X":         return <FaXTwitter  {...p} />;
    default:          return <FaFacebook  {...p} />;
  }
}

/* ─── Bottom Nav ────────────────────────────────────────────────── */
function BottomNav({
  active,
  onTabChange,
  likedCount,
}: {
  active: string;
  onTabChange: (tab: string) => void;
  likedCount: number;
}) {
  const tabs = [
    { id: "home",    icon: <Home size={21} />,        label: "Home"     },
    { id: "browse",  icon: <Grid2x2 size={21} />,     label: "Browse"   },
    { id: "book",    icon: <ShoppingBag size={21} />, label: "Bookings" },
    { id: "saved",   icon: <Heart size={21} />,       label: "Liked"    },
    { id: "profile", icon: <User size={21} />,        label: "Profile"  },
  ];

  /* Dark-mode pages get an inverted dark glass nav bar */
  const darkPage = active === "profile" || active === "book" || active === "browse";
  const activeColor   = darkPage ? "#5CDB80" : GREEN;
  const inactiveColor = darkPage ? "rgba(255,255,255,0.30)" : "rgba(60,60,67,0.40)";

  return (
    <div
      style={{
        flexShrink: 0,
        padding: "8px 18px 28px",
        zIndex: 100,
        position: "relative",
        background: darkPage ? "transparent" : "transparent",
      }}
    >
      <div
        className="flex items-center w-full"
        style={{
          height: 66, borderRadius: 26,
          background: darkPage ? "rgba(10,22,13,0.88)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: darkPage ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(255,255,255,0.80)",
          boxShadow: darkPage
            ? "0 8px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.18)"
            : "0 6px 40px rgba(0,0,0,0.13), 0 1.5px 6px rgba(0,0,0,0.07), inset 0 1.5px 0 rgba(255,255,255,0.92), inset 0 -1px 0 rgba(0,0,0,0.05)",
          paddingLeft: 6, paddingRight: 6,
          transition: "background 0.30s ease, border-color 0.30s ease, box-shadow 0.30s ease",
        }}
      >
        {tabs.map((t) => {
          const isActive = t.id === active;
          const badge = t.id === "saved" && likedCount > 0;
          return (
            <button
              key={t.id}
              className="flex-1 flex flex-col items-center justify-center gap-[3px] h-full relative"
              onClick={() => onTabChange(t.id)}
            >
              <span style={{ color: isActive ? activeColor : inactiveColor, transition: "color 0.20s ease", position: "relative" }}>
                {t.icon}
                {badge && (
                  <span
                    className="absolute flex items-center justify-center"
                    style={{
                      top: -4, right: -6, minWidth: 16, height: 16, borderRadius: 8,
                      background: GREEN, fontSize: 9, fontWeight: 700, color: "#fff",
                      padding: "0 3px", lineHeight: 1,
                    }}
                  >
                    {likedCount}
                  </span>
                )}
              </span>
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? activeColor : inactiveColor, letterSpacing: "0.01em", transition: "color 0.20s ease" }}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Liked Page ────────────────────────────────────────────────── */
function LikedPage({
  providers,
  savedMap,
  onCardClick,
  onToggleSave,
}: {
  providers: typeof PROVIDERS;
  savedMap: Record<number, boolean>;
  onCardClick: (id: number) => void;
  onToggleSave: (id: number) => void;
}) {
  const liked = providers.filter((p) => savedMap[p.id]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (scrollRef.current) setScrollY(scrollRef.current.scrollTop);
    });
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  /* Card overlap & sizing */
  const CARD_H     = 230;   // visible card height
  const OVERLAP    = 108;   /* px each card peeks above the next */
  const MAX_SHIFT  = 48;    /* max horizontal diagonal travel      */
  const ROT_DEG    = 4;     /* static alternating rotation         */

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      style={{ height: "100%", overflowY: "auto", scrollbarWidth: "none", fontFamily: "'Inter', sans-serif", background: "#fff" }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-1">
        <p style={{ fontSize: 30, fontWeight: 900, color: TEXT, letterSpacing: "-0.03em" }}>Liked</p>
        <p style={{ fontSize: 13, color: TEXT2, marginTop: 2 }}>
          {liked.length === 0 ? "No favourites yet" : `${liked.length} saved business${liked.length !== 1 ? "es" : ""}`}
        </p>
      </div>

      {liked.length === 0 ? (
        /* ── Empty state ── */
        <div className="flex flex-col items-center justify-center px-8 py-24 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ background: LIGHT }}
          >
            <Heart size={34} color="#D0D0D0" />
          </div>
          <p style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 8, letterSpacing: "-0.02em" }}>Nothing saved yet</p>
          <p style={{ fontSize: 14, color: TEXT2, lineHeight: 1.65 }}>
            Tap the heart icon on any business card to save them here.
          </p>
        </div>
      ) : (
        /* ── Stacked diagonal cards ── */
        <div
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 28,
            /* total scroll height: first card full + each subsequent peek + bottom pad */
            paddingBottom: 140,
            position: "relative",
          }}
        >
          {liked.map((provider, index) => {
            const profile   = PROFILES[provider.id];
            /* alternating direction: even → right (+), odd → left (−) */
            const dir       = index % 2 === 0 ? 1 : -1;
            /* scroll-driven horizontal shift, clamped */
            const xShift    = dir * Math.min(scrollY * 0.11, MAX_SHIFT);
            /* static alternating tilt */
            const rotation  = dir * ROT_DEG;
            /* cards stack: each subsequent card peeks below the one above */
            const topOffset = index === 0 ? 0 : index * (CARD_H - OVERLAP);

            return (
              <div
                key={provider.id}
                style={{
                  position: index === 0 ? "relative" : "absolute",
                  top:      index === 0 ? undefined : topOffset + 28 /* match paddingTop */,
                  left:     20,
                  right:    20,
                  height:   CARD_H,
                  borderRadius: 26,
                  overflow: "hidden",
                  zIndex:   liked.length - index,
                  transform: `translateX(${xShift}px) rotate(${rotation}deg)`,
                  /* NO transition on scroll — we use RAF for smoothness */
                  cursor:   "pointer",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.28), 0 3px 10px rgba(0,0,0,0.14)",
                  willChange: "transform",
                }}
                onClick={() => onCardClick(provider.id)}
              >
                {/* Background image */}
                <img
                  src={profile.bgImg}
                  alt={provider.name}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />

                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)" }} />

                {/* Diagonal accent stripe — gives the parallelogram feel */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "100%",
                  background: `linear-gradient(${dir > 0 ? "120deg" : "60deg"}, rgba(255,255,255,0.06) 0%, transparent 60%)`,
                  pointerEvents: "none",
                }} />

                {/* Info at bottom */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 22px" }}>
                  {/* Type badge */}
                  <span
                    style={{
                      display: "inline-block", marginBottom: 6, padding: "3px 10px", borderRadius: 20,
                      background: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.25)", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.90)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {provider.type}
                  </span>
                  <p style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1, textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>
                    {provider.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
                    <Star size={12} fill="#FFC700" stroke="none" />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{provider.rating}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>({provider.reviews})</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>·</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: GREEN }}>{provider.price}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>/ session</span>
                  </div>
                </div>

                {/* Heart unsave button — glass pill top-right */}
                <div
                  role="button"
                  style={{
                    position: "absolute", top: 16, right: 16,
                    width: 38, height: 38, borderRadius: "50%",
                    background: "rgba(255,255,255,0.18)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.32)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
                  }}
                  onClick={(e) => { e.stopPropagation(); onToggleSave(provider.id); }}
                >
                  <Heart size={16} fill="#fff" color="#fff" />
                </div>
              </div>
            );
          })}

          {/* Spacer so all cards are reachable when scrolling */}
          <div style={{ height: liked.length > 1 ? (liked.length - 1) * (CARD_H - OVERLAP) + CARD_H : CARD_H }} />
        </div>
      )}
    </div>
  );
}

/* ─── Screen 1: Home ────────────────────────────────────────────── */
function HomeView({
  onCatClick,
  onCardClick,
  savedMap,
  onToggleSave,
  onGoToBookings,
}: {
  onCatClick: () => void;
  onCardClick: (id: number) => void;
  savedMap: Record<number, boolean>;
  onToggleSave: (id: number) => void;
  onGoToBookings?: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState("foryou");
  const [heroSlide, setHeroSlide]       = useState(0);
  const [heroFade,  setHeroFade]        = useState(true);

  /* ── Notification bell dropdown ── */
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showNotifs) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showNotifs]);

  const UPCOMING = [
    { id: 1, service: "Langa's Elite Cleaning",  date: "Tomorrow",   time: "10:00", initials: "LE", color: "#2D7A3E", status: "Confirmed" },
    { id: 2, service: "GreenThumb Gardens",       date: "Thu 12 Apr", time: "14:00", initials: "GT", color: "#1565C0", status: "Confirmed" },
    { id: 3, service: "SparkFix Electricians",    date: "Fri 13 Apr", time: "09:00", initials: "SF", color: "#6A1B9A", status: "Pending"   },
  ];

  /* Build map-compatible business list */
  const mapBusinesses: MapBusiness[] = PROVIDERS.map((p) => ({
    id:      p.id,
    name:    p.name,
    type:    p.type,
    rating:  p.rating,
    reviews: p.reviews,
    price:   p.price,
    img:     p.img,
    bgImg:   PROFILES[p.id].bgImg,
    coords:  BUSINESS_COORDS[p.id],
  }));

  useEffect(() => {
    const iv = setInterval(() => {
      setHeroFade(false);
      setTimeout(() => { setHeroSlide((s) => (s + 1) % HERO_SLIDES.length); setHeroFade(true); }, 320);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  function goToSlide(i: number) {
    if (i === heroSlide) return;
    setHeroFade(false);
    setTimeout(() => { setHeroSlide(i); setHeroFade(true); }, 320);
  }

  return (
    <div className="flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <button className="flex items-center gap-1.5">
          <MapPin size={14} fill={GREEN} stroke={GREEN} />
          <div>
            <p className="text-left" style={{ fontSize: 12, color: TEXT2, lineHeight: 1.2 }}>Express service</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1.2 }}>Johannesburg, Gauteng</p>
          </div>
        </button>
        {/* Bell with notification dropdown */}
        <div style={{ position: "relative" }} ref={notifRef}>
          <button
            className="relative"
            onClick={() => setShowNotifs((v) => !v)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Bell size={22} style={{ color: TEXT }} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: GREEN }} />
          </button>

          {showNotifs && (
            <div
              style={{
                position: "absolute", top: "calc(100% + 10px)", right: 0,
                width: 296, zIndex: 200, borderRadius: 22, overflow: "hidden",
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              {/* Header */}
              <div style={{ padding: "15px 16px 11px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: TEXT, letterSpacing: "-0.02em" }}>Upcoming Bookings</p>
                  <p style={{ fontSize: 11, color: TEXT2, marginTop: 1 }}>Next 7 days · 3 scheduled</p>
                </div>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, display: "inline-block", boxShadow: `0 0 8px ${GREEN}99` }} />
              </div>

              {/* Booking rows */}
              {UPCOMING.map((b, i) => (
                <div
                  key={b.id}
                  style={{
                    display: "flex", alignItems: "center", gap: 11,
                    padding: "11px 16px",
                    borderBottom: i < UPCOMING.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 13, flexShrink: 0,
                    background: b.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 12px ${b.color}55`,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{b.initials}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.service}</p>
                    <p style={{ fontSize: 11, color: TEXT2, marginTop: 1 }}>{b.date} · {b.time}</p>
                  </div>
                  <span style={{
                    padding: "3px 8px", borderRadius: 20, flexShrink: 0,
                    background: b.status === "Confirmed" ? `${GREEN}1A` : "rgba(255,149,0,0.12)",
                    border: `1px solid ${b.status === "Confirmed" ? `${GREEN}40` : "rgba(255,149,0,0.35)"}`,
                    fontSize: 9, fontWeight: 700,
                    color: b.status === "Confirmed" ? GREEN : "#FF9500",
                    letterSpacing: "0.03em",
                  }}>
                    {b.status.toUpperCase()}
                  </span>
                </div>
              ))}

              {/* CTA */}
              <div style={{ padding: "10px 16px 14px" }}>
                <button
                  onClick={() => { setShowNotifs(false); onCatClick(); }}
                  style={{
                    width: "100%", height: 44, borderRadius: 14,
                    background: GREEN, border: "none",
                    fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
                    boxShadow: `0 6px 20px ${GREEN}55, inset 0 1px 0 rgba(255,255,255,0.22)`,
                    letterSpacing: "0.01em",
                  }}
                >
                  Browse All Businesses
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 px-4 rounded-2xl" style={{ background: LIGHT, height: 46 }}>
          <Search size={18} style={{ color: "#AAAAAA" }} />
          <span style={{ fontSize: 15, color: "#AAAAAA", flex: 1 }}>Search</span>
          <ScanLine size={18} style={{ color: "#AAAAAA" }} />
        </div>
      </div>

      {/* Category scroll */}
      <div className="flex gap-4 px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {SCROLL_CATS.map((cat) => (
          <button
            key={cat.id}
            className="flex flex-col items-center gap-1.5 shrink-0"
            onClick={cat.id !== "all" ? onCatClick : undefined}
          >
            <div className="rounded-2xl overflow-hidden" style={{ width: 68, height: 68, background: CREAM }}>
              <img
                src={({
                  all:      "https://images.unsplash.com/photo-1754666104618-3e0655f5fa7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
                  cleaning: "https://images.unsplash.com/photo-1632320665257-c163c4e71412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
                  plumbing: "https://images.unsplash.com/photo-1739176566047-d9573b6c9fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
                  electric: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
                  hvac:     "https://images.unsplash.com/photo-1759772238012-9d5ad59ae637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
                  beauty:   "https://images.unsplash.com/photo-1585519355721-187196cfa41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
                } as Record<string, string>)[cat.id] ?? cat.img}
                alt={cat.label}
                className="w-full h-full object-cover"
              />
            </div>
            <span style={{ fontSize: 11, color: TEXT, fontWeight: 500 }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Hero Carousel */}
      <div className="px-4 mb-4">
        <div className="relative overflow-hidden" style={{ borderRadius: 22, height: 210, background: BANNER_BG }}>
          {HERO_SLIDES.map((slide, i) => (
            <div key={slide.id} className="absolute inset-0" style={{ opacity: i === heroSlide ? 1 : 0, transition: "opacity 0.55s ease" }}>
              <img src={slide.img} alt={slide.headline.join(" ")} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 55%, rgba(10,10,10,0.15) 100%)" }} />
            </div>
          ))}
          <div
            className="absolute inset-0 flex flex-col justify-between p-5"
            style={{ opacity: heroFade ? 1 : 0, transform: heroFade ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.32s ease, transform 0.32s ease" }}
          >
            <div>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
                {HERO_SLIDES[heroSlide].headline[0]}<br />
                <span style={{ color: HERO_SLIDES[heroSlide].pill }}>{HERO_SLIDES[heroSlide].headline[1]}</span>
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.62)", marginTop: 6, lineHeight: 1.4 }}>{HERO_SLIDES[heroSlide].sub}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                {HERO_SLIDES.map((s, i) => (
                  <button key={s.id} onClick={() => goToSlide(i)} style={{ width: i === heroSlide ? 22 : 7, height: 7, borderRadius: 4, background: i === heroSlide ? s.pill : "rgba(255,255,255,0.30)", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)", boxShadow: i === heroSlide ? `0 0 8px ${s.pill}88` : "none" }} />
                ))}
              </div>
              <button onClick={onCatClick} style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(24px) saturate(180%) brightness(1.1)", WebkitBackdropFilter: "blur(24px) saturate(180%) brightness(1.1)", border: "1px solid rgba(255,255,255,0.38)", boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1.5px 0 rgba(255,255,255,0.50)", borderRadius: 20, padding: "9px 20px", fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.01em" }}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Booking Tracker */}
      <style>{`
        @keyframes lbt-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
        @keyframes lbt-bar{from{width:0%}to{width:62%}}
        @keyframes lbt-shimmer{0%{transform:translateX(-120%)}100%{transform:translateX(300%)}}
      `}</style>
      <div className="px-4 mb-5">
        <button
          onClick={onGoToBookings}
          style={{
            width: "100%", textAlign: "left", cursor: "pointer", display: "block",
            background: "linear-gradient(140deg, #0D2010 0%, #091508 55%, #0F1E12 100%)",
            borderRadius: 22,
            border: "1px solid rgba(255,255,255,0.11)",
            boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.30), 0 16px 48px rgba(45,122,62,0.22), 0 6px 20px rgba(0,0,0,0.35)",
            overflow: "hidden", position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: -30, right: -20, width: 130, height: 130, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,122,62,0.30) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div className="bg-[#f9efef00] bg-[#faf0f000] bg-[#fbf2f200] bg-[#fef4f400] bg-[#fff5f500] bg-[#fff5f500] bg-[#fff5f500] bg-[#fff6f600] bg-[#fff8f800] bg-[#fff8f800]" style={{ padding: "15px 16px 16px", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, background: `${GREEN}15`, border: `1.5px solid ${GREEN}28`, boxShadow: `0 4px 14px ${GREEN}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: GREEN, letterSpacing: "-0.02em" }}>MF</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: TEXT, letterSpacing: "-0.02em", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Burst geyser repair</p>
                <p style={{ fontSize: 12, color: TEXT2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Mpho Flow Fix · <span style={{ color: TEXT }}>On the way</span></p>
              </div>
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 20, background: `${GREEN}12`, border: `1px solid ${GREEN}28`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.70)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "block", boxShadow: `0 0 6px ${GREEN}80`, animation: "lbt-pulse 1.8s ease-in-out infinite" }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: GREEN, letterSpacing: "0.06em" }}>LIVE</span>
              </div>
            </div>
            <div style={{ marginBottom: 9, height: 5, background: "rgba(0,0,0,0.07)", borderRadius: 99, overflow: "hidden", position: "relative" }}>
              <div style={{ width: "62%", height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${GREEN}, #5DDB80)`, boxShadow: `0 0 10px ${GREEN}45`, animation: "lbt-bar 1.1s cubic-bezier(0.25,1,0.5,1) forwards", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, width: "40%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)", animation: "lbt-shimmer 2.4s ease-in-out 1.2s infinite" }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 9px", borderRadius: 12, background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}>
                  <Clock size={10} style={{ color: TEXT2 }} />
                  <span style={{ fontSize: 11, color: TEXT2, fontWeight: 500 }}>ETA ~15 min</span>
                </div>
                <span style={{ fontSize: 11, color: GREEN, fontWeight: 600 }}>62%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 11, color: TEXT2, fontWeight: 500 }}>View booking</span>
                <ChevronRight size={13} style={{ color: TEXT2 }} />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 px-4 mb-4">
        {["foryou", "rated"].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="flex items-center gap-1 px-4 rounded-full"
            style={{ height: 32, background: activeFilter === f ? TEXT : "transparent", border: activeFilter === f ? "none" : `1px solid ${BORDER}`, fontSize: 13, fontWeight: 500, color: activeFilter === f ? "#fff" : TEXT }}
          >
            {f === "foryou" ? "For you" : "Top rated"}
          </button>
        ))}
        <button className="flex items-center gap-0.5 ml-auto shrink-0">
          <span style={{ fontSize: 13, color: TEXT }}>View all</span>
          <ChevronRight size={15} style={{ color: TEXT }} />
        </button>
      </div>

      {/* Provider grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-6">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            className="text-left rounded-[18px] overflow-hidden"
            style={{ background: "#fff", border: `1px solid ${BORDER}` }}
            onClick={() => onCardClick(p.id)}
          >
            <div className="relative" style={{ height: 148, background: LIGHT }}>
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              <div
                role="button"
                className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "rgba(255,255,255,0.90)" }}
                onClick={(e) => { e.stopPropagation(); onToggleSave(p.id); }}
              >
                <Heart size={14} fill={savedMap[p.id] ? TEXT : "none"} style={{ color: TEXT }} />
              </div>
              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                {[0,1,2].map((i) => <span key={i} className="rounded-full" style={{ width: i === 0 ? 14 : 5, height: 4, background: i === 0 ? TEXT : "#D0D0D0" }} />)}
              </div>
            </div>
            <div className="px-3 py-2.5">
              <p style={{ fontSize: 12, color: TEXT, fontWeight: 500, lineHeight: 1.3 }}>{p.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={10} fill="#FFC700" stroke="none" />
                <span style={{ fontSize: 11, color: TEXT2 }}>{p.rating}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginTop: 2 }}>{p.price}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Map: Near You ── */}
      <div className="pt-6 pb-36">
        <MapSection
          businesses={mapBusinesses}
          onViewProfile={(id) => onCardClick(id)}
        />
      </div>
    </div>
  );
}

/* ─── Screen 2: Services Category ───────────────────────────────── */
function CategoryView({ onBack, onCardClick }: { onBack: () => void; onCardClick: () => void }) {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="relative flex items-center justify-center px-5 pt-1 pb-4">
        <button onClick={onBack} className="absolute left-5"><ChevronLeft size={24} style={{ color: TEXT }} /></button>
        <p style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>Home Services</p>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 mb-6">
        {GRID_CATS.map((cat) => (
          <button key={cat.id} className="relative rounded-[18px] overflow-hidden text-left" style={{ background: LIGHT, height: 110 }} onClick={onCardClick}>
            <span className="absolute top-3 left-4 z-10" style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{cat.label}</span>
            <div className="absolute bottom-0 right-0 w-[60%] h-[75%]">
              <img src={cat.img} alt={cat.label} className="w-full h-full object-cover object-center" style={{ borderTopLeftRadius: 12 }} />
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 mb-28">
        <div className="flex items-center justify-between mb-3">
          <p style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>Popular companies</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{ name: "CleanCo", img: IMG.brand1 }, { name: "FixItFast", img: IMG.brand2 }].map((b) => (
            <button key={b.name} className="relative rounded-[18px] overflow-hidden" style={{ height: 130 }}>
              <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 50%, transparent)" }} />
              <span className="absolute bottom-3 left-4" style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{b.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Screen 3: Business Profile ────────────────────────────────── */
function BusinessProfileView({
  provider,
  onBack,
  savedMap,
  onToggleSave,
}: {
  provider: typeof PROVIDERS[0];
  onBack: () => void;
  savedMap: Record<number, boolean>;
  onToggleSave: (id: number) => void;
}) {
  const profile = PROFILES[provider.id];
  const [activeTab, setActiveTab]           = useState<"info" | "reviews" | "book">("info");
  const [bookingDate, setBookingDate]       = useState("");
  const [bookingTime, setBookingTime]       = useState("09:00");
  const [bookingName, setBookingName]       = useState("");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingNotes, setBookingNotes]     = useState("");
  const [booked, setBooked]                 = useState(false);

  const timeSlots = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];

  const glass: React.CSSProperties = {
    background: "rgba(255,255,255,0.11)", backdropFilter: "blur(28px) saturate(180%)", WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.20)", boxShadow: "0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.28)",
  };
  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 12, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif",
  };
  const sectionLabel: React.CSSProperties = {
    fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.10em", textTransform: "uppercase" as const, marginBottom: 10,
  };

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      {/* Background — absolute, stays contained, never escapes to cover BottomNav */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={profile.bgImg} alt={provider.name} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.42) saturate(1.15)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 65% 25%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.50) 100%)" }} />
      </div>

      {/* Scrollable content layer */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      <div className="relative pb-32">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <button onClick={onBack} className="flex items-center justify-center" style={{ ...glass, borderRadius: 22, width: 42, height: 42 }}>
            <ChevronLeft size={22} color="#fff" />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => onToggleSave(provider.id)} className="flex items-center justify-center" style={{ ...glass, borderRadius: 22, width: 42, height: 42 }}>
              <Heart size={18} fill={savedMap[provider.id] ? "#fff" : "none"} color="#fff" />
            </button>
            <button className="flex items-center justify-center" style={{ ...glass, borderRadius: 22, width: 42, height: 42 }}>
              <Share2 size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Identity */}
        <div className="px-5 mb-5 mt-2">
          <span className="inline-block mb-3 px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
            {provider.type}
          </span>
          <p style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.0, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>{provider.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map((s) => <Star key={s} size={13} fill={s <= Math.round(provider.rating) ? "#FFC700" : "rgba(255,255,255,0.25)"} stroke="none" />)}
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{provider.rating}</span>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>({provider.reviews} reviews)</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 px-5 mb-5">
          {[
            { label: "Quote",     value: profile.quoteRange,                        icon: <ExternalLink size={12} color="rgba(255,255,255,0.45)" /> },
            { label: "Response",  value: profile.responseTime,                      icon: <Clock size={12} color="rgba(255,255,255,0.45)" /> },
            { label: "Jobs done", value: profile.completedJobs.toLocaleString("en"),icon: <Check size={12} color="rgba(255,255,255,0.45)" /> },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 flex flex-col items-center justify-center py-3 rounded-[18px] gap-0.5" style={glass}>
              {stat.icon}
              <p style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginTop: 3 }}>{stat.value}</p>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.42)", fontWeight: 500 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="mx-5 mb-5 flex gap-1.5 p-1.5 rounded-[20px]" style={{ background: "rgba(0,0,0,0.32)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          {(["info","reviews","book"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-2 rounded-[14px]"
              style={{ background: activeTab === tab ? "rgba(255,255,255,0.92)" : "transparent", fontSize: 13, fontWeight: 600, color: activeTab === tab ? TEXT : "rgba(255,255,255,0.62)", transition: "all 0.20s ease" }}
            >
              {tab === "info" ? "Info" : tab === "reviews" ? "Reviews" : "Book"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-5 flex flex-col gap-4">

          {activeTab === "info" && (
            <>
              <div className="p-5 rounded-[22px]" style={glass}>
                <p style={sectionLabel}>About</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.72 }}>{profile.description}</p>
              </div>
              <div className="p-5 rounded-[22px]" style={glass}>
                <p style={sectionLabel}>Details</p>
                {[
                  { label: "Working hours", value: profile.hours,                  hi: false },
                  { label: "Experience",    value: profile.experience,             hi: false },
                  { label: "Starting from", value: `${provider.price} / session`,  hi: true  },
                ].map((row, i, arr) => (
                  <React.Fragment key={row.label}>
                    <div className="flex items-center justify-between py-2.5">
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{row.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: row.hi ? GREEN : "#fff" }}>{row.value}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Social */}
              <div className="p-5 rounded-[22px]" style={glass}>
                <p style={sectionLabel}>Follow & Connect</p>
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {profile.social.map((s) => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2" style={{ textDecoration: "none" }}>
                      <div className="w-12 h-12 rounded-[16px] flex items-center justify-center" style={{ background: s.bg, boxShadow: "0 4px 16px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.20)" }}>
                        <SocialIcon platform={s.platform} size={22} />
                      </div>
                      <span style={{ fontSize: 9, color: "rgba(255,255,255,0.52)", fontWeight: 600, textAlign: "center", letterSpacing: "0.02em" }}>{s.platform}</span>
                    </a>
                  ))}
                </div>
                <div className="flex flex-col rounded-[14px] overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  {profile.social.map((s, i) => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3" style={{ textDecoration: "none", borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-7 h-7 rounded-[9px] flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                        <SocialIcon platform={s.platform} size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", marginBottom: 1, fontWeight: 500 }}>{s.platform}</p>
                        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.handle}</p>
                      </div>
                      <ExternalLink size={13} color="rgba(255,255,255,0.30)" />
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "reviews" && (
            <>
              <div className="p-5 rounded-[22px] flex items-center gap-5" style={glass}>
                <div className="flex flex-col items-center shrink-0">
                  <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.05em" }}>{provider.rating}</span>
                  <div className="flex items-center gap-0.5 mt-1">{[1,2,3,4,5].map((s) => <Star key={s} size={11} fill="#FFC700" stroke="none" />)}</div>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", marginTop: 4 }}>{provider.reviews} reviews</span>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  {[5,4,3,2,1].map((n) => {
                    const pct = n === 5 ? 70 : n === 4 ? 18 : n === 3 ? 7 : n === 2 ? 3 : 2;
                    return (
                      <div key={n} className="flex items-center gap-2">
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", width: 8, textAlign: "right" }}>{n}</span>
                        <div className="flex-1 rounded-full overflow-hidden" style={{ height: 5, background: "rgba(255,255,255,0.12)" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: "#FFC700", borderRadius: 4 }} />
                        </div>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", width: 22 }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {profile.reviews.map((r) => (
                <div key={r.id} className="p-5 rounded-[22px]" style={glass}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: r.color, boxShadow: `0 4px 12px ${r.color}55` }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{r.initials}</span>
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{r.name}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} size={10} fill={s <= r.rating ? "#FFC700" : "rgba(255,255,255,0.18)"} stroke="none" />)}</div>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.38)" }}>{r.date}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.80)", lineHeight: 1.65 }}>{r.text}</p>
                </div>
              ))}
            </>
          )}

          {activeTab === "book" && (
            <>
              {!booked ? (
                <>
                  <div className="p-5 rounded-[22px]" style={glass}>
                    <div className="flex items-center gap-2 mb-3"><Calendar size={13} color="rgba(255,255,255,0.50)" /><p style={sectionLabel}>Select Date</p></div>
                    <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} style={inputStyle} />
                  </div>
                  <div className="p-5 rounded-[22px]" style={glass}>
                    <div className="flex items-center gap-2 mb-3"><Clock size={13} color="rgba(255,255,255,0.50)" /><p style={sectionLabel}>Time Slot</p></div>
                    <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                      {timeSlots.map((t) => (
                        <button key={t} onClick={() => setBookingTime(t)} className="shrink-0 px-3 py-1.5 rounded-full"
                          style={{ background: bookingTime === t ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.10)", border: bookingTime === t ? "none" : "1px solid rgba(255,255,255,0.18)", fontSize: 13, fontWeight: 600, color: bookingTime === t ? TEXT : "rgba(255,255,255,0.75)", transition: "all 0.18s ease" }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 rounded-[22px] flex flex-col gap-4" style={glass}>
                    <p style={sectionLabel}>Your Details</p>
                    {[
                      { label: "Full Name",       value: bookingName,    set: setBookingName,    ph: "e.g. Thandi Mokoena" },
                      { label: "Service Address", value: bookingAddress, set: setBookingAddress, ph: "Street, suburb, city"  },
                    ].map((f) => (
                      <div key={f.label}>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", marginBottom: 6, fontWeight: 500 }}>{f.label}</p>
                        <input type="text" value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} style={inputStyle} />
                      </div>
                    ))}
                    <div>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", marginBottom: 6, fontWeight: 500 }}>Special Notes (optional)</p>
                      <textarea value={bookingNotes} onChange={(e) => setBookingNotes(e.target.value)} placeholder="Anything the provider should know before arriving…" rows={3} style={{ ...inputStyle, resize: "none", lineHeight: 1.55 }} />
                    </div>
                  </div>
                  <div className="p-5 rounded-[22px]" style={glass}>
                    <p style={sectionLabel}>Quote Summary</p>
                    {[
                      { label: "Service",       value: provider.type,                hi: false },
                      { label: "Provider",      value: provider.name,                hi: false },
                      { label: "Starting from", value: `${provider.price} / session`, hi: true  },
                    ].map((row, i, arr) => (
                      <React.Fragment key={row.label}>
                        <div className="flex items-center justify-between py-2">
                          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.52)" }}>{row.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: row.hi ? GREEN : "#fff" }}>{row.value}</span>
                        </div>
                        {i < arr.length - 1 && <div style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />}
                      </React.Fragment>
                    ))}
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.55, marginTop: 10 }}>Final price confirmed after the provider reviews your booking. No upfront payment required.</p>
                  </div>
                  <button onClick={() => setBooked(true)} className="flex items-center justify-center w-full"
                    style={{ background: GREEN, borderRadius: 24, height: 58, fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "0.01em", boxShadow: `0 10px 32px ${GREEN}70, inset 0 1px 0 rgba(255,255,255,0.20)` }}>
                    Confirm Booking
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center py-12 px-6 rounded-[22px] text-center" style={glass}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: GREEN, boxShadow: `0 10px 32px ${GREEN}66` }}>
                    <Check size={36} color="#fff" strokeWidth={3} />
                  </div>
                  <p style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>Booking Requested!</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.65, maxWidth: 260 }}>
                    <strong style={{ color: "rgba(255,255,255,0.88)" }}>{provider.name}</strong> will confirm within{" "}
                    <strong style={{ color: "rgba(255,255,255,0.88)" }}>{profile.responseTime}</strong>. You'll get a notification once accepted.
                  </p>
                  <button onClick={() => setBooked(false)} className="mt-6 px-6 py-2.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                    Make another booking
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </div> {/* end scrollable content layer */}
    </div>
  );
}

/* ─── Root ──────────────────────────────────────────────────────── */
export function HomePage() {
  /* Shared saved state — source of truth for all screens */
  const [savedMap, setSavedMap] = useState<Record<number, boolean>>(
    Object.fromEntries(PROVIDERS.map((p) => [p.id, p.saved]))
  );
  const toggleSave = (id: number) => setSavedMap((s) => ({ ...s, [id]: !s[id] }));
  const likedCount = Object.values(savedMap).filter(Boolean).length;

  /* Bottom-nav tab */
  const [activeNavTab, setActiveNavTab] = useState("home");

  /* In-page navigation within the Home tab */
  const [screen, setScreen]         = useState<"home" | "category" | "profile">("home");
  const [prevScreen, setPrevScreen] = useState<"home" | "category">("home");
  const [selectedId, setSelectedId] = useState<number>(1);

  function goTo(s: "home" | "category" | "profile") {
    if (s === "profile") setPrevScreen(screen as "home" | "category");
    setScreen(s);
  }

  function handleTabChange(tab: string) {
    setActiveNavTab(tab);
    /* Reset home sub-screens whenever re-entering home */
    if (tab === "home") setScreen("home");
  }

  function handleCardClick(id: number) {
    setSelectedId(id);
    goTo("profile");
  }

  const selectedProvider = PROVIDERS.find((p) => p.id === selectedId) ?? PROVIDERS[0];

  /* Slim providers list for BrowsePage */
  const slimProviders: SlimProvider[] = PROVIDERS.map((p) => ({
    id:      p.id,
    name:    p.name,
    type:    p.type,
    rating:  p.rating,
    reviews: p.reviews,
    price:   p.price,
    bgImg:   PROFILES[p.id].bgImg,
  }));

  return (
    <div
      className="max-w-[430px] mx-auto"
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Content area — flex: 1, all tabs live here ── */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 0 }}>

        {/* ── Home tab ── */}
        {activeNavTab === "home" && (
          <div style={{ position: "absolute", inset: 0 }}>
            {screen === "home" && (
              <div style={{ position: "absolute", inset: 0, overflowY: "auto", scrollbarWidth: "none" }}>
                <HomeView
                  onCatClick={() => goTo("category")}
                  onCardClick={handleCardClick}
                  savedMap={savedMap}
                  onToggleSave={toggleSave}
                  onGoToBookings={() => setActiveNavTab("book")}
                />
              </div>
            )}
            {screen === "category" && (
              <div style={{ position: "absolute", inset: 0, overflowY: "auto", scrollbarWidth: "none" }}>
                <CategoryView
                  onBack={() => setScreen("home")}
                  onCardClick={() => handleCardClick(1)}
                />
              </div>
            )}
            {screen === "profile" && (
              <BusinessProfileView
                provider={selectedProvider}
                onBack={() => setScreen(prevScreen)}
                savedMap={savedMap}
                onToggleSave={toggleSave}
              />
            )}
          </div>
        )}

        {/* ── Liked tab ── */}
        {activeNavTab === "saved" && (
          <div style={{ position: "absolute", inset: 0 }}>
            <LikedPage
              providers={PROVIDERS}
              savedMap={savedMap}
              onCardClick={(id) => { setSelectedId(id); setScreen("profile"); setActiveNavTab("home"); }}
              onToggleSave={toggleSave}
            />
          </div>
        )}

        {/* ── Browse tab — TikTok-style feed ── */}
        {activeNavTab === "browse" && (
          <div style={{ position: "absolute", inset: 0 }}>
            <BrowsePage
              providers={slimProviders}
              savedMap={savedMap}
              onToggleSave={toggleSave}
              onViewProfile={(id) => {
                setSelectedId(id);
                setScreen("profile");
                setActiveNavTab("home");
              }}
            />
          </div>
        )}

        {/* ── Bookings tab ── */}
        {activeNavTab === "book" && (
          <div style={{ position: "absolute", inset: 0 }}>
            <BookingsPage
              onViewProfile={(id) => {
                setSelectedId(id);
                setScreen("profile");
                setActiveNavTab("home");
              }}
            />
          </div>
        )}

        {/* ── Profile tab ── */}
        {activeNavTab === "profile" && (
          <div style={{ position: "absolute", inset: 0 }}>
            <ProfilePage onNavigate={setActiveNavTab} />
          </div>
        )}

      </div>

      {/* ── Bottom nav — always in normal flow, never scrollable away ── */}
      <BottomNav
        active={activeNavTab}
        onTabChange={handleTabChange}
        likedCount={likedCount}
      />
    </div>
  );
}
