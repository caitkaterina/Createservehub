import React, { useState } from "react";
import {
  Edit3, MapPin, Phone, Mail, CreditCard, Bell, Moon, Globe,
  Shield, Fingerprint, ChevronRight, Star, LogOut, HelpCircle,
  MessageCircle, AlertTriangle, Heart, Check, Lock, Tag,
  FileText, Camera, Info, Zap, Home, Briefcase, CheckCircle2,
  Award, Gift, Key, PawPrint, Settings, X, Save, Plus,
  MessageSquare, ThumbsUp, Clock, Share2, ChevronDown, ChevronUp,
  BookOpen,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   GLASS SYSTEM  (same three-tier language as BookingsPage)
───────────────────────────────────────────────────────────────── */
const G = {
  sm: {
    background:           "rgba(255,255,255,0.07)",
    backdropFilter:       "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    border:               "1px solid rgba(255,255,255,0.11)",
    boxShadow:            "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(0,0,0,0.22)",
  } as React.CSSProperties,
  md: {
    background:           "rgba(255,255,255,0.095)",
    backdropFilter:       "blur(36px) saturate(190%)",
    WebkitBackdropFilter: "blur(36px) saturate(190%)",
    border:               "1px solid rgba(255,255,255,0.16)",
    boxShadow:            [
      "inset 0 1px 0 rgba(255,255,255,0.28)",
      "inset 0 -1px 0 rgba(0,0,0,0.10)",
      "0 8px 40px rgba(0,0,0,0.32)",
      "0 2px 8px rgba(0,0,0,0.18)",
    ].join(", "),
  } as React.CSSProperties,
  lg: {
    background:           "rgba(255,255,255,0.13)",
    backdropFilter:       "blur(52px) saturate(210%)",
    WebkitBackdropFilter: "blur(52px) saturate(210%)",
    border:               "1px solid rgba(255,255,255,0.22)",
    boxShadow:            [
      "inset 0 1.5px 0 rgba(255,255,255,0.40)",
      "inset 0 -1px 0 rgba(0,0,0,0.12)",
      "0 20px 60px rgba(0,0,0,0.40)",
      "0 6px 20px rgba(0,0,0,0.22)",
    ].join(", "),
  } as React.CSSProperties,
};

/* ─── Tokens ────────────────────────────────────────────────────── */
const GREEN_BRIGHT = "#5CDB80";
const GREEN_DARK   = "#2D7A3E";
const AMBER        = "#FCD34D";
const BLUE         = "#60A5FA";
const PURPLE       = "#C084FC";
const RED          = "#F87171";
const TEAL         = "#2DD4BF";
const W95          = "rgba(255,255,255,0.95)";
const W65          = "rgba(255,255,255,0.65)";
const W38          = "rgba(255,255,255,0.38)";
const W20          = "rgba(255,255,255,0.20)";

/* ─── Glow helpers ──────────────────────────────────────────────── */
const glow = (col: string, a = 0.22) =>
  `rgba(${hexRgb(col)},${a})`;

function hexRgb(hex: string): string {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

/* ─── Mock user data ────────────────────────────────────────────── */
const USER = {
  name:      "Thabo Nkosi",
  initials:  "TN",
  phone:     "+27 82 456 7890",
  email:     "thabo.nkosi@gmail.com",
  tier:      "Gold Member",
  rating:    4.9,
  reviews:   23,
  member:    "Member since January 2025",
  referral:  "THABO20",
  points:    850,
};

const SAVED_ADDRESSES = [
  { id: 1, label: "Home",    icon: Home,     address: "14 Rivonia Road, Sandton, 2196" },
  { id: 2, label: "Work",    icon: Briefcase, address: "88 Sandton Drive, Sandton, 2196" },
];

const PAYMENT_METHODS = [
  { id: 1, type: "Visa",       last4: "4242", expiry: "09/27", primary: true  },
  { id: 2, type: "Mastercard", last4: "1891", expiry: "03/26", primary: false },
];

/* ═══════════════════════════════════════════════════════════════════
   EDIT PROFILE MODAL
═══════════════════════════════════════════════════════════════════ */
function EditProfileModal({
  user, onClose, onSave,
}: {
  user: typeof USER;
  onClose: () => void;
  onSave: (u: Partial<typeof USER>) => void;
}) {
  const [name,  setName]  = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.72)",
               backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
               display:"flex", alignItems:"flex-end" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width:"100%", ...G.lg,
          background:"rgba(8,20,11,0.90)",
          backdropFilter:"blur(60px) saturate(220%)",
          WebkitBackdropFilter:"blur(60px) saturate(220%)",
          borderRadius:"32px 32px 0 0", borderBottom:"none",
          padding:"0 24px 56px", fontFamily:"'Inter',sans-serif",
          position:"relative", overflow:"hidden",
        }}
      >
        {/* Specular line */}
        <div style={{ position:"absolute", top:0, left:"12%", right:"12%", height:1,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.70) 50%,transparent)" }} />

        {/* Handle */}
        <div style={{ width:36, height:4, borderRadius:2, background:W20, margin:"16px auto 28px" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p style={{ fontSize:20, fontWeight:800, color:W95, letterSpacing:"-0.02em" }}>Edit Profile</p>
            <p style={{ fontSize:13, color:W65, marginTop:2 }}>Update your personal information</p>
          </div>
          <button onClick={onClose}
            style={{ ...G.sm, width:36, height:36, borderRadius:"50%",
                     display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <X size={16} color={W65} />
          </button>
        </div>

        {/* Avatar edit */}
        <div className="flex justify-center mb-8">
          <div style={{ position:"relative" }}>
            <div style={{
              width:80, height:80, borderRadius:"50%",
              background:"linear-gradient(135deg,rgba(45,122,62,0.75),rgba(16,60,28,0.85))",
              border:"2px solid rgba(92,219,128,0.45)",
              boxShadow:`0 0 0 5px rgba(92,219,128,0.10), 0 10px 30px rgba(0,0,0,0.45)`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <span style={{ fontSize:28, fontWeight:800, color:"#fff" }}>{USER.initials}</span>
            </div>
            <div style={{
              position:"absolute", bottom:0, right:0, width:28, height:28, borderRadius:"50%",
              background:`linear-gradient(135deg,${GREEN_DARK},#3a9e52)`,
              border:"2px solid rgba(8,20,11,0.90)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:`0 4px 12px rgba(45,122,62,0.55)`,
              cursor:"pointer",
            }}>
              <Camera size={13} color="#fff" />
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 mb-6">
          <GlassInput label="Full Name"    value={name}  onChange={setName}  placeholder="Your full name" />
          <GlassInput label="Phone Number" value={phone} onChange={setPhone} placeholder="+27 xx xxx xxxx" />
          <GlassInput label="Email"        value={email} onChange={setEmail} placeholder="email@example.com" type="email" />
        </div>

        {/* Save */}
        <button
          onClick={() => { onSave({ name, phone, email }); onClose(); }}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-[18px]"
          style={{
            background:`linear-gradient(135deg,${GREEN_DARK},#3a9e52)`,
            border:"1px solid rgba(92,219,128,0.35)",
            boxShadow:`0 8px 30px rgba(45,122,62,0.55), inset 0 1px 0 rgba(255,255,255,0.22)`,
            fontSize:15, fontWeight:700, color:"#fff", cursor:"pointer",
          }}
        >
          <Save size={16} color="#fff" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ADD ADDRESS MODAL
═══════════════════════════════════════════════════════════════════ */
function AddAddressModal({ onClose }: { onClose: () => void }) {
  const [label, setLabel]   = useState("");
  const [address, setAddr]  = useState("");
  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(0,0,0,0.72)",
               backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
               display:"flex", alignItems:"flex-end" }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}
        style={{ width:"100%", ...G.lg, background:"rgba(8,20,11,0.90)",
          backdropFilter:"blur(60px) saturate(220%)", WebkitBackdropFilter:"blur(60px) saturate(220%)",
          borderRadius:"32px 32px 0 0", borderBottom:"none",
          padding:"0 24px 56px", fontFamily:"'Inter',sans-serif", position:"relative" }}
      >
        <div style={{ position:"absolute", top:0, left:"12%", right:"12%", height:1,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.70) 50%,transparent)" }} />
        <div style={{ width:36, height:4, borderRadius:2, background:W20, margin:"16px auto 28px" }} />
        <div className="flex items-center justify-between mb-6">
          <p style={{ fontSize:20, fontWeight:800, color:W95, letterSpacing:"-0.02em" }}>Add Address</p>
          <button onClick={onClose} style={{ ...G.sm, width:36, height:36, borderRadius:"50%",
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <X size={16} color={W65} />
          </button>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <GlassInput label="Label (e.g. Home)" value={label} onChange={setLabel} placeholder="Home, Work, Gym…" />
          <GlassInput label="Full Address"      value={address} onChange={setAddr} placeholder="Street, suburb, city" />
        </div>
        <button onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-[18px]"
          style={{ background:`linear-gradient(135deg,${GREEN_DARK},#3a9e52)`,
            border:"1px solid rgba(92,219,128,0.35)",
            boxShadow:`0 8px 30px rgba(45,122,62,0.55), inset 0 1px 0 rgba(255,255,255,0.22)`,
            fontSize:15, fontWeight:700, color:"#fff", cursor:"pointer" }}>
          <MapPin size={16} color="#fff" />
          Save Address
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN — PROFILE PAGE
═══════════════════════════════════════════════════════════════════ */
export function ProfilePage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [user, setUser] = useState(USER);
  const [showEdit,       setShowEdit]      = useState(false);
  const [showAddAddr,    setShowAddAddr]   = useState(false);
  const [addrExpanded,   setAddrExpanded]  = useState(false);
  const [payExpanded,    setPayExpanded]   = useState(false);
  const [notifPush,      setNotifPush]     = useState(true);
  const [notifReminder,  setNotifReminder] = useState(true);
  const [notifPromo,     setNotifPromo]    = useState(false);
  const [notifWhatsapp,  setNotifWhatsapp] = useState(true);
  const [darkMode,       setDarkMode]      = useState(true);
  const [biometrics,     setBiometrics]    = useState(true);
  const [twoFactor,      setTwoFactor]     = useState(false);
  const [hasPets,        setHasPets]       = useState(false);

  return (
    <div style={{ position:"relative", height:"100%", overflow:"hidden", fontFamily:"'Inter',sans-serif" }}>

      {/* ── BACKGROUND ───────────────────────────────────────────── */}
      <div style={{ position:"absolute", inset:0, zIndex:0,
        background:"linear-gradient(170deg,#060B07 0%,#091409 50%,#050D06 100%)", overflow:"hidden" }}>

        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.038, pointerEvents:"none" }}>
          <filter id="pg"><feTurbulence type="fractalNoise" baseFrequency="0.70" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/></filter>
          <rect width="100%" height="100%" filter="url(#pg)"/>
        </svg>

        {/* Orbs */}
        <Orb top={-60}  left={-60}  size={300} color="rgba(45,122,62,0.50)"   blur={70} anim="orbA 14s ease-in-out infinite" />
        <Orb top={100}  right={-50} size={220} color="rgba(16,80,36,0.40)"    blur={55} anim="orbB 11s ease-in-out infinite" />
        <Orb top="42%"  right="10%" size={160} color="rgba(92,219,128,0.20)"  blur={45} anim="orbA 8s  ease-in-out infinite reverse" />
        <Orb top="55%"  left={-30}  size={200} color="rgba(8,50,22,0.55)"     blur={50} anim="orbC 16s ease-in-out infinite" />
        <Orb bottom={60} right={40} size={130} color="rgba(45,122,62,0.25)"   blur={38} anim="orbB 10s ease-in-out infinite reverse" />

        <style>{`
          @keyframes orbA{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-18px) scale(1.07)}66%{transform:translate(-14px,16px) scale(0.94)}}
          @keyframes orbB{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-16px,20px) scale(1.05)}70%{transform:translate(12px,-8px) scale(0.97)}}
          @keyframes orbC{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(18px,24px) scale(1.08)}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        `}</style>
      </div>

      {/* ── SCROLLABLE CONTENT ───────────────────────────────────── */}
      <div style={{ position:"relative", zIndex:1, height:"100%", overflowY:"auto", scrollbarWidth:"none" }}>

        {/* ══════════════════════════════════════════════════════════
            HERO CARD
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding:"52px 16px 0", animation:"fadeUp 0.45s ease both" }}>
          <div style={{ ...G.lg, borderRadius:30, padding:"26px 22px 24px", position:"relative", overflow:"hidden" }}>
            {/* Shimmer */}
            <div style={{ position:"absolute", top:0, left:"8%", right:"8%", height:1,
              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.80) 50%,transparent)" }} />
            {/* Inner radial glow */}
            <div style={{ position:"absolute", top:-60, left:"50%", transform:"translateX(-50%)",
              width:200, height:200, borderRadius:"50%",
              background:"radial-gradient(circle,rgba(92,219,128,0.10) 0%,transparent 70%)",
              pointerEvents:"none" }} />

            {/* Avatar + Edit row */}
            <div className="flex flex-col items-center gap-1">
              {/* Avatar */}
              <div style={{ position:"relative", marginBottom:6 }}>
                <div style={{
                  width:86, height:86, borderRadius:"50%",
                  background:"linear-gradient(145deg,rgba(45,122,62,0.72),rgba(12,46,22,0.88))",
                  border:"2px solid rgba(92,219,128,0.50)",
                  boxShadow:`0 0 0 5px rgba(92,219,128,0.10), 0 12px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.28)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <span style={{ fontSize:28, fontWeight:800, color:"#fff", letterSpacing:"-0.02em", textShadow:"0 2px 10px rgba(0,0,0,0.50)" }}>
                    {user.initials}
                  </span>
                </div>
                {/* Camera overlay */}
                <button
                  onClick={() => setShowEdit(true)}
                  style={{
                    position:"absolute", bottom:0, right:0, width:30, height:30, borderRadius:"50%",
                    background:`linear-gradient(135deg,${GREEN_DARK},#3a9e52)`,
                    border:"2px solid rgba(5,14,7,0.95)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:`0 4px 14px rgba(45,122,62,0.60)`, cursor:"pointer",
                  }}>
                  <Camera size={13} color="#fff" />
                </button>
              </div>

              {/* Name */}
              <p style={{ fontSize:24, fontWeight:800, color:W95, letterSpacing:"-0.025em" }}>{user.name}</p>

              {/* Tier badge */}
              <span style={{
                display:"inline-flex", alignItems:"center", gap:5,
                padding:"4px 14px", borderRadius:20,
                background:"linear-gradient(90deg,rgba(252,211,77,0.18),rgba(251,191,36,0.12))",
                border:"1px solid rgba(252,211,77,0.35)",
                fontSize:12, fontWeight:700, color:AMBER,
                boxShadow:`0 0 16px rgba(252,211,77,0.18), inset 0 1px 0 rgba(255,255,255,0.12)`,
              }}>
                <Award size={12} color={AMBER} />
                {user.tier}
              </span>

              {/* Rating row */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={13}
                      fill={s <= Math.round(user.rating) ? AMBER : "none"}
                      color={s <= Math.round(user.rating) ? AMBER : W20}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <span style={{ fontSize:14, fontWeight:800, color:W95 }}>{user.rating}</span>
                <span style={{ fontSize:13, color:W38 }}>· {user.reviews} reviews</span>
              </div>

              {/* Member since + edit */}
              <div className="flex items-center gap-3 mt-2">
                <p style={{ fontSize:11, color:W38, fontWeight:500 }}>{user.member}</p>
                <button
                  onClick={() => setShowEdit(true)}
                  style={{
                    ...G.sm, display:"flex", alignItems:"center", gap:5,
                    padding:"5px 12px", borderRadius:20, cursor:"pointer",
                    fontSize:11, fontWeight:700, color:GREEN_BRIGHT,
                  }}>
                  <Edit3 size={11} color={GREEN_BRIGHT} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            STATS ROW
        ══════════════════════════════════════════════════════════ */}
        <div className="flex gap-3 px-4 mt-4" style={{ animation:"fadeUp 0.45s 0.07s ease both", opacity:0 }}>
          <ProfileStat icon={<BookOpen size={16} color={GREEN_BRIGHT} />} value="6"   label="BOOKINGS"  glow={glow(GREEN_BRIGHT)} />
          <ProfileStat icon={<Star     size={16} color={AMBER}        />} value="4.9" label="RATING"    glow={glow(AMBER)} />
          <ProfileStat icon={<Zap      size={16} color={PURPLE}       />} value="850" label="PTS"        glow={glow(PURPLE)} />
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTIONS
        ══════════════════════════════════════════════════════════ */}
        <div style={{ padding:"20px 16px 48px" }}>

          {/* ── ACCOUNT ── */}
          <SectionLabel label="ACCOUNT" delay="0.10s" />
          <SectionCard delay="0.12s">

            {/* Personal Info */}
            <ProfileRow
              icon={<Edit3 size={15} color={GREEN_BRIGHT} />}
              iconBg={glow(GREEN_BRIGHT, 0.20)}
              iconGlow={glow(GREEN_BRIGHT, 0.35)}
              label="Personal Info"
              value={user.email}
              hasChevron
              onPress={() => setShowEdit(true)}
            />
            <Divider />

            {/* Saved Addresses */}
            <ProfileRow
              icon={<MapPin size={15} color={BLUE} />}
              iconBg={glow(BLUE, 0.20)}
              iconGlow={glow(BLUE, 0.35)}
              label="Saved Addresses"
              value={`${SAVED_ADDRESSES.length} saved`}
              hasChevron
              expanded={addrExpanded}
              onPress={() => setAddrExpanded(!addrExpanded)}
            />
            {addrExpanded && (
              <div style={{ paddingLeft:20, paddingRight:16, paddingBottom:12 }}>
                {SAVED_ADDRESSES.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.id}>
                      <div className="flex items-center gap-3 py-2.5">
                        <div style={{ width:32, height:32, borderRadius:9, background:glow(BLUE,0.16),
                          border:"1px solid rgba(96,165,250,0.20)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <Icon size={13} color={BLUE} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ fontSize:13, fontWeight:700, color:W95 }}>{a.label}</p>
                          <p style={{ fontSize:11, color:W38, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.address}</p>
                        </div>
                        <ChevronRight size={13} color={W38} />
                      </div>
                      {i < SAVED_ADDRESSES.length - 1 && <Divider />}
                    </div>
                  );
                })}
                <button
                  onClick={() => setShowAddAddr(true)}
                  className="flex items-center gap-2 mt-2 px-3 py-2 rounded-[11px] w-full"
                  style={{ background:glow(GREEN_BRIGHT,0.10), border:`1px solid rgba(92,219,128,0.22)`,
                    fontSize:12, fontWeight:700, color:GREEN_BRIGHT, cursor:"pointer" }}>
                  <Plus size={12} color={GREEN_BRIGHT} />
                  Add New Address
                </button>
              </div>
            )}
            <Divider />

            {/* Payment Methods */}
            <ProfileRow
              icon={<CreditCard size={15} color={PURPLE} />}
              iconBg={glow(PURPLE, 0.20)}
              iconGlow={glow(PURPLE, 0.35)}
              label="Payment Methods"
              value="Visa ••4242"
              hasChevron
              expanded={payExpanded}
              onPress={() => setPayExpanded(!payExpanded)}
            />
            {payExpanded && (
              <div style={{ paddingLeft:20, paddingRight:16, paddingBottom:12 }}>
                {PAYMENT_METHODS.map((pm, i) => (
                  <div key={pm.id}>
                    <div className="flex items-center gap-3 py-2.5">
                      <div style={{ width:32, height:32, borderRadius:9, background:glow(PURPLE,0.16),
                        border:"1px solid rgba(192,132,252,0.20)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <CreditCard size={13} color={PURPLE} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize:13, fontWeight:700, color:W95 }}>{pm.type} •••• {pm.last4}</p>
                        <p style={{ fontSize:11, color:W38 }}>Expires {pm.expiry}</p>
                      </div>
                      {pm.primary && (
                        <span style={{ padding:"2px 8px", borderRadius:20,
                          background:glow(GREEN_BRIGHT,0.14), border:`1px solid rgba(92,219,128,0.28)`,
                          fontSize:10, fontWeight:700, color:GREEN_BRIGHT }}>Primary</span>
                      )}
                    </div>
                    {i < PAYMENT_METHODS.length - 1 && <Divider />}
                  </div>
                ))}
                <button
                  className="flex items-center gap-2 mt-2 px-3 py-2 rounded-[11px] w-full"
                  style={{ background:glow(PURPLE,0.10), border:`1px solid rgba(192,132,252,0.22)`,
                    fontSize:12, fontWeight:700, color:PURPLE, cursor:"pointer" }}>
                  <Plus size={12} color={PURPLE} />
                  Add Payment Method
                </button>
              </div>
            )}
            <Divider />

            {/* Promo & Rewards */}
            <ProfileRow
              icon={<Gift size={15} color={AMBER} />}
              iconBg={glow(AMBER, 0.20)}
              iconGlow={glow(AMBER, 0.35)}
              label="Promo & Rewards"
              badge={`${USER.points} pts`}
              badgeColor={AMBER}
              hasChevron
            />
            <Divider />

            {/* Referral */}
            <ProfileRow
              icon={<Share2 size={15} color={TEAL} />}
              iconBg={glow(TEAL, 0.20)}
              iconGlow={glow(TEAL, 0.35)}
              label="Refer a Friend"
              value={`Code: ${USER.referral}`}
              hasChevron
            />
          </SectionCard>

          {/* ── HOME PREFERENCES ── */}
          <SectionLabel label="HOME PREFERENCES" delay="0.16s" />
          <SectionCard delay="0.18s">
            <ProfileRow
              icon={<PawPrint size={15} color={GREEN_BRIGHT} />}
              iconBg={glow(GREEN_BRIGHT, 0.18)}
              iconGlow={glow(GREEN_BRIGHT, 0.32)}
              label="Pets at Home"
              toggle={{ value:hasPets, onChange:setHasPets }}
            />
            <Divider />
            <ProfileRow
              icon={<Key size={15} color={BLUE} />}
              iconBg={glow(BLUE, 0.18)}
              iconGlow={glow(BLUE, 0.32)}
              label="Gate / Access Code"
              value="••••"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<Clock size={15} color={PURPLE} />}
              iconBg={glow(PURPLE, 0.18)}
              iconGlow={glow(PURPLE, 0.32)}
              label="Preferred Service Times"
              value="Weekdays 9am – 5pm"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<FileText size={15} color={AMBER} />}
              iconBg={glow(AMBER, 0.18)}
              iconGlow={glow(AMBER, 0.32)}
              label="Special Instructions"
              value="Add notes for providers"
              hasChevron
            />
          </SectionCard>

          {/* ── NOTIFICATIONS ── */}
          <SectionLabel label="NOTIFICATIONS" delay="0.22s" />
          <SectionCard delay="0.24s">
            <ProfileRow
              icon={<Bell size={15} color={BLUE} />}
              iconBg={glow(BLUE, 0.18)}
              iconGlow={glow(BLUE, 0.32)}
              label="Push Notifications"
              toggle={{ value:notifPush, onChange:setNotifPush }}
            />
            <Divider />
            <ProfileRow
              icon={<Clock size={15} color={GREEN_BRIGHT} />}
              iconBg={glow(GREEN_BRIGHT, 0.18)}
              iconGlow={glow(GREEN_BRIGHT, 0.32)}
              label="Booking Reminders"
              toggle={{ value:notifReminder, onChange:setNotifReminder }}
            />
            <Divider />
            <ProfileRow
              icon={<Tag size={15} color={AMBER} />}
              iconBg={glow(AMBER, 0.18)}
              iconGlow={glow(AMBER, 0.32)}
              label="Promotions & Deals"
              toggle={{ value:notifPromo, onChange:setNotifPromo }}
            />
            <Divider />
            <ProfileRow
              icon={<MessageSquare size={15} color={GREEN_BRIGHT} />}
              iconBg="rgba(37,211,102,0.18)"
              iconGlow="rgba(37,211,102,0.35)"
              label="WhatsApp Updates"
              toggle={{ value:notifWhatsapp, onChange:setNotifWhatsapp }}
            />
          </SectionCard>

          {/* ── APPEARANCE ── */}
          <SectionLabel label="APPEARANCE" delay="0.28s" />
          <SectionCard delay="0.30s">
            <ProfileRow
              icon={<Moon size={15} color={PURPLE} />}
              iconBg={glow(PURPLE, 0.18)}
              iconGlow={glow(PURPLE, 0.32)}
              label="Dark Mode"
              toggle={{ value:darkMode, onChange:setDarkMode }}
            />
            <Divider />
            <ProfileRow
              icon={<Globe size={15} color={BLUE} />}
              iconBg={glow(BLUE, 0.18)}
              iconGlow={glow(BLUE, 0.32)}
              label="Language"
              value="English"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<Settings size={15} color={W65} />}
              iconBg="rgba(255,255,255,0.10)"
              iconGlow="rgba(255,255,255,0.18)"
              label="Accessibility"
              hasChevron
            />
          </SectionCard>

          {/* ── SAFETY & PRIVACY ── */}
          <SectionLabel label="SAFETY & PRIVACY" delay="0.34s" />
          <SectionCard delay="0.36s">
            <ProfileRow
              icon={<Check size={15} color={GREEN_BRIGHT} />}
              iconBg={glow(GREEN_BRIGHT, 0.20)}
              iconGlow={glow(GREEN_BRIGHT, 0.40)}
              label="ID Verification"
              badge="Verified"
              badgeColor={GREEN_BRIGHT}
            />
            <Divider />
            <ProfileRow
              icon={<Fingerprint size={15} color={BLUE} />}
              iconBg={glow(BLUE, 0.18)}
              iconGlow={glow(BLUE, 0.32)}
              label="Biometric Login"
              toggle={{ value:biometrics, onChange:setBiometrics }}
            />
            <Divider />
            <ProfileRow
              icon={<Lock size={15} color={AMBER} />}
              iconBg={glow(AMBER, 0.18)}
              iconGlow={glow(AMBER, 0.32)}
              label="Two-Factor Auth"
              toggle={{ value:twoFactor, onChange:setTwoFactor }}
            />
            <Divider />
            <ProfileRow
              icon={<Shield size={15} color={PURPLE} />}
              iconBg={glow(PURPLE, 0.18)}
              iconGlow={glow(PURPLE, 0.32)}
              label="Privacy Settings"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<Heart size={15} color={RED} />}
              iconBg="rgba(248,113,113,0.18)"
              iconGlow="rgba(248,113,113,0.32)"
              label="Emergency Contact"
              value="Not set"
              hasChevron
            />
          </SectionCard>

          {/* ── SUPPORT ── */}
          <SectionLabel label="SUPPORT" delay="0.40s" />
          <SectionCard delay="0.42s">
            <ProfileRow
              icon={<HelpCircle size={15} color={BLUE} />}
              iconBg={glow(BLUE, 0.18)}
              iconGlow={glow(BLUE, 0.32)}
              label="Help Centre"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<MessageCircle size={15} color={GREEN_BRIGHT} />}
              iconBg={glow(GREEN_BRIGHT, 0.18)}
              iconGlow={glow(GREEN_BRIGHT, 0.32)}
              label="Live Chat Support"
              badge="Online"
              badgeColor={GREEN_BRIGHT}
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<AlertTriangle size={15} color={AMBER} />}
              iconBg={glow(AMBER, 0.18)}
              iconGlow={glow(AMBER, 0.32)}
              label="Report a Problem"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<ThumbsUp size={15} color={PURPLE} />}
              iconBg={glow(PURPLE, 0.18)}
              iconGlow={glow(PURPLE, 0.32)}
              label="Rate ServeHub"
              value="★★★★★"
              hasChevron
            />
          </SectionCard>

          {/* ── LEGAL & ABOUT ── */}
          <SectionLabel label="ABOUT" delay="0.46s" />
          <SectionCard delay="0.48s">
            <ProfileRow
              icon={<FileText size={15} color={W65} />}
              iconBg="rgba(255,255,255,0.10)"
              iconGlow="rgba(255,255,255,0.16)"
              label="Terms of Service"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<Shield size={15} color={W65} />}
              iconBg="rgba(255,255,255,0.10)"
              iconGlow="rgba(255,255,255,0.16)"
              label="Privacy Policy"
              hasChevron
            />
            <Divider />
            <ProfileRow
              icon={<Info size={15} color={W65} />}
              iconBg="rgba(255,255,255,0.10)"
              iconGlow="rgba(255,255,255,0.16)"
              label="App Version"
              value="ServeHub 1.4.2"
            />
          </SectionCard>

          {/* ── SIGN OUT ── */}
          <div style={{ animation:"fadeUp 0.45s 0.52s ease both", opacity:0, marginTop:8 }}>
            <button
              className="w-full flex items-center justify-center gap-3 py-4 rounded-[22px]"
              style={{
                ...G.md,
                background:"rgba(248,113,113,0.10)",
                border:"1px solid rgba(248,113,113,0.25)",
                boxShadow:`0 8px 32px rgba(248,113,113,0.14), inset 0 1px 0 rgba(255,255,255,0.14)`,
                fontSize:15, fontWeight:700, color:RED, cursor:"pointer",
              }}
            >
              <LogOut size={17} color={RED} />
              Sign Out
            </button>
          </div>

        </div>
      </div>

      {/* Modals */}
      {showEdit    && <EditProfileModal user={user} onClose={() => setShowEdit(false)}
        onSave={(u) => setUser((prev) => ({ ...prev, ...u }))} />}
      {showAddAddr && <AddAddressModal onClose={() => setShowAddAddr(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════ */

/* Background orb helper */
function Orb({ top, bottom, left, right, size, color, blur, anim }: {
  top?: number|string; bottom?: number|string; left?: number|string; right?: number|string;
  size: number; color: string; blur: number; anim: string;
}) {
  return (
    <div style={{
      position:"absolute", top, bottom, left, right,
      width:size, height:size, borderRadius:"50%",
      background:`radial-gradient(circle,${color} 0%,transparent 70%)`,
      filter:`blur(${blur}px)`, animation:anim,
    }} />
  );
}

/* Stat card */
function ProfileStat({ icon, value, label, glow: glowVal }: {
  icon: React.ReactNode; value: string; label: string; glow: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 py-4 rounded-[22px]"
      style={{ ...G.md, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1,
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.55) 50%,transparent)" }} />
      <div style={{ width:38, height:38, borderRadius:"50%", background:glowVal,
        border:"1px solid rgba(255,255,255,0.12)",
        boxShadow:`0 0 18px ${glowVal}`,
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        {icon}
      </div>
      <p style={{ fontSize:19, fontWeight:800, color:W95, letterSpacing:"-0.03em", lineHeight:1 }}>{value}</p>
      <p style={{ fontSize:9, color:W38, fontWeight:700, letterSpacing:"0.07em" }}>{label}</p>
    </div>
  );
}

/* Section label */
function SectionLabel({ label, delay }: { label: string; delay: string }) {
  return (
    <p style={{
      fontSize:10, fontWeight:700, color:W38, letterSpacing:"0.10em",
      marginBottom:10, paddingLeft:4, marginTop:24,
      animation:`fadeUp 0.45s ${delay} ease both`, opacity:0,
    }}>
      {label}
    </p>
  );
}

/* Section card wrapper */
function SectionCard({ children, delay }: { children: React.ReactNode; delay: string }) {
  return (
    <div style={{ ...G.md, borderRadius:22, overflow:"hidden", position:"relative",
      animation:`fadeUp 0.45s ${delay} ease both`, opacity:0 }}>
      <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1,
        background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.42) 50%,transparent)" }} />
      {children}
    </div>
  );
}

/* Row divider */
function Divider() {
  return <div style={{ height:1, background:"rgba(255,255,255,0.055)", marginLeft:56 }} />;
}

/* iOS-style toggle */
function GlassToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width:48, height:28, borderRadius:14, cursor:"pointer", flexShrink:0,
        background: value
          ? `linear-gradient(135deg,${GREEN_DARK},#3a9e52)`
          : "rgba(255,255,255,0.10)",
        border: value
          ? "1px solid rgba(92,219,128,0.40)"
          : "1px solid rgba(255,255,255,0.13)",
        boxShadow: value
          ? `0 0 18px rgba(92,219,128,0.35), inset 0 1px 0 rgba(255,255,255,0.22)`
          : `inset 0 1px 0 rgba(255,255,255,0.10)`,
        position:"relative", transition:"all 0.25s ease",
      }}
    >
      <div style={{
        position:"absolute", top:3,
        left: value ? 21 : 3,
        width:20, height:20, borderRadius:"50%",
        background:"#fff",
        boxShadow:"0 2px 8px rgba(0,0,0,0.35)",
        transition:"left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
      }} />
    </div>
  );
}

/* Profile row */
function ProfileRow({
  icon, iconBg, iconGlow, label, value, hasChevron, toggle,
  badge, badgeColor, onPress, expanded,
}: {
  icon: React.ReactNode; iconBg: string; iconGlow: string;
  label: string; value?: string; hasChevron?: boolean;
  toggle?: { value: boolean; onChange: (v: boolean) => void };
  badge?: string; badgeColor?: string;
  onPress?: () => void; expanded?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5"
      style={{ cursor: onPress ? "pointer" : "default" }}
      onClick={onPress}
    >
      {/* Icon pill */}
      <div style={{
        width:36, height:36, borderRadius:11, flexShrink:0,
        background:iconBg, border:"1px solid rgba(255,255,255,0.09)",
        boxShadow:`0 0 14px ${iconGlow}`,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p style={{ fontSize:14, fontWeight:600, color:W95, lineHeight:1.3 }}>{label}</p>
        {value && <p style={{ fontSize:11, color:W38, marginTop:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{value}</p>}
      </div>

      {/* Right element */}
      {toggle && <GlassToggle {...toggle} />}
      {badge && (
        <span style={{
          padding:"3px 9px", borderRadius:20, fontSize:10, fontWeight:700,
          color:badgeColor ?? GREEN_BRIGHT,
          background:`rgba(${hexRgb(badgeColor ?? GREEN_BRIGHT)},0.14)`,
          border:`1px solid rgba(${hexRgb(badgeColor ?? GREEN_BRIGHT)},0.28)`,
          boxShadow:`0 0 10px rgba(${hexRgb(badgeColor ?? GREEN_BRIGHT)},0.20)`,
        }}>
          {badge}
        </span>
      )}
      {hasChevron && !toggle && !badge && (
        expanded !== undefined
          ? (expanded ? <ChevronUp size={15} color={W38} /> : <ChevronDown size={15} color={W38} />)
          : <ChevronRight size={15} color={W38} />
      )}
    </div>
  );
}

/* Glass input field */
function GlassInput({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string;
}) {
  return (
    <div>
      <p style={{ fontSize:11, fontWeight:700, color:W38, letterSpacing:"0.08em", marginBottom:6 }}>{label.toUpperCase()}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width:"100%", ...G.sm, borderRadius:14,
          padding:"13px 16px", fontSize:14, color:W95,
          fontFamily:"'Inter',sans-serif", outline:"none",
          boxSizing:"border-box",
        }}
      />
    </div>
  );
}