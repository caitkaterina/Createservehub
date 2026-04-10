import React from "react";
import { motion } from "motion/react";
import { BentoRow } from "../components/BentoRow";
import { LoginForm } from "../components/LoginForm";

const row1 = [
  "https://images.unsplash.com/photo-1771122453274-d3270e73cf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwd29ya2luZ3xlbnwxfHx8fDE3NzU3NTcxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaXN0fGVufDF8fHx8MTc3NTY3NjMxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1632345031435-8727f6897d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWlsJTIwc2Fsb24lMjBzZXJ2aWNlfGVufDF8fHx8MTc3NTc1NzE5OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1649073005971-37babef31983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbmluZyUyMHNlcnZpY2UlMjBob21lfGVufDF8fHx8MTc3NTc1NzIwMHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1604068105030-06d82bb48fd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWNoYW5pYyUyMGZpeGluZ3xlbnwxfHx8fDE3NzU3NTcyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
];

const row2 = [
  "https://images.unsplash.com/photo-1635274605638-d44babc08a4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJ5JTIwc2VydmljZXxlbnwxfHx8fDE3NzU3NTcyMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1547648946-2b1fd7eab923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXJzaG9wJTIwY3V0dGluZyUyMGhhaXJ8ZW58MXx8fHwxNzc1NzU3MjAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1660330589693-99889d60181e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmtpbmd8ZW58MXx8fHwxNzc1NzQ1ODM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwcmVsYXhpbmd8ZW58MXx8fHwxNzc1NzU3MjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1657728468483-f49bb49abd71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGVyJTIwY29uc3RydWN0aW9uJTIwd29ya2VyfGVufDF8fHx8MTc3NTc1NzIwMnww&ixlib=rb-4.1.0&q=80&w=1080",
];

const row3 = [
  "https://images.unsplash.com/photo-1629941633816-a1d688cb2d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludGVyJTIwcGFpbnRpbmclMjB3YWxsfGVufDF8fHx8MTc3NTcxNzYwOHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1764173040234-947b88cb6975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGluZyUyMGdhcmRlbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NzU3MjAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1660330589827-da8ab7dd3c02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodmFjJTIwdGVjaG5pY2lhbiUyMHJlcGFpcmluZ3xlbnwxfHx8fDE3NzU3NTcyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1622906608804-6c6ce517a6f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXN0JTIwY29udHJvbCUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NzIzMDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1698348185977-99522a45d234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBjbGVhbmluZyUyMGJ1aWxkaW5nfGVufDF8fHx8MTc3NTcyMDAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
];

const row4 = [
  "https://images.unsplash.com/photo-1707583085127-5841dced44b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29maW5nJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc3NTc1NzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1714647211963-fa82bd5b3a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpbmclMjBzZXJ2aWNlJTIwdW5wYWNraW5nfGVufDF8fHx8MTc3NTc1NzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1601299583228-1a74f6152ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzc1NzU3MjAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1626081063434-79a2169791b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJwZW50ZXIlMjB3b29kd29ya3xlbnwxfHx8fDE3NzU3NTcyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1774109556498-652c0458d4af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb29sJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc3NTc1NzIwNHww&ixlib=rb-4.1.0&q=80&w=1080",
];

export function LoginPage() {
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col font-sans max-w-[500px] mx-auto sm:border-x sm:border-white/10 sm:shadow-2xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-cyan-900/60 to-fuchsia-900/60 opacity-80" />
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-fuchsia-600/20 mix-blend-screen"
      />

      {/* Kinetic image grid */}
      <div className="absolute inset-x-0 top-0 pt-2 opacity-[0.85] pointer-events-none w-[150%] left-1/2 -translate-x-1/2 -rotate-12 scale-110">
        <div className="flex flex-col gap-0">
          <BentoRow images={row1} direction="left" speed={35} />
          <BentoRow images={row2} direction="right" speed={40} />
          <BentoRow images={row3} direction="left" speed={30} />
          <BentoRow images={row4} direction="right" speed={45} />
        </div>
      </div>

      {/* Fade overlay — bottom half darkens into bg */}
      <div className="absolute inset-x-0 bottom-0 h-[70vh] bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pointer-events-none z-10" />

      {/* Full-screen blur layer — lightened to ~4px */}
      <div
        className="absolute inset-0 pointer-events-none z-[11]"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.05)",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col justify-end px-5 pb-10 pt-[40vh]">
        <div className="text-center mb-6" />
        <LoginForm />
      </div>
    </div>
  );
}
