import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../lib/store'
import { CopyIcon, CheckIcon, ArrowRightIcon } from './Icons'
import type { Registration } from '../lib/types'

interface Props {
  registration: Registration
}

export default function CnSection({ registration }: Props) {
  const { settings } = useSettings()
  const [name, setName] = useState(registration.name)
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [joined, setJoined] = useState(false)

  const cnLines = settings.cn_templates.map((t) => t.format.replace(/\{name\}/g, name))

  const fullText = cnLines.join('\n')

  const autoCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullText)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = fullText
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
      } catch {}
      document.body.removeChild(ta)
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) return
    setSubmitted(true)
    // auto copy
    setTimeout(autoCopy, 300)
  }

  const handleCopy = async () => {
    await autoCopy()
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const handleJoin = () => {
    setJoined(true)
    window.open(settings.join_url, '_blank')
  }

  return (
    <motion.div
      className="glass-strong w-full max-w-md rounded-3xl p-6"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h2 className="mb-1 text-center text-xl font-bold tracking-wider text-gradient">BUAT CN</h2>
            <p className="mb-5 text-center text-[11px] tracking-widest text-white/50">
              Masukkan nama untuk CN
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama"
              className="input"
              autoFocus
            />
            <motion.button
              onClick={handleSubmit}
              disabled={!name.trim()}
              whileTap={{ scale: 0.97 }}
              className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold tracking-widest transition ${
                name.trim()
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              BUAT CN <ArrowRightIcon size={18} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="mb-3 text-center text-xl font-bold tracking-wider text-gradient">CN KAMU</h2>

            <div className="mb-4 space-y-2 rounded-2xl bg-black/30 p-4">
              {cnLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="break-all text-center text-base font-medium text-white/90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <p className="mb-3 text-center text-[11px] tracking-widest text-white/50">
              OTOMATIS TERSALIN · TEKAN SALIN JIKA BELUM
            </p>

            {/* copy button, disappears after copied -> replaced by bergabung */}
            <AnimatePresence mode="wait">
              {!joined ? (
                <motion.button
                  key="copy"
                  onClick={handleCopy}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3.5 text-sm font-semibold tracking-widest text-white/90 transition hover:bg-white/15"
                >
                  {copied ? (
                    <>
                      <CheckIcon size={18} /> TERSALIN
                    </>
                  ) : (
                    <>
                      <CopyIcon size={18} /> SALIN OTOMATIS
                    </>
                  )}
                </motion.button>
              ) : null}
            </AnimatePresence>

            <motion.button
              onClick={handleJoin}
              whileTap={{ scale: 0.97 }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 py-3.5 text-sm font-semibold tracking-widest text-white shadow-lg shadow-purple-500/30"
            >
              BERGABUNG <ArrowRightIcon size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 12px 14px;
          color: #fff;
          font-size: 14px;
          outline: none;
          transition: all 0.25s;
          text-align: center;
        }
        .input:focus {
          border-color: rgba(168,85,247,0.6);
          box-shadow: 0 0 0 3px rgba(168,85,247,0.15);
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </motion.div>
  )
}
