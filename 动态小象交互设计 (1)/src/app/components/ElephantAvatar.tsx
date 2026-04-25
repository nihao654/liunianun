import React from 'react';
import { motion } from 'framer-motion';

export type ElephantState = 'idle' | 'happy' | 'eating' | 'speaking';

interface ElephantAvatarProps {
  currentState: ElephantState;
}

export function ElephantAvatar({ currentState }: ElephantAvatarProps) {
  // ----------------------------------------------------------------------
  // Animations: ORIGINAL FLAT 3D STYLE (恢复到最满意的版本)
  // ----------------------------------------------------------------------
  
  // The main wrapper controls the "Peeking" (躲藏) vs "Revealed" state
  const wrapperVariants = {
    idle: { 
      x: 180,           // Shift right to hide half the body behind the edge
      y: 40,            // Drop down so the feet are hidden
      rotate: -8,       // Lean the body slightly out
      transition: { type: "spring", stiffness: 55, damping: 14 } 
    },
    happy: { 
      x: 0, 
      y: [0, -15, 0], 
      rotate: 0, 
      transition: { 
        x: { type: "spring", stiffness: 60, damping: 12 },
        rotate: { type: "spring", stiffness: 60, damping: 12 },
        y: { repeat: Infinity, duration: 0.4, ease: "easeInOut" } 
      } 
    },
    eating: { 
      x: 0, 
      y: [0, 2, 0], 
      rotate: 0, 
      transition: { 
        x: { type: "spring", stiffness: 60, damping: 12 },
        rotate: { type: "spring", stiffness: 60, damping: 12 },
        y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
      } 
    },
    speaking: { 
      x: 0, 
      y: [0, -2, 0], 
      rotate: 0, 
      transition: { 
        x: { type: "spring", stiffness: 60, damping: 12 },
        rotate: { type: "spring", stiffness: 60, damping: 12 },
        y: { repeat: Infinity, duration: 1, ease: "easeInOut" } 
      } 
    }
  };

  // The left arm "grabs" the wall when peeking
  const leftArmVariants = {
    idle: { 
      rotate: 75,       // Swing arm up and left
      x: -15,           // Adjust shoulder joint
      y: -20,
      transition: { type: "spring", stiffness: 50, damping: 12 } 
    },
    happy: { rotate: 0, x: 0, y: 0, transition: { type: "spring", stiffness: 60, damping: 12 } },
    eating: { rotate: 0, x: 0, y: 0 },
    speaking: { rotate: 0, x: 0, y: 0 }
  };

  // Ear flapping
  const leftEarVariants = {
    idle: { rotate: [0, 3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    happy: { rotate: [0, 12, 0], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } },
    eating: { rotate: [0, 3, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    speaking: { rotate: [0, 6, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
  };

  const rightEarVariants = {
    idle: { rotate: [0, -3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    happy: { rotate: [0, -12, 0], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } },
    eating: { rotate: [0, -3, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
    speaking: { rotate: [0, -6, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
  };

  // Static Trunk (no wild swinging)
  const trunkVariants = {
    idle: { d: "M 150 185 C 150 280, 200 290, 230 240", transition: { duration: 0.5 } },
    happy: { d: "M 150 185 C 150 290, 230 300, 250 200", transition: { duration: 0.4 } },
    eating: { d: "M 150 185 C 150 270, 150 270, 150 240", transition: { duration: 0.5 } },
    speaking: { d: "M 150 185 C 150 270, 190 280, 220 235", transition: { duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } }
  };

  // Hologram only shows when speaking
  const hologramVariants = {
    idle: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
    happy: { opacity: 0, scale: 0.8 },
    eating: { opacity: 0, scale: 0.8 },
    speaking: { 
      y: [0, -3, 0], 
      opacity: [0.9, 1, 0.9], 
      scale: [1, 1.05, 1], 
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } 
    }
  };

  // Original V7 Eyes (Always looking straight forward)
  const renderEyes = () => {
    if (currentState === 'happy') {
      return (
        <g stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M 105 175 Q 115 165 125 175" />
          <path d="M 175 175 Q 185 165 195 175" />
        </g>
      );
    }
    
    return (
      <g>
        {/* Left Eye */}
        <circle cx="115" cy="175" r="8" fill="#1E293B" />
        <circle cx="112" cy="172" r="2.5" fill="#FFFFFF" />
        {/* Right Eye */}
        <circle cx="185" cy="175" r="8" fill="#1E293B" />
        <circle cx="182" cy="172" r="2.5" fill="#FFFFFF" />
      </g>
    );
  };

  return (
    <div className="relative w-96 h-96 flex items-center justify-center overflow-hidden">
      <motion.svg 
        width="400" 
        height="400" 
        viewBox="0 0 400 400"
        className="drop-shadow-xl"
      >
        <defs>
          <linearGradient id="elephantSkin" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="elephantSkinDark" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="innerEar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3EAD8" />
            <stop offset="100%" stopColor="#E8DCC4" />
          </linearGradient>
          <linearGradient id="bandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5C4033" />
            <stop offset="100%" stopColor="#3E2723" />
          </linearGradient>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.1" />
          </filter>
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* --- Hologram Area --- */}
        <motion.g 
          variants={hologramVariants} 
          animate={currentState}
          style={{ originX: "280px", originY: "130px" }}
        >
          <rect x="250" y="90" width="100" height="80" rx="12" fill="#06B6D4" fillOpacity="0.1" stroke="#22D3EE" strokeWidth="2" filter="url(#neonGlow)" />
          <path d="M 265 130 Q 275 110 280 130 T 295 130 T 310 130 T 325 130 T 340 130" fill="none" stroke="#67E8F9" strokeWidth="2" strokeLinecap="round" />
          <circle cx="275" cy="110" r="4" fill="#A5F3FC" />
          <path d="M 275 114 L 275 120 M 275 120 L 285 120 L 285 110" fill="none" stroke="#A5F3FC" strokeWidth="1.5" />
          <text x="320" y="115" fill="#A5F3FC" fontSize="16" fontWeight="bold" fontFamily="sans-serif">?</text>
        </motion.g>

        {/* --- MAIN ELEPHANT WRAPPER --- */}
        <motion.g 
          variants={wrapperVariants} 
          animate={currentState}
          style={{ originX: "150px", originY: "300px" }} // Pivot at the bottom center
        >
          {/* --- 1. BACK LEGS --- */}
          <rect x="105" y="240" width="30" height="55" rx="15" fill="url(#elephantSkinDark)" />
          <rect x="165" y="240" width="30" height="55" rx="15" fill="url(#elephantSkinDark)" />
          
          <path d="M 110 292 Q 115 288 120 292 M 120 292 Q 125 288 130 292" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M 170 292 Q 175 288 180 292 M 180 292 Q 185 288 190 292" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.4" />

          {/* --- 2. BODY --- */}
          <ellipse cx="150" cy="235" rx="60" ry="55" fill="url(#elephantSkin)" filter="url(#softShadow)" />

          {/* --- 3. EARS --- */}
          <motion.g style={{ originX: "80px", originY: "180px" }} variants={leftEarVariants} animate={currentState}>
            <path d="M 85 150 C 15 110, -30 180, 10 260 C 35 310, 80 280, 105 230 Z" fill="url(#elephantSkin)" filter="url(#softShadow)" />
            <path d="M 80 160 C 25 125, -10 185, 20 250 C 40 290, 75 265, 95 225 Z" fill="url(#innerEar)" opacity="0.9" />
          </motion.g>
          
          <motion.g style={{ originX: "220px", originY: "180px" }} variants={rightEarVariants} animate={currentState}>
            <path d="M 215 150 C 285 110, 330 180, 290 260 C 265 310, 220 280, 195 230 Z" fill="url(#elephantSkin)" filter="url(#softShadow)" />
            <path d="M 220 160 C 275 125, 310 185, 280 250 C 260 290, 225 265, 205 225 Z" fill="url(#innerEar)" opacity="0.9" />
          </motion.g>

          {/* --- 4. FRONT LEGS --- */}
          
          {/* Right Front Leg (Normal) */}
          <g>
            <rect x="151" y="245" width="34" height="65" rx="17" fill="url(#elephantSkin)" filter="url(#softShadow)" />
            <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6">
              <path d="M 155 306 Q 160 301 165 306" />
              <path d="M 165 306 Q 170 301 175 306" />
              <path d="M 175 306 Q 180 301 181 306" />
            </g>
          </g>

          {/* Left Front Leg (Animated to reach out and grab the wall) */}
          <motion.g 
            variants={leftArmVariants} 
            animate={currentState}
            style={{ originX: "132px", originY: "255px" }} // Pivot at the top joint
          >
            <rect x="115" y="245" width="34" height="65" rx="17" fill="url(#elephantSkin)" filter="url(#softShadow)" />
            <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6">
              <path d="M 120 306 Q 125 301 130 306" />
              <path d="M 130 306 Q 135 301 140 306" />
              <path d="M 140 306 Q 145 301 145 306" />
            </g>
          </motion.g>

          {/* --- 5. HEAD BASE --- */}
          <ellipse cx="150" cy="175" rx="75" ry="65" fill="url(#elephantSkin)" filter="url(#softShadow)" />

          {/* --- 6. EYES & BLUSH (Always looking forward!) --- */}
          {renderEyes()}
          
          {currentState === 'happy' && (
            <>
              <ellipse cx="100" cy="190" rx="12" ry="7" fill="#FCA5A5" opacity="0.7" filter="blur(2px)" />
              <ellipse cx="200" cy="190" rx="12" ry="7" fill="#FCA5A5" opacity="0.7" filter="blur(2px)" />
            </>
          )}

          {/* --- 7. TRUNK --- */}
          <motion.path 
            variants={trunkVariants}
            animate={currentState}
            stroke="url(#elephantSkin)" 
            strokeWidth="32" 
            strokeLinecap="round" 
            fill="none" 
            filter="url(#softShadow)"
          />
          <motion.path 
            variants={trunkVariants}
            animate={currentState}
            stroke="#FFFFFF" 
            strokeWidth="14" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.35"
          />
          <motion.path 
            variants={trunkVariants}
            animate={currentState}
            stroke="#94A3B8" 
            strokeWidth="32" 
            strokeLinecap="round" 
            fill="none"
            strokeDasharray="2 16"
            opacity="0.6"
          />

          {/* --- 8. SAFARI HAT --- */}
          <g transform="translate(0, 10)">
            <ellipse cx="150" cy="100" rx="60" ry="18" fill="url(#hatGrad)" filter="url(#softShadow)" />
            <path d="M 115 100 C 115 50, 125 40, 150 40 C 175 40, 185 50, 185 100 Z" fill="url(#hatGrad)" />
            <path d="M 116 88 Q 150 102 184 88 L 185 100 Q 150 114 115 100 Z" fill="url(#bandGrad)" />
            <path d="M 128 93 L 133 88 L 138 93 M 144 95 L 149 90 L 154 95 M 160 96 L 165 91 L 170 96" fill="none" stroke="#D4A373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="150" cy="86" r="8" fill="url(#brassGrad)" filter="url(#softShadow)" />
            <circle cx="150" cy="86" r="6" fill="#1E293B" />
            <path d="M 150 81 L 152 86 L 150 91 L 148 86 Z" fill="#EF4444" />
            <circle cx="150" cy="86" r="1.5" fill="url(#brassGrad)" />
          </g>

        </motion.g>
      </motion.svg>
      
      {/* Interactive Item Overlay (Apple) */}
      {currentState === 'eating' && (
        <motion.div 
          className="absolute text-5xl z-10"
          initial={{ y: 80, x: -10, opacity: 0, scale: 0 }}
          animate={{ y: 50, x: 0, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          style={{ top: '55%', left: '42%' }}
        >
          🍎
        </motion.div>
      )}
    </div>
  );
}
