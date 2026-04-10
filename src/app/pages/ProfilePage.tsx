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
   iOS 26 LIQUID GLASS SYSTEM
───────────────────────────────────────────────────────────────── */
const G = {
  card: {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(32px) saturate(180%)",
    WebkitBackdropFilter: "blur(32px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.90)",
    boxShadow: [
      "inset 0 1px 0 rgba(255,255,255,1)",
      "inset 0 -0.5px 0 rgba(0,0,0,0.05)",
      "0 4px 24px rgba(0,0,0,0.07)",
      "0 1px 4px rgba(0,0,0,0.04)",
    ].join(", "),
  } as React.CSSProperties,

  elevated: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(40px) saturate(200%)",
    WebkitBackdropFilter: "blur(40px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.95)",
    boxShadow: [
      "inset 0 1.5px 0 rgba(255,255,255,1)",
      "inset 0 -0.5px 0 rgba(0,0,0,0.04)",
      "0 8px 32px rgba(0,0,0,0.08)",
      "0 2px 8px rgba(0,0,0,0.05)",
    ].join(", "),
  } as React.CSSProperties,

  chip: {
    background: "rgba(255,255,255,0.60)",
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.80)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.90), 0 2px 6px rgba(0,0,0,0.04)",
  } as React.CSSProperties,

  modal: {
    background: "rgba(248,248,252,0.96)",
    backdropFilter: "blur(60px) saturate(220%)",
    WebkitBackdropFilter: "blur(60px) saturate(220%)",
    border: "1px solid rgba(255,255,255,0.95)",
    boxShadow: "0 -20px 60px rgba(0,0,0,0.12)",
  } as React.CSSProperties,
};

/* ─── iOS 26 Palette ──────────────────────────────────────────── */
const BG        = "#F2F2F7";
const BLUE      = "#007AFF";
const GREEN     = "#34C759";
const ORANGE    = "#FF9F0A";
const PURPLE    = "#AF52DE";
const RED       = "#FF3B30";
const TEAL      = "#32ADE6";
const PINK      = "#FF2D55";
const INDIGO    = "#5856D6";
const LABEL     = "#1C1C1E";
const LABEL2    = "#48484A";
const LABEL3    = "#8E8E93";
const SEP       = "rgba(60,60,67,0.12)";

/* ─── Mock user ─────────────────────────────────────────────── */
const USER = {
  name: "Thabo Nkosi",
  initials: "TN",
  phone: "+27 82 456 7890",
  email: "thabo.nkosi@gmail.com",
  tier: "Gold Member",
  rating: 4.9,
  reviews: 23,
  member: "Member since January 2025",
  referral: "THABO20",
  points: 850,
};

const SAVED_ADDRESSES = [
  { id: 1, label: "Home", icon: Home, address: "14 Rivonia Road, Sandton, 2196" },
  { id: 2, label: "Work", icon: Briefcase, address: "88 Sandton Drive, Sandton, 2196" },
];

const PAYMENT_METHODS = [
  { id: 1, type: "Visa", last4: "4242", expiry: "09/27", primary: true },
  { id: 2, type: "Mastercard", last4: "1891", expiry: "03/26", primary: false },
];

/* ═══════════════════════════════════════════════════════════════
   EDIT PROFILE MODAL
═══════════════════════════════════════════════════════════════ */
function EditProfileModal({
  user, onClose, onSave,
}: {
  user: typeof USER;
  onClose: () => void;
  onSave: (u: Partial<typeof USER>) => void;
}) {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.20)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", ...G.modal,
          borderRadius: "22px 22px 0 0",
          borderBottom: "none",
          padding: "0 20px 52px",
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ width: 36, height: 5, borderRadius: 3, background: "rgba(60,60,67,0.18)", margin: "12px auto 24px" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p style={{ fontSize: 20, fontWeight: 700, color: LABEL, letterSpacing: "-0.02em" }}>Edit Profile</p>
            <p style={{ fontSize: 13, color: LABEL3, marginTop: 2 }}>Update your personal information</p>
          </div>
          <button onClick={onClose}
            style={{ ...G.chip, width: 32, height: 32, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={15} color={LABEL3} />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-7">
          <div style={{ position: "relative" }}>
            <div style={{
              width: 76, height: 76, borderRadius: "50%",
              background: "linear-gradient(145deg, #007AFF, #5AC8FA)",
              boxShadow: "0 6px 20px rgba(0,122,255,0.30)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>{USER.initials}</span>
            </div>
            <div style={{
              position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%",
              background: BLUE, border: "2px solid rgba(248,248,252,0.96)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,122,255,0.40)", cursor: "pointer",
            }}>
              <Camera size={12} color="#fff" />
            </div>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3 mb-6">
          <LightInput label="Full Name" value={name} onChange={setName} placeholder="Your full name" />
          <LightInput label="Phone Number" value={phone} onChange={setPhone} placeholder="+27 xx xxx xxxx" />
          <LightInput label="Email" value={email} onChange={setEmail} placeholder="email@example.com" type="email" />
        </div>

        <button
          onClick={() => { onSave({ name, phone, email }); onClose(); }}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[16px]"
          style={{
            background: BLUE, border: "none",
            boxShadow: "0 4px 20px rgba(0,122,255,0.35)",
            fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer",
          }}
        >
          <Save size={15} color="#fff" />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADD ADDRESS MODAL
═══════════════════════════════════════════════════════════════ */
function AddAddressModal({ onClose }: { onClose: () => void }) {
  const [label, setLabel] = useState("");
  const [address, setAddr] = useState("");
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.20)", backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)", display: "flex", alignItems: "flex-end",
      }}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", ...G.modal,
          borderRadius: "22px 22px 0 0", borderBottom: "none",
          padding: "0 20px 52px",
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        }}>
        <div style={{ width: 36, height: 5, borderRadius: 3, background: "rgba(60,60,67,0.18)", margin: "12px auto 24px" }} />
        <div className="flex items-center justify-between mb-6">
          <p style={{ fontSize: 20, fontWeight: 700, color: LABEL }}>Add Address</p>
          <button onClick={onClose} style={{ ...G.chip, width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={15} color={LABEL3} />
          </button>
        </div>
        <div className="flex flex-col gap-3 mb-6">
          <LightInput label="Label" value={label} onChange={setLabel} placeholder="Home, Work, Gym…" />
          <LightInput label="Full Address" value={address} onChange={setAddr} placeholder="Street, suburb, city" />
        </div>
        <button onClick={onClose}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-[16px]"
          style={{ background: BLUE, border: "none",
            boxShadow: "0 4px 20px rgba(0,122,255,0.35)",
            fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
          <MapPin size={15} color="#fff" />
          Save Address
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROFILE PAGE
═══════════════════════════════════════════════════════════════ */
export function ProfilePage({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [user, setUser] = useState(USER);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [addrExpanded, setAddrExpanded] = useState(false);
  const [payExpanded, setPayExpanded] = useState(false);
  const [notifPush, setNotifPush] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [biometrics, setBiometrics] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [hasPets, setHasPets] = useState(false);

  return (
    <div style={{
      position: "relative", height: "100%", overflow: "hidden",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      background: BG,
    }}>
      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 1, height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>

        {/* ══════════════════════════════════════════════
            HERO CARD — Lifted, translucent
        ══════════════════════════════════════════════ */}
        <div style={{ padding: "56px 16px 0" }}>
          <div style={{
            ...G.elevated,
            borderRadius: 28,
            padding: "28px 20px 24px",
            position: "relative", overflow: "hidden",
          }}>
            {/* Subtle iridescent mesh */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 28,
              background: "linear-gradient(135deg, rgba(0,122,255,0.04) 0%, rgba(175,82,222,0.03) 50%, rgba(52,199,89,0.03) 100%)",
            }} />
            {/* Specular top edge */}
            <div style={{
              position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 50%, transparent)",
              pointerEvents: "none",
            }} />

            {/* Avatar */}
            <div className="flex flex-col items-center gap-2">
              <div style={{ position: "relative", marginBottom: 4 }}>
                <div style={{
                  width: 84, height: 84, borderRadius: "50%",
                  background: "linear-gradient(145deg, #007AFF 0%, #5AC8FA 60%, #34C759 100%)",
                  boxShadow: "0 8px 24px rgba(0,122,255,0.30), 0 2px 8px rgba(0,122,255,0.15), inset 0 1.5px 0 rgba(255,255,255,0.40)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                    {user.initials}
                  </span>
                </div>
                <button onClick={() => setShowEdit(true)} style={{
                  position: "absolute", bottom: 1, right: 1, width: 28, height: 28, borderRadius: "50%",
                  background: BLUE, border: "2.5px solid rgba(248,248,252,0.96)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 10px rgba(0,122,255,0.40)", cursor: "pointer",
                }}>
                  <Camera size={12} color="#fff" />
                </button>
              </div>

              <p style={{ fontSize: 22, fontWeight: 700, color: LABEL, letterSpacing: "-0.025em" }}>
                {user.name}
              </p>

              {/* Gold tier badge */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 14px", borderRadius: 20,
                background: "linear-gradient(135deg, rgba(255,159,10,0.12), rgba(255,204,0,0.10))",
                border: "1px solid rgba(255,159,10,0.25)",
                fontSize: 12, fontWeight: 600, color: ORANGE,
                boxShadow: "0 2px 8px rgba(255,159,10,0.14)",
              }}>
                <Award size={12} color={ORANGE} />
                {user.tier}
              </span>

              {/* Stars */}
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12}
                      fill={s <= Math.round(user.rating) ? ORANGE : "none"}
                      color={s <= Math.round(user.rating) ? ORANGE : SEP}
                      strokeWidth={1.5} />
                  ))}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: LABEL }}>{user.rating}</span>
                <span style={{ fontSize: 12, color: LABEL3 }}>· {user.reviews} reviews</span>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <p style={{ fontSize: 11, color: LABEL3, fontWeight: 400 }}>{user.member}</p>
                <button onClick={() => setShowEdit(true)}
                  style={{
                    ...G.chip, display: "flex", alignItems: "center", gap: 5,
                    padding: "5px 12px", borderRadius: 20, cursor: "pointer",
                    fontSize: 11, fontWeight: 600, color: BLUE,
                  }}>
                  <Edit3 size={11} color={BLUE} />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ─────────────────────────────────── */}
        <div className="flex gap-3 px-4 mt-3">
          <ProfileStat icon={<BookOpen size={15} color={BLUE} />}    value="6"   label="BOOKINGS" tint={BLUE} />
          <ProfileStat icon={<Star size={15}     color={ORANGE} />}  value="4.9" label="RATING"   tint={ORANGE} />
          <ProfileStat icon={<Zap size={15}      color={PURPLE} />}  value="850" label="PTS"      tint={PURPLE} />
        </div>

        {/* ── SECTIONS ─────────────────────────────────── */}
        <div style={{ padding: "20px 16px 48px" }}>

          {/* ACCOUNT */}
          <SectionLabel label="Account" />
          <SectionGroup>
            <ProfileRow icon={<Edit3 size={14} color={BLUE} />} iconTint={BLUE}
              label="Personal Info" value={user.email} hasChevron onPress={() => setShowEdit(true)} />
            <Sep />
            <ProfileRow icon={<MapPin size={14} color={TEAL} />} iconTint={TEAL}
              label="Saved Addresses" value={`${SAVED_ADDRESSES.length} saved`}
              hasChevron expanded={addrExpanded} onPress={() => setAddrExpanded(!addrExpanded)} />
            {addrExpanded && (
              <div style={{ paddingLeft: 56, paddingRight: 16, paddingBottom: 12 }}>
                {SAVED_ADDRESSES.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.id}>
                      <div className="flex items-center gap-3 py-2.5">
                        <div style={{
                          width: 30, height: 30, borderRadius: 8, background: `${TEAL}14`,
                          border: `1px solid ${TEAL}20`, display: "flex", alignItems: "center",
                          justifyContent: "center", flexShrink: 0,
                        }}>
                          <Icon size={12} color={TEAL} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p style={{ fontSize: 13, fontWeight: 600, color: LABEL }}>{a.label}</p>
                          <p style={{ fontSize: 11, color: LABEL3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {a.address}
                          </p>
                        </div>
                        <ChevronRight size={13} color={LABEL3} />
                      </div>
                      {i < SAVED_ADDRESSES.length - 1 && <Sep />}
                    </div>
                  );
                })}
                <button onClick={() => setShowAddAddr(true)}
                  className="flex items-center gap-2 mt-2 px-3 py-2 rounded-[10px] w-full"
                  style={{ background: `${BLUE}10`, border: `1px solid ${BLUE}18`,
                    fontSize: 12, fontWeight: 600, color: BLUE, cursor: "pointer" }}>
                  <Plus size={12} color={BLUE} /> Add New Address
                </button>
              </div>
            )}
            <Sep />
            <ProfileRow icon={<CreditCard size={14} color={PURPLE} />} iconTint={PURPLE}
              label="Payment Methods" value="Visa ••4242"
              hasChevron expanded={payExpanded} onPress={() => setPayExpanded(!payExpanded)} />
            {payExpanded && (
              <div style={{ paddingLeft: 56, paddingRight: 16, paddingBottom: 12 }}>
                {PAYMENT_METHODS.map((pm, i) => (
                  <div key={pm.id}>
                    <div className="flex items-center gap-3 py-2.5">
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${PURPLE}14`,
                        border: `1px solid ${PURPLE}20`, display: "flex", alignItems: "center",
                        justifyContent: "center", flexShrink: 0 }}>
                        <CreditCard size={12} color={PURPLE} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 13, fontWeight: 600, color: LABEL }}>
                          {pm.type} •••• {pm.last4}
                        </p>
                        <p style={{ fontSize: 11, color: LABEL3 }}>Expires {pm.expiry}</p>
                      </div>
                      {pm.primary && (
                        <span style={{ padding: "2px 8px", borderRadius: 20, background: `${GREEN}12`,
                          border: `1px solid ${GREEN}22`, fontSize: 10, fontWeight: 600, color: GREEN }}>
                          Primary
                        </span>
                      )}
                    </div>
                    {i < PAYMENT_METHODS.length - 1 && <Sep />}
                  </div>
                ))}
                <button className="flex items-center gap-2 mt-2 px-3 py-2 rounded-[10px] w-full"
                  style={{ background: `${PURPLE}10`, border: `1px solid ${PURPLE}18`,
                    fontSize: 12, fontWeight: 600, color: PURPLE, cursor: "pointer" }}>
                  <Plus size={12} color={PURPLE} /> Add Payment Method
                </button>
              </div>
            )}
            <Sep />
            <ProfileRow icon={<Gift size={14} color={ORANGE} />} iconTint={ORANGE}
              label="Promo & Rewards" badge={`${USER.points} pts`} badgeColor={ORANGE} hasChevron />
            <Sep />
            <ProfileRow icon={<Share2 size={14} color={TEAL} />} iconTint={TEAL}
              label="Refer a Friend" value={`Code: ${USER.referral}`} hasChevron />
          </SectionGroup>

          {/* HOME PREFERENCES */}
          <SectionLabel label="Home Preferences" />
          <SectionGroup>
            <ProfileRow icon={<PawPrint size={14} color={GREEN} />} iconTint={GREEN}
              label="Pets at Home" toggle={{ value: hasPets, onChange: setHasPets }} />
            <Sep />
            <ProfileRow icon={<Key size={14} color={BLUE} />} iconTint={BLUE}
              label="Gate / Access Code" value="••••" hasChevron />
            <Sep />
            <ProfileRow icon={<Clock size={14} color={INDIGO} />} iconTint={INDIGO}
              label="Preferred Service Times" value="Weekdays 9am – 5pm" hasChevron />
            <Sep />
            <ProfileRow icon={<FileText size={14} color={ORANGE} />} iconTint={ORANGE}
              label="Special Instructions" value="Add notes for providers" hasChevron />
          </SectionGroup>

          {/* NOTIFICATIONS */}
          <SectionLabel label="Notifications" />
          <SectionGroup>
            <ProfileRow icon={<Bell size={14} color={BLUE} />} iconTint={BLUE}
              label="Push Notifications" toggle={{ value: notifPush, onChange: setNotifPush }} />
            <Sep />
            <ProfileRow icon={<Clock size={14} color={GREEN} />} iconTint={GREEN}
              label="Booking Reminders" toggle={{ value: notifReminder, onChange: setNotifReminder }} />
            <Sep />
            <ProfileRow icon={<Tag size={14} color={ORANGE} />} iconTint={ORANGE}
              label="Promotions & Deals" toggle={{ value: notifPromo, onChange: setNotifPromo }} />
            <Sep />
            <ProfileRow icon={<MessageSquare size={14} color="#25D366" />} iconTint="#25D366"
              label="WhatsApp Updates" toggle={{ value: notifWhatsapp, onChange: setNotifWhatsapp }} />
          </SectionGroup>

          {/* APPEARANCE */}
          <SectionLabel label="Appearance" />
          <SectionGroup>
            <ProfileRow icon={<Moon size={14} color={INDIGO} />} iconTint={INDIGO}
              label="Dark Mode" toggle={{ value: darkMode, onChange: setDarkMode }} />
            <Sep />
            <ProfileRow icon={<Globe size={14} color={BLUE} />} iconTint={BLUE}
              label="Language" value="English" hasChevron />
            <Sep />
            <ProfileRow icon={<Settings size={14} color={LABEL3} />} iconTint={LABEL3}
              label="Accessibility" hasChevron />
          </SectionGroup>

          {/* SAFETY & PRIVACY */}
          <SectionLabel label="Safety & Privacy" />
          <SectionGroup>
            <ProfileRow icon={<Check size={14} color={GREEN} />} iconTint={GREEN}
              label="ID Verification" badge="Verified" badgeColor={GREEN} />
            <Sep />
            <ProfileRow icon={<Fingerprint size={14} color={BLUE} />} iconTint={BLUE}
              label="Biometric Login" toggle={{ value: biometrics, onChange: setBiometrics }} />
            <Sep />
            <ProfileRow icon={<Lock size={14} color={ORANGE} />} iconTint={ORANGE}
              label="Two-Factor Auth" toggle={{ value: twoFactor, onChange: setTwoFactor }} />
            <Sep />
            <ProfileRow icon={<Shield size={14} color={PURPLE} />} iconTint={PURPLE}
              label="Privacy Settings" hasChevron />
            <Sep />
            <ProfileRow icon={<Heart size={14} color={PINK} />} iconTint={PINK}
              label="Emergency Contact" value="Not set" hasChevron />
          </SectionGroup>

          {/* SUPPORT */}
          <SectionLabel label="Support" />
          <SectionGroup>
            <ProfileRow icon={<HelpCircle size={14} color={BLUE} />} iconTint={BLUE}
              label="Help Centre" hasChevron />
            <Sep />
            <ProfileRow icon={<MessageCircle size={14} color={GREEN} />} iconTint={GREEN}
              label="Live Chat Support" badge="Online" badgeColor={GREEN} hasChevron />
            <Sep />
            <ProfileRow icon={<AlertTriangle size={14} color={ORANGE} />} iconTint={ORANGE}
              label="Report a Problem" hasChevron />
            <Sep />
            <ProfileRow icon={<ThumbsUp size={14} color={PURPLE} />} iconTint={PURPLE}
              label="Rate ServeHub" value="★★★★★" hasChevron />
          </SectionGroup>

          {/* ABOUT */}
          <SectionLabel label="About" />
          <SectionGroup>
            <ProfileRow icon={<FileText size={14} color={LABEL3} />} iconTint={LABEL3}
              label="Terms of Service" hasChevron />
            <Sep />
            <ProfileRow icon={<Shield size={14} color={LABEL3} />} iconTint={LABEL3}
              label="Privacy Policy" hasChevron />
            <Sep />
            <ProfileRow icon={<Info size={14} color={LABEL3} />} iconTint={LABEL3}
              label="App Version" value="ServeHub 1.4.2" />
          </SectionGroup>

          {/* Sign Out */}
          <div style={{ marginTop: 8 }}>
            <button
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-[18px]"
              style={{
                ...G.card,
                background: "rgba(255,59,48,0.08)",
                border: "1px solid rgba(255,59,48,0.18)",
                boxShadow: "0 2px 12px rgba(255,59,48,0.08)",
                fontSize: 15, fontWeight: 600, color: RED, cursor: "pointer",
              }}
            >
              <LogOut size={16} color={RED} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProfileModal user={user} onClose={() => setShowEdit(false)}
          onSave={(u) => setUser((prev) => ({ ...prev, ...u }))} />
      )}
      {showAddAddr && <AddAddressModal onClose={() => setShowAddAddr(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function ProfileStat({ icon, value, label, tint }: {
  icon: React.ReactNode; value: string; label: string; tint: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-[20px]"
      style={{ ...G.card, position: "relative", overflow: "hidden" }}>
      {/* Specular */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 0.5,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 50%, transparent)",
      }} />
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `${tint}14`, border: `1px solid ${tint}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <p style={{ fontSize: 18, fontWeight: 700, color: LABEL, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: 9, color: LABEL3, fontWeight: 600, letterSpacing: "0.06em" }}>
        {label}
      </p>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p style={{ fontSize: 13, fontWeight: 600, color: LABEL2, marginBottom: 8, paddingLeft: 4, marginTop: 24 }}>
      {label}
    </p>
  );
}

function SectionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ...G.card, borderRadius: 18, overflow: "hidden", position: "relative" }}>
      {/* Specular top edge */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 0.5,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,1) 50%, transparent)",
        pointerEvents: "none",
      }} />
      {children}
    </div>
  );
}

function Sep() {
  return (
    <div style={{ height: 0.5, background: SEP, marginLeft: 56 }} />
  );
}

/* iOS-style toggle */
function LightToggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 50, height: 30, borderRadius: 15, cursor: "pointer", flexShrink: 0,
        background: value ? GREEN : "rgba(120,120,128,0.20)",
        boxShadow: value ? "0 2px 8px rgba(52,199,89,0.30)" : "none",
        position: "relative", transition: "background 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      <div style={{
        position: "absolute", top: 2,
        left: value ? 22 : 2,
        width: 26, height: 26, borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.20), 0 0.5px 2px rgba(0,0,0,0.12)",
        transition: "left 0.22s cubic-bezier(0.34,1.56,0.64,1)",
      }} />
    </div>
  );
}

/* Profile row */
function ProfileRow({
  icon, iconTint, label, value, hasChevron, toggle,
  badge, badgeColor, onPress, expanded,
}: {
  icon: React.ReactNode; iconTint: string;
  label: string; value?: string; hasChevron?: boolean;
  toggle?: { value: boolean; onChange: (v: boolean) => void };
  badge?: string; badgeColor?: string;
  onPress?: () => void; expanded?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ cursor: onPress || toggle ? "pointer" : "default" }}
      onClick={onPress}
    >
      {/* Icon container */}
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: `${iconTint}14`,
        border: `1px solid ${iconTint}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 15, fontWeight: 400, color: LABEL, lineHeight: 1.3 }}>{label}</p>
        {value && (
          <p style={{ fontSize: 12, color: LABEL3, marginTop: 1, overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {value}
          </p>
        )}
      </div>

      {/* Right element */}
      {toggle && <LightToggle {...toggle} />}
      {badge && (
        <span style={{
          padding: "3px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600,
          color: badgeColor ?? GREEN,
          background: `${badgeColor ?? GREEN}14`,
          border: `1px solid ${badgeColor ?? GREEN}22`,
        }}>
          {badge}
        </span>
      )}
      {hasChevron && !toggle && !badge && (
        <ChevronRight size={15} color="rgba(60,60,67,0.30)" />
      )}
      {hasChevron && expanded !== undefined && !toggle && !badge && (
        expanded
          ? <ChevronDown size={15} color="rgba(60,60,67,0.30)" />
          : <ChevronRight size={15} color="rgba(60,60,67,0.30)" />
      )}
    </div>
  );
}

/* Light mode input */
function LightInput({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder: string; type?: string;
}) {
  return (
    <div>
      <p style={{ fontSize: 12, fontWeight: 500, color: LABEL3, marginBottom: 6 }}>{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "rgba(118,118,128,0.08)",
          border: "1px solid rgba(60,60,67,0.12)",
          borderRadius: 12, padding: "12px 14px",
          fontSize: 15, color: LABEL,
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          outline: "none", boxSizing: "border-box" as const,
        }}
      />
    </div>
  );
}
