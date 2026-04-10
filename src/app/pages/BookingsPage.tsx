import React, { useState } from "react";
import {
  MapPin, Phone, Mail, ChevronRight, Star, Calendar,
  Clock, RotateCcw, MessageSquarePlus, CheckCircle2,
  AlertCircle, X, Send, Edit3, Briefcase, Award,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   GLASS SYSTEM  — three tiers of frosted glass depth
───────────────────────────────────────────────────────────────── */
const G = {
  /* subtle — inner chips, dividers */
  sm: {
    background:              "rgba(255,255,255,0.07)",
    backdropFilter:          "blur(20px) saturate(160%)",
    WebkitBackdropFilter:    "blur(20px) saturate(160%)",
    border:                  "1px solid rgba(255,255,255,0.11)",
    boxShadow:               "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(0,0,0,0.22)",
  } as React.CSSProperties,
  /* standard — cards */
  md: {
    background:              "rgba(255,255,255,0.095)",
    backdropFilter:          "blur(36px) saturate(190%)",
    WebkitBackdropFilter:    "blur(36px) saturate(190%)",
    border:                  "1px solid rgba(255,255,255,0.16)",
    boxShadow:               [
      "inset 0 1px 0 rgba(255,255,255,0.28)",
      "inset 0 -1px 0 rgba(0,0,0,0.10)",
      "0 8px 40px rgba(0,0,0,0.32)",
      "0 2px 8px rgba(0,0,0,0.18)",
    ].join(", "),
  } as React.CSSProperties,
  /* elevated — hero, modals */
  lg: {
    background:              "rgba(255,255,255,0.13)",
    backdropFilter:          "blur(52px) saturate(210%)",
    WebkitBackdropFilter:    "blur(52px) saturate(210%)",
    border:                  "1px solid rgba(255,255,255,0.22)",
    boxShadow:               [
      "inset 0 1.5px 0 rgba(255,255,255,0.40)",
      "inset 0 -1px 0 rgba(0,0,0,0.12)",
      "0 20px 60px rgba(0,0,0,0.40)",
      "0 6px 20px rgba(0,0,0,0.22)",
    ].join(", "),
  } as React.CSSProperties,
};

/* ─── Accent colours on dark ────────────────────────────────────── */
const GREEN_BRIGHT  = "#5CDB80";   // vivid — visible on near-black
const GREEN_DARK    = "#2D7A3E";   // original brand
const AMBER_BRIGHT  = "#FCD34D";
const BLUE_BRIGHT   = "#60A5FA";
const W95           = "rgba(255,255,255,0.95)";
const W65           = "rgba(255,255,255,0.65)";
const W38           = "rgba(255,255,255,0.38)";
const W20           = "rgba(255,255,255,0.20)";

/* ─── Mock user ─────────────────────────────────────────────────── */
const USER = {
  name:     "Thabo Nkosi",
  initials: "TN",
  phone:    "+27 82 456 7890",
  email:    "thabo.nkosi@gmail.com",
  address:  "14 Rivonia Road, Sandton",
  city:     "Johannesburg, 2196",
  member:   "Member since Jan 2025",
};

/* ─── Data types & mock data ────────────────────────────────────── */
interface Booking {
  id: number; providerId: number; providerName: string; service: string;
  date: string; time: string; duration: string; price: string;
  status: "confirmed" | "pending"; img: string; address: string; ref: string;
}
interface PastBooking {
  id: number; providerId: number; providerName: string; service: string;
  date: string; price: string; img: string; reviewed: boolean; rating?: number;
}

const UPCOMING: Booking[] = [
  {
    id: 1, providerId: 1,
    providerName: "Deep Clean Pro",
    service:      "Full Home Deep Clean",
    date:         "Tomorrow, Fri 11 Apr",
    time:         "10:00 AM",
    duration:     "3 hrs",
    price:        "R850",
    status:       "confirmed",
    img:          "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=200",
    address:      "14 Rivonia Rd, Sandton",
    ref:          "SH-2026-0411",
  },
  {
    id: 2, providerId: 6,
    providerName: "GlowUp Beauty",
    service:      "Lash Extensions — Full Set",
    date:         "Sat 12 Apr",
    time:         "2:30 PM",
    duration:     "1.5 hrs",
    price:        "R650",
    status:       "pending",
    img:          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200",
    address:      "Mobile — comes to you",
    ref:          "SH-2026-0412",
  },
];

const PAST: PastBooking[] = [
  {
    id: 10, providerId: 2,
    providerName: "AquaFix Plumbing",
    service:      "Emergency Pipe Repair",
    date:         "3 Apr 2026", price: "R1 200",
    img:          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
    reviewed: true, rating: 5,
  },
  {
    id: 11, providerId: 4,
    providerName: "CoolAir HVAC",
    service:      "Split Unit Installation",
    date:         "28 Mar 2026", price: "R3 500",
    img:          "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=200",
    reviewed: false,
  },
  {
    id: 12, providerId: 3,
    providerName: "BrightSpark Elec.",
    service:      "DB Board Upgrade",
    date:         "15 Mar 2026", price: "R2 800",
    img:          "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200",
    reviewed: false,
  },
  {
    id: 13, providerId: 5,
    providerName: "GreenThumb Garden",
    service:      "Full Garden Makeover",
    date:         "1 Mar 2026", price: "R4 200",
    img:          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200",
    reviewed: true, rating: 4,
  },
];

/* ═══════════════════════════════════════════════════════════════════
   REVIEW MODAL  — dark glass bottom sheet
═══════════════════════════════════════════════════════════════════ */
function ReviewModal({
  booking, onClose, onSubmit,
}: {
  booking: PastBooking;
  onClose: () => void;
  onSubmit: (id: number, rating: number, text: string) => void;
}) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [text,  setText]  = useState("");

  return (
    <div
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         200,
        background:     "rgba(0,0,0,0.70)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display:        "flex",
        alignItems:     "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width:           "100%",
          ...G.lg,
          background:      "rgba(10,22,13,0.88)",
          backdropFilter:  "blur(60px) saturate(220%)",
          WebkitBackdropFilter: "blur(60px) saturate(220%)",
          borderRadius:    "32px 32px 0 0",
          borderBottom:    "none",
          padding:         "0 24px 52px",
          fontFamily:      "'Inter', sans-serif",
        }}
      >
        {/* Drag handle */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: W20, margin: "16px auto 28px" }} />

        {/* Specular shimmer line at top of sheet */}
        <div
          style={{
            position:   "absolute",
            top:        0,
            left:       "15%",
            right:      "15%",
            height:     1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 40%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.55) 60%, transparent)",
            borderRadius: 1,
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <p style={{ fontSize: 20, fontWeight: 800, color: W95, letterSpacing: "-0.02em" }}>
              Leave a Review
            </p>
            <p style={{ fontSize: 13, color: W65, marginTop: 3 }}>
              {booking.providerName} · {booking.service}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              ...G.sm,
              width: 36, height: 36, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            <X size={16} color={W65} />
          </button>
        </div>

        {/* Star label */}
        <p style={{ fontSize: 11, fontWeight: 700, color: W38, letterSpacing: "0.10em", marginBottom: 14 }}>
          YOUR RATING
        </p>

        {/* Stars */}
        <div className="flex gap-3 mb-7">
          {[1,2,3,4,5].map((s) => {
            const active = (hover || stars) >= s;
            return (
              <button
                key={s}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setStars(s)}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  filter:     active ? `drop-shadow(0 0 8px ${AMBER_BRIGHT}99)` : "none",
                  transform:  active ? "scale(1.12)" : "scale(1)",
                  transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <Star
                  size={38}
                  fill={active ? AMBER_BRIGHT : "none"}
                  color={active ? AMBER_BRIGHT : W20}
                  strokeWidth={1.5}
                />
              </button>
            );
          })}
        </div>

        {/* Text label */}
        <p style={{ fontSize: 11, fontWeight: 700, color: W38, letterSpacing: "0.10em", marginBottom: 10 }}>
          YOUR EXPERIENCE
        </p>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell others what you thought of this service…"
          rows={4}
          style={{
            width:        "100%",
            ...G.sm,
            borderRadius: 18,
            padding:      "14px 16px",
            fontSize:     14,
            color:        W95,
            fontFamily:   "'Inter', sans-serif",
            resize:       "none",
            outline:      "none",
            boxSizing:    "border-box",
            lineHeight:   1.65,
          }}
        />

        {/* Submit */}
        <button
          onClick={() => { if (stars > 0) { onSubmit(booking.id, stars, text); onClose(); } }}
          disabled={stars === 0}
          className="flex items-center justify-center gap-2 w-full mt-4 py-4 rounded-[18px]"
          style={{
            background:  stars > 0
              ? `linear-gradient(135deg, ${GREEN_DARK} 0%, #3a9e52 100%)`
              : "rgba(255,255,255,0.06)",
            border:      stars > 0
              ? `1px solid rgba(92,219,128,0.35)`
              : "1px solid rgba(255,255,255,0.08)",
            boxShadow:   stars > 0
              ? `0 8px 30px rgba(45,122,62,0.55), inset 0 1px 0 rgba(255,255,255,0.22)`
              : "none",
            fontSize:    15,
            fontWeight:  700,
            color:       stars > 0 ? "#fff" : W38,
            cursor:      stars > 0 ? "pointer" : "not-allowed",
            transition:  "all 0.25s ease",
          }}
        >
          <Send size={16} color={stars > 0 ? "#fff" : W38} />
          Submit Review
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BOOKINGS PAGE
═══════════════════════════════════════════════════════════════════ */
export function BookingsPage({ onViewProfile }: { onViewProfile: (id: number) => void }) {
  const [reviewTarget, setReviewTarget] = useState<PastBooking | null>(null);
  const [reviewed, setReviewed] = useState<Set<number>>(
    new Set(PAST.filter((b) => b.reviewed).map((b) => b.id))
  );

  const totalSpent = [...UPCOMING, ...PAST].reduce((acc, b) => {
    const n = parseInt(b.price.replace(/[^0-9]/g, ""), 10);
    return acc + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>

      {/* ── FIXED BACKGROUND SCENE ──────────────────────────────── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(160deg, #050E07 0%, #08160B 45%, #040C06 100%)", overflow: "hidden" }}>

        {/* SVG noise grain — premium material texture */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.040, pointerEvents: "none" }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Colour orb 1 — large green, top-left */}
        <div style={{
          position: "absolute", top: -80, left: -80,
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,122,62,0.55) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orbFloat1 12s ease-in-out infinite",
        }} />

        {/* Colour orb 2 — emerald, top-right */}
        <div style={{
          position: "absolute", top: 60, right: -60,
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,88,36,0.45) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "orbFloat2 15s ease-in-out infinite",
        }} />

        {/* Colour orb 3 — bright green, mid-left */}
        <div style={{
          position: "absolute", top: "38%", left: "5%",
          width: 180, height: 180, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(58,158,82,0.30) 0%, transparent 70%)",
          filter: "blur(45px)",
          animation: "orbFloat3 10s ease-in-out infinite",
        }} />

        {/* Colour orb 4 — deep teal, bottom-right */}
        <div style={{
          position: "absolute", bottom: "10%", right: "-5%",
          width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,60,25,0.50) 0%, transparent 70%)",
          filter: "blur(55px)",
          animation: "orbFloat4 18s ease-in-out infinite",
        }} />

        {/* Colour orb 5 — accent lime, bottom-left */}
        <div style={{
          position: "absolute", bottom: "5%", left: "10%",
          width: 140, height: 140, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(92,219,128,0.18) 0%, transparent 70%)",
          filter: "blur(36px)",
          animation: "orbFloat2 9s ease-in-out infinite reverse",
        }} />

        {/* Keyframes */}
        <style>{`
          @keyframes orbFloat1 {
            0%,100% { transform: translate(0px, 0px) scale(1);    }
            33%     { transform: translate(24px,-20px) scale(1.07); }
            66%     { transform: translate(-12px,16px) scale(0.95); }
          }
          @keyframes orbFloat2 {
            0%,100% { transform: translate(0px, 0px) scale(1);    }
            40%     { transform: translate(-18px,22px) scale(1.05); }
            70%     { transform: translate(14px,-10px) scale(0.97); }
          }
          @keyframes orbFloat3 {
            0%,100% { transform: translate(0px, 0px) scale(1);    }
            50%     { transform: translate(20px, 28px) scale(1.08); }
          }
          @keyframes orbFloat4 {
            0%,100% { transform: translate(0px, 0px) scale(1);    }
            33%     { transform: translate(-22px,-14px) scale(1.04); }
            66%     { transform: translate(10px, 20px) scale(0.96); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(22px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>
      </div>

      {/* ── SCROLLABLE CONTENT (over fixed background) ───────────── */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>

        {/* ══════════════════════════════════════════════════════════
            HERO — user profile glass card
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding: "52px 16px 0", animation: "fadeUp 0.5s ease both" }}>
          <div style={{ ...G.lg, borderRadius: 28, padding: "24px 20px 22px", position: "relative", overflow: "hidden" }}>

            {/* Inner top shimmer */}
            <div style={{
              position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0.90) 50%, rgba(255,255,255,0.65) 70%, transparent)",
            }} />

            {/* Subtle inner glow */}
            <div style={{
              position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(92,219,128,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Avatar row */}
            <div className="flex items-center gap-4 mb-5">
              {/* Avatar */}
              <div style={{
                width: 68, height: 68, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, rgba(45,122,62,0.70) 0%, rgba(16,60,28,0.80) 100%)",
                border: "1.5px solid rgba(92,219,128,0.45)",
                boxShadow: "0 0 0 4px rgba(92,219,128,0.12), 0 8px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)",
              }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.40)" }}>
                  {USER.initials}
                </span>
              </div>

              {/* Name / tier */}
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 22, fontWeight: 800, color: W95, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {USER.name}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "3px 10px", borderRadius: 20,
                    background: "rgba(92,219,128,0.15)",
                    border: "1px solid rgba(92,219,128,0.30)",
                    fontSize: 11, fontWeight: 700, color: GREEN_BRIGHT,
                  }}>
                    ✦ Premium Member
                  </span>
                </div>
              </div>

              {/* Edit */}
              <button style={{
                ...G.sm, width: 36, height: 36, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}>
                <Edit3 size={15} color={W65} />
              </button>
            </div>

            {/* Member line */}
            <p style={{ fontSize: 11, color: W38, fontWeight: 500, letterSpacing: "0.05em", marginBottom: 14 }}>
              {USER.member}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 16 }} />

            {/* Contact chips */}
            <div className="flex flex-col gap-2">
              <GlassContactRow icon={<MapPin size={13} color={GREEN_BRIGHT} />} label={`${USER.address}, ${USER.city}`} />
              <GlassContactRow icon={<Phone   size={13} color={GREEN_BRIGHT} />} label={USER.phone} />
              <GlassContactRow icon={<Mail    size={13} color={GREEN_BRIGHT} />} label={USER.email} />
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            STAT CARDS
        ══════════════════════════════════════════════════════════ */}
        <div className="flex gap-3 px-4 mt-4" style={{ animation: "fadeUp 0.5s 0.08s ease both", opacity: 0 }}>
          <GlassStatCard
            icon={<Calendar size={17} color={GREEN_BRIGHT} />}
            value={String(UPCOMING.length)}
            label="Upcoming"
            glow="rgba(92,219,128,0.25)"
          />
          <GlassStatCard
            icon={<CheckCircle2 size={17} color={BLUE_BRIGHT} />}
            value={String(PAST.length)}
            label="Completed"
            glow="rgba(96,165,250,0.25)"
          />
          <GlassStatCard
            icon={<Award size={17} color={AMBER_BRIGHT} />}
            value={`R${(totalSpent / 1000).toFixed(1)}k`}
            label="Total Spent"
            glow="rgba(252,211,77,0.22)"
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
            CONTENT
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding: "24px 16px 120px" }}>

          {/* ── UPCOMING ── */}
          <GlassSectionHeader title="Upcoming Bookings" count={UPCOMING.length} delay="0.12s" />

          {UPCOMING.map((b, i) => (
            <UpcomingCard
              key={b.id}
              booking={b}
              delay={`${0.16 + i * 0.08}s`}
              onViewProfile={() => onViewProfile(b.providerId)}
            />
          ))}

          {UPCOMING.length === 0 && (
            <GlassEmpty label="No upcoming bookings" icon={<Calendar size={26} color={W38} />} />
          )}

          {/* ── PAST ── */}
          <GlassSectionHeader title="Past Bookings" count={PAST.length} delay="0.30s" topGap />

          {PAST.map((b, i) => (
            <PastCard
              key={b.id}
              booking={b}
              delay={`${0.34 + i * 0.07}s`}
              alreadyReviewed={reviewed.has(b.id)}
              onRebook={() => onViewProfile(b.providerId)}
              onReview={() => setReviewTarget(b)}
            />
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {reviewTarget && (
        <ReviewModal
          booking={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onSubmit={(id, rating, text) => setReviewed((p) => new Set([...p, id]))}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GLASS CONTACT ROW
═══════════════════════════════════════════════════════════════════ */
function GlassContactRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex items-center gap-3"
      style={{ ...G.sm, borderRadius: 12, padding: "9px 13px" }}
    >
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: 12, color: W65, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GLASS STAT CARD
═══════════════════════════════════════════════════════════════════ */
function GlassStatCard({ icon, value, label, glow }: {
  icon: React.ReactNode; value: string; label: string; glow: string;
}) {
  return (
    <div
      className="flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-[22px]"
      style={{ ...G.md, position: "relative", overflow: "hidden" }}
    >
      {/* Specular */}
      <div style={{
        position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.60) 50%, transparent)",
      }} />

      {/* Icon glow */}
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: glow,
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: `0 0 18px ${glow}, inset 0 1px 0 rgba(255,255,255,0.18)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>

      <p style={{ fontSize: 20, fontWeight: 800, color: W95, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: 10, color: W38, fontWeight: 600, letterSpacing: "0.06em" }}>
        {label.toUpperCase()}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   GLASS SECTION HEADER
═══════════════════════════════════════════════════════════════════ */
function GlassSectionHeader({ title, count, delay, topGap }: {
  title: string; count: number; delay: string; topGap?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between mb-3"
      style={{
        marginTop:       topGap ? 28 : 0,
        animation:       `fadeUp 0.5s ${delay} ease both`,
        opacity:         0,
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 800, color: W95, letterSpacing: "-0.01em" }}>
        {title}
      </p>
      <span style={{
        padding: "3px 11px", borderRadius: 20,
        background: "rgba(92,219,128,0.14)",
        border: "1px solid rgba(92,219,128,0.28)",
        fontSize: 12, fontWeight: 700, color: GREEN_BRIGHT,
      }}>
        {count}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   UPCOMING CARD
═══════════════════════════════════════════════════════════════════ */
function UpcomingCard({
  booking, delay, onViewProfile,
}: {
  booking: Booking; delay: string; onViewProfile: () => void;
}) {
  const confirmed = booking.status === "confirmed";
  const accentColor = confirmed ? GREEN_BRIGHT : AMBER_BRIGHT;
  const accentGlow  = confirmed
    ? "rgba(92,219,128,0.40)"
    : "rgba(252,211,77,0.40)";

  return (
    <div
      style={{
        ...G.md,
        borderRadius: 26,
        marginBottom: 14,
        overflow:     "hidden",
        position:     "relative",
        animation:    `fadeUp 0.5s ${delay} ease both`,
        opacity:      0,
      }}
    >
      {/* Top specular shimmer */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.80) 50%, rgba(255,255,255,0.55) 70%, transparent)",
      }} />

      {/* Left glowing accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 20, bottom: 20,
        width: 3, borderRadius: "0 3px 3px 0",
        background: accentColor,
        boxShadow:  `0 0 16px ${accentGlow}, 0 0 32px ${accentGlow}`,
      }} />

      <div style={{ padding: "20px 18px 18px 22px" }}>

        {/* Row 1: thumb + name + status */}
        <div className="flex items-start gap-3 mb-4">
          {/* Thumbnail with glass overlay */}
          <div style={{ width: 56, height: 56, borderRadius: 16, overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <img src={booking.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 60%)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.20)",
            }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p style={{ fontSize: 15, fontWeight: 800, color: W95, letterSpacing: "-0.01em" }}>
                {booking.providerName}
              </p>
              {/* Status pill */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                padding: "2px 8px", borderRadius: 20, flexShrink: 0,
                background: confirmed ? "rgba(92,219,128,0.14)" : "rgba(252,211,77,0.14)",
                border: `1px solid ${confirmed ? "rgba(92,219,128,0.30)" : "rgba(252,211,77,0.30)"}`,
                fontSize: 10, fontWeight: 700,
                color: confirmed ? GREEN_BRIGHT : AMBER_BRIGHT,
              }}>
                {confirmed
                  ? <><CheckCircle2 size={8} color={GREEN_BRIGHT} />Confirmed</>
                  : <><AlertCircle  size={8} color={AMBER_BRIGHT} />Pending</>}
              </span>
            </div>
            <p style={{ fontSize: 12, color: W65, marginTop: 3 }}>{booking.service}</p>
          </div>
        </div>

        {/* Row 2: date / time / duration pill row */}
        <div
          className="flex items-center mb-4"
          style={{ ...G.sm, borderRadius: 14, padding: "10px 14px", gap: 0 }}
        >
          <GlassInfoCell icon={<Calendar size={12} color={GREEN_BRIGHT} />} label={booking.date} />
          <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.10)", flexShrink: 0 }} />
          <GlassInfoCell icon={<Clock size={12} color={GREEN_BRIGHT} />} label={booking.time} />
          <div style={{ width: 1, height: 22, background: "rgba(255,255,255,0.10)", flexShrink: 0 }} />
          <GlassInfoCell icon={<Briefcase size={12} color={GREEN_BRIGHT} />} label={booking.duration} />
        </div>

        {/* Row 3: address + ref */}
        <div className="flex items-center gap-2 mb-5">
          <MapPin size={11} color={W38} />
          <p style={{ fontSize: 11, color: W38, flex: 1 }}>{booking.address}</p>
          <p style={{ fontSize: 10, color: W38, opacity: 0.7 }}>#{booking.ref}</p>
        </div>

        {/* Row 4: price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 10, color: W38, fontWeight: 600, letterSpacing: "0.05em" }}>TOTAL</p>
            <p style={{ fontSize: 26, fontWeight: 800, color: W95, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {booking.price}
            </p>
          </div>
          <button
            onClick={onViewProfile}
            className="flex items-center gap-1.5 px-5 py-3 rounded-[16px]"
            style={{
              background: `linear-gradient(135deg, ${GREEN_DARK} 0%, #3a9e52 100%)`,
              border:     "1px solid rgba(92,219,128,0.35)",
              boxShadow:  `0 8px 28px rgba(45,122,62,0.55), inset 0 1px 0 rgba(255,255,255,0.22)`,
              fontSize:   13, fontWeight: 700, color: "#fff", cursor: "pointer",
            }}
          >
            View Details
            <ChevronRight size={14} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAST CARD
═══════════════════════════════════════════════════════════════════ */
function PastCard({
  booking, delay, alreadyReviewed, onRebook, onReview,
}: {
  booking: PastBooking; delay: string;
  alreadyReviewed: boolean; onRebook: () => void; onReview: () => void;
}) {
  return (
    <div
      style={{
        ...G.md,
        borderRadius: 24,
        marginBottom: 12,
        padding:      "16px 16px 14px",
        position:     "relative",
        overflow:     "hidden",
        animation:    `fadeUp 0.5s ${delay} ease both`,
        opacity:      0,
      }}
    >
      {/* Specular top */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45) 50%, transparent)",
      }} />

      {/* Top row */}
      <div className="flex items-center gap-3">
        {/* Thumbnail */}
        <div style={{ width: 50, height: 50, borderRadius: 14, overflow: "hidden", flexShrink: 0, position: "relative" }}>
          <img src={booking.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 60%)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14 }} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p style={{ fontSize: 14, fontWeight: 800, color: W95, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {booking.providerName}
          </p>
          <p style={{ fontSize: 12, color: W65, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>
            {booking.service}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span style={{
              padding: "2px 8px", borderRadius: 20,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.10)",
              fontSize: 10, fontWeight: 600, color: W38,
            }}>
              Completed
            </span>
            <span style={{ fontSize: 11, color: W38 }}>{booking.date}</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: W95, marginLeft: "auto" }}>
              {booking.price}
            </span>
          </div>
        </div>
      </div>

      {/* Reviewed row */}
      {alreadyReviewed && booking.rating && (
        <div
          className="flex items-center gap-2 mt-3 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <CheckCircle2 size={12} color={GREEN_BRIGHT} />
          <p style={{ fontSize: 11, color: GREEN_BRIGHT, fontWeight: 600 }}>Reviewed</p>
          <div className="flex items-center gap-0.5 ml-auto">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                size={12}
                fill={s <= booking.rating! ? AMBER_BRIGHT : "none"}
                color={s <= booking.rating! ? AMBER_BRIGHT : W20}
                strokeWidth={1.5}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 mt-3">
        {/* Rebook */}
        <button
          onClick={onRebook}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[13px]"
          style={{
            background: "rgba(92,219,128,0.12)",
            border:     "1px solid rgba(92,219,128,0.28)",
            boxShadow:  "inset 0 1px 0 rgba(255,255,255,0.10)",
            fontSize:   12, fontWeight: 700, color: GREEN_BRIGHT, cursor: "pointer",
          }}
        >
          <RotateCcw size={12} color={GREEN_BRIGHT} />
          Rebook
        </button>

        {/* Review / Reviewed */}
        {!alreadyReviewed ? (
          <button
            onClick={onReview}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[13px]"
            style={{
              background: "rgba(252,211,77,0.10)",
              border:     "1px solid rgba(252,211,77,0.28)",
              boxShadow:  "inset 0 1px 0 rgba(255,255,255,0.08)",
              fontSize:   12, fontWeight: 700, color: AMBER_BRIGHT, cursor: "pointer",
            }}
          >
            <MessageSquarePlus size={12} color={AMBER_BRIGHT} />
            Add Review
          </button>
        ) : (
          <div
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[13px]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border:     "1px solid rgba(255,255,255,0.08)",
              fontSize:   12, fontWeight: 600, color: W38,
            }}
          >
            <CheckCircle2 size={12} color={W38} />
            Reviewed
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SMALL HELPERS
═══════════════════════════════════════════════════════════════════ */
function GlassInfoCell({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-0 px-2">
      {icon}
      <span style={{ fontSize: 11, fontWeight: 600, color: W65, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label}
      </span>
    </div>
  );
}

function GlassEmpty({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      className="flex flex-col items-center gap-3 py-10 rounded-[22px]"
      style={{ ...G.sm, marginBottom: 14 }}
    >
      {icon}
      <p style={{ fontSize: 13, color: W38 }}>{label}</p>
    </div>
  );
}