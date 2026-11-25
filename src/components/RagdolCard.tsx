import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../lib/store'

export default function RagdolCard() {
  const { settings } = useSettings()
  const [flipped, setFlipped] = useState(false)
  const [swinging, setSwinging] = useState(true)

  const frontImg = settings.ragdol_front_image
  const backImg = settings.ragdol_back_image

  return (
    <div className="flex flex-col items-center">
      {/* rope / string */}
      <div className="relative flex flex-col items-center">
        <div className="h-10 w-[2px] bg-gradient-to-b from-transparent to-white/30" />
        {/* knot */}
        <div className="h-2 w-2 -mt-1 rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />

        {/* card hanging */}
        <motion.div
          className={`origin-top ${swinging ? 'sway' : ''}`}
          onClick={() => {
            setSwinging(false)
            setFlipped((f) => !f)
          }}
          whileTap={{ scale: 0.97 }}
          style={{ cursor: 'pointer' }}
        >
          <div className="scene-3d">
            <motion.div
              className="preserve-3d relative h-56 w-40 rounded-2xl"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              {/* FRONT */}
              <div className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl glass-strong glow-purple">
                {frontImg ? (
                  <img src={frontImg} alt="front" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-600/40 to-blue-600/40">
                    <div className="vertical-text text-2xl font-bold tracking-[0.3em] text-white/90 drop-shadow-lg">
                      {settings.ragdol_front_text}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 shimmer-overlay" />
                <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-widest text-white/70">
                  TAP TO FLIP
                </div>
              </div>

              {/* BACK */}
              <div
                className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl glass-strong"
                style={{ transform: 'rotateY(180deg)' }}
              >
                {backImg ? (
                  <img src={backImg} alt="back" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-600/40 to-pink-600/40">
                    <div className="vertical-text text-xl font-bold tracking-[0.25em] text-white/90">
                      KSF FAMILY
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 shimmer-overlay" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
