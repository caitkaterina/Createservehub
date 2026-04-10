import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

// Apple SVG icon
function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.42.07 2.4.83 3.23.83.87 0 2.48-1.02 4.15-.87 1.33.1 2.52.63 3.4 1.63-3.1 1.87-2.59 5.98.36 7.32-.61 1.37-1.44 2.73-3.14 3.97ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}

// Google SVG icon
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

interface GlassInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  rightElement?: React.ReactNode;
}

function GlassInput({ type, placeholder, value, onChange, icon, rightElement }: GlassInputProps) {
  return (
    <div
      className="relative flex items-center rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <span className="pl-4 pr-1 text-white/40 shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent px-3 py-4 text-white placeholder-white/35 outline-none text-[15px]"
        style={{ caretColor: "rgba(255,255,255,0.8)" }}
      />
      {rightElement && (
        <span className="pr-4 text-white/40 shrink-0">{rightElement}</span>
      )}
    </div>
  );
}

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/home");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative rounded-[32px] overflow-hidden p-6"
      style={{
        background: "linear-gradient(160deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 60%, rgba(160,180,255,0.07) 100%)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        border: "1px solid rgba(255,255,255,0.20)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.12)",
      }}
    >
      {/* Top-edge specular line */}
      <div
        className="absolute inset-x-12 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent)" }}
      />

      {/* Slow sheen sweep */}
      <motion.div
        animate={{ x: ["-200%", "350%"] }}
        transition={{ repeat: Infinity, duration: 5, repeatDelay: 4, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
          transform: "skewX(-12deg)",
        }}
      />

      <div className="relative z-10 space-y-3">
        {/* Email */}
        <GlassInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={setEmail}
          icon={<Mail size={16} />}
        />

        {/* Password */}
        <GlassInput
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          icon={<Lock size={16} />}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        {/* Forgot password */}
        <div className="flex justify-end pr-1">
          <button
            type="button"
            className="text-[13px] text-white/50 hover:text-white/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleLogin}
          className="relative w-full rounded-2xl py-4 overflow-hidden"
          style={{
            background: "linear-gradient(150deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 50%, rgba(180,200,255,0.10) 100%)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Button specular dome */}
          <div
            className="absolute inset-x-8 top-0 h-[45%] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
              borderRadius: "0 0 50% 50%",
            }}
          />
          <span
            className="relative z-10 font-semibold text-[16px]"
            style={{ color: "rgba(255,255,255,0.90)", textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
          >Login</span>
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-white/35 text-[13px]">or</span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* Continue with Apple */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleLogin}
          className="relative w-full flex items-center justify-center gap-3 rounded-2xl py-[14px] overflow-hidden text-[15px] font-semibold text-white transition-colors"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <AppleIcon />
          Continue with Apple
        </motion.button>

        {/* Continue with Google */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleLogin}
          className="relative w-full flex items-center justify-center gap-3 rounded-2xl py-[14px] overflow-hidden text-[15px] font-semibold text-white transition-colors"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <GoogleIcon />
          Continue with Google
        </motion.button>

        {/* Sign up prompt */}
        <p className="text-center text-[13px] text-white/40 pt-1">
          Don't have an account?{" "}
          <button type="button" className="text-white/70 hover:text-white transition-colors font-medium">
            Sign up
          </button>
        </p>
      </div>
    </motion.div>
  );
}