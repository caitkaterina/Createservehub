import React, { useState } from "react";
import {
  MapPin, Phone, Mail, ChevronRight, Star, Calendar,
  Clock, RotateCcw, MessageSquarePlus, CheckCircle2,
  AlertCircle, X, Send, Edit3, Briefcase, Award,
} from "lucide-react";
 
/* ─────────────────────────────────────────────────────────────────
   iOS 26 LIQUID GLASS SYSTEM
   Base: #F2F2F7  Surface: white  Glass: frosted white layers
───────────────────────────────────────────────────────────────── */
const G = {
  /* Card: main content cards */
  card: {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(32px) saturate(180%)",
    WebkitBackdropFilter: "blur(32px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.90)",
    boxShadow: [
      "inset 0 1px 0 rgba(255,255,255,1)",
      "inset 0 -0.5px 0 rgba(0,0,0,0.06)",
      "0 4px 24px rgba(0,0,0,0.07)",
      "0 1px 4px rgba(0,0,0,0.04)",
    ].join(", "),
  } as React.CSSProperties,
 
  /* Elevated: hero, modals */
  elevated: {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(40px) saturate(200%)",
    WebkitBackdropFilter: "blur(40px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.95)",
    boxShadow: [
      "inset 0 1.5px 0 rgba(255,255,255,1)",
      "inset 0 -0.5px 0 rgba(0,0,0,0.04)",
      "0 12px 40px rgba(0,0,0,0.10)",
      "0 2px 8px rgba(0,0,0,0.06)",
    ].join(", "),
  } as React.CSSProperties,
 
  /* Chip: inline badges */
  chip: {
    background: "rgba(255,255,255,0.60)",
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.80)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.90), 0 2px 8px rgba(0,0,0,0.05)",
  } as React.CSSProperties,
};
 
/* ─── iOS 26 Palette ──────────────────────────────────────────── */
const BG         = "#F2F2F7";
const BLUE       = "#007AFF";   // iOS system blue — primary CTA
const GREEN      = "#34C759";   // iOS system green — confirmed
const ORANGE     = "#FF9F0A";   // iOS system orange — pending
const RED        = "#FF3B30";   // iOS system red
const LABEL      = "#1C1C1E";   // primary text
const LABEL2     = "#48484A";   // secondary text
const LABEL3     = "#8E8E93";   // tertiary text
const SEPARATOR  = "rgba(60,60,67,0.12)";
 
/* ─── Mock user ─────────────────────────────────────────────── */
const USER = {
  name: "Thabo Nkosi",
  initials: "TN",
  phone: "+27 82 456 7890",
  email: "thabo.nkosi@gmail.com",
  address: "14 Rivonia Road, Sandton",
  city: "Johannesburg, 2196",
  member: "Member since Jan 2025",
};
 
/* ─── Data types & mock data ────────────────────────────────── */
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
    service: "Full Home Deep Clean",
    date: "Tomorrow, Fri 11 Apr",
    time: "10:00 AM",
    duration: "3 hrs",
    price: "R850",
    status: "confirmed",
    img: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=200",
    address: "14 Rivonia Rd, Sandton",
    ref: "SH-2026-0411",
  },
  {
    id: 2, providerId: 6,
    providerName: "GlowUp Beauty",
    service: "Lash Extensions — Full Set",
    date: "Sat 12 Apr",
    time: "2:30 PM",
    duration: "1.5 hrs",
    price: "R650",
    status: "pending",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=200",
    address: "Mobile — comes to you",
    ref: "SH-2026-0412",
  },
];
 
const PAST: PastBooking[] = [
  {
    id: 10, providerId: 2,
    providerName: "AquaFix Plumbing",
    service: "Emergency Pipe Repair",
    date: "3 Apr 2026", price: "R1 200",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200",
    reviewed: true, rating: 5,
  },
  {
    id: 11, providerId: 4,
    providerName: "CoolAir HVAC",
    service: "Split Unit Installation",
    date: "28 Mar 2026", price: "R3 500",
    img: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=200",
    reviewed: false,
  },
  {
    id: 12, providerId: 3,
    providerName: "BrightSpark Elec.",
    service: "DB Board Upgrade",
    date: "15 Mar 2026", price: "R2 800",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200",
    reviewed: false,
  },
  {
    id: 13, providerId: 5,
    providerName: "GreenThumb Garden",
    service: "Full Garden Makeover",
    date: "1 Mar 2026", price: "R4 200",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200",
    reviewed: true, rating: 4,
  },
];
 
/* ═══════════════════════════════════════════════════════════════
   REVIEW MODAL — iOS 26 bottom sheet
═══════════════════════════════════════════════════════════════ */
function ReviewModal({
  booking, onClose, onSubmit,
}: {
  booking: PastBooking;
  onClose: () => void;
  onSubmit: (id: number, rating: number, text: string) => void;
}) {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
 
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          ...G.elevated,
          background: "rgba(249,249,251,0.96)",
          backdropFilter: "blur(60px) saturate(220%)",
          WebkitBackdropFilter: "blur(60px) saturate(220%)",
          borderRadius: "22px 22px 0 0",
          borderBottom: "none",
          padding: "0 20px 48px",
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Handle */}
        <div style={{ width: 36, height: 5, borderRadius: 3,
          background: "rgba(60,60,67,0.18)", margin: "12px auto 24px" }} />
 
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, color: LABEL, letterSpacing: "-0.03em" }}>
              Leave a Review
            </p>
            <p style={{ fontSize: 13, color: LABEL3, marginTop: 2 }}>
              {booking.providerName} · {booking.service}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              ...G.chip, width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            <X size={15} color={LABEL3} />
          </button>
        </div>
 
        {/* Stars */}
        <p style={{ fontSize: 11, fontWeight: 600, color: LABEL3,
          letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>
          Your Rating
        </p>
        <div className="flex gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((s) => {
            const active = (hover || stars) >= s;
            return (
              <button
                key={s}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setStars(s)}
                style={{
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                  transform: active ? "scale(1.15)" : "scale(1)",
                  transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <Star
                  size={36}
                  fill={active ? "#FF9F0A" : "none"}
                  color={active ? "#FF9F0A" : "rgba(60,60,67,0.20)"}
                  strokeWidth={1.5}
                />
              </button>
            );
          })}
        </div>
 
        {/* Text */}
        <p style={{ fontSize: 11, fontWeight: 600, color: LABEL3,
          letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
          Your Experience
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell others what you thought of this service…"
          rows={4}
          style={{
            width: "100%", ...G.chip,
            borderRadius: 14, padding: "13px 15px",
            fontSize: 15, color: LABEL,
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            resize: "none", outline: "none", boxSizing: "border-box",
            lineHeight: 1.55,
          }}
        />
 
        {/* Submit */}
        <button
          onClick={() => { if (stars > 0) { onSubmit(booking.id, stars, text); onClose(); } }}
          disabled={stars === 0}
          className="flex items-center justify-center gap-2 w-full mt-4 py-4 rounded-[16px]"
          style={{
            background: stars > 0 ? BLUE : "rgba(60,60,67,0.08)",
            border: "none",
            boxShadow: stars > 0 ? `0 4px 20px rgba(0,122,255,0.35)` : "none",
            fontSize: 15, fontWeight: 600,
            color: stars > 0 ? "#fff" : LABEL3,
            cursor: stars > 0 ? "pointer" : "not-allowed",
            transition: "all 0.22s ease",
          }}
        >
          <Send size={15} color={stars > 0 ? "#fff" : LABEL3} />
          Submit Review
        </button>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════════════════════════
   BOOKINGS PAGE
═══════════════════════════════════════════════════════════════ */
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
    <div style={{
      position: "relative", height: "100%", overflow: "hidden",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      background: BG,
    }}>
 
      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
 
        {/* ── HERO PROFILE CARD ─────────────────────────── */}
        <div style={{ padding: "56px 16px 0" }}>
          <div style={{
            ...G.elevated,
            borderRadius: 24,
            padding: "22px 20px 20px",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Subtle mesh gradient inside card */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(135deg, rgba(0,122,255,0.03) 0%, rgba(52,199,89,0.03) 100%)",
              borderRadius: 24,
            }} />
 
            {/* Avatar row */}
            <div className="flex items-center gap-4 mb-4">
              <div style={{
                width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(145deg, #007AFF, #5AC8FA)",
                boxShadow: "0 4px 16px rgba(0,122,255,0.30), inset 0 1px 0 rgba(255,255,255,0.40)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  {USER.initials}
                </span>
              </div>
 
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 20, fontWeight: 700, color: LABEL, letterSpacing: "-0.02em" }}>
                  {USER.name}
                </p>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  padding: "3px 10px", borderRadius: 20, marginTop: 4,
                  background: "rgba(0,122,255,0.10)",
                  border: "1px solid rgba(0,122,255,0.18)",
                  fontSize: 11, fontWeight: 600, color: BLUE,
                }}>
                  ✦ Premium Member
                </span>
              </div>
 
              <button style={{
                ...G.chip, width: 34, height: 34, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}>
                <Edit3 size={14} color={LABEL3} />
              </button>
            </div>
 
            <p style={{ fontSize: 11, color: LABEL3, fontWeight: 500, marginBottom: 12 }}>
              {USER.member}
            </p>
 
            <div style={{ height: 0.5, background: SEPARATOR, marginBottom: 14 }} />
 
            {/* Contact chips */}
            <div className="flex flex-col gap-2">
              <ContactRow icon={<MapPin size={13} color={BLUE} />}
                label={`${USER.address}, ${USER.city}`} />
              <ContactRow icon={<Phone size={13} color={BLUE} />} label={USER.phone} />
              <ContactRow icon={<Mail size={13} color={BLUE} />} label={USER.email} />
            </div>
          </div>
        </div>
 
        {/* ── STAT CARDS ──────────────────────────────── */}
        <div className="flex gap-3 px-4 mt-3">
          <StatCard icon={<Calendar size={16} color={BLUE} />}
            value={String(UPCOMING.length)} label="Upcoming" tint={BLUE} />
          <StatCard icon={<CheckCircle2 size={16} color={GREEN} />}
            value={String(PAST.length)} label="Completed" tint={GREEN} />
          <StatCard icon={<Award size={16} color={ORANGE} />}
            value={`R${(totalSpent / 1000).toFixed(1)}k`} label="Total Spent" tint={ORANGE} />
        </div>
 
        {/* ── CONTENT ─────────────────────────────────── */}
        <div style={{ padding: "24px 16px 120px" }}>
 
          <SectionHeader title="Upcoming" count={UPCOMING.length} />
 
          {UPCOMING.map((b) => (
            <UpcomingCard
              key={b.id}
              booking={b}
              onViewProfile={() => onViewProfile(b.providerId)}
            />
          ))}
 
          {UPCOMING.length === 0 && (
            <EmptyState label="No upcoming bookings" icon={<Calendar size={24} color={LABEL3} />} />
          )}
 
          <SectionHeader title="History" count={PAST.length} topGap />
 
          {PAST.map((b) => (
            <PastCard
              key={b.id}
              booking={b}
              alreadyReviewed={reviewed.has(b.id)}
              onRebook={() => onViewProfile(b.providerId)}
              onReview={() => setReviewTarget(b)}
            />
          ))}
        </div>
      </div>
 
      {reviewTarget && (
        <ReviewModal
          booking={reviewTarget}
          onClose={() => setReviewTarget(null)}
          onSubmit={(id) => setReviewed((p) => new Set([...p, id]))}
        />
      )}
    </div>
  );
}
 
/* ── Small: Contact Row ──────────────────────────────────────── */
function ContactRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3"
      style={{ ...G.chip, borderRadius: 10, padding: "8px 12px" }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: 12, color: LABEL2, fontWeight: 500 }}>{label}</span>
    </div>
  );
}
 
/* ── Small: Stat Card ─────────────────────────────────────────── */
function StatCard({ icon, value, label, tint }: {
  icon: React.ReactNode; value: string; label: string; tint: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-[20px]"
      style={{ ...G.card, position: "relative", overflow: "hidden" }}>
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        background: `${tint}18`,
        border: `1px solid ${tint}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <p style={{ fontSize: 19, fontWeight: 700, color: LABEL, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: 10, color: LABEL3, fontWeight: 500, letterSpacing: "0.02em" }}>
        {label}
      </p>
    </div>
  );
}
 
/* ── Small: Section Header ────────────────────────────────────── */
function SectionHeader({ title, count, topGap }: {
  title: string; count: number; topGap?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-3"
      style={{ marginTop: topGap ? 24 : 0 }}>
      <p style={{ fontSize: 20, fontWeight: 700, color: LABEL, letterSpacing: "-0.02em" }}>
        {title}
      </p>
      <span style={{
        padding: "3px 10px", borderRadius: 20,
        background: `${BLUE}12`,
        border: `1px solid ${BLUE}20`,
        fontSize: 12, fontWeight: 600, color: BLUE,
      }}>
        {count}
      </span>
    </div>
  );
}
 
/* ═══════════════════════════════════════════════════════════════
   UPCOMING CARD
═══════════════════════════════════════════════════════════════ */
function UpcomingCard({
  booking, onViewProfile,
}: {
  booking: Booking; onViewProfile: () => void;
}) {
  const confirmed = booking.status === "confirmed";
  const statusColor = confirmed ? GREEN : ORANGE;
  const statusBg    = confirmed ? `${GREEN}12` : `${ORANGE}12`;
  const statusBorder = confirmed ? `${GREEN}22` : `${ORANGE}22`;
 
  return (
    <div style={{
      ...G.elevated,
      borderRadius: 20,
      marginBottom: 12,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Top accent stripe */}
      <div style={{
        height: 3,
        background: confirmed
          ? `linear-gradient(90deg, ${GREEN}, #30D158)`
          : `linear-gradient(90deg, ${ORANGE}, #FFD60A)`,
      }} />
 
      <div style={{ padding: "16px 16px 14px" }}>
 
        {/* Row 1: Provider + Status */}
        <div className="flex items-center gap-3 mb-3">
          <div style={{
            width: 52, height: 52, borderRadius: 14, overflow: "hidden",
            flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          }}>
            <img src={booking.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
 
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p style={{ fontSize: 15, fontWeight: 700, color: LABEL, letterSpacing: "-0.01em" }}>
                {booking.providerName}
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                padding: "2px 8px", borderRadius: 20, flexShrink: 0,
                background: statusBg,
                border: `1px solid ${statusBorder}`,
                fontSize: 10, fontWeight: 600, color: statusColor,
              }}>
                {confirmed
                  ? <><CheckCircle2 size={8} color={GREEN} />Confirmed</>
                  : <><AlertCircle size={8} color={ORANGE} />Pending</>}
              </span>
            </div>
            <p style={{ fontSize: 12, color: LABEL3, marginTop: 2 }}>{booking.service}</p>
          </div>
        </div>
 
        {/* Row 2: Date / Time / Duration */}
        <div className="flex items-center mb-3"
          style={{ ...G.chip, borderRadius: 12, padding: "9px 12px", gap: 0 }}>
          <InfoCell icon={<Calendar size={11} color={BLUE} />} label={booking.date} />
          <div style={{ width: 0.5, height: 20, background: SEPARATOR, flexShrink: 0 }} />
          <InfoCell icon={<Clock size={11} color={BLUE} />} label={booking.time} />
          <div style={{ width: 0.5, height: 20, background: SEPARATOR, flexShrink: 0 }} />
          <InfoCell icon={<Briefcase size={11} color={BLUE} />} label={booking.duration} />
        </div>
 
        {/* Row 3: Address + ref */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={11} color={LABEL3} />
          <p style={{ fontSize: 11, color: LABEL3, flex: 1 }}>{booking.address}</p>
          <p style={{ fontSize: 10, color: LABEL3, opacity: 0.6 }}>#{booking.ref}</p>
        </div>
 
        {/* Row 4: Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 10, color: LABEL3, fontWeight: 500 }}>TOTAL</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: LABEL, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              {booking.price}
            </p>
          </div>
          <button
            onClick={onViewProfile}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-[14px]"
            style={{
              background: BLUE,
              border: "none",
              boxShadow: `0 4px 16px rgba(0,122,255,0.35)`,
              fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer",
            }}
          >
            View Details
            <ChevronRight size={13} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════════════════════════
   PAST CARD
═══════════════════════════════════════════════════════════════ */
function PastCard({
  booking, alreadyReviewed, onRebook, onReview,
}: {
  booking: PastBooking; alreadyReviewed: boolean;
  onRebook: () => void; onReview: () => void;
}) {
  return (
    <div style={{
      ...G.card,
      borderRadius: 18,
      marginBottom: 10,
      padding: "14px 14px 12px",
      overflow: "hidden",
    }}>
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div style={{
          width: 46, height: 46, borderRadius: 12, overflow: "hidden",
          flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}>
          <img src={booking.img} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
 
        <div className="flex-1 min-w-0">
          <p style={{
            fontSize: 14, fontWeight: 700, color: LABEL, letterSpacing: "-0.01em",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {booking.providerName}
          </p>
          <p style={{
            fontSize: 12, color: LABEL3, overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1,
          }}>
            {booking.service}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span style={{
              padding: "1px 7px", borderRadius: 20,
              background: "rgba(60,60,67,0.07)",
              border: "1px solid rgba(60,60,67,0.10)",
              fontSize: 10, fontWeight: 500, color: LABEL3,
            }}>
              Completed
            </span>
            <span style={{ fontSize: 11, color: LABEL3 }}>{booking.date}</span>
            <span style={{
              fontSize: 13, fontWeight: 700, color: LABEL, marginLeft: "auto",
            }}>
              {booking.price}
            </span>
          </div>
        </div>
      </div>
 
      {/* Reviewed row */}
      {alreadyReviewed && booking.rating && (
        <div className="flex items-center gap-2 mt-3 pt-3"
          style={{ borderTop: `0.5px solid ${SEPARATOR}` }}>
          <CheckCircle2 size={12} color={GREEN} />
          <p style={{ fontSize: 11, color: GREEN, fontWeight: 600 }}>Reviewed</p>
          <div className="flex items-center gap-0.5 ml-auto">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={11}
                fill={s <= booking.rating! ? ORANGE : "none"}
                color={s <= booking.rating! ? ORANGE : "rgba(60,60,67,0.18)"}
                strokeWidth={1.5}
              />
            ))}
          </div>
        </div>
      )}
 
      {/* Action buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={onRebook}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px]"
          style={{
            background: `${BLUE}10`,
            border: `1px solid ${BLUE}20`,
            fontSize: 12, fontWeight: 600, color: BLUE, cursor: "pointer",
          }}
        >
          <RotateCcw size={11} color={BLUE} />
          Rebook
        </button>
 
        {!alreadyReviewed ? (
          <button
            onClick={onReview}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px]"
            style={{
              background: `${ORANGE}10`,
              border: `1px solid ${ORANGE}20`,
              fontSize: 12, fontWeight: 600, color: ORANGE, cursor: "pointer",
            }}
          >
            <MessageSquarePlus size={11} color={ORANGE} />
            Add Review
          </button>
        ) : (
          <div
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[12px]"
            style={{
              background: "rgba(60,60,67,0.05)",
              border: "1px solid rgba(60,60,67,0.08)",
              fontSize: 12, fontWeight: 500, color: LABEL3,
            }}
          >
            <CheckCircle2 size={11} color={LABEL3} />
            Reviewed
          </div>
        )}
      </div>
    </div>
  );
}
 
/* ── Helpers ──────────────────────────────────────────────────── */
function InfoCell({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 flex-1 min-w-0 px-2">
      {icon}
      <span style={{
        fontSize: 11, fontWeight: 500, color: LABEL2,
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>
        {label}
      </span>
    </div>
  );
}
 
function EmptyState({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 rounded-[18px]"
      style={{ ...G.chip, marginBottom: 14 }}>
      {icon}
      <p style={{ fontSize: 13, color: LABEL3 }}>{label}</p>
    </div>
  );
}
