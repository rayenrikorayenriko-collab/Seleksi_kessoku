import { motion } from 'framer-motion'
import { useSettings } from '../lib/store'
import { StarIcon, SparkleIcon } from './Icons'

interface Props {
  onDone: () => void
}

export default function Intro({ onDone }: Props) {
  const { settings } = useSettings()

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] via-[#1a0a2e] to-[#05050a]" />

      {/* orbiting stars */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-72 w-72">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 text-purple-300"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: [0, Math.cos((i / 6) * Math.PI * 2) * 120],
                y: [0, Math.sin((i / 6) * Math.PI * 2) * 120],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.8],
              }}
              transition={{ duration: 2.4, delay: i * 0.15, repeat: Infinity, repeatType: 'reverse' }}
            >
              <SparkleIcon size={14 + (i % 2) * 6} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* central star */}
      <motion.div
        className="relative z-10 text-white"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
      >
        <div className="relative">
          <StarIcon size={96} className="drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          >
            <StarIcon size={96} className="text-white/10" />
          </motion.div>
        </div>
      </motion.div>

      {/* title */}
      <motion.h1
        className="relative z-10 mt-8 text-center text-4xl font-bold tracking-[0.2em] text-gradient"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        {settings.intro_title}
      </motion.h1>

      <motion.p
        className="relative z-10 mt-3 text-sm tracking-widest text-white/60"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        {settings.intro_subtitle}
      </motion.p>

      {/* enter button */}
      <motion.button
        onClick={onDone}
        className="relative z-10 mt-12 rounded-full glass px-8 py-3 text-sm font-medium tracking-widest text-white/90 transition hover:scale-105"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7 }}
        whileTap={{ scale: 0.95 }}
      >
        MASUK ↗
      </motion.button>

      {/* progress bar */}
      <motion.div
        className="absolute bottom-10 left-1/2 h-[2px] w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          onAnimationComplete={onDone}
        />
      </motion.div>
    </motion.div>
  )
}
