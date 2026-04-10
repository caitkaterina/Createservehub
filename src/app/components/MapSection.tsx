import React, { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { Star, Navigation, X, ChevronRight } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */
export interface MapBusiness {
  id: number;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  price: string;
  img: string;
  bgImg: string;
  coords: [number, number];
}

/* ─── Business coordinates — Johannesburg, South Africa ─────────── */
export const BUSINESS_COORDS: Record<number, [number, number]> = {
  1: [-26.1076, 28.0567], // Deep Clean Pro   — Fourways
  2: [-26.2041, 28.0473], // AquaFix Plumbing  — Johannesburg CBD
  3: [-26.1075, 28.0568], // BrightSpark Elec. — Sandton
  4: [-26.2264, 28.0026], // CoolAir HVAC      — Soweto
  5: [-26.1489, 28.2351], // GreenThumb Garden — Boksburg
  6: [-26.1837, 28.0614], // GlowUp Beauty     — Rosebank
};

/* ─── Palette ───────────────────────────────────────────────────── */
const GREEN  = "#2D7A3E";
const TEXT   = "#111111";
const TEXT2  = "#767676";
const BORDER = "#EBEBEB";

/* ─── CartoDB Positron tile provider (light, clean) ─────────────── */
function cartoDB(x: number, y: number, z: number) {
  const s = ["a", "b", "c", "d"][Math.abs(x + y) % 4];
  return `https://${s}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}@2x.png`;
}

/* ─── Custom business pin rendered as a React element ───────────── */
function BusinessPin({
  biz,
  selected,
  onClick,
}: {
  biz: MapBusiness;
  selected: boolean;
  onClick: () => void;
}) {
  const initial = biz.name.charAt(0).toUpperCase();
  const size    = selected ? 44 : 36;

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        position:        "relative",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        cursor:          "pointer",
        /* centre the pin on the coordinate */
        transform:       `translate(-50%, -100%)`,
        filter:          selected
          ? `drop-shadow(0 6px 14px rgba(45,122,62,0.55))`
          : `drop-shadow(0 3px 8px rgba(0,0,0,0.25))`,
        transition:      "filter 0.2s ease, transform 0.2s ease",
        zIndex:          selected ? 1000 : 1,
      }}
    >
      {/* Circle */}
      <div
        style={{
          width:           size,
          height:          size,
          borderRadius:    "50%",
          background:      selected ? GREEN : "#fff",
          border:          `${selected ? 3 : 2.5}px solid ${selected ? "#fff" : GREEN}`,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          transition:      "all 0.2s ease",
          boxShadow:       selected
            ? `0 0 0 4px rgba(45,122,62,0.20)`
            : "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <span
          style={{
            fontFamily:    "'Inter', sans-serif",
            fontSize:      selected ? 14 : 12,
            fontWeight:    800,
            color:         selected ? "#fff" : GREEN,
            letterSpacing: "-0.01em",
            transition:    "all 0.2s ease",
          }}
        >
          {initial}
        </span>
      </div>

      {/* Stem */}
      <div
        style={{
          width:        2,
          height:       selected ? 9 : 7,
          background:   GREEN,
          borderRadius: "0 0 2px 2px",
          opacity:      0.75,
          transition:   "height 0.2s ease",
        }}
      />
    </div>
  );
}

/* ─── Pulsing user-location dot ─────────────────────────────────── */
function UserDot() {
  return (
    <div
      style={{
        position:       "relative",
        width:          20,
        height:         20,
        transform:      "translate(-50%, -50%)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position:     "absolute",
          width:        20,
          height:       20,
          borderRadius: "50%",
          background:   "rgba(59,130,246,0.22)",
          animation:    "userPulse 2s ease-in-out infinite",
        }}
      />
      <div
        style={{
          width:        12,
          height:       12,
          borderRadius: "50%",
          background:   "#3B82F6",
          border:       "2.5px solid #fff",
          boxShadow:    "0 2px 8px rgba(59,130,246,0.55)",
          zIndex:       1,
        }}
      />
      <style>{`
        @keyframes userPulse {
          0%,100% { transform: scale(1);   opacity: 0.8; }
          50%      { transform: scale(1.7); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}

/* ─── MapSection ────────────────────────────────────────────────── */
export function MapSection({
  businesses,
  onViewProfile,
}: {
  businesses: MapBusiness[];
  onViewProfile: (id: number) => void;
}) {
  const DEFAULT_CENTER: [number, number] = [-26.1929, 28.0305]; // Johannesburg fallback

  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [locStatus,  setLocStatus]  = useState<"idle" | "loading" | "ok" | "denied">("idle");
  const [selected,   setSelected]   = useState<MapBusiness | null>(null);
  const [center,     setCenter]     = useState<[number, number]>(DEFAULT_CENTER);
  const [zoom,       setZoom]       = useState(13);

  /* Auto-request location on mount */
  useEffect(() => {
    requestLocation();
  }, []);

  function requestLocation() {
    if (!navigator.geolocation) { setLocStatus("denied"); return; }
    setLocStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserCoords(coords);
        setCenter(coords);
        setLocStatus("ok");
      },
      () => setLocStatus("denied"),
      { timeout: 8000, enableHighAccuracy: false }
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Section header ── */}
      <div className="flex items-center justify-between px-4 mb-3">
        <div>
          <p style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: "-0.01em" }}>
            Near You
          </p>
          <p style={{ fontSize: 12, color: TEXT2, marginTop: 1 }}>
            {locStatus === "ok"
              ? "Businesses close to your location"
              : locStatus === "loading"
              ? "Detecting your location…"
              : "Businesses in your area"}
          </p>
        </div>

        {/* Location status pill */}
        {(locStatus === "idle" || locStatus === "denied") && (
          <button
            onClick={requestLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: GREEN, fontSize: 11, fontWeight: 700, color: "#fff", border: "none", cursor: "pointer" }}
          >
            <Navigation size={11} color="#fff" />
            Locate me
          </button>
        )}
        {locStatus === "loading" && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "#F0FFF4", border: `1px solid ${GREEN}30` }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN, animation: "userPulse 1.2s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: GREEN }}>Locating…</span>
          </div>
        )}
        {locStatus === "ok" && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "#F0FFF4", border: `1px solid ${GREEN}30` }}
          >
            <Navigation size={11} color={GREEN} />
            <span style={{ fontSize: 11, fontWeight: 600, color: GREEN }}>Located</span>
          </div>
        )}
      </div>

      {/* ── Map ── */}
      <div
        className="mx-4"
        style={{
          height:       270,
          borderRadius: 22,
          overflow:     "hidden",
          border:       `1px solid ${BORDER}`,
          boxShadow:    "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Map
          provider={cartoDB}
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center: c, zoom: z }) => {
            setCenter(c);
            setZoom(z);
          }}
          attribution={
            <span style={{ fontSize: 8, color: "#888" }}>
              © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" style={{ color: "#888" }}>OpenStreetMap</a>
              {" "}© <a href="https://carto.com/" target="_blank" rel="noreferrer" style={{ color: "#888" }}>CARTO</a>
            </span>
          }
        >
          {/* User location dot */}
          {userCoords && (
            <Marker anchor={userCoords} payload={null} onClick={() => {}}>
              <UserDot />
            </Marker>
          )}

          {/* Business pins */}
          {businesses.map((biz) => (
            <Marker
              key={biz.id}
              anchor={biz.coords}
              payload={biz.id}
              onClick={() => setSelected((prev) => (prev?.id === biz.id ? null : biz))}
            >
              <BusinessPin
                biz={biz}
                selected={selected?.id === biz.id}
                onClick={() => setSelected((prev) => (prev?.id === biz.id ? null : biz))}
              />
            </Marker>
          ))}
        </Map>
      </div>

      {/* ── Selected business card (slides in below map) ── */}
      <div
        style={{
          overflow:   "hidden",
          maxHeight:  selected ? 120 : 0,
          opacity:    selected ? 1   : 0,
          transition: "max-height 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
          marginTop:  selected ? 12  : 0,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        {selected && (
          <div
            className="flex items-center gap-3 p-3 rounded-[18px]"
            style={{
              background: "#fff",
              border:     `1px solid ${BORDER}`,
              boxShadow:  "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                width:        72,
                height:       72,
                borderRadius: 14,
                overflow:     "hidden",
                flexShrink:   0,
              }}
            >
              <img
                src={selected.bgImg}
                alt={selected.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <span
                className="inline-block mb-1 px-2 py-0.5 rounded-full"
                style={{
                  background: "#F0FFF4",
                  fontSize:   9,
                  fontWeight: 700,
                  color:      GREEN,
                  letterSpacing: "0.04em",
                }}
              >
                {selected.type.toUpperCase()}
              </span>
              <p
                style={{
                  fontSize:      15,
                  fontWeight:    800,
                  color:         TEXT,
                  letterSpacing: "-0.01em",
                  lineHeight:    1.2,
                  overflow:      "hidden",
                  textOverflow:  "ellipsis",
                  whiteSpace:    "nowrap",
                }}
              >
                {selected.name}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Star size={11} fill="#FFC700" stroke="none" />
                <span style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{selected.rating}</span>
                <span style={{ fontSize: 11, color: TEXT2 }}>({selected.reviews})</span>
                <span style={{ fontSize: 11, color: TEXT2 }}>·</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: GREEN }}>from {selected.price}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <button
                onClick={() => { onViewProfile(selected.id); setSelected(null); }}
                className="flex items-center gap-1 px-3 py-2 rounded-full"
                style={{ background: GREEN, fontSize: 12, fontWeight: 700, color: "#fff", border: "none", cursor: "pointer" }}
              >
                View
                <ChevronRight size={13} color="#fff" />
              </button>
              <button
                onClick={() => setSelected(null)}
                className="flex items-center justify-center"
                style={{
                  width:        28,
                  height:       28,
                  borderRadius: "50%",
                  background:   "#F5F5F5",
                  border:       "none",
                  cursor:       "pointer",
                }}
              >
                <X size={13} color={TEXT2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}