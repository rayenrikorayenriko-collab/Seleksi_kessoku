import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from './lib/store'
import type { Registration } from './lib/types'
import Background from './components/Background'
import Intro from './components/Intro'
import RagdolCard from './components/RagdolCard'
import HollowCard from './components/HollowCard'
import HashtagStrip from './components/HashtagStrip'
import RegistrationForm from './components/RegistrationForm'
import CnSection from './components/CnSection'
import SettingsPanel from './components/SettingsPanel'
import { StarIcon, SettingsIcon } from './components/Icons'

type Stage = 'intro' | 'main'

export default function App() {
  const { settings, addRegistration } = useSettings()
  const [stage, setStage] = useState<Stage>(settings.show_intro ? 'intro' : 'main')
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [showCn, setShowCn] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleRegisterSubmit = async (data: Registration) => {
    setRegistration(data)
    await addRegistration(data)
    setShowCn(true)
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Background />

      {/* floating logo star top-right instead of small corner badge */}
      <motion.div
        className="absolute right-4 top-4 z-40"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <StarIcon size={26} className="text-white/40 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
      </motion.div>

      {/* settings button */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="absolute left-4 top-4 z-40 rounded-full glass-soft p-2.5 text-white/70 transition hover:text-white"
        aria-label="settings"
      >
        <SettingsIcon size={20} />
      </button>

      {/* Intro */}
      <AnimatePresence>
        {stage === 'intro' && <Intro onDone={() => setStage('main')} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {stage === 'main' && (
          <motion.div
            key="main"
            className="relative z-30 flex h-full flex-col items-center overflow-y-auto no-scrollbar px-4 pb-10 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Title */}
            <motion.h1
              className="mb-1 text-center text-2xl font-bold tracking-[0.25em] text-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {settings.site_title}
            </motion.h1>
            <motion.p
              className="mb-5 text-center text-[11px] tracking-[0.3em] text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              KESSOKU FAMILY
            </motion.p>

            {/* Ragdol card */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <RagdolCard />
            </motion.div>

            {/* Hollow card */}
            <motion.div
              className="mb-6 w-full max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: 'spring' }}
            >
              <HollowCard />
            </motion.div>

            {/* Hashtags */}
            <motion.div
              className="mb-6 w-full max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <HashtagStrip />
            </motion.div>

            {/* Registration / CN */}
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
            >
              <AnimatePresence mode="wait">
                {!showCn ? (
                  <RegistrationForm key="reg" onSubmit={handleRegisterSubmit} />
                ) : (
                  registration && <CnSection key="cn" registration={registration} />
                )}
              </AnimatePresence>
            </motion.div>

            <div className="h-6" />
          </motion.div>
        )}
      </AnimatePresence>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}
